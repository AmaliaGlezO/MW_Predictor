#!/usr/bin/env python3
"""
Script de entrenamiento de modelos ML para predicción de demanda energética
Datos: Sistema eléctrico cubano desde Cubadebate
"""

import json
import pandas as pd
import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
from statsmodels.tsa.arima.model import ARIMA
import warnings
warnings.filterwarnings('ignore')

class EnergyDataProcessor:
    def __init__(self, json_file_path):
        self.json_file_path = json_file_path
        self.raw_data = None
        self.processed_data = None

    def load_data(self):
        with open(self.json_file_path, 'r', encoding='utf-8') as f:
            self.raw_data = json.load(f)
        print(f"Datos cargados: {len(self.raw_data)} años")

    def extract_features(self, entry):
        datos = entry.get('datos', {})
        features = {
            'fecha': entry.get('fecha'),
            'enlace': entry.get('enlace'),
        }

        prediccion = datos.get('prediccion', {})
        features.update({
            'disponibilidad': self._extract_numeric(prediccion.get('disponibilidad', 0)),
            'demanda_maxima': self._extract_numeric(prediccion.get('demanda_maxima', 0)),
            'afectacion': self._extract_numeric(prediccion.get('afectacion', 0)),
            'deficit': self._extract_numeric(prediccion.get('deficit', 0)),
            'respaldo': self._extract_numeric(prediccion.get('respaldo', 0)),
        })

        info_matutina = datos.get('info_matutina', {})
        features.update({
            'disponibilidad_matutina': self._extract_numeric(info_matutina.get('disponibilidad', 0)),
            'demanda_matutina': self._extract_numeric(info_matutina.get('demanda', 0)),
        })

        plantas = datos.get('plantas', {})
        features.update({
            'plantas_averia': len(plantas.get('averia', [])),
            'plantas_mantenimiento': len(plantas.get('mantenimiento', [])),
            'limitacion_termica': self._extract_numeric(plantas.get('limitacion_termica', {}).get('mw_afectados', 0)),
        })

        distribuida = datos.get('distribuida', {})
        motores = distribuida.get('motores_con_problemas', {})
        features.update({
            'motores_problemas_mw': self._extract_numeric(motores.get('impacto_mw', 0)),
            'motores_problemas_total': self._extract_numeric(motores.get('total', 0)),
        })

        features['zonas_problemas'] = len(datos.get('zonas_con_problemas', []))
        return features

    def _extract_numeric(self, value):
        if value is None:
            return 0
        if isinstance(value, (int, float)):
            return value
        if isinstance(value, str):
            import re
            numbers = re.findall(r'\d+\.?\d*', value)
            return float(numbers[0]) if numbers else 0
        return 0

    def _month_to_number(self, month_name):
        months = {
            'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
            'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
            'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
        }
        return months.get(month_name, 1)

    def add_time_features(self, df):
        df['dia_semana'] = df['fecha'].dt.dayofweek
        df['dia_mes'] = df['fecha'].dt.day
        df['dia_año'] = df['fecha'].dt.dayofyear
        df['semana_año'] = df['fecha'].dt.isocalendar().week
        df['trimestre'] = df['fecha'].dt.quarter
        df['mes_sin'] = np.sin(2 * np.pi * df['mes'] / 12)
        df['mes_cos'] = np.cos(2 * np.pi * df['mes'] / 12)
        df['dia_semana_sin'] = np.sin(2 * np.pi * df['dia_semana'] / 7)
        df['dia_semana_cos'] = np.cos(2 * np.pi * df['dia_semana'] / 7)
        df['es_fin_semana'] = (df['dia_semana'] >= 5).astype(int)
        df['es_lunes'] = (df['dia_semana'] == 0).astype(int)
        return df

    def add_lag_features(self, df):
        target_cols = ['demanda_maxima', 'disponibilidad', 'afectacion']
        for col in target_cols:
            if col in df.columns:
                for lag in [1, 2, 3, 7, 14]:
                    df[f'{col}_lag_{lag}'] = df[col].shift(lag)
                for window in [3, 7, 14, 30]:
                    df[f'{col}_rolling_mean_{window}'] = df[col].rolling(window=window).mean()
                    df[f'{col}_rolling_std_{window}'] = df[col].rolling(window=window).std()
        return df

    def clean_data(self, df):
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())
        df = df.dropna(subset=['demanda_maxima'])
        df['deficit_ratio'] = df['deficit'] / (df['demanda_maxima'] + 1e-6)
        df['disponibilidad_ratio'] = df['disponibilidad'] / (df['demanda_maxima'] + 1e-6)
        df['eficiencia'] = (df['disponibilidad'] - df['afectacion']) / (df['disponibilidad'] + 1e-6)
        return df

    def process_all_data(self):
        all_records = []
        for year, months in self.raw_data.items():
            for month, entries in months.items():
                if not entries:
                    continue
                for entry in entries:
                    features = self.extract_features(entry)
                    features['año'] = int(year)
                    features['mes'] = self._month_to_number(month)
                    all_records.append(features)
        if not all_records:
            raise ValueError("No se encontraron datos válidos para procesar.")
        df = pd.DataFrame(all_records)
        df['fecha'] = pd.to_datetime(df['fecha'])
        df = df.sort_values('fecha').reset_index(drop=True)
        df = self.add_time_features(df)
        df = self.add_lag_features(df)
        df = self.clean_data(df)
        self.processed_data = df
        return df

class EnergyMLTrainer:
    def __init__(self, data):
        self.data = data
        self.models = {}
        self.results = {}

    def prepare_features(self, target_col='demanda_maxima'):
        feature_cols = [
            'disponibilidad', 'disponibilidad_matutina', 'afectacion',
            'plantas_averia', 'plantas_mantenimiento', 'limitacion_termica',
            'motores_problemas_mw', 'zonas_problemas',
            'dia_semana', 'mes', 'dia_mes', 'trimestre',
            'mes_sin', 'mes_cos', 'dia_semana_sin', 'dia_semana_cos',
            'es_fin_semana', 'es_lunes'
        ]
        lag_cols = [col for col in self.data.columns if 'lag_' in col or 'rolling_' in col]
        feature_cols.extend(lag_cols)
        feature_cols = [col for col in feature_cols if col in self.data.columns]
        X = self.data[feature_cols].copy()
        y = self.data[target_col].copy()
        mask = ~(X.isna().any(axis=1) | y.isna())
        return X[mask], y[mask], feature_cols

    def train_random_forest(self, X, y):
        model = RandomForestRegressor(
            n_estimators=100, max_depth=10, min_samples_split=5, min_samples_leaf=2,
            random_state=42, n_jobs=-1
        )
        model.fit(X, y)
        return model

    def train_xgboost(self, X, y):
        model = xgb.XGBRegressor(
            n_estimators=100, max_depth=6, learning_rate=0.1,
            random_state=42, n_jobs=-1
        )
        model.fit(X, y)
        return model

    def evaluate_model(self, model, X_test, y_test):
        predictions = model.predict(X_test)
        return {
            'mae': mean_absolute_error(y_test, predictions),
            'rmse': np.sqrt(mean_squared_error(y_test, predictions)),
            'mape': np.mean(np.abs((y_test - predictions) / y_test)) * 100,
            'r2': r2_score(y_test, predictions),
            'predictions': predictions
        }

    def train_all_models(self):
        X, y, _ = self.prepare_features()
        split_date = self.data['fecha'].quantile(0.8)
        train_mask = self.data['fecha'] <= split_date
        test_mask = self.data['fecha'] > split_date
        train_idx = self.data[train_mask].index
        test_idx = self.data[test_mask].index
        X_train, X_test = X.loc[train_idx], X.loc[test_idx]
        y_train, y_test = y.loc[train_idx], y.loc[test_idx]
        print(f"Datos de entrenamiento: {len(X_train)}")
        print(f"Datos de prueba: {len(X_test)}")
        rf_model = self.train_random_forest(X_train, y_train)
        xgb_model = self.train_xgboost(X_train, y_train)
        self.results['random_forest'] = self.evaluate_model(rf_model, X_test, y_test)
        self.results['xgboost'] = self.evaluate_model(xgb_model, X_test, y_test)
        self.models['random_forest'] = rf_model
        self.models['xgboost'] = xgb_model
        print("Random Forest:", self.results['random_forest'])
        print("XGBoost:", self.results['xgboost'])

# Ejecutar
if __name__ == "__main__":
    processor = EnergyDataProcessor("datos_electricos_organizados.json")
    processor.load_data()
    df = processor.process_all_data()
    trainer = EnergyMLTrainer(df)
    trainer.train_all_models()

# 🔌 Predicción de Demanda Energética en Cuba - Machine Learning

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow.svg)]()

## 📋 Descripción del Proyecto

Este proyecto utiliza técnicas de Machine Learning para predecir la demanda energética en Cuba, con el objetivo de apoyar la planificación y optimización del sistema eléctrico nacional durante la actual crisis energética.

### 🎯 Problema
La crisis energética que atraviesa Cuba ha generado cortes de electricidad frecuentes e impredecibles, afectando tanto a la población como a los sectores productivos. La falta de una predicción precisa de la demanda energética dificulta la planificación eficiente de la distribución eléctrica y la toma de decisiones operativas.

### 🎯 Objetivo
Desarrollar y comparar múltiples modelos de machine learning para predecir la demanda energética, proporcionando herramientas de apoyo para la planificación energética y optimización del sistema eléctrico nacional.

## 🏗️ Estructura del Proyecto

```
prediccion-demanda-energetica-cuba-ml/
├── README.md                          # Este archivo
├── requirements.txt                   # Dependencias de Python
├── .gitignore                        # Archivos a ignorar en Git
├── LICENSE                           # Licencia del proyecto
├── config/                           # Archivos de configuración
│   ├── config.yaml                   # Configuración general
│   └── model_params.json             # Parámetros de modelos
├── data/                             # Datos del proyecto
│   ├── raw/                          # Datos originales (no modificar)
│   ├── processed/                    # Datos procesados
│   └── external/                     # Datos de fuentes externas
├── notebooks/                        # Jupyter Notebooks
│   ├── 01_exploratory_data_analysis.ipynb
│   ├── 02_data_preprocessing.ipynb
│   ├── 03_feature_engineering.ipynb
│   ├── 04_model_training.ipynb
│   └── 05_model_evaluation.ipynb
├── src/                              # Código fuente
│   ├── data/                         # Módulos de procesamiento de datos
│   ├── models/                       # Implementación de modelos
│   ├── evaluation/                   # Evaluación y métricas
│   └── utils/                        # Utilidades generales
├── models/                           # Modelos entrenados
├── results/                          # Resultados y visualizaciones
├── reports/                          # Informes y documentación
└── scripts/                          # Scripts de ejecución
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Python 3.8 o superior
- Git
- pip (gestor de paquetes de Python)

### Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/prediccion-demanda-energetica-cuba-ml.git
cd prediccion-demanda-energetica-cuba-ml
```

2. **Crear entorno virtual:**
```bash
python -m venv venv

# En Windows:
venv\Scripts\activate

# En Linux/Mac:
source venv/bin/activate
```

3. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

4. **Configurar Jupyter Notebook (opcional):**
```bash
jupyter notebook
```

## 📊 Datos

### Fuentes de Datos
- **Primaria**: Datos de consumo energético de Cubadebate
- **Secundaria**: Datos meteorológicos, económicos y demográficos
- **Externas**: APIs de clima y indicadores económicos

### Descripción de Variables
| Variable | Descripción | Tipo | Fuente |
|----------|-------------|------|---------|
| `fecha` | Fecha de la observación | DateTime | Cubadebate |
| `consumo_mwh` | Consumo energético en MWh | Float | Cubadebate |
| `temperatura_max` | Temperatura máxima diaria (°C) | Float | Meteorológica |
| `temperatura_min` | Temperatura mínima diaria (°C) | Float | Meteorológica |
| `humedad` | Humedad relativa promedio (%) | Float | Meteorológica |
| `dia_semana` | Día de la semana (0-6) | Integer | Calculado |
| `mes` | Mes del año (1-12) | Integer | Calculado |
| `es_festivo` | Indicador de día festivo | Boolean | Manual |

## 🤖 Modelos Implementados

### Modelos de Series Temporales
- **ARIMA/SARIMA**: Modelos autorregresivos con componentes estacionales
- **Exponential Smoothing**: Suavizado exponencial para tendencias

### Modelos de Machine Learning
- **Random Forest**: Ensemble de árboles de decisión
- **XGBoost**: Gradient boosting optimizado
- **Support Vector Regression**: Regresión con vectores de soporte

### Modelos de Deep Learning
- **LSTM**: Redes neuronales con memoria a largo plazo
- **GRU**: Unidades recurrentes con compuertas
- **CNN-LSTM**: Combinación de redes convolucionales y LSTM

## 📈 Métricas de Evaluación

- **MAE** (Mean Absolute Error): Error promedio absoluto
- **RMSE** (Root Mean Square Error): Raíz del error cuadrático medio
- **MAPE** (Mean Absolute Percentage Error): Error porcentual promedio
- **R²** (Coefficient of Determination): Coeficiente de determinación

## 🔧 Uso del Proyecto

### Análisis Exploratorio
```bash
jupyter notebook notebooks/01_exploratory_data_analysis.ipynb
```

### Entrenamiento de Modelos
```bash
python scripts/train_models.py --model arima --data data/processed/energy_data.csv
```

### Evaluación de Modelos
```bash
python scripts/evaluate_models.py --models_dir models/trained_models/
```

### Generar Predicciones
```bash
python scripts/generate_predictions.py --model_path models/best_model.pkl --days 30
```

## 📊 Resultados Principales

### Rendimiento de Modelos
| Modelo | MAE | RMSE | MAPE | R² |
|--------|-----|------|------|-----|
| LSTM | TBD | TBD | TBD% | TBD |
| XGBoost | TBD | TBD | TBD% | TBD |
| Random Forest | TBD | TBD | TBD% | TBD |
| ARIMA | TBD | TBD | TBD% | TBD |

*Resultados pendientes de completar el entrenamiento*

### Visualizaciones
- Gráficos de predicciones vs valores reales
- Análisis de residuos
- Importancia de características
- Patrones estacionales identificados

## 🛠️ Tecnologías Utilizadas

### Librerías Principales
- **pandas, numpy**: Manipulación de datos
- **scikit-learn**: Machine learning tradicional
- **tensorflow/keras**: Deep learning
- **statsmodels**: Análisis estadístico y series temporales
- **matplotlib, seaborn**: Visualización
- **xgboost**: Gradient boosting

### Herramientas
- **Jupyter Notebook**: Desarrollo interactivo
- **Git**: Control de versiones
- **Python**: Lenguaje principal


### Fase 2: Análisis de Datos (🔄 En Progreso)
- [ ] Análisis exploratorio
- [ ] Limpieza de datos
- [ ] Feature engineering

### Fase 3: Modelado (⏳ Pendiente)
- [ ] Implementación de modelos baseline
- [ ] Entrenamiento de modelos de ML
- [ ] Optimización de hiperparámetros

### Fase 4: Evaluación (⏳ Pendiente)
- [ ] Comparación de modelos
- [ ] Análisis de resultados
- [ ] Selección del mejor modelo

### Fase 5: Documentación (⏳ Pendiente)
- [ ] Informe final
- [ ] Presentación de resultados
- [ ] Documentación técnica completa


# Proyecto de Machine Learning: Predicción de Demanda Energética en Cuba
## 📋 Información del Proyecto
Título del Repositorio
prediccion-demanda-energetica-cuba-ml
Planteamiento del Problema
La crisis energética que atraviesa Cuba ha generado cortes de electricidad frecuentes e impredecibles, afectando tanto a la población como a los sectores productivos. La falta de una predicción precisa de la demanda energética dificulta la planificación eficiente de la distribución eléctrica y la toma de decisiones operativas del sistema eléctrico nacional.
Objetivo General
Desarrollar y comparar múltiples modelos de machine learning para predecir la demanda energética en Cuba, utilizando datos históricos de consumo eléctrico, con el fin de proporcionar herramientas de apoyo para la planificación energética y optimización del sistema eléctrico nacional.
Objetivos Específicos

Analizar patrones históricos de consumo energético en Cuba
Identificar variables que influyen en la demanda energética (climáticas, económicas, sociales)
Implementar y entrenar múltiples algoritmos de ML (ARIMA, LSTM, Random Forest, XGBoost, etc.)
Evaluar y comparar el rendimiento de los modelos usando métricas apropiadas
Generar predicciones a corto y mediano plazo de la demanda energética

## 🗂️ Estructura del Repositorio
prediccion-demanda-energetica-cuba-ml/ 
├── README.md 
├── requirements.txt 
├── .gitignore 
├── config/ 
│   ├── config.yaml 
│   └── model_params.json 
├── data/ 
│   ├── raw/ 
│   │   ├── cubadebate_energy_data.csv 
│   │   ├── weather_data.csv 
│   │   └── economic_indicators.csv 
│   ├── processed/ 
│   │   ├── cleaned_energy_data.csv 
│   │   └── feature_engineered_data.csv 
│   └── external/ 
├── notebooks/ 
│   ├── 01_exploratory_data_analysis.ipynb 
│   ├── 02_data_preprocessing.ipynb 
│   ├── 03_feature_engineering.ipynb 
│   ├── 04_model_training.ipynb 
│   └── 05_model_evaluation.ipynb 
├── src/ 
│   ├── __init__.py 
│   ├── data/ 
│   │   ├── __init__.py  
│   │   ├── data_loader.py 
│   │   ├── preprocessor.py 
│   │   └── feature_engineer.py 
│   ├── models/ 
│   │   ├── __init__.py 
│   │   ├── base_model.py 
│   │   ├── arima_model.py 
│   │   ├── lstm_model.py 
│   │   ├── random_forest_model.py 
│   │   └── xgboost_model.py 
│   ├── evaluation/ 
│   │   ├── __init__.py 
│   │   ├── metrics.py 
│   │   └── evaluator.py 
│   └── utils/ 
│       ├── __init__.py 
│       ├── logger.py 
│       └── visualizations.py 
├── models/ 
│   ├── trained_models/ 
│   └── model_artifacts/ 
├── results/ 
│   ├── figures/ 
│   ├── metrics/ 
│   └── predictions/ 
├── reports/ 
│   ├── informe_final.pdf 
│   └── presentacion.pptx 
└── scripts/ 
    ├── train_models.py 
    ├── evaluate_models.py 
    └── generate_predictions.py 
## 📊 Recolección y Preparación de Datos
Datos Necesarios (Mínimo Recomendado)

Datos históricos: Al menos 2-3 años de datos horarios/diarios
Frecuencia: Datos diarios como mínimo, idealmente horarios
Cantidad mínima: 700-1000 observaciones para modelos básicos

Fuentes de Datos Adicionales

Cubadebate: Datos de consumo energético (ya tienes)
Datos meteorológicos: Temperatura, humedad, precipitaciones
Indicadores económicos: PIB, índices de producción industrial
Datos demográficos: Población, urbanización
Eventos especiales: Días festivos, eventos significativos

Variables a Considerar

Consumo energético histórico (target)
Temperatura máxima/mínima diaria
Humedad relativa
Día de la semana
Mes del año
Días festivos
Indicadores económicos
Población servida

## 🤖 Modelos a Implementar
1. Modelos de Series Temporales Tradicionales

ARIMA/SARIMA: Para patrones estacionales
Exponential Smoothing: Para tendencias suaves

2. Modelos de Machine Learning

Random Forest: Bueno con variables categóricas
XGBoost/LightGBM: Excelente rendimiento general
Support Vector Regression: Para relaciones no lineales

3. Modelos de Deep Learning

LSTM/GRU: Para secuencias temporales largas
CNN-LSTM: Combinación de convolución y memoria
Transformer: Estado del arte en series temporales

4. Modelos Ensemble

Voting Regressor: Combinación de múltiples modelos
Stacking: Modelo meta para combinar predicciones

## 📈 Métricas de Evaluación
Métricas Principales

MAE (Mean Absolute Error): Error promedio absoluto
RMSE (Root Mean Square Error): Penaliza errores grandes
MAPE (Mean Absolute Percentage Error): Error porcentual
R² Score: Coeficiente de determinación

Métricas Específicas para Energía

Peak Load Error: Error en picos de demanda
Load Factor: Factor de carga promedio
Forecast Skill: Mejora sobre modelos naive

## 🔄 Flujo de Trabajo
### Fase 1: Preparación (Semana 1)

Configurar repositorio y entorno
Explorar y limpiar datos existentes
Recolectar datos adicionales
Análisis exploratorio inicial

### Fase 2: Procesamiento (Semana 2)

Limpieza profunda de datos
Feature engineering
Creación de variables lag y rolling
División train/validation/test

### Fase 3: Modelado (Semana 3-4)

Implementar modelos baseline
Entrenar modelos de ML
Optimizar hiperparámetros
Validación cruzada temporal

### Fase 4: Evaluación (Semana 5)

Comparar todos los modelos
Análisis de residuos
Interpretabilidad de modelos
Selección del mejor modelo

### Fase 5: Documentación (Semana 6)

Generar informe final
Crear visualizaciones
Preparar presentación
Documentar código

## 🛠️ Stack Tecnológico Recomendado
Librerías Python
python# Manipulación de datos
pandas, numpy, scipy

- Visualización
matplotlib, seaborn, plotly

- Machine Learning
scikit-learn, xgboost, lightgbm

- Deep Learning
tensorflow/keras, pytorch

- Series Temporales
statsmodels, pmdarima, prophet

- Utilidades
joblib, pickle, yaml, logging
Herramientas

Jupyter Notebooks: Para exploración y prototipado
Git: Control de versiones
MLflow: Seguimiento de experimentos
Docker: Reproducibilidad del entorno

## 📝 Estructura del Informe Final
1. Resumen Ejecutivo

Problema y objetivos
Metodología empleada
Principales resultados
Recomendaciones

2. Introducción

Contexto energético de Cuba
Justificación del proyecto
Objetivos específicos

3. Metodología

Descripción de datos
Preprocesamiento aplicado
Modelos implementados
Métricas de evaluación

4. Resultados

Análisis exploratorio
Comparación de modelos
Visualizaciones de predicciones
Interpretación de resultados

5. Conclusiones y Recomendaciones

Modelo óptimo identificado
Limitaciones del estudio
Trabajo futuro
Recomendaciones para implementación

## 🚀 Primeros Pasos

Crear el repositorio con la estructura propuesta
Configurar el entorno virtual con las librerías necesarias
Subir y explorar tus datos actuales de Cubadebate
Identificar gaps en los datos y planificar recolección adicional
Comenzar con EDA para entender patrones básicos
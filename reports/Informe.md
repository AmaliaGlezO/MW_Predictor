# Informe Final: Predicción de Demanda Energética en Cuba mediante Machine Learning

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Introducción](#2-introducción)
3. [Marco Teórico](#3-marco-teórico)
4. [Metodología](#4-metodología)
5. [Análisis de Datos](#5-análisis-de-datos)
6. [Implementación de Modelos](#6-implementación-de-modelos)
7. [Resultados y Evaluación](#7-resultados-y-evaluación)
8. [Discusión](#8-discusión)
9. [Conclusiones](#9-conclusiones)
10. [Recomendaciones](#10-recomendaciones)
11. [Limitaciones y Trabajo Futuro](#11-limitaciones-y-trabajo-futuro)
12. [Referencias](#12-referencias)
13. [Anexos](#13-anexos)

---

## 1. Resumen Ejecutivo

**¿Qué incluir aquí?**
Un resumen de máximo 2 páginas que contenga:
- El problema energético de Cuba en 2-3 líneas
- Los objetivos del proyecto
- Metodología empleada (tipos de modelos usados)
- Principales hallazgos (mejor modelo, precisión obtenida)
- Recomendaciones clave para implementación
- Impacto esperado del proyecto

*Este es lo primero que leerán, así que debe ser convincente y contener todos los puntos importantes del informe.*

---

## 2. Introducción

### 2.1 Contexto y Problemática

**¿Qué incluir aquí?**
- Situación actual del sistema eléctrico cubano
- Impacto de los cortes de electricidad en la población y economía
- Importancia de la predicción de demanda para la planificación energética
- Estadísticas relevantes sobre el consumo energético en Cuba
- Breve mención de la crisis energética actual

La situación del sistema eléctrico de Cuba es "grave" con "largas horas de apagón" debido al mal estado de sus termoeléctricas, la falta de financiamiento para su reparación y la escasez de combustible. Durante las últimas semanas los cubanos han enfrentado cortes de energía de hasta 21 horas al día en algunas provincias de la isla, cuyo sistema eléctrico solo está produciendo 45 gigawatts de los 63 que consume en cada jornada, según el director de la Unión Eléctrica de Cuba (UNE), Alfredo López. Cuba, en una profunda crisis económica desde hace más de cuatro años, cuenta con un ruinoso sistema eléctrico, que colapsó en marzo por cuarta vez en menos de seis meses. Esta red está integrada por ocho desgastadas termoeléctricas, algunas centrales eléctricas flotantes alquiladas a una empresa turca y generadores, que funcionan fundamentalmente con diésel que Cuba tiene grandes dificultades para importar.

La situacion que se describe abre paso al deseo y la necesidad de hacer una  predicción precisa de la demanda energética y los posibles déficits del sistema eléctrico
### 2.2 Justificación del Proyecto

**¿Qué incluir aquí?**
- Por qué es importante predecir la demanda energética
- Cómo el machine learning puede aportar soluciones
- Beneficios esperados para el sistema eléctrico nacional
- Relevancia académica y práctica del proyecto

### 2.3 Objetivos

#### 2.3.1 Objetivo General
*[Tu objetivo principal - predecir demanda energética usando ML]*

#### 2.3.2 Objetivos Específicos
*[Lista de 4-5 objetivos específicos como los que definimos antes]*

---

## 3. Marco Teórico

### 3.1 Sistemas Eléctricos y Demanda Energética

**¿Qué incluir aquí?**
- Conceptos básicos de sistemas eléctricos
- Factores que influyen en la demanda energética
- Patrones típicos de consumo (diarios, semanales, estacionales)
- Características específicas del sistema eléctrico cubano

### 3.2 Machine Learning en Predicción Energética

**¿Qué incluir aquí?**
- Revisión de literatura sobre ML aplicado a energía
- Tipos de algoritmos más utilizados
- Ventajas y limitaciones de cada enfoque
- Casos de éxito en otros países

### 3.3 Modelos de Series Temporales

**¿Qué incluir aquí?**
- Fundamentos teóricos de ARIMA/SARIMA
- Conceptos de estacionariedad y estacionalidad
- Aplicaciones en predicción energética

### 3.4 Modelos de Machine Learning

**¿Qué incluir aquí?**
- Teoría detrás de Random Forest, XGBoost
- Redes neuronales recurrentes (LSTM, GRU)
- Métricas de evaluación para regresión

---

## 4. Metodología

### 4.1 Fuentes de Datos

**¿Qué incluir aquí?**
- Descripción detallada de cada fuente de datos
- Proceso de recolección de información
- Período temporal cubierto
- Frecuencia de los datos (diaria, horaria)
- Limitaciones de las fuentes

Los datos fueros sacados de las publicaciones diarias del SEN en el canal de cubadebate
En el proceso de recopilacion de la informacion se hizo un sraper que entraba a los titulos donde se mencionan las formas que se ve como se habla de la empresa electrica 
y cada informe diario se paso por un llm con una api key de firework.ai, para extraer en formato json estructurado la informacion que brinda el reporte diario
Los datos fueron escogidos desde septiembre del 2021 hasta la actualidad teniendo en cuenta que fue este el tiempo en que comenzaron los apagones,
los datos se extraen por dia
Tener en cuenta que faltan dias dentro de la base de datos cullos titulos estamos buscando para asegurarnos que el scraper lo esta detectando e incluyendo a la base de datos

### 4.2 Descripción de Variables

**¿Qué incluir aquí?**
- Tabla con todas las variables utilizadas
- Tipo de dato de cada variable
- Justificación de por qué cada variable es relevante
- Variables objetivo vs variables predictoras

### 4.3 Preprocesamiento de Datos

**¿Qué incluir aquí?**
- Pasos de limpieza aplicados
- Tratamiento de valores faltantes
- Detección y manejo de outliers
- Normalización/estandarización
- Creación de variables derivadas (lag, rolling averages)

### 4.4 División de Datos

**¿Qué incluir aquí?**
- Estrategia de división train/validation/test
- Justificación del porcentaje de división
- Consideraciones temporales (no mezclar períodos)

### 4.5 Selección de Modelos

**¿Qué incluir aquí?**
- Criterios para selección de algoritmos
- Justificación de cada modelo elegido
- Configuración inicial de hiperparámetros

---

## 5. Análisis de Datos

### 5.1 Análisis Exploratorio

**¿Qué incluir aquí?**
- Estadísticas descriptivas de las variables principales
- Gráficos de distribución del consumo energético
- Análisis de tendencias temporales
- Identificación de patrones estacionales
- Correlaciones entre variables



### 5.2 Patrones de Consumo Identificados

**¿Qué incluir aquí?**
- Patrones diarios (horas pico)
- Patrones semanales (días laborables vs fines de semana)
- Patrones estacionales (meses de mayor/menor consumo)
- Efectos de días festivos
- Relación con variables climáticas

### 5.3 Calidad de los Datos

**¿Qué incluir aquí?**
- Porcentaje de datos faltantes por variable
- Identificación de anomalías o valores atípicos
- Consistencia temporal de los datos
- Limitaciones encontradas

---

## 6. Implementación de Modelos

### 6.1 Modelos de Series Temporales

#### 6.1.1 ARIMA/SARIMA
**¿Qué incluir aquí?**
- Proceso de identificación del modelo (p,d,q)
- Tests de estacionariedad aplicados
- Configuración final del modelo
- Diagnóstico de residuos

#### 6.1.2 Exponential Smoothing
**¿Qué incluir aquí?**
- Selección de componentes (tendencia, estacionalidad)
- Parámetros de suavizado utilizados

### 6.2 Modelos de Machine Learning

#### 6.2.1 Random Forest
**¿Qué incluir aquí?**
- Número de árboles y profundidad máxima
- Importancia de características
- Proceso de optimización de hiperparámetros

#### 6.2.2 XGBoost/LightGBM
**¿Qué incluir aquí?**
- Configuración de parámetros de boosting
- Estrategias de regularización
- Curvas de aprendizaje

### 6.3 Modelos de Deep Learning

#### 6.3.1 LSTM/GRU
**¿Qué incluir aquí?**
- Arquitectura de la red neuronal
- Número de capas y neuronas
- Función de pérdida y optimizador
- Estrategias para evitar overfitting

### 6.4 Optimización de Hiperparámetros

**¿Qué incluir aquí?**
- Métodos utilizados (Grid Search, Random Search, Bayesian)
- Rangos de búsqueda para cada parámetro
- Validación cruzada temporal aplicada
- Mejores configuraciones encontradas

---

## 7. Resultados y Evaluación

### 7.1 Métricas de Evaluación

**¿Qué incluir aquí?**
- Definición de cada métrica utilizada (MAE, RMSE, MAPE, R²)
- Justificación de por qué son apropiadas
- Interpretación práctica de cada métrica

### 7.2 Rendimiento Individual de Modelos

**¿Qué incluir aquí?**
- Tabla comparativa con todas las métricas
- Gráficos de predicciones vs valores reales
- Análisis de residuos para cada modelo
- Tiempo de entrenamiento y predicción

### 7.3 Comparación de Modelos

**¿Qué incluir aquí?**
- Ranking de modelos por rendimiento
- Análisis estadístico de diferencias
- Gráficos de comparación visual
- Fortalezas y debilidades de cada enfoque

### 7.4 Análisis de Errores

**¿Qué incluir aquí?**
- Distribución de errores de predicción
- Patrones en los errores (¿cuándo fallan más?)
- Análisis de casos extremos
- Relación entre errores y variables explicativas

### 7.5 Interpretabilidad

**¿Qué incluir aquí?**
- Importancia de características en modelos ML
- Análisis de contribuciones individuales
- Interpretación de patrones aprendidos
- Validación con conocimiento experto

---

## 8. Discusión

### 8.1 Interpretación de Resultados

**¿Qué incluir aquí?**
- Explicación de por qué ciertos modelos funcionan mejor
- Relación entre resultados y teoría
- Comparación con estudios similares
- Implicaciones prácticas de los hallazgos

### 8.2 Factores Críticos Identificados

**¿Qué incluir aquí?**
- Variables más importantes para la predicción
- Períodos más difíciles de predecir
- Efectos de eventos especiales
- Sensibilidad a cambios en los datos

### 8.3 Validación Práctica

**¿Qué incluir aquí?**
- Simulación de uso en tiempo real
- Robustez ante cambios en patrones
- Requisitos para implementación operativa

---

## 9. Conclusiones

**¿Qué incluir aquí?**
- Respuesta directa a cada objetivo planteado
- Modelo óptimo identificado y su rendimiento
- Principales patrones descubiertos en el consumo
- Contribución del proyecto al conocimiento
- Validación de hipótesis iniciales
- Resumen de lecciones aprendidas

---

## 10. Recomendaciones

### 10.1 Para la Implementación

**¿Qué incluir aquí?**
- Pasos para poner el modelo en producción
- Recursos técnicos necesarios
- Frecuencia de actualización recomendada
- Proceso de monitoreo continuo

### 10.2 Para el Sistema Eléctrico

**¿Qué incluir aquí?**
- Cómo usar las predicciones para planificación
- Integración con sistemas existentes
- Beneficios esperados en eficiencia
- Reducción de costos operativos

### 10.3 Para Políticas Energéticas

**¿Qué incluir aquí?**
- Insights para toma de decisiones gubernamentales
- Identificación de oportunidades de ahorro
- Estrategias de gestión de demanda
- Prioridades de inversión en infraestructura

---

## 11. Limitaciones y Trabajo Futuro

### 11.1 Limitaciones del Estudio

**¿Qué incluir aquí?**
- Limitaciones de los datos utilizados
- Supuestos realizados en el modelado
- Alcance geográfico y temporal
- Factores no considerados

### 11.2 Trabajo Futuro

**¿Qué incluir aquí?**
- Mejoras potenciales en los modelos
- Datos adicionales que se podrían incorporar
- Extensión a predicción por regiones
- Desarrollo de modelos en tiempo real
- Integración con pronósticos económicos

---

## 12. Referencias

**¿Qué incluir aquí?**
- Artículos científicos consultados
- Fuentes de datos utilizadas
- Documentación técnica de librerías
- Informes gubernamentales sobre energía
- Estudios similares en otros países

*Usar formato académico (APA, IEEE, etc.) consistente*

---

## 13. Anexos

### Anexo A: Código Fuente Principal
*Enlaces a repositorio GitHub con código comentado*

### Anexo B: Datos Estadísticos Detallados
*Tablas completas de resultados y métricas*

### Anexo C: Gráficos Adicionales
*Visualizaciones complementarias no incluidas en el cuerpo principal*

### Anexo D: Configuración de Modelos
*Hiperparámetros finales de todos los modelos*

### Anexo E: Validación Estadística
*Tests estadísticos de significancia entre modelos*

---

**Notas para la Redacción:**

1. **Extensión recomendada**: 40-60 páginas total
2. **Figuras y tablas**: Numeradas y referenciadas en el texto
3. **Estilo**: Académico pero accesible, evitar jerga excesiva
4. **Evidencia**: Cada afirmación debe estar respaldada por datos o referencias
5. **Consistencia**: Usar terminología uniforme a lo largo del documento
6. **Visualizaciones**: Incluir gráficos claros y profesionales en cada sección relevante

**Binliografia**
- Exploración de la predicción de series temporales del consumo de energía mediante XGBoost y validación cruzada [Ehsan Nabatchian,10 de enero de 2024]
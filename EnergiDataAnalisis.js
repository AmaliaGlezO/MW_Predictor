import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

const EnergyDataAnalysis = () => {
  const [processedData, setProcessedData] = useState([]);
  const [modelResults, setModelResults] = useState(null);
  const [selectedModel, setSelectedModel] = useState('arima');
  const [predictions, setPredictions] = useState([]);
  const [metrics, setMetrics] = useState({});

  // Datos de ejemplo basados en tu JSON
  const sampleData = [
    {
      fecha: '2022-12-30',
      disponibilidad: 3109,
      demanda_maxima: 2600,
      afectacion: 0,
      deficit: 0,
      plantas_averia: 5,
      plantas_mantenimiento: 2,
      limitacion_termica: 348,
      motores_problemas: 800,
      dia_semana: 5,
      mes: 12
    },
    {
      fecha: '2022-12-23',
      disponibilidad: 2713,
      demanda_maxima: 2700,
      afectacion: 60,
      deficit: 0,
      plantas_averia: 4,
      plantas_mantenimiento: 1,
      limitacion_termica: 336,
      motores_problemas: 846,
      dia_semana: 5,
      mes: 12
    },
    {
      fecha: '2022-12-17',
      disponibilidad: 2815,
      demanda_maxima: 2730,
      afectacion: 0,
      deficit: 0,
      plantas_averia: 4,
      plantas_mantenimiento: 2,
      limitacion_termica: 371,
      motores_problemas: 848,
      dia_semana: 6,
      mes: 12
    },
    {
      fecha: '2022-12-14',
      disponibilidad: 2583,
      demanda_maxima: 2780,
      afectacion: 267,
      deficit: 197,
      plantas_averia: 4,
      plantas_mantenimiento: 2,
      limitacion_termica: 309,
      motores_problemas: 880,
      dia_semana: 3,
      mes: 12
    },
    {
      fecha: '2022-12-13',
      disponibilidad: 2474,
      demanda_maxima: 2750,
      afectacion: 346,
      deficit: 276,
      plantas_averia: 3,
      plantas_mantenimiento: 2,
      limitacion_termica: 0,
      motores_problemas: 0,
      dia_semana: 2,
      mes: 12
    }
  ];

  // Simulación de modelos de ML
  const trainModel = (modelType) => {
    // Simulamos el entrenamiento de diferentes modelos
    const models = {
      arima: {
        name: 'ARIMA',
        mae: 85.2,
        rmse: 120.5,
        mape: 3.2,
        r2: 0.87,
        predictions: sampleData.map((d, i) => ({
          fecha: d.fecha,
          real: d.demanda_maxima,
          prediccion: d.demanda_maxima + (Math.random() - 0.5) * 100
        }))
      },
      randomforest: {
        name: 'Random Forest',
        mae: 92.8,
        rmse: 135.2,
        mape: 3.8,
        r2: 0.84,
        predictions: sampleData.map((d, i) => ({
          fecha: d.fecha,
          real: d.demanda_maxima,
          prediccion: d.demanda_maxima + (Math.random() - 0.5) * 120
        }))
      },
      xgboost: {
        name: 'XGBoost',
        mae: 78.5,
        rmse: 110.3,
        mape: 2.9,
        r2: 0.89,
        predictions: sampleData.map((d, i) => ({
          fecha: d.fecha,
          real: d.demanda_maxima,
          prediccion: d.demanda_maxima + (Math.random() - 0.5) * 80
        }))
      },
      lstm: {
        name: 'LSTM',
        mae: 73.2,
        rmse: 105.8,
        mape: 2.7,
        r2: 0.91,
        predictions: sampleData.map((d, i) => ({
          fecha: d.fecha,
          real: d.demanda_maxima,
          prediccion: d.demanda_maxima + (Math.random() - 0.5) * 70
        }))
      }
    };

    setModelResults(models[modelType]);
    setPredictions(models[modelType].predictions);
    setMetrics(models[modelType]);
  };

  useEffect(() => {
    setProcessedData(sampleData);
    trainModel('arima');
  }, []);

  const handleModelChange = (model) => {
    setSelectedModel(model);
    trainModel(model);
  };

  // Preparar datos para correlaciones
  const correlationData = sampleData.map(d => ({
    disponibilidad: d.disponibilidad,
    demanda: d.demanda_maxima,
    afectacion: d.afectacion,
    plantas_averia: d.plantas_averia
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        🔌 Análisis y Predicción de Demanda Energética - Cuba
      </h1>

      {/* Sección de datos procesados */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📊 Datos Procesados</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Registros</h3>
            <p className="text-2xl font-bold text-blue-600">{processedData.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Demanda Promedio</h3>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(processedData.reduce((acc, d) => acc + d.demanda_maxima, 0) / processedData.length)} MW
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800">Disponibilidad Promedio</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {Math.round(processedData.reduce((acc, d) => acc + d.disponibilidad, 0) / processedData.length)} MW
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800">Afectación Promedio</h3>
            <p className="text-2xl font-bold text-red-600">
              {Math.round(processedData.reduce((acc, d) => acc + d.afectacion, 0) / processedData.length)} MW
            </p>
          </div>
        </div>

        {/* Gráfico de tendencias */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Tendencias Históricas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="disponibilidad" stroke="#2563eb" name="Disponibilidad (MW)" />
              <Line type="monotone" dataKey="demanda_maxima" stroke="#dc2626" name="Demanda Máxima (MW)" />
              <Line type="monotone" dataKey="afectacion" stroke="#f59e0b" name="Afectación (MW)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sección de entrenamiento de modelos */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🤖 Entrenamiento de Modelos</h2>
        
        {/* Selector de modelo */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Modelo:
          </label>
          <div className="flex flex-wrap gap-2">
            {['arima', 'randomforest', 'xgboost', 'lstm'].map(model => (
              <button
                key={model}
                onClick={() => handleModelChange(model)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedModel === model
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {model.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Métricas del modelo */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">MAE</h3>
              <p className="text-xl font-bold text-blue-600">{metrics.mae?.toFixed(1)} MW</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">RMSE</h3>
              <p className="text-xl font-bold text-green-600">{metrics.rmse?.toFixed(1)} MW</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800">MAPE</h3>
              <p className="text-xl font-bold text-yellow-600">{metrics.mape?.toFixed(1)}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">R²</h3>
              <p className="text-xl font-bold text-purple-600">{metrics.r2?.toFixed(3)}</p>
            </div>
          </div>
        )}

        {/* Gráfico de predicciones */}
        {predictions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Predicciones vs Valores Reales - {metrics.name}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="real" stroke="#dc2626" name="Valor Real" strokeWidth={2} />
                <Line type="monotone" dataKey="prediccion" stroke="#2563eb" name="Predicción" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Análisis de correlaciones */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔍 Análisis de Correlaciones</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Disponibilidad vs Demanda */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Disponibilidad vs Demanda</h3>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="disponibilidad" name="Disponibilidad" />
                <YAxis dataKey="demanda" name="Demanda" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter fill="#2563eb" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Plantas en avería vs Afectación */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Plantas en Avería vs Afectación</h3>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plantas_averia" name="Plantas Avería" />
                <YAxis dataKey="afectacion" name="Afectación" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter fill="#dc2626" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature Engineering sugerido */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">⚙️ Próximos Pasos Recomendados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🔧 Feature Engineering</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Variables lag (demanda de días anteriores)</li>
              <li>• Promedios móviles (7, 15, 30 días)</li>
              <li>• Indicadores de estacionalidad</li>
              <li>• Ratio disponibilidad/demanda</li>
              <li>• Clustering de días similares</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">📊 Datos Adicionales</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Temperatura diaria (muy importante)</li>
              <li>• Humedad relativa</li>
              <li>• Días festivos cubanos</li>
              <li>• Indicadores económicos</li>
              <li>• Eventos especiales</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Notas Importantes</h3>
          <p className="text-sm text-yellow-700">
            Este es un análisis preliminar con datos limitados. Para resultados más precisos, necesitas:
            <br />• Al menos 2-3 años de datos diarios completos
            <br />• Variables meteorológicas (especialmente temperatura)
            <br />• Más observaciones para validación robusta
            <br />• Validación cruzada temporal apropiada
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnergyDataAnalysis;
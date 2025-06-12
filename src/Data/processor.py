import json
import pandas as pd
from datetime import datetime
import os

def preprocess_energy_data(input_path="data/raw/datos_electricos_organizados.json",
                           output_path="data/raw/cleaned_energy_data.csv"):
    
    # Verificar existencia del archivo
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"No se encontró el archivo en: {input_path}")

    # Cargar datos
    try:
        with open(input_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        raise ValueError(f"Error al leer el archivo JSON: {e}")

    registros = []

    for año in data:
        for mes in data[año]:
            for dia in data[año][mes]:
                try:
                    datos = dia["datos"]
                    fecha = datetime.strptime(dia["fecha"], "%Y-%m-%d %H:%M:%S")

                    registro = {
                        "fecha": fecha,
                        "año": fecha.year,
                        "mes": fecha.month,
                        "dia": fecha.day,
                        "dia_semana": fecha.weekday(),
                        "es_fin_semana": int(fecha.weekday() >= 5),
                        "demanda_maxima": datos["prediccion"].get("demanda_maxima"),
                        "disponibilidad_total": datos["prediccion"].get("disponibilidad"),
                        "afectacion_predicha": datos["prediccion"].get("afectacion"),
                        "deficit_predicho": datos["prediccion"].get("deficit"),
                        "respaldo": datos["prediccion"].get("respaldo"),
                        "disponibilidad_07am": datos["info_matutina"].get("disponibilidad"),
                        "demanda_07am": datos["info_matutina"].get("demanda"),
                        "plantas_averiadas": len(datos["plantas"].get("averia", [])),
                        "plantas_mantenimiento": len(datos["plantas"].get("mantenimiento", [])),
                        "mw_limitacion_termica": datos["plantas"]["limitacion_termica"].get("mw_afectados"),
                        "mw_motores_problemas": datos["distribuida"]["motores_con_problemas"].get("impacto_mw"),
                        "horas_afectacion": datos["impacto"].get("horas_totales"),
                        "max_afectacion_mw": datos["impacto"]["maximo"].get("mw")
                    }

                    registros.append(registro)

                except Exception as e:
                    print(f"Error procesando un día: {e}")
                    continue

    df = pd.DataFrame(registros)

    # Limpieza básica
    df["horas_afectacion"] = pd.to_numeric(df["horas_afectacion"], errors="coerce")
    df["respaldo"] = pd.to_numeric(df["respaldo"].astype(str).str.extract(r"(\d+)")[0], errors="coerce")

    # Guardar CSV en data/raw
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"✅ Datos procesados guardados en: {output_path}")

    return df

if __name__ == "__main__":
    # Esto se ejecutará solo cuando el script sea llamado directamente
    preprocess_energy_data()
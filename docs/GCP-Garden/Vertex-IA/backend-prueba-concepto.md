---
sidebar_position: 1
---

# [Guía] Microservicio Python para Chatbot El Salvador

:::info
Esta es la documentación de una API creada con FastAPI en Python que interactúa con Dialogflow CX para detectar intenciones a partir de texto.

El propósito de este microservicio es proporcionar los datos de la prueba de concepto "Chatbot El Salvador".
:::

## Requisitos previos

Antes de ejecutar esta API, asegúrate de tener:

1. Python 3.8 o superior.
2. Un proyecto configurado en Dialogflow CX.
3. Un archivo de credenciales de Google Cloud en formato JSON.
4. Instaladas las dependencias necesarias.

## Instalación

Para instalar las dependencias necesarias, ejecuta:

```bash
pip install fastapi uvicorn google-cloud-dialogflow-cx pydantic
```

## Configuración

Asegúrate de definir la variable de entorno para las credenciales de Google:

```bash
set GOOGLE_APPLICATION_CREDENTIALS=e:\google\Backend\dialogflow-credentials.json
```

## Ejecutar el servidor

Para iniciar el servidor en modo desarrollo:

```bash
python main.py
```

## Endpoints

### 1. Detectar intención con Dialogflow CX

*POST /dialogflow/detect-intent*

*Cuerpo de la petición:*

```json
{
  "text": "Hola, ¿cómo estás?",
  "project_id": "tu-proyecto-id",
  "location_id": "us-central1",
  "agent_id": "tu-agente-id",
  "language_code": "es"
}
```

*Respuesta:*

```json
{
  "responses": [
    {
      "text": "Hola, ¿en qué puedo ayudarte?",
      "response_type": "ENTRY_PROMPT"
    }
  ]
}
```

## Middleware CORS

Para permitir solicitudes desde el frontend, se ha configurado CORS:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Documentación automática

FastAPI proporciona documentación automática en:
- [Swagger UI](http://127.0.0.1:8000/docs)
- [Redoc](http://127.0.0.1:8000/redoc)

## Notas finales

Esta API permite enviar mensajes a Dialogflow CX y recibir respuestas procesadas en un formato estructurado. Se puede mejorar agregando autenticación, manejo avanzado de sesiones y soporte para más tipos de respuesta.


### Referencias

[▶ Ver código](https://gitlab.egob.sv/gcp/vertex-ia/api-vertex-ia/Backend-vertex-IA-Python)
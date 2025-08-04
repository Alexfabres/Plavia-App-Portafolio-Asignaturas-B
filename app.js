// aplicacion.js
// Referencias a elementos del DOM
const aiForm = document.getElementById('ai-form');
const userPromptInput = document.getElementById('user-prompt');
const aiResponseEl = document.getElementById('ai-response');

// -----------------------------------------------------------------------------------
// PASO CLAVE: Reemplaza estas dos líneas con la información de tu API
// -----------------------------------------------------------------------------------
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = "# To run this code you need to install the following dependencies:
# pip install google-genai

import base64
import os
from google import genai
from google.genai import types


def generate():
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    model = "gemini-2.5-flash-lite"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""INSERT_INPUT_HERE"""),
            ],
        ),
    ]
    tools = [
        types.Tool(googleSearch=types.GoogleSearch(
        )),
    ]
    generate_content_config = types.GenerateContentConfig(
        thinking_config = types.ThinkingConfig(
            thinking_budget=0,
        ),
        tools=tools,
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        print(chunk.text, end="")

if __name__ == "__main__":
    generate()
";   
// Reemplaza "curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: GEMINI_API_KEY' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'" con tu clave de API real (una cadena de letras y números)
// Por seguridad, asegúrate de que no haya comillas extra o caracteres incorrectos.
// -----------------------------------------------------------------------------------


// Función para llamar a la API de AI Studio
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userPrompt = userPromptInput.value;
    aiResponseEl.innerText = 'Generando respuesta...';

    try {
        const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: { text: userPrompt }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error de la API: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            aiResponseEl.innerText = data.candidates[0].content.parts[0].text;
        } else {
            aiResponseEl.innerText = 'No se pudo obtener una respuesta válida.';
        }

    } catch (error) {
        console.error("Error al generar respuesta:", error);
        aiResponseEl.innerText = `Ocurrió un error. Detalles: ${error.message}. Inténtalo de nuevo.`;
    }
});
// app.js
// Referencias a elementos del DOM
const aiForm = document.getElementById('ai-form');
const userPromptInput = document.getElementById('user-prompt');
const aiResponseEl = document.getElementById('ai-response');

// Reemplaza estas variables con la información de tu API
const API_ENDPOINT = "TU_URL_DE_API_DE_AI_STUDIO"; // Pega aquí la URL del endpoint
const API_KEY = "TU_CLAVE_DE_API_DE_AI_STUDIO";   // Pega aquí la clave de API

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

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            aiResponseEl.innerText = data.candidates[0].content.parts[0].text;
        } else {
            aiResponseEl.innerText = 'No se pudo obtener una respuesta válida.';
        }

    } catch (error) {
        console.error("Error al generar respuesta:", error);
        aiResponseEl.innerText = 'Ocurrió un error. Inténtalo de nuevo.';
    }
});

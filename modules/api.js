/**
 * @file api.js
 * @description This module contains functions for API interaction.
 */

/**
 * Authenticates the user with the API.
 * @param {string} apiUrl - The URL of the API.
 * @param {string} dni - The DNI input.
 * @param {string} password - The password input.
 * @returns {Promise<object|null>} - The user data if the authentication is successful, null otherwise.
 */
export async function authenticateUser(apiUrl, dni, password) {
    try {
        console.log(`[API] Fetching data from ${apiUrl}`);
        const response = await fetch(apiUrl);
        console.log(`[API] Response received - Status: ${response.status}`);

        if (!response.ok) {
            let errorDetails = `Error ${response.status}: ${response.statusText}`;
            try { const errorText = await response.text(); errorDetails += ` - ${errorText}`; } catch (e) {}
            throw new Error(errorDetails);
        }

        const datosUsuarios = await response.json();
        console.log("[API] All users:", datosUsuarios); // Log all users
        console.log(`[API] Data received, searching for user with DNI: ${dni}`);

        const usuarioEncontrado = datosUsuarios.find(user => {
            const dniEncontrado = String(user['DNI'] || '').trim();
            const passwordEncontrado = String(user['contraseña'] || '');
            console.log(`[API] Comparing DNI: ${dni} with ${dniEncontrado} and Password with ${passwordEncontrado}`); // Log comparison
            return dniEncontrado === dni && passwordEncontrado === password;
        });

        if (usuarioEncontrado) {
            console.log("[API] User found:", usuarioEncontrado);
            return {
                dni: String(usuarioEncontrado['DNI'] || '').trim(),
                nombre: String(usuarioEncontrado['Nombre'] || '').trim(),
                rol: String(usuarioEncontrado['Rol'] || '').trim().toLowerCase()
            };
        } else {
            console.warn("[API] Incorrect DNI or password.");
            return null;
        }
    } catch (error) {
        console.error("[API] Error during API process:", error);
        throw error;
    }
}
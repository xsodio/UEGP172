/**
 * @file auth.js
 * @description This module contains functions for authentication logic.
 */

/**
 * Redirects the user based on their role.
 * @param {string} rol - The user's role.
 * @param {string} panelUrl - The URL of the panel page.
 * @param {string} perfilUrl - The URL of the profile page.
 */
export function redirectUser(rol, panelUrl, perfilUrl) {
    let urlRedireccion = panelUrl;
    if (rol === 'profesor') {
        urlRedireccion = perfilUrl;
        console.log(`[Auth] Role 'profesor', redirecting to: ${urlRedireccion}`);
    } else {
        console.log(`[Auth] Role '${rol || 'unknown'}', redirecting to default panel: ${urlRedireccion}`);
    }

    setTimeout(() => {
        window.location.href = urlRedireccion;
    }, 1000);
}
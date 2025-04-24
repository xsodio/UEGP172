/**
 * @file validation.js
 * @description This module contains functions for form validation.
 */

/**
 * Validates the form inputs.
 * @param {string} dni - The DNI input.
 * @param {string} password - The password input.
 * @param {HTMLElement} resultadoDiv - The element to display error messages in.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
export function validateForm(dni, password, resultadoDiv) {
    if (!dni || !password) {
        console.warn("[Validation] Incomplete fields.");
        displayMessage('error', 'Please complete all fields.', resultadoDiv);
        return false;
    }
    return true;
}
/**
 * @file dom.js
 * @description This module contains functions for DOM manipulation.
 */

/**
 * Displays a message in the specified element.
 * @param {string} type - The type of message (error, loading, success).
 * @param {string} message - The message to display.
 * @param {HTMLElement} element - The element to display the message in.
 */
export function displayMessage(type, message, element) {
    console.log(`[Message - ${type.toUpperCase()}] ${message}`);
    const typeClass = type === 'error' ? 'error-message' : (type === 'loading' ? 'loading-message' : 'success-message');
    element.innerHTML = `<div class="status-message ${typeClass}">${message}</div>`;
}

/**
 * Clears the message in the specified element.
 * @param {HTMLElement} element - The element to clear the message in.
 */
export function clearMessage(element) {
    element.innerHTML = '';
}
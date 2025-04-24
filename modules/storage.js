/**
 * @file storage.js
 * @description This module contains functions for local storage management.
 */

export const manageLocalStorage = {
    /**
     * Sets the user data in local storage.
     * @param {string} dni - The user's DNI.
     * @param {string} nombre - The user's name.
     * @param {string} rol - The user's role.
     */
    setUser: function (dni, nombre, rol) {
        localStorage.setItem("dni", dni);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("rol", rol);
        console.log("[Storage] User data stored in localStorage (excluding password):", { dni: dni, nombre: nombre, rol: rol });
    },

    /**
     * Gets the user data from local storage.
     * @returns {object} - The user data.
     */
    getUser: function () {
        return {
            dni: localStorage.getItem("dni"),
            nombre: localStorage.getItem("nombre"),
            rol: localStorage.getItem("rol")
        };
    },

    /**
     * Clears the user data from local storage.
     */
    clearUser: function () {
        localStorage.removeItem("dni");
        localStorage.removeItem("nombre");
        localStorage.removeItem("rol");
        console.log("[Storage] User data cleared from localStorage.");
    }
};
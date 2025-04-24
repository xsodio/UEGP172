# Login Page

This is a login page for the EET UEGP N°172 Deolindo F. Bittel.

## Setup

1.  Ensure you have a web server running.
2.  Place all files in the root directory of your web server.
3.  Ensure that the `/api/proxy-gas` endpoint is correctly configured to return an array of user objects with `DNI`, `contraseña`, `Nombre`, and `Rol` properties. The `Rol` property can be "profesor" or any other value.
4.  Ensure that the `/video.mp4` and `/logo.png` files are present in the root directory.

## Security

*   This login page uses client-side validation and sanitization to prevent basic XSS attacks. However, server-side validation and sanitization are essential for security.
*   It's crucial to use HTTPS for all communication to prevent man-in-the-middle attacks.
*   Passwords should never be stored in local storage and must be hashed and salted on the server-side.

## Testing

The JavaScript modules can be unit tested using a testing framework such as Jest or Mocha. The following tests should be performed:

*   **dom.js:** Tests to ensure that `displayMessage` and `clearMessage` function correctly, showing and hiding messages in the DOM as expected.
*   **validation.js:** Tests to verify that `validateForm` detects correctly empty fields and returns `true` only when all fields are complete.
*   **api.js:** Mock the `fetch` function to simulate different responses from the server (success, error, user not found) and ensure that `authenticateUser` handles each case correctly.
*   **auth.js:** Mock `window.location.href` to verify that `redirectUser` redirects to the correct URL based on the user's role.
*   **sound.js:** Mock the audio element to ensure that `playSound` attempts to play the sound and handles playback errors.
*   **storage.js:** Tests to ensure that `setUser`, `getUser` and `clearUser` store, retrieve and delete correctly user data from local storage.
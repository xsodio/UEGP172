/**
 * @file script.js
 * @description Script principal para la página de login.
 */

// Confirmar carga del script
console.log('[script.js] 🟢 Script cargado y ejecutándose');

import { displayMessage, clearMessage } from './modules/dom.js';
import { validateForm } from './modules/validation.js';
import { authenticateUser } from './modules/api.js';
import { redirectUser } from './modules/auth.js';
import { playSound } from './modules/sound.js';
import { manageLocalStorage } from './modules/storage.js';

// --- CONFIGURACIÓN ---
const config = {
  GAS_URL: '/.netlify/functions/proxy-gas',   // Ajusta la ruta si es necesario
  PANEL_URL: 'docente.html',
  PERFIL_URL: 'perfil.html'
};
const { GAS_URL, PANEL_URL, PERFIL_URL } = config;

// --- ELEMENTOS DEL DOM ---
const loginForm         = document.getElementById('loginForm');
const dniInput          = document.getElementById('dni');
const passwordInput     = document.getElementById('password');
const submitButton      = document.getElementById('submitButton');
const resultadoDiv      = document.getElementById('resultado');
const capsLockIndicator = document.getElementById('capsLockIndicator');
const loginSound        = document.getElementById('loginSound');
const playAudioButton   = document.getElementById('playAudioButton');

/**
 * Sanitiza un input básico para evitar inyección de etiquetas.
 * @param {string} input 
 * @returns {string}
 */
function sanitize(input) {
  return input
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>');
}

function showStatus(type, msg) {
  // Asumo que clearMessage y displayMessage están en ./modules/dom.js
  import('./modules/dom.js').then(({ clearMessage, displayMessage }) => {
    clearMessage(resultadoDiv);
    displayMessage(resultadoDiv, type, msg);
  });
}

// --- EVENTOS ---
passwordInput.addEventListener('keyup', e => {
  capsLockIndicator.classList.toggle('hidden', !e.getModifierState('CapsLock'));
});

playAudioButton.addEventListener('click', () => {
  import('./modules/sound.js').then(({ playSound }) => {
    playSound(loginSound);
  });
});

loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  console.log('[Login] 🔍 Intento de inicio de sesión');

  // Leer y sanitizar
  const rawDni  = dniInput.value.trim();
  const rawPass = passwordInput.value;
  const dni     = sanitize(rawDni);
  const pass    = sanitize(rawPass);

  console.log(`    • DNI ingresado: "${dni}"`);
  console.log(`    • Contraseña:   "${pass}"`);

  // Validaciones
  if (!dni || !pass) {
    console.warn('[Login] ❗ Campos vacíos');
    showStatus('error', 'Por favor completa ambos campos');
    return;
  }
  if (!/^\d+$/.test(rawDni)) {
    console.warn('[Login] ❗ DNI no numérico');
    showStatus('error', 'El DNI sólo debe contener números');
    return;
  }

  showStatus('loading', 'Verificando credenciales...');

  try {
   console.log(`[Login] 👉 Fetch ${GAS_URL}`);
   const res = await fetch(GAS_URL, { cache: 'no-cache' });
   console.log(`[Login] ← Status ${res.status} ${res.statusText}`);
   const txt = await res.text();
   console.log('[Login] Raw response:', txt);

   let users;
   try {
     users = JSON.parse(txt);
     console.log('[Login] 🎉 JSON parseado:', users);
   } catch (err) {
     throw new Error('Respuesta no es JSON válido');
   }

   // Informe de validos
   const dnis = users.map(u => String(u.DNI).trim());
   const pws = users.map(u => String(u.contraseña));
   console.log('🔐 DNIs válidos:', dnis);
   console.log('🔐 Claves válidas:', pws);

   users.forEach((u, i) => {
     const matchDni = String(u.DNI).trim() === dni;
     const matchPw = String(u.contraseña) === pass;
     console.log(`  Usuario[${i}]: DNI="${u.DNI}"→${matchDni}, pwd="${u.contraseña}"→${matchPw}`);
   });

   // Buscar usuario
   const found = users.find(u =>
     String(u.DNI).trim() === dni && String(u.contraseña) === pass
   );
   console.log('[Login] Resultado de find():', found);

   if (found) {
     showStatus('success', '¡Acceso concedido!');
     localStorage.setItem('dni', dni);
     localStorage.setItem('nombre', found.Nombre);

     const url = found.Rol.toLowerCase() === 'profesor' ? PERFIL_URL : PANEL_URL;
     console.log('[Login] Redirigiendo a', url);
     setTimeout(() => window.location.href = url, 800);
   } else {
     console.warn('[Login] ❌ Credenciales incorrectas');
     showStatus('error', 'DNI o contraseña incorrectos');
     submitButton.disabled = false;
   }

 } catch (err) {
   console.error('[Login] 💥 Error login:', err);
   showStatus('error', 'Error de conexión/servidor');
   submitButton.disabled = false;
 }
});

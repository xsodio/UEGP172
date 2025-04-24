// netlify/functions/auth.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
  try {
    // ----- 1. Leer credenciales -----
    let { dni, password, rol } = event.body
      ? JSON.parse(event.body)                           // POST con JSON
      : event.httpMethod === 'GET'
        ? event.queryStringParameters                    // GET ?dni=…&password=…
        : {};

    if (!dni || !password || !rol) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan credenciales' })
      };
    }

    // ----- 2. Consultar Airtable con tu función proxy -----
    // OJO: si ya usas proxy-airtable esta llamada se puede fusionar.
    const url = `${process.env.URL}/.netlify/functions/proxy-airtable?table=Usuarios`;
    const res = await fetch(url);
    const data = await res.json();          // [{ nombre, dni, contraseña, rol, monedas, … }]

    // ----- 3. Validar usuario -----
    const user = data.find(
      u => u.dni === dni && u.contraseña === password && u.rol === rol
    );

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Credenciales inválidas' })
      };
    }

    // ----- 4. Éxito -----
    return {
      statusCode: 200,
      body: JSON.stringify({
        nombre:   user.nombre,
        monedas:  user.monedas,
        mensaje: `Bienvenido ${user.nombre}`
      })
    };

  } catch (err) {
    // Errores de parseo, red, etc.
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

// build bump 2025-04-24 - 3

exports.handler = async (event) => {
  try {
    // Si no hay body o viene vacío, lo convertimos en un objeto vacío
    const body = event.body ? JSON.parse(event.body) : {};

    /* ----- tu lógica de autenticación ----- */
    // const { dni, password, rol } = body;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    // Si el body no es un JSON válido, devolver un error 400 con el mensaje
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format" })
    };
  }
};

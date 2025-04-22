exports.handler = async (event) => {
  const { dni, password } = JSON.parse(event.body);
  
  try {
    const response = await fetch(process.env.GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ dni, password })
    });
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error en el servidor" }) };
  }
};
export async function handler(event, context) {
  const url = 'https://script.google.com/macros/s/AKfycbyp5MjUCeMLY6i2LTcfFLFnWCWl3mi1AJojfaJjO1tZGLOFFSnBhqKXbgcTuJEC3eUqbg/exec';

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',  // 🔥 CORS LIBERADO
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
}

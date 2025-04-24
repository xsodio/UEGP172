const fetch = require('node-fetch');

exports.handler = async () => {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyp5MjUCeMLY6i2LTcfFLFnWCWl3mi1AJojfaJjO1tZGLOFFSnBhqKXbgcTuJEC3eUqbg/exec');
  const body = await res.json();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};
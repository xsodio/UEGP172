const Airtable = require('airtable');

const ALLOWED_TABLES = ['Usuarios'];

exports.handler = async (event) => {
  const tableName = event.queryStringParameters?.table;

  if (!ALLOWED_TABLES.includes(tableName)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Tabla no permitida: ${tableName}` })
    };
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Airtable API key or base ID' })
    };
  }

  const base = new Airtable({ apiKey }).base(baseId);

  try {
    const records = await base(tableName).select().all();
    const data = records.map(record => ({
      id: record.id,
      ...record.fields,
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from Airtable', details: error.message })
    };
  }
};
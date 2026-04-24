const { MercadoPagoConfig, Preference } = require('mercadopago');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.status(500).json({ error: 'MP_ACCESS_TOKEN no configurado en Vercel' });

  const { titulo, precio, email, metadata } = req.body;
  if (!titulo || !precio || !email) {
    return res.status(400).json({ error: 'Faltan campos: titulo, precio, email' });
  }

  try {
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const BASE_URL = process.env.BASE_URL || 'https://crealo.vercel.app';

    const result = await preference.create({
      body: {
        items: [{
          title: titulo,
          quantity: 1,
          unit_price: Number(precio),
          currency_id: 'ARS',
        }],
        payer: { email },
        back_urls: {
          success: `${BASE_URL}/gracias.html?status=aprobado`,
          failure: `${BASE_URL}/brief?status=error`,
          pending: `${BASE_URL}/gracias.html?status=pendiente`,
        },
        auto_return: 'approved',
        statement_descriptor: 'CREALO UGC',
        external_reference: email,
        metadata: metadata || {},
      },
    });

    return res.status(200).json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      id: result.id,
    });
  } catch (err) {
    console.error('MP Error:', err);
    return res.status(500).json({ error: err.message || 'Error al crear preferencia de pago' });
  }
};

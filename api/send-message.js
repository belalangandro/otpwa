const { Client } = require('whatsapp-web.js');

module.exports = async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    const client = new Client();
    await client.initialize();
    await client.sendMessage(`${phoneNumber}@c.us`, message);

    res.status(200).json({ success: true, message: 'Pesan berhasil dikirim' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengirim pesan', error: error.message });
  }
};

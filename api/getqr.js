const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

module.exports = async (req, res) => {
  try {
    const client = new Client();
    await client.initialize();
    const qrCode = await qrcode.toDataURL(client.qrCode);

    res.status(200).send(`<img src="${qrCode}" alt="QR Code" />`);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menghasilkan QR code' });
  }
};

const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const client = new Client();
app.use(express.json());

app.post('/send-message', (req, res) => {
  const { phoneNumber, message } = req.body;

  client.sendMessage(phoneNumber+'@c.us', message)
    .then(() => {
      res.status(200).json({ success: true, message: 'Pesan berhasil dikirim' });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: 'Gagal mengirim pesan', error: error.message });
    });
});

app.get('/getqr', (req, res) => {
  qrcode.toDataURL(client.qrCode, (err, url) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Gagal menghasilkan QR code' });
    } else {
      res.status(200).send(`<img src="${url}" alt="QR Code" />`);
    }
  });
});

client.on('qr', (qr) => {
  client.qrCode = qr;
});

client.on('ready', () => {
  console.log('Bot WhatsApp sudah terhubung');
});

client.initialize();

const listener = app.listen(process.env.PORT, () => {
  console.log('Server berjalan di http://localhost:' + listener.address().port);
});

const express = require('express');
const app = express();
const PORT = 6666;

app.get('/', (req, res) => {
  res.send('🚀 Hola! Esta es mi app Node en el puerto 6666');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor escuchando en http://0.0.0.0:${PORT}`);
});

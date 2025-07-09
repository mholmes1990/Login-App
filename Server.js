const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: { encrypt: true }
};

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email} AND Password = ${password}`;
    res.json({ success: result.recordset.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

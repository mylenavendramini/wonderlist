const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const router = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}.`)
})
const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;

const api = require('./routes/index');
const user = require('./routes/user/user');
const productions = require('./routes/productions/productions');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);
app.use('/api/user', user);
app.use('/api/productions', productions);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
})
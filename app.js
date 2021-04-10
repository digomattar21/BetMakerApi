require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./configs/db.config');

const index = require('./routes/index');
const auth = require('./routes/auth.routes');
const casino = require('./routes/casino.routes');
const user = require('./routes/user.routes');
const soccer = require('./routes/soccer.routes');
const sports = require('./routes/sports.routes');

//Rotas
app.use('/', index);

//Rotas publicas
app.use('/', auth);
app.use('/', soccer)
app.use('/', sports)

//Middleware validacao de token jwt
app.use(require('./middlewares/authmiddleware'));

//Rotas privadas
app.use('/', casino)
app.use('/', user)

app.listen(PORT, () => {
  console.log(`Server listening on the port: ${PORT}`);
});
module.exports = app;

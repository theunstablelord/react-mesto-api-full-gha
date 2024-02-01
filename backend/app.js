const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { createUser, login } = require('./controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

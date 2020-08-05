const express = require('express');
const path = require('path');
const upload = require('express-fileupload');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');

const uploadDir = path.join(__dirname, 'static/uploads');

const app = express();
const db = require('./models');

app.use(express.static('static'));

app.set('views', './views');
app.set('view engine', 'ejs');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload());
app.use(cookieParser());

// mount the api
app.use('/api', require('./api'));

// mount the other routes
app.use('/routes', require('./routes'));

app.use(errorMiddleware);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000/routes ...');
  });
});

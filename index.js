const mysql = require('mysql');
const express = require('express');
const bodyPareser = require('body-parser');
const controllerEmployee = require('./controllers/employees.js');
const controllerUsers = require('./controllers/users.js');
const auth = require('./middlewares/auth.js')();

var app = express();

app.use(bodyPareser.json());
app.use(auth.initialize());

app.use('/employees', controllerEmployee);
app.use('', controllerUsers);

app.listen(3000, () => {
  console.log('Express server is running at port no : 3000');
});


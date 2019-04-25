const fs = require('fs');

const path = require('path');

const express = require('express');

// imports the data functions
const data = require("./data")


//sets consts to use data from import above

const accounts = data.accounts
const users = data.users

//require routes

accountRoutes = require('./routes/accounts')

servicesRoutes = require('./routes/services')

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}))

app.use('/account', accountRoutes),

app.use('/services', servicesRoutes)

app.get('/', (req, res) => res.render('index', {title: "Account Summary", accounts: accounts}));


app.listen(3000, () => console.log('PS Project Running on Port 3000'));


const fs = require('fs');

const path = require('path');

const express = require('express');

const data = require("./data")

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}))

// const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');

const accounts = data.accounts

// const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');

const users = data.users

app.get('/', (req, res) => res.render('index', {title: "Account Summary", accounts: accounts}));

app.get('/savings', (req, res) => res.render('account', {title: "Account Summary", account: accounts.savings}));

app.get('/checking', (req, res) => res.render('account', {title: "Account Summary", account: accounts.checking}));

app.get('/credit', (req, res) => res.render('account', {title: "Account Summary", account: accounts.credit}));

app.get('/profile', (req, res) => res.render('profile', {user: users[0] }));

app.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));

app.post('/payment', (req, res) => {
    

    // removes the payment from your balance
    accounts.credit.balance -= req.body.amount;

    //gives you back your credit
    accounts.credit.available += parseInt(req.body.amount)

    data.writeJSON();

    res.render('payment', {message: "Payment Successful", account: accounts.credit})

});

app.get('/transfer', (req, res) => res.render('transfer', {user: users[0] }));

app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance =  accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
    // const accountsJSON = JSON.stringify(accounts);
    // fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
  
   data.writeJSON();

   res.render('transfer', {message: "Transfer Completed"});

})

app.listen(3000, () => console.log('PS Project Running on Port 3000'));


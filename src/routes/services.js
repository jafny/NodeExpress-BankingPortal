// provides the routing for the transfer/payment functionality 
const express = require('express');

const router = express.Router();

const {accounts} =  require('../data');
const {users} =  require('../data');

const {writeJSON} =  require('../data')

router.get('/profile', (req, res) => res.render('profile', {user: users[0] }));

router.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));

router.post('/payment', (req, res) => {
    

    // removes the payment from your balance
    accounts.credit.balance -= req.body.amount;

    //gives you back your credit
    accounts.credit.available += parseInt(req.body.amount)

    data.writeJSON();

    res.render('payment', {message: "Payment Successful", account: accounts.credit})

});

router.get('/transfer', (req, res) => res.render('transfer', {user: users[0] }));

router.post('/transfer', (req, res) => {
    accounts[req.body.from].balance =  accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
    // const accountsJSON = JSON.stringify(accounts);
    // fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
  
   data.writeJSON();

   res.render('transfer', {message: "Transfer Completed"});

})

module.exports = router
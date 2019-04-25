//provides the routes for the accounts pages.
const express = require('express');

const router = express.Router();

const {accounts} =  require('../data')

router.get('/savings', (req, res) => res.render('account', {title: "Account Summary", account: accounts.savings}));

router.get('/checking', (req, res) => res.render('account', {title: "Account Summary", account: accounts.checking}));

router.get('/credit', (req, res) => res.render('account', {title: "Account Summary", account: accounts.credit}));

module.exports = router;
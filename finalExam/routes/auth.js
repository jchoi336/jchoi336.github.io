// auth.js

const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        res.render("login", { isAlert: true, alertText: 'Incorrect email or password.' });
    }

    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.render("login", { isAlert: true, alertText: 'Incorrect email or password.' });
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.render("login", { isAlert: true, alertText: 'Incorrect email or password.' });
    }
    //no errors so render the search page
    res.render('search');
    //res.render("dictionary", { isAlert: true, alertText: 'Hello ' + req.body.email + ' !' });
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(req);
}

module.exports = router; 
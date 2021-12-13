// users.js
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        res.render("register", { isAlert: true, alertText: error.details[0].message });
    }
    else{
        // Check if this user already exisits
        let user = await User.findOne({ email: req.body.email });
        if (user) {
        res.render("register", { isAlert: true, alertText: 'email already used' });
        } else {
            // Insert the new user if they do not exist yet
            user = new User({
                email: req.body.email,
                password: req.body.password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            res.render('login', { isAlert: true, alertText: 'account creation successful' });
        }
    }


});

module.exports = router;
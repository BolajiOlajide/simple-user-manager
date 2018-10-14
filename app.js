const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// model
const user = require('./user.model');


const app = express();
const DB_URL = 'mongodb://admin:1nightpassword@ds131763.mlab.com:31763/project8'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static('assets'));
mongoose.connect(DB_URL, { useNewUrlParser: true });

app.get('/', function (req, res) {
    user.find({}, function (err, users) {
        if (err) {
            return res.render('error');
        }
        return res.render('index');
    });
});

app.post('/addUser', function(req, res) {
    return user.create(req.body, function(err, user) {
        if (err) {
            const message = JSON.stringify(err.message);
            return res.render('error', { message });
        }
        return res.redirect('/users');
    });
});

app.get('/users', function(req, res) {
    return user.find({}, function(err, users) {
        if (err) {
            const message = JSON.stringify(err.message);
            return res.render('error', { message });
        }
        return res.render('users', { users });
    });
});

app.get('/updateUsers/:id', function(req, res) {
    return user.findById(req.params.id, function(err, user) {
        if (err) {
            const message = JSON.stringify(err.message);
            return res.render('error', { message });
        }
        return res.render('user', { user });
    });
});

app.post('/updateUsers/:id', function(req, res) {
    return user.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) {
            const message = JSON.stringify(err.message);
            return res.render('error', { message });
        }
        return res.redirect('/users');
    });
});

app.post('/deleteUsers/:id', function(req,res) {
    return user.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            const message = JSON.stringify(err.message);
            return res.render('error', { message });
        }
        return res.redirect('/users');
});
});

app.listen(3000, function () {
    console.log('Listening on 3000');
});

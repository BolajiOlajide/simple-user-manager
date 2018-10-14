//AJILLAJ BAIGAA

//ENE DASGALD BROWSER EER LINK GARCH IRNE. BANANA GEH MET

/// /npm i path --save
//npm i express --save
//npm i pug --save  edgeeriig suulgana



const express = require ('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require ('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');

});

app.get('/card', (req, res) => {
    res.render('card');

});

app.post('/index', (req, res) => {
    res.render('index', { name : req.body.username }
});

// app.get('/fruits/:fruit', (req, res) => {
//     res.send(`You clicked on #{req.params.fruit}`);
//
// });

app.listen(3000, ()=> {
    console.log('Listening on 3000');
});

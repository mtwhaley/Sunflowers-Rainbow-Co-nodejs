
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Console } = require('console');
const app = express();
const path = require('path');
const ejs = require('ejs');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const viewPath = path.join(__dirname+"/views/")

/* Middlewares */
app.set('view engine', 'ejs')
app.set('views', viewPath)
app.use(express.static('/public'));
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.get('/', function (req, res) {
    //res.redirect("http://www.google.com")
    res.end()
});

app.get('/store', function (req, res) {

    
    console.log(req.method)
    
    fs.readFile('Items.json', function (error, data) {
        
        if (error) {
            res.status(500).end()
        }
        else {
            res.render('Success.ejs', {
                items: JSON.parse(data)
            })
        }
    })
})

app.post('/write-file', function (req, res) {
    const body = req.body; // your request body

    // your "magical" code

});

/* 3, 2, 1, Launch ! */
app.listen(process.env.PORT ||1337, function () {
});




/*
const Console = require('console');
var http = require('http');
var port = process.env.PORT || 1337;
const fs = require('fs');

const qs = require('querystring')



http.createServer(function (req, res) {

    if (req.method == "POST") {
        Console.log(req.body)
    }

    if (req.url === '/favicon.ico') {
        return;
    }


    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    res.write("Line 1\n")
    res.write('Hello World\n');

    res.write(req.url+"\n")
    res.end('\n');
    
    


}).listen(port);
*/
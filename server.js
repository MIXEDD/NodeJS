const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
    res.render('maintenance.hbs', {
        maintenanceMsg:'We are currently under maintenance'
    });
});

app.use(express.static(__dirname + '/public'));


app.use((req,res,next) => {
    const now = new Date().toString();
    const log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err) console.log('Unable to append to server.log');
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req,resp) => {
    resp.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome'
    });
});

app.get('/about', (req,resp) => {
    resp.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req,resp) => {
    resp.send({
        error:'Bad request'
    });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
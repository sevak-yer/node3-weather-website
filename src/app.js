const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sevak'
    });     
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sevak'
    }); 
});

app.get('/help', (req,res) => {
    res.render('help', {
        help: 'This is the help page for the weather website',
        title: 'Help',
        name: 'Sevak'
    });
});
// app.get('', (req, res) => {
//     res.send('Hello');
// });

// app.get('/help', (req, res) => {
//     res.send([
//     {
//         name: 'Sevak',
//         age: 38
//     },   
//     {
//         name: 'Satenik',
//         age: 5
//     }
// ]);
// });  

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// });

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({error: 'Address must be provided!'});
    }
    geocode(address, (error, {lat, long, location}={}) => {
        if (error) {
            return res.send({error});
        }
        forecast(lat, long, (error, forecastdata) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                address,
                location,  
                forecast: forecastdata
            });
        });         
    });
}); 

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.',
        title: '404',
        name: 'Sevak'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        title: '404',
        name: 'Sevak'
    });
});

app.listen(port, () => {
    console.log('Server is up on port '+ port);
});
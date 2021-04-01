const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =   path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mayank Gupta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Mayank Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        content: 'This is a help page',
        name: 'Mayank Gupta'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide a Address !'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error){
            return res.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error : error
                })
            }
            res.send({
                location: data.location,
                forecast: forecastData
            })
          })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term !'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send("My 404 page")
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

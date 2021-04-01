const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8ea72456edef353826fe7d3e1a393c45&query=' + lat + ',' + long 
    
    request({url : url , json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to wheather service!', undefined);
        }
        else if(response.body.error){
            callback('Unable to find location !', undefined);
            console.log(url)
        }
        else{
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' degrees out. It feels like  ' + response.body.current.feelslike + '. Current Wind speed is ' + response.body.current.wind_speed)
        }
    })

}

module.exports = forecast;
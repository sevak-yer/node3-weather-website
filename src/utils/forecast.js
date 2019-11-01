const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/63a64071e21830bb4e1cce4d9819b44e/'+lat+','+long+'?units=si&lang=en';
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to conncet to weather service!',undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else{
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                Humidity: body.currently.humidity,
                precipitation_probability: body.currently.precipProbability
            });
        }
    });
};

module.exports = forecast;  
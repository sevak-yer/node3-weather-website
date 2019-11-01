const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2V2eWVyIiwiYSI6ImNrMmE1Y3k5azBqdzMzbnBldGNjdDM5MDQifQ.Jh7pOO4zmPKj_-DBguWuKg&limit=1';
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to conncet to location service!', undefined);
        } else {
            if (!body.features) {
                callback('Provide a location.', undefined);
            } else if (body.features.length === 0) {
                callback('Location not found. Try another search.',undefined);
            } else {
                // const long = body.features[0].geometry.coordinates[0];
                // const lat = body.features[0].geometry.coordinates[1];
                const data = {
                    lat: body.features[0].geometry.coordinates[1],
                    long: body.features[0].geometry.coordinates[0],
                    location: body.features[0].place_name
                };
                callback(undefined, data);
            }
        }
    });
};

module.exports = geocode;
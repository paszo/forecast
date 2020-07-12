const express = require('express');
const path = require('path');
const zipdb = require('zippity-do-dah');
const fetch = require('node-fetch');


const app = express();

function getTemperature(lat, lon) {
    const key = process.env.OPENWEATHERKEY;
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(res => res.json())
            .then(data => data.main.temp)
}

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
    const zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location.zipcode) {
        next();
        return;
    }

    const latitude = location.latitude;
    const longitude = location.longitude;

    getTemperature(latitude, longitude)
        .then(temperature => res.json({
            zipcode: zipcode,
            temperature: temperature
        }))
        .catch(() => next());
})

app.use((req, res) => {
    res.status(404).render("404");
})



const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}`)});
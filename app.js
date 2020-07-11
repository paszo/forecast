const express = require('express');
const path = require('path');
const app = express();

const openweatherkey = process.env.OPENWEATHERKEY;

console.log(openweatherkey);

app.use(express.static(path.resolve(__dirname, "views")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
});

app.use((req, res) => {
    res.status(404).render("404");
})



const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}`)});
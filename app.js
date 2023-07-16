const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();
const weatherData = require('./utils/weatherData');
const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('/', (req, res) => {
    res.render('index', {
       title:"Weather App",
   })
})
//localhost:3000/weather?address = noida
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.status(501).json({ "message": "Please provide the required address" });
    }
    weatherData(address, (error,{temperature,description,cityName}) => {
        if (error) {
            return res.status(404).send({ "msg": error });
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
   })
})
app.get('*', (req, res) => {
    res.send('Page Not Found...');  
})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})

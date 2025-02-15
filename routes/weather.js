const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/:city', async (req, res) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const city = req.params.city;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        console.log("url:", url); 

        const response = await axios.get(url);

        if (!response.data || response.data.cod === "404") {
            return res.status(404).json({ error: "didnt find" });
        }

        const weatherData = {
            city: response.data.name,
            temperature: `${response.data.main.temp}°C`,
            condition: response.data.weather[0].description
        };

        res.json(weatherData);
    } catch (error) {
        console.error("error 2", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "error 1" });
    }
});

module.exports = router;

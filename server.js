const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();  

const app = express();  

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(' Connected to MongoDB'))
    .catch(err => console.error(' MongoDB connection error:', err));

const bookRoutes = require('./routes/books');
const weatherRoutes = require('./routes/weather');

app.use('/books', bookRoutes);
app.use('/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

console.log("🔑 API Key:", process.env.WEATHER_API_KEY);

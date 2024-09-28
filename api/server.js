const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const DataModel = require('./models/data');




const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connect'))
    .catch((err) => console.log(err));

app.get('/data', async (req, res) => {
    const { year, topics, sector } = req.query;
    const filter = {};
    if (year && year !== 'All') filter.year = year;
    if (topics) filter.topics = topics;
    if (sector) filter.sector = sector;


    try {
        const data = await DataModel.find(filter);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
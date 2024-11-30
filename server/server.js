require('dotenv').config({path:'./process.env'});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const courseRoute = require('./Routers/courseroute');
const email = require('./Routers/emailrout');
const register = require('./Routers/registerrouter');
const facultyroute = require('./Routers/facultyroute');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT ;

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined. Check your .env file.');
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

app.use('/api/course', courseRoute);
app.use('/api/faculty', facultyroute);
app.use('/email', email);
app.use('/register', register);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

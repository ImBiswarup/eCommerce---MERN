const { configDotenv } = require('dotenv');
configDotenv();

const express = require('express');
const ConnectToDB = require('./DB/Connection');
const userRoute = require('./routes/user');

const app = express();
const port = 3000;

ConnectToDB(process.env.DB_URL);

app.use(express.json());

app.use('/api/user', userRoute);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server started on port ${port}!`));

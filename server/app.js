const { configDotenv } = require('dotenv');
configDotenv();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const ConnectToDB = require('./DB/Connection');
const userRoute = require('./routes/user');
const itemRoute = require('./routes/items');

const app = express();
const port = 3000;

ConnectToDB(process.env.DB_URL);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoute);
app.use('/api/item', itemRoute);

app.listen(port, () => console.log(`Server started on port ${port}!`));

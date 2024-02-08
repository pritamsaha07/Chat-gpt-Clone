const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./db');

const authRoutes = require('./authRoutes');
const errorHandler = require('./errorMiddleware');
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());


app.use(errorHandler);

app.use("/api/v1/auth", authRoutes);
app.get('/', (req, res) => {
   res.send("Hello");
});

app.use("/api/v1/openai", require('./openAiRouter'));

app.listen(port, () => {
    console.log(`Server is Running in ${process.env.DEV_MODE} on ${port}`.bgCyan.white);
});

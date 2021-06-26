require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const empenhosRouter = require('./src/routes/empenhosRoutes');

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  },
  (error) => {
    if(error) {
      console.log(error);
    } else {
      console.log('MongoDB Atlas connected')
    }
  }
);

app.use('/empenhos', express.json(), empenhosRouter);

app.listen(3333, () => console.log('Server running...'));
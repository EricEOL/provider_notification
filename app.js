require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Empenho = require('./src/models/Empenho');

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

app.get('/notification', async (req, res) => {

  const empenho = new Empenho({
    empenho: '2021NE000031',
    sendDate: Date.now()
  })

  try {
    await empenho.save();
  } catch (error) {
    console.log(error);
  }

  res.status(400).send(empenho);
})

app.listen(3333, () => console.log('Server running...'));
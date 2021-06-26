import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
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

import Empenho from './src/models/Empenho.js';

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
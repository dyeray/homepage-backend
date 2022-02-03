import express from 'express';
import * as views from './views.js';

const app = express()
const port = process.env.PORT || 3000

app.get('/', views.main);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

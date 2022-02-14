import express from 'express';
import * as views from './views.js';

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', frontendUrl);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', false);

  next();
});

app.get('/', views.main);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

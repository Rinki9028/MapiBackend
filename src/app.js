const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const apiRouter = require('./routes')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Use the routes under the '/api' prefix
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

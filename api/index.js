const express = require('express');
const cors = require('cors');
const app = express();
const routes = require("./routes");
app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(3333, (req, res) => {
    console.log('Server is running on port 3333');
});
const { Router } = require('express');
const routes = Router();

const registerRouter = require("./registerRoutes");


routes.use("/", registerRouter);


module.exports = routes;


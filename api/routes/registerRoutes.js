const { Router }  = require('express');
const registerRoutes = Router(); 


const RegisterController = require('../controllers/registerController');
const registerController = new RegisterController();


registerRoutes.post("/register/:userID", registerController.create);
registerRoutes.get("/register", registerController.list);
registerRoutes.delete("/register/:registerID", registerController.delete);



module.exports = registerRoutes;
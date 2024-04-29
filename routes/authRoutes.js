const express = require('express');
const router = express.Router();
const { registerController, loginController, currentUserController } = require("../controllers/authController");
const authMiddelware = require('../middlewares/authMiddelware');

//routes  
//REGISTER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post("/login", loginController);


//GET CURRENT USER || GET
router.get("/current-user", authMiddelware, currentUserController);


module.exports = router;
const express = require("express");
const router = express.Router();
const { registration, login, home } = require('../controllers/userController')

router.get('/', home)
router.post('/register', registration)
router.post('/login', login)




module.exports = router


const express = require("express");
const router = express.Router();

const barbeariaController = require("../controllers/barbeariaController");

router.post("/registrar", barbeariaController.registrar);
router.post("/login", barbeariaController.login);

module.exports = router
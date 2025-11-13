const express = require("express");
const router = express.Router();
const servicosController = require("../controllers/servicoController");
const autenticarJWT = require("../middleware/auth");

router.get("/", autenticarJWT, servicosController.listar);
router.post("/", autenticarJWT, servicosController.criar);
router.delete("/:id", autenticarJWT, servicosController.delete);
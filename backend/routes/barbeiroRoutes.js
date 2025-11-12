const express = require("express");
const router = express.Router();
const barbeiroController = require("../controllers/barbeiroController");
const autenticarJWT = require("../middleware/auth");

router.get("/", autenticarJWT, barbeiroController.listar);
router.post("/", autenticarJWT, barbeiroController.criar);
router.delete("/:id", autenticarJWT, barbeiroController.excluir);

module.exports = router;
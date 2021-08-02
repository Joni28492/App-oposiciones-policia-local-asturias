const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerTemas, crearTema } = require("../controllers/temas");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", obtenerTemas);

router.post(
  "/",
  [check("bloque", "No es un ID válido").isMongoId(), validarCampos],
  crearTema
); //middleware para validar bloque

module.exports = router;

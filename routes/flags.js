const { Router } = require("express");
const { check } = require("express-validator");
const { listarFlagsPaginado, crearFlag } = require("../controllers/flags");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Pendiente el sistema de login de usuarios
//crear
router.post("/", crearFlag);
//listar paginado
router.get("/", listarFlagsPaginado);

//obtener por id

//otras mas avanzadas para el deprecated

module.exports = router;

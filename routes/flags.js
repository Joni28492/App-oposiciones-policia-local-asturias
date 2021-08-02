const { Router } = require("express");
const { check } = require("express-validator");
const { listarFlagsPaginado, crearFlag } = require("../controllers/flags");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const Tema = require("../models/tema");

const router = Router();

//Pendiente el sistema de login de usuarios
//crear
router.post(
  "/",
  [
    check("id_tema", "No es un ID válido").isMongoId(),
    validarJWT,
    validarCampos,
  ],
  crearFlag
);
//listar paginado
router.get("/", listarFlagsPaginado);
//obtener por id
// router.get("/:id",[], obtenerFlagPorId);//controller sin definir

//otras mas avanzadas para el deprecated

//marcar como deprecated

//obtener deprecated

//validar deprecated

module.exports = router;

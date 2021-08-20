const { Router } = require("express");
const { check } = require("express-validator");
const {
  listarFlagsPaginado,
  crearFlag,
  marcarDeprecated,
  buscarPorId,
} = require("../controllers/flags");
const { existeFlagPorId } = require("../middlewares/validar-flag-id");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const Tema = require("../models/tema");

const router = Router();

//Pendiente el sistema de login de usuarios
//crear, requiere usuario
router.post(
  "/",
  [
    check("id_tema", "No es un ID válido").isMongoId(),
    validarJWT,
    validarCampos,
  ],
  crearFlag
);
//listar paginado, utilizamos este endpoint como buscador via _id
router.get("/", listarFlagsPaginado);
//buscar por id
router.get("/:id", [existeFlagPorId, validarCampos], buscarPorId);

//otras mas avanzadas para el deprecated, podemos hacer la mayoria con un solo put

//marcar como deprecated
router.delete(
  "/:id",
  [validarJWT, check("id").custom(existeFlagPorId)],
  marcarDeprecated
);
//obtener deprecated

//validar deprecated

module.exports = router;

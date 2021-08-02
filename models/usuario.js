const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  apellidoUno: {
    type: String,
    required: [true, "El primer apellido es obligatorio"],
  },
  apellidoDos: {
    type: String,
    required: [true, "El segundo apellido es obligatorio"],
  },
  rol: {
    type: String,
    required: true,
    emun: [
      "ADMIN_ROLE",
      "USER_ROLE",
      "AGENT_ROLE",
      "AUXILIAR_ROLE",
      "SUBINSPECTOR_ROLE",
      "MANDO_ROLE",
    ],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  google: {
    type: Boolean,
    default: false,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);

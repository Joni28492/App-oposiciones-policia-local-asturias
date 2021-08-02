const { Schema, model } = require("mongoose");

const FlagSchema = Schema({
  pregunta: {
    type: String,
    required: true,
  },
  respuesta: {
    type: String,
    required: [true, "La respuesta es obligatoria"],
  },
  placeholder: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  deprecated: {
    type: Boolean,
    default: false,
  },
  stars: {
    type: Number,
    default: 0,
  },
  userVoted: {
    //no esta en dia
    type: Number,
    default: 0,
  },
  userListVoted: {
    //no esta en dia
    type: Number,
    default: 0,
  },
  motivoActualizacion: {
    type: String,
    default: "Sin Actualización Pendiente",
  },
  respuestaActualizada: {
    type: String,
    default: "Sin Actualización Pendiente",
  },
  uidCreator: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  uidLastUpdate: {
    type: Date,
  },
  hint: {
    type: String,
    default: "No hay pistas disponibles",
  },
  documentacion: {
    type: String,
    default: "No hay documentación sobre la pregunta",
  },
  id_tema: {
    type: Schema.Types.ObjectId,
    ref: "Tema",
    required: true,
  },
});

FlagSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Flag", FlagSchema);
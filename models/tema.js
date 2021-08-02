const { Schema, model } = require("mongoose");

const TemaSchema = Schema({
  numero: {
    type: Number,
    required: true,
  },

  tema: {
    type: String,
    required: [true, "El tema es obligatorio"],
    unique: true,
  },
  bloque: {
    type: Schema.Types.ObjectId,
    ref: "Bloque",
    required: true,
  },
});

TemaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Tema", TemaSchema);
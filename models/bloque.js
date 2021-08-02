const { Schema, model } = require("mongoose");

const BloqueSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El bloque es obligatorio"],
  },
});

module.exports = model("Bloque", BloqueSchema);

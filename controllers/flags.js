const Flags = require("../models/flag");
const flag = require("../models/flag");
const tema = require("../models/tema");
const { response } = require("express");
const Tema = require("../models/tema");

const listarFlagsPaginado = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  //   const query = { estado: true };

  const [total, flags] = await Promise.all([
    Flags.countDocuments(),
    Flags.find()
      .populate("flag", "uidCreator")
      .populate("tema", "tema")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ total, flags });
};

const crearFlag = async (req, res = response) => {
  try {
    let { pregunta, respuesta, placeholder, uidCreator, id_tema } = req.body;
    uidCreator = req.usuario._id;

    const temaNombre = await Tema.findById(id_tema);

    const flag = new Flags({
      pregunta,
      respuesta,
      placeholder,
      uidCreator,
      id_tema,
      nombreTema: temaNombre.tema.toUpperCase(),
    });

    await flag.save();
    res.json(flag);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listarFlagsPaginado,
  crearFlag,
};

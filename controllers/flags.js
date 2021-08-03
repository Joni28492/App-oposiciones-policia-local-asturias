const Flags = require("../models/flag");
const flag = require("../models/flag");
const tema = require("../models/tema");
const { response } = require("express");
const Tema = require("../models/tema");

const listarFlagsPaginado = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, flags] = await Promise.all([
    Flags.countDocuments(query),
    Flags.find(query)
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
    //validacion para saber si id es perteneciente a otra coleccion
    if (!temaNombre) {
      return res.json({
        msg: `El tema con el id ${id_tema} no existe, puede que ese id pertenezca a otra colección`,
      });
    }

    const nombreTema = temaNombre.tema.toUpperCase();

    const flag = new Flags({
      pregunta,
      respuesta,
      placeholder,
      uidCreator,
      id_tema,
      nombreTema,
    });

    await flag.save();
    res.json(flag);
  } catch (error) {
    console.log(error);
  }
};

const obtenerFlagPorId = async (req, res = response) => {
  // const { _id } = req.params;
  const { id } = req.params;
  console.log("id ------->" + id);
  const flag = await Flags.findById(id);
  console.log("flag ------->\n" + flag);
  if (!flag) {
    return res.json({
      msg: `no hay flag para el id ${id}`,
    });
  }

  res.json(flag);
};

module.exports = {
  listarFlagsPaginado,
  crearFlag,
  obtenerFlagPorId,
};

const Flags = require("../models/flag");
const Tema = require("../models/tema");
const { response } = require("express");

const listarFlagsPaginado = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // console.log(id);

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

const buscarPorId = (req, res = response) => {
  const { id } = req.params;

  res.json({ id, msg: "Buscar Por id via params" });
};

const marcarDeprecated = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuarios, ...data } = req.body;
  //TODO realizar utilizando tambien el body
};

module.exports = {
  listarFlagsPaginado,
  crearFlag,
  buscarPorId,
  marcarDeprecated,
};

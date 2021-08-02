const Tema = require("../models/tema");
const { response } = require("express");
const bloque = require("../models/bloque"); //Mantener importacion para el populate

const obtenerTemas = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  //   const query = { estado: true };

  const [total, temas] = await Promise.all([
    Tema.countDocuments(),
    Tema.find()
      .populate("bloque", "nombre") //ERROR en el Populate no me deja ver el nombre
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ total, temas });
};

const crearTema = async (req, res = response) => {
  const body = req.body;

  const tema = new Tema(body);
  await tema.save();

  res.json(body);
};

module.exports = {
  obtenerTemas,
  crearTema,
};

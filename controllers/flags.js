const Flags = require("../models/flag");
const flag = require("../models/flag");
const tema = require("../models/tema");
const { response } = require("express");

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

const crearFlag = (req, res = response) => {
  const body = req.body;

  res.json(body);
};

module.exports = {
  listarFlagsPaginado,
  crearFlag,
};

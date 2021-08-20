const { request } = require("express");
const Flag = require("../models/flag");

const existeFlagPorId = async (req, res = response, next) => {
  const { id } = req.params;
  //   console.log(req.params);
  try {
    const existeFlag = await Flag.findById(id);
    // console.log("existe flag por id -----***---" + existeFlag);
    if (!existeFlag) {
      throw new Error(`El id  ${id} no existe para la coleccion de flags`);
    }
    next();
  } catch (error) {
    return res.json({
      msg: `El id  ${id} no existe para la coleccion de flags`,
    });
  }
};

module.exports = {
  existeFlagPorId,
};

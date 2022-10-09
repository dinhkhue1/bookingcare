import sepecialtyService from "../services/sepecialtyService";

let createSpecialty = async (req, res) => {
  try {
    let infor = await sepecialtyService.createSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from the server",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let infor = await sepecialtyService.getAllSpecialty();
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from the server",
    });
  }
};

let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await sepecialtyService.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from the server",
    });
  }
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};

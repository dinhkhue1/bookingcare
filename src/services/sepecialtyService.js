import db from "../models/index";

require("dotenv").config();

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let editSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const spe = await db.Specialty.findOne({
        where: { id: data.id },
        raw: true,
      });
      if (spe) {
        spe.name = data.name
        spe.descriptionHTML = data.descriptionHTML
        spe.descriptionMarkdown = data.descriptionMarkdown
        if (data.image) {
          spe.image = data.image
        }
        const updateUser = await db.Specialty.update(spe, {
          where: {
            id: data.id,
          },
        });
        resolve({
          errCode: 0,
          message: "Cập nhật thành công",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "ok",
        errCode: 0,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
          raw: true,
        });

        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
          }
          data.doctorSpecialty = doctorSpecialty;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundSpecialty = await db.Specialty.findOne({
      where: { id: id },
    });
    if (!foundSpecialty) {
      resolve({
        errCode: 2,
        errMessage: "Người dùng không tồn tại",
      });
    }
    await db.Specialty.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      message: "người dùng đã được xóa",
    });
  });
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  editSpecialty: editSpecialty,
  deleteSpecialty: deleteSpecialty
};

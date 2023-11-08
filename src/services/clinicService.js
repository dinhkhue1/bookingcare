import db from "../models/index";

require("dotenv").config();

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          image: data.imageBase64,
          address: data.address,
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

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});

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

let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
          raw: true,
        });

        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
            raw: true,
          });

          data.doctorClinic = doctorClinic;
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

let editClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: true,
      });
      if (clinic) {
        clinic.name = data.name
        clinic.address = data.address
        clinic.descriptionHTML = data.descriptionHTML
        clinic.descriptionMarkdown = data.descriptionMarkdown
        if (data.image) {
          clinic.image = data.image
        }
        const update = await db.Clinic.update(clinic, {
          where: {
            id: data.id,
          },
        });
        if (update) {
          resolve({
            errCode: 0,
            message: "Cập nhật thành công",
          });
        }

      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundClinic = await db.Clinic.findOne({
      where: { id: id },
    });
    if (!foundClinic) {
      resolve({
        errCode: 2,
        errMessage: "Cơ sở không tồn tại",
      });
    }
    await db.Clinic.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      message: "Cơ sở đã được xóa",
    });
  });
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  editClinic: editClinic,
  deleteClinic: deleteClinic
};

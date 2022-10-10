import db from "../models/index";
import bcrypt from "bcryptjs";
import res from "express/lib/response";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUseremail(email);
      if (isExit) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstname",
            "lastname",
          ],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password); // password này được client truyền vào
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Thành công";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Mật khẩu sai";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "Tài khoản của bạn không tìm thấy";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "email của bạn không tìm thấy";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUseremail = (useremail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: useremail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"], // không cho hiển thị password
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: {
            id: userId,
          },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUseremail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "email của bạn đã được sử dụng , bạn hãy thử tạo một email khác",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          positionId: data.positionId,
          roleId: data.roleId,
          image: data.avata,
        });
        resolve({
          errCode: 0,
          errMessage: "Thành công",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: "Người dùng không tồn tại",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: "người dùng đã được xóa",
    });
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Không tìm thấy tài khoản của bạn",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.roleId = data.roleId;
        user.gender = data.gender;
        user.positionId = data.positionId;
        if (data.avata) {
          user.image = data.avata;
        }
        await user.save();
        resolve({
          errCode: 0,
          message: "Cập nhật tài khoản của bạn thành công",
        });
      } else {
        resolve({ errCode: 1, errMessage: "Người dùng không tìm thấy" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodesService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Khong truyen type allcodes",
        });
      } else {
        let res = {};
        let allCode = await db.allCode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;

        resolve(res); // tra ve thanh phan trong res sang ben controler boi vi cai nay la tay sai cua no
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodesService: getAllCodesService,
};

import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  let hashPasswordFromBcrypt = await hashUserPassword(data.password);

  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        phonenumber: data.phonenumber,
        roleId: data.roleId,
      });
      resolve("tạo thành công người dùng mới");
    } catch (e) {
      reject(e);
    }
  });
};

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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInforById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: true,
      });
      if (user) {
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.address = data.address;
        user.phonenumber = data.phonenumber;

        const updateUser = await db.User.update(user, {
          where: {
            id: data.id,
          },
        });

        if (updateUser) {
          let allUser = await db.User.findAll();
          resolve(allUser); // trả ra hàm gọi bên homcontroler
        } else {
          resolve();
        }
      }
    } catch (error) {
      reject(error);
    }
  });
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const user = await db.User.findOne({
  //       where: { id: data.id },
  //     });
  //     if (user) {
  //       user.firstname = data.firstname;
  //       user.lastname = data.lastname;
  //       user.address = data.address;
  //       user.phonenumber = data.phonenumber;
  //       await user.save();
  //       let allUser = await db.User.findAll();
  //       resolve(allUser);
  //     } else {
  //       resolve();
  //     }
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
};
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.destroy({
        where: {
          id: userId,
        },
        raw: true,
      });
      if (user) {
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     let user = await db.User.findOne({
  //       where: { id: userId },
  //     });

  //     if (user) {
  //       await user.destroy();
  //     }
  //     resolve();
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
};

module.exports = {
  createNewUser: createNewUser, // tao nguoi dung moi
  getAllUser: getAllUser, // lay tat ca nguoi dung
  getUserInforById: getUserInforById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};

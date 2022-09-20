import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("thành công");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log(data);
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let GetEditCRUD = async (req, res) => {
  let userId = req.query.id; //lấy id
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInforById(userId);
    console.log("userData", userData);
    return res.render("editCRUD.ejs", {
      user: userData,
    });
    // let userData;
    //
  } else {
    return res.send("Không tìm thấy tài khoản");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body; // lấy được tất cả các data trong input của file ejs
  console.log("--------------a");
  console.log("User", data);

  let allUser = await CRUDService.updateUserData(data);

  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("đã được xóa");
  } else {
    return res.send("không tìm thấy thông tin người dùng");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  GetEditCRUD: GetEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};

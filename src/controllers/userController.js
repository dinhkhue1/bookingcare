import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //check email co ton tai khong
  //so sanh password nguoi dung co dung khong
  // tra lai thong tin cua nguoi dung
  //

  if (!email || !password) {
    return res.status(500).json({
      errCode: 4,
      message: "thiếu mất tham số đầu vào",
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; // all or id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Không tìm thấy tài khoản của bạn",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "thiếu tham số Id",
    });
  }

  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
let getAllCodes = async (req, res) => {
  try {
    let data = await userService.getAllCodesService(req.query.type);

    return res.status(200).json(data);
  } catch (error) {
    console.log("bug allcodes", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCodes: getAllCodes,
};

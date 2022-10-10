import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    // sau khi một component render thì nó phải sét qua contructor
    // b1 : vào contructor -> did mount -> render
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "",
      position: "",
      role: "",
      avata: "",

      action: "",
      userEditId: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //render => didupdate
    //hien tai(this) va qua khu(previous)
    //[] [3]
    //[3] [3]
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        phonenumber: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avata: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avata: base64,
      });
    }
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        positionId: this.state.position,
        roleId: this.state.role,
        avata: this.state.avata,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        positionId: this.state.position,
        roleId: this.state.role,
        avata: this.state.avata,
      });
    }
  };

  handleEditUserFromparent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      phonenumber: user.phonenumber,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      action: CRUD_ACTIONS.EDIT,
      avata: "",
      previewImgURL: imageBase64,
      userEditId: user.id,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstname",
      "lastname",
      "address",
      "phonenumber",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("cần phải nhập: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.sate };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isGetGenders = this.props.isLoadingGender;
    let language = this.props.language;
    let {
      email,
      password,
      firstname,
      lastname,
      address,
      phonenumber,
      gender,
      position,
      role,
      avata,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Thêm mới người dùng</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isGetGenders === true ? "Loading genders" : ""}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstname}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstname");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastname}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastname");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phonenumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phonenumber");
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "position");
                  }}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "role");
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    onChange={(event) => this.handleOnchangeImage(event)}
                    hidden
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParentKey={this.handleEditUserFromparent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { withRouter } from 'react-router-dom';
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassWord: false,
      errMessage: "",
    };
  }
  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    console.log(event.target.value);
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user); // truyen vao cho redux data user
        if(data.user.roleId == 'R2'){
          this.props.history.push('/doctor/manage-schedule')
        }
        if(data.user.roleId == 'R1'){
          this.props.history.push('/system/user-manage')
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassWord: !this.state.isShowPassWord,
    });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="Col-12 login-text">Đăng Nhập</div>
            <div className="col-12 form-group login-input">
              <label>Tài Khoản:</label>
              <input
                type="text"
                className="form-control"
                placeholder="nhập tài khoản của bạn ..."
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnchangeUsername(event);
                }}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Mật Khẩu:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassWord ? "text" : "password"}
                  className="form-control"
                  placeholder="nhập mật khẩu của bạn ..."
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnchangePassword(event);
                  }}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassWord
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                {" "}
                Đăng Nhập
              </button>
            </div>

            <div className="col-12 text-center mt-4">
              <span className="text-other-login">
                Bạn có thể đăng nhập bằng:
              </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

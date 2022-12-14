import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { arrRoleId } from "../../store/actions/userActions";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: " ",
      address: "",
      phonenumber: "",
      roleId: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("xoa modal data", () => {
      //reset state
      this.setState({
        email: "",
        password: "",
        firstname: "",
        lastname: " ",
        address: "",
        phonenumber: "",
        roleId: "",
      });
    });
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstname",
      "lastname",
      "address",
      "phonenumber",
      "roleId",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missong" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewuser(this.state, "abc");
    }
  };

  render() {
    console.log(arrRoleId);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          T???o m???t ng?????i d??ng m???i
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>M???t kh???u</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>T??n</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstname");
                }}
                value={this.state.firstname}
              />
            </div>
            <div className="input-container">
              <label>T??n ?????m</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastname");
                }}
                value={this.state.lastname}
              />
            </div>
            <div className="input-container max-width-input">
              <label>?????a ch???</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="input-container max-width-input">
              <label>S??? ??i???n tho???i</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phonenumber");
                }}
                value={this.state.phonenumber}
              />
            </div>
            <div className="input-container max-width-input">
              <label>ng?????i d??ng</label>

              <input
                defaultValue={arrRoleId[0]}
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "roleId");
                }}
                // option={arrRoleId}
                value={this.state.roleId}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            L??u
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            ????ng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

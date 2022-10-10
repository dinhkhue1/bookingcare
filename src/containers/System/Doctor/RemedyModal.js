import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { CommonUtils, LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal, Button, ModalBody, ModalFooter } from "reactstrap";

import _, { isEmpty } from "lodash";
import DatePicker from "react-flatpickr";
import * as actions from "../../../store/actions";
import Select from "react-select";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import moment from "moment";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;

    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, closeRemedyModal } = this.props;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeRemedyModal}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email bệnh nhân</label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnchangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn file đơn thuốc</label>
              <input
                className="form-control"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button color="primary" onClick={() => this.handleSendRemedy()}>
            Send
          </button>
          <button color="secondary" onClick={closeRemedyModal}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    genders: state.admin.genders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);

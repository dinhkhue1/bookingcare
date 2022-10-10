import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import Select from "react-select";
import { CRUD_ACTIONS, dateFormat } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import RemedyModal from "./RemedyModal";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.email,
      timeType: item.timeType,
      patientName: item.patientData.firstname,
    };

    this.setState({
      isOpenRemedyModal: true,

      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
      isOpenRemedyModal: false,
    });

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientName: dataModal.patientName,
      language: this.props.language,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Thành công!");
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Có lỗi sảy ra!");
    }
  };
  handleBtnRemedy = () => {};
  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">
              {/* <FormattedMessage id="manage-patient.title" /> */}
              Quản lý danh sách bệnh nhân khám bệnh
            </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group text">
                <label>
                  {/* <FormattedMessage id="manage-patient.choose-date" /> */}
                  chon ngay kham
                </label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.firstname}</td>
                            <td>{item.patientData.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xac nhan
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          no data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

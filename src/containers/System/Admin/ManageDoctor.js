import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //doctor-infor
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: [],
      listClinic: [],
      listSpecialty: [],
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      selectedClinic: "",
      selectedSpecialty: "",

      clinicId: "",
      specialtyId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allDoctorInfor !== this.props.allDoctorInfor) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allDoctorInfor;
      let dateSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dateSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } = this.props.allDoctorInfor;
      let dateSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dateSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      doctorId: this.state.selectedOption.value,
      description: this.state.description,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
      specialty: this.state.selectedSpecialty.label
    });
  };
  handleChangeSelect = async (selectedOption) => {
    //hien ra thong tin bac si duoc chon
    this.setState({ selectedOption });

    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        specialtyId = "",
        clinicId = "",
        provinceId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "",
        selectedClinic = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }
      this.setState({
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };
  handleOnchangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    //selectedOption tra ra lable va value cua mot gia tri
    let stateName = name.name;
    let stateCopy = { ...this.state };

    stateCopy[stateName] = selectedOption;

    this.setState({
      ...stateCopy,
    });
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastname} ${item.firstname}`;

          let labelEn = `${item.firstname} ${item.lastname}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} `;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedOption} // lay duoc cai value va lable trong option
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            ></Select>
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleOnchangeText(event, "description")
              }
              value={this.state.description}
            >
              aaaaaa
            </textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              value={this.state.selectedPrice}
              name="selectedPrice"
              onChange={this.handleChangeSelectDoctorInfor}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              value={this.state.selectedPayment}
              name="selectedPayment"
              onChange={this.handleChangeSelectDoctorInfor}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              value={this.state.selectedProvince}
              name="selectedProvince"
              onChange={this.handleChangeSelectDoctorInfor}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnchangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnchangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnchangeText(event, "note")}
              value={this.state.note}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>
            <Select
              options={this.state.listSpecialty}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty" />
              }
              value={this.state.selectedSpecialty}
              name="selectedSpecialty"
              onChange={this.handleChangeSelectDoctorInfor}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic" />
            </label>
            <Select
              options={this.state.listClinic}
              placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
              value={this.state.selectedClinic}
              name="selectedClinic"
              onChange={this.handleChangeSelectDoctorInfor}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px", paddingTop: "15px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allDoctorInfor: state.admin.allDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllDoctorInfor: () => dispatch(actions.getAllDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { creatNewClinic, getAllClinic } from "../../../services/userService";
import "./ManageClinic.scss";
import { toast } from "react-toastify";
import { Table } from 'antd';
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt();


class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      clinicEditId: "",
      imageClinic: "",
      previewImgURL: "",
      isEdit: false,
      listClinic: []
    };
  }

  handleEdit = (record) => {
    let imageBase64 = "";
    if (record.image) {
      imageBase64 = new Buffer(record.image, "base64").toString("binary");
    }
    this.setState({
      clinicEditId: record.id,
      name: record.name,
      imageBase64: imageBase64,
      descriptionHTML: record.descriptionHTML,
      address: record.address,
      descriptionMarkdown: record.descriptionMarkdown,
      imageClinic: record.image,
      previewImgURL: record.image,
      isEdit: true
    });
  }
  handleDelete = (record) => {
    this.props.deleteClinicRedux(record.id);
  };

  async componentDidMount() {
    await this.props.getAllListCLinic();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinic !== this.props.listClinic) {
      this.setState({
        listClinic: this.props.listClinic,
      });
    }
  }

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        imageClinic: base64,
        previewImgURL: objectUrl,
      });
    }
  };

  handleSaveNewClinic = async () => {
    let res;
    if (this.state.isEdit) {
      res = this.props.adminEditClinic({
        id: this.state.clinicEditId,
        name: this.state.name,
        address: this.state.address,
        image: this.state.imageClinic,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown
      });
    } else {
      res = await creatNewClinic({
        name: this.state.name,
        address: this.state.address,
        imageBase64: this.state.imageClinic,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown
      });
      if (res && res.errCode === 0) {
        this.props.getAllListCLinic()
        this.setState({
          name: "",
          address: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
        toast.success("Thành công");
      } else {
        toast.error("Thất bại");
      }
    }
  };

  render() {
    const columns = [
      {
        title: 'Tên phòng khám',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Địa chỉ phòng khám',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Ảnh',
        render: (text, record) => {
          return (
            <div
              className="bg-image section-clinic"
              style={{ backgroundImage: `url(${record.image})`, backgroundSize: 'cover', width: '50px', height: '50px' }}
            ></div>
          )
        }
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <button className="btn-edit" onClick={() => this.handleEdit(record)}>
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn-delete" onClick={() => this.handleDelete(record)}>
              <i className="fas fa-trash"></i>
            </button>
          </span>
        ),
      }
    ];
    let { listClinic, isEdit } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý phòng khám</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnchangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <br />
            <input
              id="previewImg"
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
              hidden
            />
            <div style={{ marginTop: "10px", display: "flex" }}>
              <label className="label-upload" htmlFor="previewImg">
                Tải ảnh <i className="fas fa-upload"></i>
              </label>
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewImgURL})`,
                  width: "150px",
                  height: "80px",
                  marginLeft: "50px"
                }}
              ></div>
            </div>

          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>

            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnchangeInput(event, "address")}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px", marginTop: "15px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewClinic()}
            >
              {isEdit ? (
                <FormattedMessage id="manage-user.edit" />
              ) : (
                <FormattedMessage id="manage-user.save" />
              )}
            </button>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Table
            dataSource={listClinic ? listClinic : []}
            columns={columns}
            rowClassName={(record, index) => index === -1 ? 'table-row-light' : ''}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    listClinic: state.admin.listClinic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllListCLinic: () => dispatch(actions.getAllListCLinic()),
    adminEditClinic: (data) => dispatch(actions.adminEditClinic(data)),
    deleteClinicRedux: (id) => dispatch(actions.deleteClinic(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

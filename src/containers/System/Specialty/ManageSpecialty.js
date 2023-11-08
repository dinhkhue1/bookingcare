import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { creatNewSpecialty, AdminEditSpecialty } from "../../../services/userService";
import "./ManageSpecialty.scss";
import { toast } from "react-toastify";
import { Table } from 'antd';
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt();


class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImgURL: "",
      listSpecialty: [],
      isEdit: false,
      specialtyEditId: "",
      imageSpecialty: "",
    };
  }

  async componentDidMount() {
    await this.props.getAllListSpecialty();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      this.setState({
        listSpecialty: this.props.listSpecialty,
      });
    }
  }
  handleEdit = (record) => {
    let imageBase64 = "";
    if (record.image) {
      imageBase64 = new Buffer(record.image, "base64").toString("binary");
    }
    this.setState({
      specialtyEditId: record.id,
      name: record.name,
      imageBase64: imageBase64,
      descriptionHTML: record.descriptionHTML,
      descriptionMarkdown: record.descriptionMarkdown,
      previewImgURL: record.image,
      imageSpecialty: record.image,
      isEdit: true
    });
  }
  handleDelete = (record) => {
    this.props.deleteSpecialtyRedux(record.id);
  };
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
        imageSpecialty: base64,
        previewImgURL: objectUrl,
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    let res;
    if (this.state.isEdit) {
      res = this.props.adminEditSpecialty({
        id: this.state.specialtyEditId,
        name: this.state.name,
        image: this.state.imageSpecialty,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown
      });
    } else {
      res = await creatNewSpecialty({
        name: this.state.name,
        imageBase64: this.state.imageSpecialty,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown
      });
      if (res && res.errCode === 0) {
        this.props.getAllListSpecialty()
        this.setState({
          name: "",
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
        title: 'Tên chuyên khoa',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Ảnh',
        dataIndex: 'address',
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
    let { listSpecialty, isEdit } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quan ly chuyen khoa</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnchangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <br />
            <div style={{ display: "flex" }}>
              <input
                id="previewImg"
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
              onClick={() => this.handleSaveNewSpecialty()}
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
            dataSource={listSpecialty ? listSpecialty : []}
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
    listSpecialty: state.admin.listSpecialty,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllListSpecialty: () => dispatch(actions.getAllListSpecialty()),
    adminEditSpecialty: (data) => dispatch(actions.AdminEditSpecialty(data)),
    deleteSpecialtyRedux: (id) => dispatch(actions.deleteSpecialty(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

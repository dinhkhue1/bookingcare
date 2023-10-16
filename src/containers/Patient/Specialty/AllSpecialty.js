import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllSpecialty,
} from "../../../services/userService";
import "./AllSpecialty.scss";
import _ from "lodash";

class AllSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: []
    };
  }
  returnToHome = () => {
    this.props.history.push(`/home`);
  };
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res.errCode == 0) {
      this.setState({
        listSpecialty: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) { }
  render() {
    let { listSpecialty } = this.state;
    let { language } = this.props;
    console.log('1', listSpecialty)
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-arrow-left" style={{ marginRight: "30px" }} onClick={() => this.returnToHome()}></i>
              <h3>Chuyên Khoa</h3>
            </div>
          </div>
        </div>
        <div className="list-specialty">
          {
            listSpecialty.length > 0 &&
            listSpecialty.map((item, index) => {
              return (
                <div className="each-specialty" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div
                    className="name"
                  > {item.name}</div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.user.isLoggedIn, language: state.app.language };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);

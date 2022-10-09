import React, { Component } from "react";
import { connect } from "react-redux";

import { LANGUAGES } from "../../../utils";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.user.isLoggedIn, language: state.app.language };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

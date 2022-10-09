import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class HomeFoodter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; (Năm 2022) @@Phạm Đình Khuê@@ , ------Facebook-------
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100009415207913"
          >
            &#8594; Click here &#8592;
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.user.isLoggedIn };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeFoodter);

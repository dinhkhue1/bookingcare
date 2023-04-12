import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../../assets/images/bookingcare-2020.svg";
import Slider from "react-slick";
import "./homefooter.scss";

class HomeFoodter extends Component {
  render() {
    return (
      // <div className="home-footer">
      //   <p>
      //     &copy; (Năm 2022) @@Phạm Đình Khuê@@ , ------Facebook-------
      //     <a
      //       target="_blank"
      //       href="https://www.facebook.com/profile.php?id=100009415207913"
      //     >
      //       &#8594; Click here &#8592;
      //     </a>
      //   </p>
      // </div>
      <footer className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img className="header-logo" src={logo} />
              <p style={{ "font-weight": "bold" }}>
                Công ty Cổ phần Công nghệ BookingCare <br />
                Địa chỉ: Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu
                Giấy, Tp. Hà Nội
              </p>
            </div>
            <div className="col-md-6">
              <h5>Liên hệ cho chúng tôi</h5>
              <ul>
                <li>
                  <p>Số điện thoại: 0961904720</p>
                </li>
                <li>
                  <p>Email: khuekk2000@gmail.com</p>
                </li>
                <li>
                  <p>
                    Facebook:{" "}
                    <a
                      target="_blank"
                      href="https://www.facebook.com/profile.php?id=100009415207913"
                    >
                      &#8594; Click here &#8592;
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <p className="text-center">
            &copy; 2023 Hospital. All rights reserved.
          </p>
        </div>
      </footer>
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

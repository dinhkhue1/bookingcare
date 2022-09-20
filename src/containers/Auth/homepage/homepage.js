import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../home_header/HomeHeader";
import Specialty from "../Section/Specialty";
import HandBook from "../Section/HandBook";
import MedicalFacility from "../Section/MedicalFacility";
import OutStandingDoctor from "../Section/OutStandingDoctor";
import About from "../Section/About";
import HomeFooter from "./homefooter";
import "./homepage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class homepage extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader settings={settings} />
        <Specialty settings={settings} />

        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(homepage);

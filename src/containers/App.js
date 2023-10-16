import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import AllDoctor from "./Patient/Doctor/AllDoctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import AllSpecialty from "./Patient/Specialty/AllSpecialty"
import DetailClinic from "./Patient/Clinic/DetailClinic";
import AllClinic from "./Patient/Clinic/AllClinic"
import Doctor from "../routes/Doctor";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login from "../routes/Login";
import Login from "./Auth/Login";

import Header from "./Header/Header";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import homepage from "./Auth/homepage/homepage";
import VerifyEmail from "./Patient/VerifyEmail";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />

            <span className="content-container">
              <CustomScrollbars style={{ height: "100vh", wight: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/doctor/"}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.homepage} component={homepage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route path={path.ALL_DOCTOR} component={AllDoctor} />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route
                    path={path.ALL_SPECIALTY}
                    component={AllSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route path={path.ALL_HEALTH_FACILITY} component={AllClinic} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                </Switch>
              </CustomScrollbars>
            </span>

            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggablep
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

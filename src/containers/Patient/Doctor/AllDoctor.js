import React, { Component } from "react";
import { connect } from "react-redux";
import { getALlInforDoctor } from "../../../services/userService";
import "./AllDoctor.scss";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class AllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: []
        };
    }
    returnToHome = () => {
        this.props.history.push(`/home`);
    };
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };
    async componentDidMount() {
        let res = await getALlInforDoctor("");
        if (res.errCode == 0) {
            this.setState({
                listDoctor: res.data ? res.data : [],
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) { }
    render() {
        let { listDoctor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-arrow-left" style={{ marginRight: "30px" }} onClick={() => this.returnToHome()}></i>
                            <h3>Bác sĩ</h3>
                        </div>
                    </div>
                </div>
                <div className="list-doctor">
                    {
                        listDoctor.length > 0 &&
                        listDoctor.map((item, index) => {
                            let imageBase64 = "";
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, "base64").toString(
                                    "binary"
                                );
                            }
                            let nameVi = `${item.positionData.valueVi}, ${item.lastname} ${item.firstname}`;
                            let nameEn = `${item.positionData.valueEn}, ${item.firstname} ${item.lastname}`;
                            let textSpecialty = ''
                            if (item && item.Doctor_Infor && item.Doctor_Infor.specialty) {
                                textSpecialty = `${item.Doctor_Infor.specialty}`
                            }
                            return (
                                <div className="each-doctor" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                    <div
                                        className="bg-image"
                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                    ></div>
                                    <div className="text-right">
                                        <div className="text-name">
                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                        </div>
                                        <div className="text-specialty">Chuyên khoa: {textSpecialty}</div>
                                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);

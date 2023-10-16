import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClinic } from "../../../services/userService";
import "./AllClinic.scss";
import _ from "lodash";

class AllClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: []
        };
    }
    returnToHome = () => {
        this.props.history.push(`/home`);
    };
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    };
    async componentDidMount() {
        let res = await getAllClinic();
        if (res.errCode == 0) {
            this.setState({
                listClinic: res.data ? res.data : [],
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) { }
    render() {
        let { listClinic } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-arrow-left" style={{ marginRight: "30px" }} onClick={() => this.returnToHome()}></i>
                            <h3>Cơ sở y tế</h3>
                        </div>
                    </div>
                </div>
                <div className="list-clinic">
                    {
                        listClinic.length > 0 &&
                        listClinic.map((item, index) => {
                            return (
                                <div className="each-clinic" key={index} onClick={() => this.handleViewDetailClinic(item)}>
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
export default connect(mapStateToProps, mapDispatchToProps)(AllClinic);

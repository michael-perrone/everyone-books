import styles from "./TennisClubSignup.module.css";
import React from "react";
import AdminFormHolder from "./AdminFormHolder/AdminFormHolder";
import TennisClubFormHolder from "./TennisClubFormHolder/TennisClubFormHolder";
import { ADMIN_ENTERED, ADMIN_LOGIN_SUCCESS } from "../actions/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import BackDrop from "./BackDrop/BackDrop";
import DropdownModal from "./DropdownModal/DropdownModal";

class TennisClubSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {
        firstName: "",
        tennisClub: ""
      },
      tennisClub: {
        clubName: ""
      },

      allInfoReadyToSend: false
    };
    this.sendAllInfo = this.sendAllInfo.bind(this);
    this.getAdminInfo = this.getAdminInfo.bind(this);
    // this.sendAdminInfo = this.sendAdminInfo.bind(this);
    this.getTennisClubInfo = this.getTennisClubInfo.bind(this);
    this.unShowConfirmModal = this.unShowConfirmModal.bind(this);
  }

  unShowConfirmModal() {
    this.setState(prevState => {
      return { allInfoReadyToSend: !prevState.allInfoReadyToSend };
    });
  }

  getTennisClubInfo = stateParamObj => event => {
    event.preventDefault();
    this.setState({ tennisClub: stateParamObj, allInfoReadyToSend: true });
  };

  getAdminInfo = stateParamObj => event => {
    event.preventDefault();
    this.setState({ admin: stateParamObj });
    this.props.adminInfoSent();
  };

  sendAllInfo() {
    const bigStateObject = {
      admin: this.state.admin,
      tennisClub: this.state.tennisClub
    };

    axios
      .post("/api/adminSignup", bigStateObject)
      .then(response => {
        if (response.status === 200) {
          this.props.adminLoginSuccess(response.data.token);
        }
        this.props.history.push(`/admin/${this.props.admin.admin.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let newContainer = "";
    if (this.props.adminEntered) {
      newContainer = styles.newContainer;
    }
    return (
      <div id={newContainer} className={styles.container}>
        {this.props.adminEntered && (
          <TennisClubFormHolder getTennisClubInfo={this.getTennisClubInfo} />
        )}

        {!this.props.adminEntered && (
          <AdminFormHolder
            name={this.state.admin.firstName}
            tennisClub={this.state.admin.tennisClub}
            getAdminInfo={this.getAdminInfo}
          />
        )}
        {this.state.allInfoReadyToSend && (
          <BackDrop unShowConfirmModal={this.unShowConfirmModal} />
        )}
        <DropdownModal
          admin={this.state.admin}
          tennisClub={this.state.tennisClub}
          sendAllInfo={this.sendAllInfo}
          unShowConfirmModal={this.unShowConfirmModal}
          allInfoReadyToSend={this.state.allInfoReadyToSend}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    adminEntered: state.booleanReducers.adminEntered
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adminLoginSuccess: adminToken =>
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: {
          adminToken
        }
      }),
    adminInfoSent: () => dispatch({ type: ADMIN_ENTERED })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TennisClubSignup)
);

import React from "react";
import styles from "./TennisClubFormHolder.module.css";
import TennisClubForm from "./TennisClubForm/TennisClubForm";
import { connect } from "react-redux";
import { ADMIN_ENTERED } from "../../actions/actions";
import adminFormStyles from "../AdminFormHolder/AdminFormHolder.module.css";

class TennisClubSignupLeftSide extends React.Component {
  render() {
    let newContainerLeft = "";
    if (this.props.adminEntered) {
      newContainerLeft = styles.newContainerLeft;
    }
    return (
      <div id={styles.newContainerLeft} className={styles.containerLeft}>
        <p style={{ width: "90%" }} id={adminFormStyles.pTag}>
          We've got your administrator information and you're almost ready to
          get started. We just need a little more information about your club.
          Please fill this information out carefully.
        </p>
        <TennisClubForm
          unEnterAdmin={this.props.unEnterAdmin}
          getTennisClubInfo={this.props.getTennisClubInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminEntered: state.booleanReducers.adminEntered
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unEnterAdmin: () => dispatch({ type: ADMIN_ENTERED })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TennisClubSignupLeftSide);

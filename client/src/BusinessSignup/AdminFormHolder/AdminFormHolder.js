import React from "react";
import styles from "./AdminFormHolder.module.css";
import AdminForm from "./AdminForm/AdminForm";
import { connect } from "react-redux";

class TennisClubSignupRightSide extends React.Component {
  render() {
    return (
      <div className={styles.containerRight}>
       <AdminForm getAdminInfo={this.props.getAdminInfo} />
        {!this.props.adminEntered && (
          <div id={styles.pTagContainer}>
            <p id={styles.pTag}>
              Before getting started with your tennis club. We need a little
              information about you. You will create an administrator account
              with your tennis club that will give you full access to editing
              and adding to your clubs details. You will use the email and
              password you create here to login from the home page. Admins can
              add instructors, change court names, and much more.
            </p>
            
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminEntered: state.booleanReducers.adminEntered
  };
};

export default connect(mapStateToProps)(TennisClubSignupRightSide);

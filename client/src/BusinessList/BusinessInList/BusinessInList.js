import React from "react";
import styles from "./BusinessInList.module.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import OtherAlert from "../../OtherAlerts/OtherAlerts";

class TennisClub extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorArray: [], subscribeHit: false };
    this.subscribeToClub = this.subscribeToClub.bind(this);
  }
  
  subscribeToClub(tennisClubId) {
    return () => {
      const objectToSend = {
        tennisClubId,
        userId: this.props.user.user.id
      };
      Axios.post("/api/userSubscribe", objectToSend)
        .then(response => {
          if (response.status === 200) {
            this.setState({ subscribeHit: true });
          }
        })
        .catch(error => {
          const emptyArray = [];
          this.setState({ errorArray: emptyArray });
          const comingError = error.response.data.error;
          let newError = {
            alertType: "failure",
            showAlert: comingError !== "" ? true : false,
            alertMessage: comingError
          };
          const newErrorArray = [];
          newErrorArray.push(newError);
          this.setState({ errorArray: newErrorArray });
        });
    };
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
       {this.state.errorArray.map(element => {
          return (
            <OtherAlert
              alertType={element.alertType}
              showAlert={element.showAlert}
              alertMessage={element.alertMessage}
            />
          );
        })} 
        <div id={styles.businessContainer}>
        <p className={styles.businessName}>{this.props.business.businessName}</p>
          <div className={styles.section}>
          <p className={styles.boxHeader}>Contact:</p>
          </div>
          <div className={styles.section}>
          <p className={styles.boxHeader}>Hours:</p>
          </div>
          <div className={styles.section}>
          <p className={styles.boxHeader}>Services:</p>
          </div>
        </div>       
  </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(TennisClub));

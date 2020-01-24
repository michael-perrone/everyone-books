import React from "react";
import styles from "./BusinessInList.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import OtherAlert from "../../OtherAlerts/OtherAlerts";

class TennisClub extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorArray: [], subscribeHit: false };
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
          <div id={styles.shortenedHeightSection} className={styles.section}>
          <p className={styles.boxHeader}>Contact:</p>
          <p className={styles.sectionContent}>{this.props.business.phoneNumber}</p>
          {this.props.business.website && <p className={styles.sectionContent}>{this.props.business.website}</p>}
          <p className={styles.sectionContent}>{this.props.business.address}</p>
          <p className={styles.sectionContent}>{this.props.business.city}</p>
          <p className={styles.sectionContent}>{this.props.business.state}</p>
          <p className={styles.sectionContent}>{this.props.business.zip}</p>
          </div>
          <div id={styles.shortenedHeightSection} className={styles.section}>
          <p className={styles.boxHeader}>Hours:</p>
           {this.props.business.schedule.map((element,index) => {
             let day;
              if (index === 0) {
               day = 'Sun';
              }
              else if (index === 1) {
               day = "Mon"
              }
              else if (index === 2) {
               day = "Tue"
              }
              else if (index === 3) {
                day = "Wed"
              }
              else if (index === 4) {
                day = "Thu"
              }
              else if (index === 5) {
                day = "Fri"
              }
              else if (index === 6) {
                day = "Sat"
              }
             if (element.open !== "Closed" && element.close !== 'Closed') {
                return <p className={styles.sectionContent}>{day}: {element.open}-{element.close}</p>
             }
             else {
               return <p className={styles.sectionContent}>{day}: Closed</p>
             }
           })}
          </div>
          <div className={styles.section}>
          <p className={styles.boxHeader}>Services:</p>
          {this.props.profile.services.map(element => {
          return <p className={styles.sectionContent}>{element}</p>
          })}
          </div>
          <div id={styles.buttonContainer}><button className={styles.sectionButton}>Follow Business</button> <button className={styles.sectionButton} id={styles.marginLeft}>View Business</button></div>
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

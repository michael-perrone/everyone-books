import React from "react";
import styles from "./BusinessInList.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import OtherAlert from "../../OtherAlerts/OtherAlerts";
import axios from 'axios';

class BusinessInList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorArray: [], following: props.following};
    this.viewBusiness = this.viewBusiness.bind(this);
    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)
  }

  viewBusiness() {
    this.props.history.push(`/businesses/${this.props.business._id}`)
  }

  follow(businessId) {
    return () => {
      const objectToSend = {
        businessId,
        userId: this.props.user.user.id
      };
      axios.post("/api/userSubscribe", objectToSend)
        .then(response => {
          if (response.status === 200) {
            this.setState({following: true})
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

  unfollow(businessId) {
    return () => {
      axios.post('/api/userSubscribe/unfollow', {businessId, userId: this.props.user.user.id}).then(
        response => {
          if (response.status === 200) {
            this.setState({following: false})
          }
        }
      )
    }
}

  
  render() {
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
          <div className={styles.shortenedSection}>
          <p className={styles.boxHeader}>Contact:</p>
          <p className={styles.sectionContent}>{this.props.business.address}</p>
          <p className={styles.sectionContent}>{this.props.business.city}</p>
          <p className={styles.sectionContent}>{this.props.business.state}</p>
          <p style={{width: '91%', paddingBottom: '10px', borderBottom: '1px solid gray'}} className={styles.sectionContent}>{this.props.business.zip}</p>
          <p style={{marginTop: '8px'}} className={styles.sectionContent}>{this.props.business.phoneNumber}</p>
          {this.props.business.website && <p className={styles.sectionContent}>{this.props.business.website}</p>}
          </div>
          <div id={styles.hours} className={styles.shortenedSection}>
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
          <div className={styles.buttonContainer}>
            {!this.state.following && <button onClick={this.follow(this.props.business._id)} className={styles.sectionButton}>Follow Business</button>}
            {this.state.following &&  <button onClick={this.unfollow(this.props.business._id)} className={styles.sectionButton} id={styles.unfollow}>Unfollow Business</button>}
            <button onClick={this.viewBusiness} className={styles.sectionButton} id={styles.marginLeft}>View Business</button>
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

export default withRouter(connect(mapStateToProps)(BusinessInList));

import React from "react";
import styles from "./BusinessInList.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import OtherAlert from "../../OtherAlerts/OtherAlerts";
import axios from 'axios';

class BusinessInList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorArray: [], following: props.following, successMessage: "", error: ""};
    this.viewBusiness = this.viewBusiness.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.requestEmployeeInvite = this.requestEmployeeInvite.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
  }

  viewBusiness() {
    this.props.history.push(`/businesses/${this.props.business._id}`)
  }

  cancelRequest() {
    axios.post("/api/getEmployee/cancelRequest", {}, {headers: {'x-auth-token': this.props.employeeToken}}).then(response => {
        if (response.status === 200) {
          this.setState({successMessage: "Business Join Request Canceled"})
          this.props.changeSentTo("");
        }
    }).catch(error => {
      // if this hits thats bad bc this should never fail
    })
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

  requestEmployeeInvite(businessId) {
    return () => {
      axios.post('/api/notifications/employeeSendingId', {businessId, employeeId: this.props.employee.employee.id}).then(response => {
        if (response.status === 200) {
            this.setState({successMessage: "ID successfully sent!"});
            this.props.changeSentTo(businessId);
        }
      }).catch(error => {
        if (error.response.status === 406) {
            this.setState({error: "You cannot send your ID more than once."});
          }
          else if (error.response.status === 403) {
            this.setState({error: "You have already sent an id to this business."});
          }
      })
    }
  }

  
  render() {
    console.log(this.props);
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
            {!this.props.notUser && !this.state.following && <button onClick={this.follow(this.props.business._id)} className={styles.sectionButton}>Follow Business</button>}
            {!this.props.notUser && this.state.following && <button onClick={this.unfollow(this.props.business._id)} className={styles.sectionButton} id={styles.unfollow}>Unfollow Business</button>}
            {!this.props.notUser && <button onClick={this.viewBusiness} className={styles.sectionButton} id={styles.marginLeft}>View Business</button>}
            
            {!this.props.alreadySent && this.props.notUser && <button className={styles.sectionButton} onClick={this.requestEmployeeInvite(this.props.business._id)}>Ask For Invite</button>}
            {this.props.alreadySent && this.props.notUser && <button className={styles.sectionButton} style={{backgroundColor: "salmon", color: "black"}} onClick={this.cancelRequest}>Cancel Request</button>}
          </div>
        </div>       
        <OtherAlert showAlert={this.state.successMessage !== ""} alertType={"success"} alertMessage={this.state.successMessage}/>
        <OtherAlert alertType={"fail"} alertMessage={this.state.error} showAlert={this.state.error !== ""}/>
  </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    employee: state.authReducer.employee,
    employeeToken: state.authReducer.employeeToken
  };
};

export default withRouter(connect(mapStateToProps)(BusinessInList));

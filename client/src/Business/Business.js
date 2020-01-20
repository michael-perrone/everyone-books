import React from "react";
import axios from "axios";
import styles from "./Business.module.css";
import CourtContainer from "./CourtContainer/CourtContainer";
import AdminBooking from "./BookingHelpers/AdminBooking/AdminBooking";
import { connect } from "react-redux";

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      business: "",
      showCourts: false,
      businessProfile: "",
      profileComplete: null,
      employees: ""
    }; 
  }

  componentDidMount() {
    if (this.props.admin) {
      axios
        .post("/api/business", {
          businessId: this.props.admin.admin.businessId
        })
        .then(response => {
          if (response.status === 200) {
            this.setState({ profileComplete: true });
            this.setState({ businessProfile: response.data.profile });
            this.setState({ business: response.data.business });
            this.setState({employees: response.data.employees})
          } else {
            this.setState({profileComplete: false})
          }
        });
    } else {
      axios
        .post("/api/business", {
          businessId: this.props.match.params.businessId
        })
        .then(response => {
          if (response.status === 200) {
            this.setState({ profileComplete: true });
            this.setState({ businessProfile: response.data.profile });
            this.setState({ business: response.data.business });
            this.setState({ employees: response.data.employees})
          } else {
            this.setState({ profileComplete: false });
          }
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.profileComplete && (
          <div id={styles.businessContainer}>
            <div>
              <div style={{ overflow: "auto" }}>
                <AdminBooking
                  date={this.state.dateChosenForCourts}
                  onDateClick={this.onDateClick}
                  employees={this.state.employees}
                />
              </div>
              <CourtContainer
                businessNameAllLower={this.state.business.businessNameAllLower}
                numberColumns={this.state.business.bookingColumnNumber}
                businessName={this.state.business.businessName}
               /* clubOpenTime={this.state.club.clubOpenTime} */
               /* clubCloseTime={this.state.club.clubCloseTime} */ 
              />
            </div>
          </div>
        )}{" "}
        {this.state.profileComplete === false &&
          (this.props.user || this.props.employee) && (
            <p style={{ marginTop: "80px" }}>
              This club has not finished setting up on tennis-mate yet. Check
              back again soon.
            </p>
          )}
        
        {this.state.profileComplete === false && this.props.admin && (
          <p style={{ marginTop: "80px" }}>
            You have not finished setting up your profile. To be helpful to our
            users, your club will not show up on tennis-mate until your profile
            is more complete.
          </p>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    adminToken: state.authReducer.adminToken,
    instructor: state.authReducer.instructor,
    bookACourt: state.booleanReducers.bookACourt,
    user: state.authReducer.user,
    dateChosen: state.dateReducer.dateChosen
  };
};

export default connect(mapStateToProps)(Business);

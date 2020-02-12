import React from "react";
import axios from "axios";
import styles from "./Business.module.css";
import CourtContainer from "./CourtContainer/CourtContainer";
import AdminBooking from "./BookingHelpers/AdminBooking/AdminBooking";
import { connect } from "react-redux";
import Spinner from '../Spinner/Spinner';

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      business: "",
      showThings: false,
      businessProfile: "",
      profileComplete: null,
      employees: "",
      timeOpen: "",
      timeClose: "",
      services: []
    }; 
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.dateChosen !== prevProps.dateChosen || this.state.business.businessName !== prevState.business.businessName) {
      console.log(this.props.dateChosen, prevProps.dateChosen)
      this.setState({timeOpen: this.state.business.schedule[this.props.dateChosen.getDay()].open})
      this.setState({timeClose: this.state.business.schedule[this.props.dateChosen.getDay()].close})
      this.setState({loading: false})
    }
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
            this.setState({ employees: response.data.employees})
            axios.post('/api/getServiceTypes', {serviceTypesArray: response.data.profile.serviceTypes}).then(
              response => {
                if (response.status !== 204) {
                  this.setState({services: response.data.serviceTypesArray})
                }
              }
            )
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
        {this.state.loading && <Spinner/>}
        {this.state.profileComplete && !this.state.loading && (
          <div id={styles.businessContainer}>
            <div>
              <div style={{ overflow: "auto" }}>
                <AdminBooking

                  onDateClick={this.onDateClick}
                  employees={this.state.employees}
                  services={this.state.services}
                />
              </div>
              <CourtContainer
                dateChosen={this.props.dateChosen.toDateString()}
                openTime={this.state.timeOpen}
                closeTime={this.state.timeClose}
                bookingColumnType={this.state.business.bookingColumnType}
                businessNameAllLower={this.state.business.businessNameAllLower}
                numberColumns={this.state.business.bookingColumnNumber}
                businessName={this.state.business.businessName}
                businessId={this.state.business._id}
              />
            </div>
          </div>
        )}{" "}
        {this.state.profileComplete === false && !this.state.loading &&
          (this.props.user || this.props.employee) && (
            <p style={{ marginTop: "80px" }}>
              This club has not finished setting up on tennis-mate yet. Check
              back again soon.
            </p>
          )}
        
        {this.state.profileComplete === false && this.props.admin && !this.state.loading && (
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
    bookAThing: state.booleanReducers.bookAThing,
    user: state.authReducer.user,
    dateChosen: state.dateReducer.dateChosen
  };
};

export default connect(mapStateToProps)(Business);

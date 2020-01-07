import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styles from "./InstructorHome.module.css";
import { connect } from "react-redux";
import InstructorProfile from "./InstructorProfile/InstructorProfile";
import { GET_INSTRUCTOR_PROFILE } from "../actions/actions";

class InstructorHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileCreated: false,
      instructorProfile: undefined,
      isUser: false,
      bookings: []
    };
  }
  componentDidMount() {
    if (this.props.instructor) {
      axios
        .get("/api/instructorProfile/myprofile", {
          headers: { "x-auth-token": this.props.instructorToken }
        })
        .then(response => {
          if (response.data.profileCreated === false) {
            this.setState({ profileCreated: false });
            this.props.history.push(
              `/instructor/${this.props.instructor.instructor.id}/createeditprofile`
            );
          } else {
            this.setState({ profileCreated: true });
            this.props.getInstructorProfile(response.data.instructorProfile);
            this.setState({
              instructorProfile: response.data.instructorProfile
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.props.user || this.props.admin) {
      this.setState({ isUser: true });
      axios
        .post("/api/getInstructor", {
          instructorId: this.props.match.params.instructorId
        })
        .then(response => {
          if (response.status === 200) {
            this.setState({
              instructorProfile: response.data.instructorProfile
            });
            if (this.props.user || this.props.admin)
              axios
                .post("/api/iBookings", {
                  instructorId: response.data.instructorProfile.instructor._id,
                  userId: this.props.user
                    ? this.props.user.user.id
                    : this.props.admin.admin.id
                })
                .then(response => {
                  this.setState({ bookings: response.data.bookings });
                });
          }
        });
    }
  }

  render() {
    return (
      <div id={styles.instructorHomeContainer}>
        {this.state.instructorProfile !== undefined && (
          <InstructorProfile
            bookings={this.state.bookings}
            instructorProfile={this.state.instructorProfile}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showNotifications: state.booleanReducers.showNotifications,
    instructor: state.authReducer.instructor,
    instructorToken: state.authReducer.instructorToken,
    userToken: state.authReducer.userToken,
    adminToken: state.authReducer.adminToken,
    admin: state.authReducer.admin,
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInstructorProfile: instructorProfile =>
      dispatch({ type: GET_INSTRUCTOR_PROFILE, payload: { instructorProfile } })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InstructorHome)
);

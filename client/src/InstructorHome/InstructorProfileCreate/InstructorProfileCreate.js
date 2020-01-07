import React from "react";
import styles from "./InstructorProfileCreate.module.css";
import InstructorProfileCreateForm from "./InstructorProfileCreateForm/InstructorProfileCreateForm";
import { connect } from "react-redux";
import axios from "axios";

class InstructorProfileCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructorProfile: {}
    };
  }

  componentDidMount() {
    axios
      .get("/api/instructorProfile/myprofile", {
        headers: { "x-auth-token": this.props.instructorToken }
      })
      .then(response => {
        this.setState({ instructorProfile: response.data.instructorProfile });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        
        <div id={styles.instructorProfileCreateContainer}>
          <div id={styles.paragraphContainer}>
            
              <p>
                On this page you can edit any of the profile information you
                have previously entered about yourself. You can also add new
                jobs that you have started working at or add new ceritificates
                that you have been awared. You can also change your bio and
                lesson rate and location. You do not need to update your years
                teaching, we will do that for you.
              </p>
        
          </div>
          <InstructorProfileCreateForm />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructor: state.authReducer.instructor,
    instructorToken: state.authReducer.instructorToken
  };
};

export default connect(mapStateToProps)(InstructorProfileCreate);

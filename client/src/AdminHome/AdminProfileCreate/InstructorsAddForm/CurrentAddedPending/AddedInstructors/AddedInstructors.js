import React from "react";
import axios from "axios";
import { connect } from "react-redux";

const AddedInstructor = props => {
  function sendInstructorIds() {
    if (props.addedInstructors) {
      let instructors = [];
      props.addedInstructors.forEach(instructor => {
        instructors.push(instructor.id);
      });
      axios
        .post("/api/clubProfile/addInstructorsToClub", {
          tennisClub: props.admin.admin.clubId,
          instructors
        })
        .then(response => {
          if (response.status === 200) {
            props.setNewPending(props.addedInstructors);
            props.clearAdded();
            props.instructorsSubmittedHandler();
          }
        })
        .catch(error => {
          if (error.response.status === 406) {
            props.errorAddAlertHandler();
          }
        });
    }
  }

  return (
    props.addedInstructors.length > 0 && (
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
          width: "310px"
        }}
      >
        <div>
          <p style={{ textDecoration: "underline", marginBottom: "4px" }}>
            Instructors Added
          </p>
          {props.addedInstructors.map(instructorAdded => {
            return (
              <div style={{ display: "flex" }}>
                <p>{instructorAdded.name}</p>
                <i
                  onClick={props.filterAdded(instructorAdded)}
                  style={{ cursor: "pointer", color: "red", marginLeft: "8px" }}
                  className="fas fa-trash-alt"
                ></i>
              </div>
            );
          })}
        </div>
        <button
          onClick={sendInstructorIds}
          style={{
            width: props.addedInstructors.length === 1 ? "120px" : "75px",
            height: "32px",
            backgroundColor: "white"
          }}
        >
          {props.addedInstructors.length === 1
            ? "Submit Instructor"
            : "Submit All"}
        </button>
      </div>
    )
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin
  };
};

export default connect(mapStateToProps)(AddedInstructor);

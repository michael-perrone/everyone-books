import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlerts from "../../../../../OtherAlerts/OtherAlerts";

const PendingInstructors = props => {
  const [pendingToDelete, setPendingToDelete] = React.useState([]);
  const [pending, setPending] = React.useState(props.pending);
  const [pendingSuccess, setPendingSuccess] = React.useState(false);

  function restore(instructorToBeRestored) {
    return () => {
      let newPendingToBeDeleted = pendingToDelete.filter(
        instructorRestoring =>
          instructorRestoring.id !== instructorToBeRestored.id
      );
      setPendingToDelete(newPendingToBeDeleted);
      let newPending = [...pending, instructorToBeRestored];
      setPending(newPending);
    };
  }

  function addToDeletePending(instructorToBeDeleted) {
    return () => {
      let newPending = pending.filter(
        instructor => instructor.id !== instructorToBeDeleted.id
      );
      setPending(newPending);

      const pendingToDeleteUpdate = [...pendingToDelete, instructorToBeDeleted];
      setPendingToDelete(pendingToDeleteUpdate);
    };
  }

  function removeFromPending() {
    let instructors = [];
    pendingToDelete.forEach(pendingInstructor => {
      instructors.push(pendingInstructor.id);
    });
    Axios.post("/api/clubProfile/removeFromPending", {
      instructors,
      tennisClub: props.admin.admin.clubId
    }).then(response => {
      setPendingToDelete([]);
      setPendingSuccess(true);
      props.setNewDeletedPending(pending);
    });
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <OtherAlerts
        showAlert={pendingSuccess}
        alertType={"success"}
        alertMessage={"Pending Instructors Removed"}
      />
      {pending && (
        <p
          style={{
            marginBottom: "8px",
            textAlign: "center",
            textDecoration: "underline"
          }}
        >
          Pending Instructors
        </p>
      )}
      {pending.map(pendingInstructor => {
        return (
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p>{pendingInstructor.name}</p>
            <i
              onClick={addToDeletePending(pendingInstructor)}
              style={{ color: "red", marginRight: "40px" }}
              className="fas fa-trash-alt"
            ></i>
          </div>
        );
      })}
      {pendingToDelete.map(instructorDeleted => {
        return (
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p style={{ textDecoration: "line-through", color: "gray" }}>
              {instructorDeleted.name}
            </p>
            <i
              onClick={restore(instructorDeleted)}
              style={{ color: "green", marginRight: "40px" }}
              className="fas fa-trash-restore"
            ></i>
          </div>
        );
      })}
      {pendingToDelete.length > 0 && (
        <button
          style={{
            width: "60px",
            height: "32px",
            backgroundColor: "white",
            marginLeft: "40%"
          }}
          onClick={removeFromPending}
        >
          Update
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { admin: state.authReducer.admin };
};
export default connect(mapStateToProps)(PendingInstructors);

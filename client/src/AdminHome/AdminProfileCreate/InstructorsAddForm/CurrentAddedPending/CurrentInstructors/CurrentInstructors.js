import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlert from "../../../../../OtherAlerts/OtherAlerts";

const CurrentInstructors = props => {
  const [currentToDelete, setCurrentToDelete] = React.useState([]);
  const [current, setCurrent] = React.useState(props.current);
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  function restore(instructorToBeRestored) {
    return () => {
      let newCurrentToBeDeleted = currentToDelete.filter(
        instructorRestoring =>
          instructorRestoring.id !== instructorToBeRestored.id
      );
      setCurrentToDelete(newCurrentToBeDeleted);
      let newCurrent = [...current, instructorToBeRestored];
      setCurrent(newCurrent);
    };
  }

  function addToDeleteCurrent(instructorToBeDeleted) {
    return () => {
      let newCurrent = current.filter(
        instructor => instructor.id !== instructorToBeDeleted.id
      );
      setCurrent(newCurrent);

      const currentToDeleteUpdate = [...currentToDelete, instructorToBeDeleted];
      setCurrentToDelete(currentToDeleteUpdate);
    };
  }

  function removeFromCurrent() {
    let instructors = [];
    currentToDelete.forEach(instructor => {
      instructors.push(instructor.id);
    });
    Axios.post(
      "/api/clubProfile/instructorDeleteFromClub",
      {
        instructors,
        tennisClub: props.admin.admin.clubId
      }
    ).then(response => {
      if (response.status === 200) {
        setCurrentToDelete([]);
        setDeleteAlert(true);
        props.setNewDeletedCurrent(current);
      }
    });
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <OtherAlert
        alertMessage={"Instructors successfully removed"}
        showAlert={deleteAlert}
        alertType={"success"}
      />
      {current && (
        <p
          style={{
            marginBottom: "8px",
            textAlign: "center",
            textDecoration: "underline"
          }}
        >
          Current Instructors
        </p>
      )}
      {current.map(currentInstructor => {
        return (
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p>{currentInstructor.name}</p>
            <i
              onClick={addToDeleteCurrent(currentInstructor)}
              style={{ color: "red", marginRight: "40px" }}
              className="fas fa-trash-alt"
            ></i>
          </div>
        );
      })}
      {currentToDelete.map(instructorDeleted => {
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
      {currentToDelete.length > 0 && (
        <button
          onClick={removeFromCurrent}
          style={{
            height: "32px",
            backgroundColor: "white",
            width: "60px",
            marginTop: "15px",
            marginLeft: "40%"
          }}
        >
          Update
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin
  };
};

export default connect(mapStateToProps)(CurrentInstructors);

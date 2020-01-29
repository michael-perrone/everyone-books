import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlerts from "../../../../../OtherAlerts/OtherAlerts";

const PendingInstructors = props => {
  const [pendingToDelete, setPendingToDelete] = React.useState([]);
  const [pending, setPending] = React.useState(props.pending);
  const [pendingSuccess, setPendingSuccess] = React.useState(false);

  function restore(employeeToBeRestored) {
    return () => {
      let newPendingToBeDeleted = pendingToDelete.filter(
        employeeRestoring =>
          employeeRestoring.id !== employeeToBeRestored.id
      );
      setPendingToDelete(newPendingToBeDeleted);
      let newPending = [...pending, employeeToBeRestored];
      setPending(newPending);
    };
  }

  function addToDeletePending(employeeToBeDeleted) {
    return () => {
      let newPending = pending.filter(
        employee => employee.id !== employeeToBeDeleted.id
      );
      setPending(newPending);

      const pendingToDeleteUpdate = [...pendingToDelete, employeeToBeDeleted];
      setPendingToDelete(pendingToDeleteUpdate);
    };
  }

  function removeFromPending() {
    let employees = [];
    pendingToDelete.forEach(pendingEmployee => {
      employees.push(pendingEmployee.id);
    });
    Axios.post("/api/businessProfile/removeFromPending", {
      employees,
      business: props.admin.admin.businessId
    }).then(response => {
      // WATCH THIS RESPONSE HERE
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
          Pending Employees
        </p>
      )}
      {pending.map(pendingEmployee => {
        return (
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p>{pendingEmployee.name}</p>
            <i
              onClick={addToDeletePending(pendingEmployee)}
              style={{ color: "red", marginRight: "40px", cursor: 'pointer' }}
              className="fas fa-trash-alt"
            ></i>
          </div>
        );
      })}
      {pendingToDelete.map(employeeDeleted => {
        return (
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p style={{ textDecoration: "line-through", color: "gray" }}>
              {employeeDeleted.name}
            </p>
            <i
              onClick={restore(employeeDeleted)}
              style={{ color: "green", marginRight: "40px", cursor: 'pointer' }}
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

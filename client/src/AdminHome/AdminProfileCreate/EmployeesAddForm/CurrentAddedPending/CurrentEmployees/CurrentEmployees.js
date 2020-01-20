import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlert from "../../../../../OtherAlerts/OtherAlerts";

const CurrentEmployees = props => {
  const [currentToDelete, setCurrentToDelete] = React.useState([]);
  const [current, setCurrent] = React.useState(props.current);
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  function restore(employeeToBeRestored) {
    return () => {
      let newCurrentToBeDeleted = currentToDelete.filter(
        employeeRestoring =>
          employeeRestoring.id !== employeeToBeRestored.id
      );
      setCurrentToDelete(newCurrentToBeDeleted);
      let newCurrent = [...current, employeeToBeRestored];
      setCurrent(newCurrent);
    };
  }

  function addToDeleteCurrent(employeeToBeDeleted) {
    return () => {
      let newCurrent = current.filter(
        employee => employee.id !== employeeToBeDeleted.id
      );
      setCurrent(newCurrent);

      const currentToDeleteUpdate = [...currentToDelete, employeeToBeDeleted];
      setCurrentToDelete(currentToDeleteUpdate);
    };
  }

  function removeFromCurrent() {
    let employees = [];
    currentToDelete.forEach(instructor => {
      employees.push(instructor.id);
    });
    Axios.post(
      "/api/businessProfile/employeeDeleteFromBusiness",
      {
        employees,
        business: props.admin.admin.businessId
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
        alertMessage={"Employees successfully removed"}
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
          Current Employees
        </p>
      )}
      {current.map(currentEmployee => {
        return (
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p>{currentEmployee.name}</p>
            <i
              onClick={addToDeleteCurrent(currentEmployee)}
              style={{ color: "red", marginRight: "40px" }}
              className="fas fa-trash-alt"
            ></i>
          </div>
        );
      })}
      {currentToDelete.map(employeDeleted => {
        return (
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p style={{ textDecoration: "line-through", color: "gray" }}>
              {employeDeleted.name}
            </p>
            <i
              onClick={restore(employeDeleted)}
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

export default connect(mapStateToProps)(CurrentEmployees);

import React from "react";
import axios from "axios";
import { connect } from "react-redux";

const AddedEmployees = props => {
  function sendEmployeeId() {
    const employees = [];
    props.added.forEach(employee => {
      employees.push(employee.id)
    })
      axios
        .post("/api/businessProfile/addEmployeeToBusiness", {
          business: props.admin.admin.businessId,
          employees
        })
        .then(response => {
          if (response.status === 200) {
            props.setNewPending(props.added);
            props.clearAdded();
            props.employeesSubmittedHandler();
          }
        })
        .catch(error => {
          if (error.response.status === 406) {
            props.errorAddAlertHandler();
          }
        });
  }

  return (
    props.added.length > 0 && (
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
            Employees Added
          </p>
          {props.added.map(instructorAdded => {
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
          onClick={sendEmployeeId}
          style={{
            width: props.added.length === 1 ? "120px" : "75px",
            height: "32px",
            backgroundColor: "white"
          }}
        >
          Submit Employee
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

export default connect(mapStateToProps)(AddedEmployees);

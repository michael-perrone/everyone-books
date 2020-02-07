import React, { useState, useEffect } from "react";
import styles from "./EmployeeAddForm.module.css";
import axios from "axios";
import { connect } from "react-redux";
import EmployeeToSelectList from './EmployeesToSelectList/EmployeeToSelectList'
import CurrentAddedPending from "./CurrentAddedPending/CurrentAddedPending";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";

const EmployeeAddForm = props => {
  const [hideButton, setHideButton] = useState(false);
  const [employeeInput, setEmployeeInput] = useState("");
  const [employeeFound, setEmployeeFound] = useState("");
  const [error, setError] = useState("");
  const [doubleAddError, setDoubleAddError] = useState(false);
  const [addedEmployees, setAddedEmployees] = useState([]);
  const [showAddSelectPending, setShowAddSelectPending] = useState(false);
  const [switchToAdded, setSwitchToAdded] = useState(false);

  function employeeInputHandler(event) {
    setHideButton(true);
    setEmployeeInput(event.target.value);
    setTimeout(() => setHideButton(false), 1200);
    setShowAddSelectPending(false);
  }

  function clearAdded() {
    setAddedEmployees([]);
  }

  function hideAdded() {
    setSwitchToAdded(false);
  }

  function employeeSearch(event) {
    event.preventDefault();
    if (employeeInput.length > 2) {
      axios
        .post("/api/employeeList/employeeSearch", {
          employeeId: employeeInput
        })
        .then(response => {
          if (response.status === 200) {
            setError("");
            setEmployeeFound(response.data.employee);
          }
          if (response.status == 204) {
            setError("No Instructors Found");
            setEmployeeFound([]);
        }
      })
        .catch(error => {
          console.log(error)
        });
    } else {
      setEmployeeFound([]);
      setError("Please fill out the name of the employee");
    }
  }

  function addEmployeeToList(newEmployee) {
    return () => {
      setDoubleAddError(false);
      let newDoubleAddedError = [];
      for (let i = 0; i < addedEmployees.length; i++) {
        if (newEmployee.id === addedEmployees[i].id) {
          newDoubleAddedError.push("You have already added this employee.");
        }
      }
      if (newDoubleAddedError.length === 0) {
        let newEmployeeList = [...addedEmployees, newEmployee];
        setAddedEmployees(newEmployeeList);
        setSwitchToAdded(true);
      } else {
        setTimeout(() => setDoubleAddError(true), 200);
      }
    };
  }

  function filterAdded(deletedPerson) {
    return () => {
      const newAdded = addedEmployees.filter(element => {
        return element.id !== deletedPerson.id;
      });
      setAddedEmployees(newAdded);
    };
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
      }}
    >
      <OtherAlert
        alertMessage={"You cannot add the same employee twice"}
        alertType={"Error"}
        showAlert={doubleAddError === true}
      />
      {(props.current || props.pending || props.addedInstructors.length) && (
        <CurrentAddedPending
          setNewDeletedCurrent={props.setNewDeletedCurrent}
          setNewDeletedPending={props.setNewDeletedPending}
          setNewPending={props.setNewPending}
          hideAdded={hideAdded}
          showAddedOveride={switchToAdded}
          current={props.current}
          added={addedEmployees}
          pending={props.pending}
          filterAdded={filterAdded}
          hideAlert={props.hideAlert}
          clearAdded={clearAdded}
        />
      )}{" "}
      <form style={{ position: "relative" }}>
        <p
          className={styles.entryError}
          id={
            (error !== "" && employeeInput.length < 3) ||
            error === "ID Not Found :("
              ? styles.entryErrorShow
              : ""
          }
        >
          {error}
        </p>
        <input
          onChange={employeeInputHandler}
          value={employeeInput}
          placeholder="Enter Unqiue Employee ID"
          id={styles.employeeSearch}
        />
        <button
          onClick={employeeSearch}
          id={hideButton ? styles.hideButton : ""}
          className={styles.searchButton}
        >
          Search
        </button>
      </form>
      {employeeFound.length &&  (
        <EmployeeToSelectList
          addEmployeeToList={addEmployeeToList}
          employeeFound={employeeFound}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin
  };
};

export default connect(mapStateToProps)(EmployeeAddForm);

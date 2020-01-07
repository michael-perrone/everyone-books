import React from "react";
import styles from "./CurrentAddedPending.module.css";
import CurrentInstructors from "./CurrentInstructors/CurrentInstructors";
import AddedInstructors from "./AddedInstructors/AddedInstructors";
import PendingInstructors from "./PendingInstructors/PendingInstructors";
import OtherAlerts from "../../../../OtherAlerts/OtherAlerts";

const CurrentAddedPending = props => {
  const [currentSelected, setCurrentSelected] = React.useState(true);
  const [addedSelected, setAddedSelected] = React.useState(false);
  const [pendingSelected, setPendingSelected] = React.useState(false);
  const [instructorsSubmitted, setInstructorsSubmitted] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [errorAddAlert, setErrorAddAlert] = React.useState(false);

  function errorAddAlertHandler() {
    setErrorAddAlert(true);
    setTimeout(() => setErrorAddAlert(false), 4200);
  }

  function instructorsSubmittedHandler() {
    setAddedSelected(false);
    setPendingSelected(true);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4200);
  }

  function selectCurrent() {
    if (!currentSelected) {
      setCurrentSelected(true);
      setAddedSelected(false);
      setPendingSelected(false);
      props.hideAdded();
    } else {
      setCurrentSelected(false);
    }
  }

  function selectAdded() {
    if (!addedSelected) {
      setAddedSelected(true);
      setCurrentSelected(false);
      setPendingSelected(false);
      setInstructorsSubmitted(false);
    } else {
      setAddedSelected(false);
    }
  }

  function selectPending() {
    if (!pendingSelected) {
      setPendingSelected(true);
      setCurrentSelected(false);
      setAddedSelected(false);
      props.hideAdded();
    } else if (props.showAddedOveride && pendingSelected) {
      setPendingSelected(true);
      setCurrentSelected(false);
      setAddedSelected(false);
      props.hideAdded();
    } else {
      props.hideAdded();
      setPendingSelected(false);
    }
  }

  return (
    <div>
      {(props.added.length > 0 ||
        props.current.length > 0 ||
        props.pending.length > 0) && (
        <div id={styles.mainContainer}>
          {props.current.length > 0 && (
            <button
              onClick={selectCurrent}
              style={{
                border:
                  currentSelected && !props.showAddedOveride
                    ? "2px solid black"
                    : ""
              }}
              className={styles.buttonSelectors}
            >
              Current
            </button>
          )}
          {props.added.length > 0 && (
            <button
              style={{
                border:
                  addedSelected || props.showAddedOveride
                    ? "2px solid black"
                    : ""
              }}
              onClick={selectAdded}
              className={styles.buttonSelectors}
            >
              Added
            </button>
          )}
          {props.pending.length > 0 && (
            <button
              style={{
                border:
                  pendingSelected && !props.showAddedOveride
                    ? "2px solid black"
                    : ""
              }}
              onClick={selectPending}
              className={styles.buttonSelectors}
            >
              Pending
            </button>
          )}
        </div>
      )}
      {props.current.length > 0 &&
        currentSelected &&
        !props.showAddedOveride && (
          <CurrentInstructors
            current={props.current}
            setNewDeletedCurrent={props.setNewDeletedCurrent}
          />
        )}
      {props.pending.length > 0 &&
        pendingSelected &&
        !props.showAddedOveride && (
          <PendingInstructors
            setNewDeletedPending={props.setNewDeletedPending}
            pending={props.pending}
          />
        )}

      <OtherAlerts
        showAlert={showAlert}
        alertType={"success"}
        alertMessage={"You have successfully invited these instructors."}
      />

      <OtherAlerts
        showAlert={errorAddAlert}
        alertType={"failure"}
        alertMessage={
          "This instructor is already current or pending at your club."
        }
      />

      {(addedSelected || props.showAddedOveride) && (
        <AddedInstructors
          errorAddAlertHandler={errorAddAlertHandler}
          clearAdded={props.clearAdded}
          filterAdded={props.filterAdded}
          addedInstructors={props.added}
          setNewPending={props.setNewPending}
          instructorsSubmittedHandler={instructorsSubmittedHandler}
        />
      )}
    </div>
  );
};

export default CurrentAddedPending;

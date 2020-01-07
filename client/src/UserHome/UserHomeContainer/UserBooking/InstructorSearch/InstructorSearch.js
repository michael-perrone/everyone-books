import React, { useState, useEffect } from "react";
import styles from "../../../../AdminHome/AdminProfileCreate/InstructorsAddForm/InstructorsAddForm.module.css";
import axios from "axios";
import otherstyles from "./InstructorSearch.module.css";
import InstructorsToSelectList from "../../../../AdminHome/AdminProfileCreate/InstructorsAddForm/InstructorsToSelectList/InstructorsToSelectList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const InstructorsAddForm = props => {
  const [error, setError] = useState("");
  const [hideButton, setHideButton] = useState(false);
  const [instructorInput, setInstructorInput] = useState("");
  const [instructorsFoundList, setInstructorsFoundList] = useState("");

  function instructorInputHandler(event) {
    setHideButton(true);
    setInstructorInput(event.target.value);
    props.searchingHandler(true);
    setTimeout(() => setHideButton(false), 1200);
  }

  function viewInstructor(instructorId) {
    return () => {
      props.history.push(`/instructor/${instructorId}`);
    };
  }

  function instructorSearch(event) {
    event.preventDefault();
    if (instructorInput.length > 2) {
      axios
        .post("/api/instructorList/instructorSearch", {
          name: instructorInput
        })
        .then(response => {
          if (response.status === 200) {
            setError("");
            setInstructorsFoundList(response.data.instructors);
          }
        })
        .catch(error => {
          if (error.response.status == 406) {
            setError("No Instructors Found");
            setInstructorsFoundList([]);
          }
        });
    } else {
      setInstructorsFoundList([]);
      setError("Please fill out the name of the instructor");
    }
  }

  return (
    <div>
      <div
        style={{
          width: "335px",
          position: "relative",
          zIndex: 101
        }}
      >
        {props.searching && (
          <p
            className={otherstyles.cancelSearch}
            onClick={() => props.searchingHandler(false)}
          >
            X
          </p>
        )}
        <form style={{ position: "relative" }}>
          <p
            className={styles.entryError}
            id={
              (error !== "" && instructorInput.length < 3) ||
              error === "No Instructors Found"
                ? styles.entryErrorShow
                : ""
            }
          >
            {error}
          </p>
          <input
            onChange={instructorInputHandler}
            value={instructorInput}
            placeholder="Instructor Search"
            id={styles.instructorSearch}
          />
          <button
            style={{ zIndex: "500", backgroundColor: "white" }}
            onClick={instructorSearch}
            id={hideButton ? styles.hideButton : ""}
            className={styles.searchButton}
          >
            Search
          </button>
        </form>
        {instructorsFoundList.length > 0 && props.searching && (
          <InstructorsToSelectList
            viewInstructor={viewInstructor}
            viewInstead={true}
            instructorsFound={instructorsFoundList}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin
  };
};

export default withRouter(connect(mapStateToProps)(InstructorsAddForm));

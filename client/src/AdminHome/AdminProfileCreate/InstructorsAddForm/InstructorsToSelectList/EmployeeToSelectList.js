import React from "react";
import styles from "./EmployeeToSelectList.module.css";

const EmployeeToSelectList = props => {
  return (
    <div id={styles.listContainer}>
      {props.employeesFound.map(employee => {
        return (
          <div id={styles.mainList}>
            <div>
              <p className={styles.listItem}>Name: {employee.name}</p>
              <p className={styles.listItem}>Profession: {employee.profession}</p>
            </div>
            {!props.viewInstead && (
              <button
                onClick={props.addInstructorToList(employee)}
                id={styles.addButton}
              >
                Add
              </button>
            )}
            {props.viewInstead && (
              <button
                id={styles.addButton}
                onClick={props.viewInstructor(employee.id)}
              >
                View
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeToSelectList;

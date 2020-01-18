import React from "react";
import styles from "./EmployeeToSelectList.module.css";

const EmployeeToSelectList = props => {
  console.log(props)
  return (
    <div id={styles.listContainer}>
      {props.employeeFound.map(employee => {
        return (
          <div id={styles.mainList}>
            <div>
              <p className={styles.listItem}>Name: {employee.name}</p>
              <p className={styles.listItem}>Profession: {employee.profession}</p>
            </div>
            {!props.viewInstead && (
              <button
                onClick={props.addEmployeeToList(employee)}
                id={styles.addButton}
              >
                Add
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeToSelectList;

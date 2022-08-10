import React from "react";
import styles from "./UserGroup.module.css";


const UserGroup = props => {
    return (
      <div  id={styles.groupContainer}>
        <p className={styles.moveLeft}>Group Name: {props.groupInfo.name} </p>
        <p className={styles.moveLeft}>At: {props.groupInfo.businessName}</p>
        <p className={styles.moveLeft}>
          Time: {props.groupInfo.time}
        </p>
        <p className={styles.moveLeft}>Date: {props.groupInfo.date}</p>
        <p className={styles.moveLeft}  >Cost: {props.groupInfo.price}</p>
          <p className={styles.moveLeft}>
            With: {props.groupInfo.employeeName}
          </p>
          
      </div>
    );
  };
  
  export default UserGroup;
  
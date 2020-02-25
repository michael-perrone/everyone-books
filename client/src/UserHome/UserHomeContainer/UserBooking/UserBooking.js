import React from "react";
import styles from "./UserBooking.module.css";

const UserBooking = props => {
  console.log(props.bookingInfo)

  return (
    <div id={styles.bookingContainer}>
      <p className={styles.moveLeft}>Service Type: {props.bookingInfo.serviceName}</p>
      <p className={styles.moveLeft}>At: {props.bookingInfo.businessName}</p>
      <p className={styles.moveLeft}>
        Time: {props.bookingInfo.timeStart} - {props.bookingInfo.timeEnd}
      </p>
      <p className={styles.moveLeft}>Date: {props.bookingInfo.date}</p>
      <p className={styles.moveLeft}  >Cost: ${props.bookingInfo.cost}</p>
      {props.bookingInfo.employeeName !== "None" ? (
        <p className={styles.moveLeft}>
          With: {props.bookingInfo.employeeName}
        </p>
        
      ) : (
        ""
      )}
    </div>
  );
};

export default UserBooking;

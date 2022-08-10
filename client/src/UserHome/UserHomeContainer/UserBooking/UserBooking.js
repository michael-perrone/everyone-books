import React from "react";
import styles from "./UserBooking.module.css";

const UserBooking = props => {
  return (
    <div id={styles.bookingContainer}>
      <p style={{lineHeight: 1.1}} className={styles.moveLeft}>Services: {props.bookingInfo.serviceNames.map((name,index) => index !== props.bookingInfo.serviceNames.length - 1 ? <label key={index} style={{display: "inline"}}>{name}, </label> 
      :  <label key={index} style={{display: "inline"}}>{name}</label>)}</p>
      <p className={styles.moveLeft}>At: {props.bookingInfo.business}</p>
      <p className={styles.moveLeft}>
        Time: {props.bookingInfo.time}
      </p>
      <p className={styles.moveLeft}>Date: {props.bookingInfo.date}</p>
      <p className={styles.moveLeft}  >Cost: {props.bookingInfo.cost}</p>
      {props.bookingInfo.employeeName !== "None" ? (
        <p className={styles.moveLeft}>
          With: {props.bookingInfo.employeeName ? props.bookingInfo.employeeName : "No Employee"}
        </p>
        
      ) : (
        ""
      )}
    </div>
  );
};

export default UserBooking;

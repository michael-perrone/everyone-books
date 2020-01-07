import React from "react";
import styles from "./UserBooking.module.css";

const UserBooking = props => {
  let court = props.bookingInfo.courtIds[0].split("")[0];
  let date = props.bookingInfo.date.split(" ");

  return (
    <div id={styles.bookingContainer}>
      <p className={styles.moveLeft}>{props.bookingInfo.bookingType}</p>
      <p className={styles.moveLeft}>Court: {court}</p>
      <p className={styles.moveLeft}>
        Date: {date[0]}-{date[1]}-{date[2]}
      </p>
      <p className={styles.moveLeft}>At: {props.bookingInfo.clubName}</p>
      <p className={styles.moveLeft}>
        Time: {props.bookingInfo.timeStart} - {props.bookingInfo.timeEnd}
      </p>
      {props.bookingInfo.instructorName !== "None" ? (
        <p className={styles.moveLeft}>
          With: {props.bookingInfo.instructorName}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserBooking;

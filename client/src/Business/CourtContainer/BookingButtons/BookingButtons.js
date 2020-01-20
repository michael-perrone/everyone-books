import React from "react";
import styles from "../CourtContainer.module.css";

const BookingButtons = props => {
  return (
    <div
      id={props.courtsClicked ? styles.showButtons : ""}
      className={styles.bookingButtonsDiv}
    >
      <button
        className={styles.courtButton}
        onClick={props.showTryingToBookModal}
      >
        Book Court
      </button>
      <button className={styles.courtButton} onClick={props.cancelBooking}>
        Cancel Booking
      </button>
    </div>
  );
};

export default BookingButtons;

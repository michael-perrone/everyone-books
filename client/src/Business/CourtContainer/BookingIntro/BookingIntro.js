import React from "react";
import styles from "./BookingIntro.module.css";

class BookingIntro extends React.Component {
  render() {
    return (
      <div id={styles.bookingIntroSubDiv}>
        <div style={{ display: "flex" }}>
          <div
            className={styles.moveButtons}
            id={styles.leftButton}
            onClick={() => {
              document.getElementById("hello").scrollLeft -= 180;
            }}
          >
            <i
              style={{ fontSize: "38px" }}
              class="fas fa-arrow-circle-left"
            ></i>
          </div>
          <p id={styles.courtP}>Booking Schedule</p>
          <div
            className={styles.moveButtons}
            id={styles.rightButton}
            onClick={() => {
              document.getElementById("hello").scrollLeft += 180;
            }}
          >
            <i
              style={{ fontSize: "38px" }}
              class="fas fa-arrow-circle-right"
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingIntro;

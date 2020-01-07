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
          <p id={styles.courtP}>Court Schedule</p>
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
        <p id={styles.bookingP}>
          You may book a court anytime from {this.props.openTime} to{" "}
          {this.props.closeTime}. To book a court, please select your preferred
          date for the booking on the calendar above. You can also choose the
          time limit of your booking, what you would like to book, and if
          needed, which instructor will be on that booking. Click on your
          selected time slot to continue.
        </p>
      </div>
    );
  }
}

export default BookingIntro;

import React from "react";
import styles from "./InstructorNotes.module.css";

class InstructorNotes extends React.Component {
  render() {
    return (
      <div
        className={styles.instructorNotes}
        id={styles.instructorNotesContainer}
      >
        <p className={styles.instructorNotes} id={styles.note}>
          Note:
        </p>
        <p className={styles.instructorNotes}>
          Once you have signed up as an instructor, you will also need your
          Tennis Club (if you work at one) to send you an invitation to
          officially link you to there club.
        </p>
        <p className={styles.instructorNotes} id={styles.thanks}>
          Thanks for signing up!
        </p>
      </div>
    );
  }
}

export default InstructorNotes;

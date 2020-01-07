import React from "react";
import styles from "./Captions.module.css";
class Captions extends React.Component {
  render() {
    return (
      <div id={styles.captionsContainerMain}>
        <div id={styles.borderTop}>
        </div>
        <div id={styles.captionsContainerSub}>
          
          <p className={styles.captions}>
            <i className="far fa-building" id={styles.icons1} /> Get connected
            to tennis clubs.
          </p>
          <p className={styles.captions}>
            <i className="fas fa-user-friends" id={styles.icons2} />
            Find other tennis players near you.
          </p>

          <p className={styles.captions}>
            <i id={styles.icons2} className="fas fa-thumbs-up" />
            Meet helpful tennis instructors.{" "}
          </p>
       
        </div>
      </div>
    );
  }
}

export default Captions;

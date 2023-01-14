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
            <i className="far fa-building" id={styles.icons1} /> Find great businesses near you.
          </p>
          <p className={styles.captions}>
            <i className="fas fa-user-friends" id={styles.icons2} />
            Easily schedule a booking.
          </p>

          <p className={styles.captions}>
            <i id={styles.icons2} className="fas fa-thumbs-up" />
            Never call front desks again!{" "}
          </p>
       
        </div>
      </div>
    );
  }
}

export default Captions;

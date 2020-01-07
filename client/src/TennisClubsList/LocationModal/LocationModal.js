import React from "react";
import styles from "./LocationModal.module.css";

function LocationModal(props) {
  return (
    <div id={styles.backDrop}>
      <div id={styles.fullModal}>
        <p id={styles.pInModal}>
          Hi there! We would like to check your location to show you tennis
          clubs that are in your area. If that's okay with you, click Share
          Location. If you do not want to share your location, thats okay too.
          You can still search clubs using the Advanced Search area at the top
          of the screen.
        </p>
        <div>
          <button onClick={props.getLocation} className={styles.modalButton}>
            <i
              style={{ marginRight: "4px", marginBottom: "4px" }}
              class="fas fa-thumbs-up"
            ></i>
            Share Location
          </button>
          <button onClick={props.locationDenied} className={styles.modalButton}>
            <i
              style={{ marginRight: "4px", marginBottom: "4px" }}
              class="fas fa-thumbs-down"
            ></i>
            Don't Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationModal;

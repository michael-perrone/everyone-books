import React from "react";
import styles from "./DropdownModal.module.css";

class DropdownModal extends React.Component {
  render() {
    let showModal = "";
    if (this.props.allInfoReadyToSend) {
      showModal = styles.showModal;
    }
    return (
      <div id={showModal} className={styles.modalContainer}>
        <div id={styles.subModalContainer}>
          <p className={styles.pInsideModal}>
            Thanks so much for entering your information{" "}
            {this.props.admin.firstName}, we just want to check and make sure we
            have all your information right. Please click the back button or
            outside of this box to go back to the forms if there are any issues.
          </p>
          <ul id={styles.itemsList}>
            <li>
              Name:{" "}
              {this.props.admin.firstName + " " + this.props.admin.lastName}
            </li>
            <li>Admin Email: {this.props.admin.email}</li>
            <li>Admin Phone: {this.props.admin.phoneNumber}</li>
            <li>Tennis Club: {this.props.admin.clubName}</li>
            <li>Street: {this.props.tennisClub.clubAddress}</li>
            <li>City: {this.props.tennisClub.clubCity}</li>
            <li>State: {this.props.tennisClub.clubState}</li>

            <li>Zipcode: {this.props.tennisClub.clubZip}</li>
            <li>Club Phone: {this.props.tennisClub.phoneNumber}</li>
            <li>Open Time: {this.props.tennisClub.clubOpenTime}</li>
            <li>Close Time: {this.props.tennisClub.clubCloseTime}</li>
          </ul>

          <button id={styles.sendAllInfo} onClick={this.props.sendAllInfo}>
            Send all Info
          </button>
          <button
            onClick={this.props.unShowConfirmModal}
            id={styles.backButton}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default DropdownModal;

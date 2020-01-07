import React from "react";
import styles from "./GoBackToAdmin.module.css";

class GoBackToAdmin extends React.Component {
  render() {
    return (
      <button
        id={styles.goBack}
        onClick={e => {
          e.preventDefault();
          this.props.unEnterAdmin();
        }}
      >
        Back
      </button>
    );
  }
}

export default GoBackToAdmin;

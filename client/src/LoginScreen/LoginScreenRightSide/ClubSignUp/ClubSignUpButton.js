import React from "react";
import styles from "./ClubSignUpButton.module.css";
import { Link } from "react-router-dom";

class ClubSignUp extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/registerBusiness">
            <button id={styles.signUpClubButton}>
              Register Your Business Here
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ClubSignUp;

import React, { useState } from "react";
import styles from "./BioForm.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";

function BioForm(props) {
  const [bio, setBio] = useState("");
  const [changingBio, setChangingBio] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  React.useEffect(() => {
    setBio(props.bio);
  }, [props.bio]);

  function submitBio() {
    Axios.post(
      "/api/clubProfile",
      { bio },
      { headers: { "x-auth-token": props.adminToken } }
    ).then(response => {
      if (response.status === 200) {
        setSuccessAlert(true);
        setTimeout(() => setSuccessAlert(false), 4400);
      }
    });
  }

  function bioHandler(event) {
    if (changingBio === false) {
      setChangingBio(true);
    }
    setBio(event.target.value);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <OtherAlert
        alertType={"success"}
        showAlert={successAlert}
        alertMessage={"Bio successfully updated"}
      />
      <textarea
        id={styles.bioForm}
        onChange={bioHandler}
        value={
          props.bio !== undefined && changingBio === false ? props.bio : bio
        }
      />
      <button
        onClick={submitBio}
        style={{ marginTop: "20px", height: "32px", width: "140px" }}
      >
        Submit Club Bio
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    adminToken: state.authReducer.adminToken
  };
};

export default connect(mapStateToProps)(BioForm);

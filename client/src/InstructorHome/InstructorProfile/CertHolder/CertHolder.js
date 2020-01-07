import React from "react";
import styles from "../BioCertsJobExpHolder/BioCertsJobExp.module.css";

function CertHolder({ profile }) {
  return (
    <div className={styles.contentHolder}>
      <p className={styles.pTagHeader}>Certificates Earned</p>
      <div style={{ display: "flex", paddingLeft: "30px" }}>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
          }}
        >
          <p style={{ textDecoration: "underline" }}>Organization</p>
          {profile.certifications.map(element => {
            return <p style={{ marginTop: "7px" }}>{element.certifiedBy}</p>;
          })}
        </div>

        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <p style={{ textDecoration: "underline" }}>Date</p>
          {profile.certifications.map(element => {
            return (
              <p style={{ marginTop: "7px" }}>{element.certificationDate}</p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CertHolder;

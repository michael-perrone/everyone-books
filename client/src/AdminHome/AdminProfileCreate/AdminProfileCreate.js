import React, { useEffect, useState } from "react";
import styles from "./AdminProfileCreate.module.css";
import { connect } from "react-redux";
import axios from "axios";
import ServicesForm from "./ServicesForm/ServicesForm";

import EmployeeAddForm from "./EmployeesAddForm/EmployeeAddForm";

const AdminProfileCreate = props => {
  const [resultsNumber, setResultsNumber] = useState(0);
  const [profile, setProfile] = useState({});
  const [profileExists, setProfileExists] = useState(true);
  const [showingEmployees, setShowingEmployees] = useState(true);
  const [showingServices, setShowingServices] = useState(false);
  const [accepted, setAccepted] = useState([]);
  const [pending, setPending] = useState([]);
  

  function setNewDeletedPending(newPending) {
    setPending(newPending);
  }

  function setNewDeletedAccepted(newAccepted) {
    setAccepted(newAccepted);
  }

  useEffect(() => {
    axios
      .get("/api/businessProfile/mybusinessForProfile", {
        headers: { "x-auth-token": props.adminToken }
      })
      .then(response => {
        if (response.status === 200) {
          setProfile(response.data.businessProfile);
          if (response.data.businessProfile.employeesToSendInvite.length > 0 || response.data.businessProfile.employeesWhoAccepted.length > 0) {
          axios
            .post(
              "/api/businessProfile/getEmployeesPendingAndAccepted",
              {
                pending: response.data.businessProfile.employeesToSendInvite,
                accepted: response.data.businessProfile.employeesWhoAccepted
              }
            )
            .then(response => {
              setAccepted(response.data.accepted);
              setPending(response.data.pending);
            });
          }
        }
      })
      .catch(error => {
        if (error && error.response.status === 406) {
          setProfileExists(false);
        }
      });
  }, []);

  function setServices() {
    setShowingServices(true);
    setShowingEmployees(false);
    // setShowingBio(false);
  }

  function setEmployees() {
    // setShowingEmployees(true);
    // setShowingBio(false);
    // setShowingServices(false);
  }

  const leftArrowClick = () => {
    // if (showingBio) {
    //   setShowingServices(true);
    //   setShowingBio(false);
    // } else if (showingServices) {
    //   setShowingEmployees(true);
    //   setShowingServices(false);
    // }
  };

  function setNewPending(newPending) {
    const newPendingArray = [...pending, ...newPending];
    setPending(newPendingArray);
  }

  const rightArrowClick = () => {
    // if (showingEmployees) {
    //   setShowingServices(true);
    //   setShowingEmployees(false);
    // } else if (showingServices) {
    //   setShowingBio(true);
    //   setShowingServices(false);
    // }
  };

  function getAmountOfResults(resultsNumber) {
    setResultsNumber(resultsNumber);
  }

  return (
    <div>
      <div id={styles.pTagAboveForm}>
        {!profileExists && (
          <p className={styles.pTag}>
              Thanks for registering! On this page you can create your profile. Here you will add employees that work at your business, give infomation about services your business offers, and also provide a small bio about your business.
          </p>
        )}
      </div>
      <div
        className={styles.mainContentHolder}
      >
        <div
          style={{ paddingTop: profileExists ? "30px" : "0px" }}
          id={styles.selectionHolder}
        >
          <i
            onClick={leftArrowClick}
            style={{
              fontSize: "22px",
              marginTop: "4px",
              marginRight: "8px",
              cursor: showingServices ? "pointer" : "",
              color: showingServices ? "black" : "lightgray"
            }}
            className="fas fa-chevron-left"
          ></i>
          <p
            onClick={setEmployees}
            className={styles.pTagsForSelection}
            id={showingEmployees ? styles.selectedPTag : ""}
          >
            Employees
          </p>
          <p
            onClick={setServices}
            className={styles.pTagsForSelection}
            id={showingServices ? styles.selectedPTag : ""}
          >
            Services
          </p>
          <p

            // onClick={setBio}
            className={styles.pTagsForSelection}
            // id={showingBio ? styles.selectedPTag : ""}
          >
            Bio
          </p>
          <i
            onClick={rightArrowClick}
            style={{
              fontSize: "22px",
              marginTop: "4px",
              marginLeft: "8px",
              cursor: showingEmployees || showingServices ? "pointer" : "",
              color:
                showingEmployees || showingServices ? "black" : "lightgray"
            }}
            className="fas fa-chevron-right"
          ></i>
        </div>
        <div
          className={styles.divHolderNotAnimated}
          id={showingEmployees ? styles.divHolderAnimated : ""}
        >
          <p className={styles.pTag}>
            You can add the employees to your business in the form below. When an employee registers with Everyone Books, they are given a special unique ID. Enter the unique ID from the employee below to add that employee.
          </p>
          <EmployeeAddForm
            setNewDeletedPending={setNewDeletedPending}
            setNewDeletedCurrent={setNewDeletedAccepted}
            setNewPending={setNewPending}
            getAmountOfResults={getAmountOfResults}
            current={accepted}
            pending={pending}
            hideAlert={showingEmployees}
          />
        </div>

        <div
          className={styles.divHolderNotAnimated}
          id={showingServices ? styles.divHolderAnimated : ""}
        >
          <p className={styles.pTag}>
            Below you can add a list of services that your business provides. Feel free to add any service that may appeal to your potential customers.
            
          </p>
          <ServicesForm profile={profile} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  adminToken: state.authReducer.adminToken,
  admin: state.authReducer.admin
});

export default connect(mapStateToProps)(AdminProfileCreate);

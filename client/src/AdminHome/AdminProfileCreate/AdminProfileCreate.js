import React, { useEffect, useState } from "react";
import styles from "./AdminProfileCreate.module.css";
import { connect } from "react-redux";
import AdminNav from "../../AdminNav/AdminNav";
import axios from "axios";
import ServicesForm from "./ServicesForm/ServicesForm";
import BioForm from "./BioForm/BioForm";
import InstructorsAddForm from "./InstructorsAddForm/InstructorsAddForm";

const AdminProfileCreate = props => {
  const [resultsNumber, setResultsNumber] = useState(0);
  const [profile, setProfile] = useState({});
  const [profileExists, setProfileExists] = useState(true);
  const [showingInstructors, setShowingInstructors] = useState(true);
  const [showingServices, setShowingServices] = useState(false);
  const [showingBio, setShowingBio] = useState(false);
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
      .get("/api/clubProfile/myclub", {
        headers: { "x-auth-token": props.adminToken }
      })
      .then(response => {
        if (response.status === 200) {
          setProfile(response.data.clubProfile);
          axios
            .post(
              "/api/clubProfile/getInstructorsPendingAndAccepted",
              {
                pending: response.data.clubProfile.instructorsToSendInvite,
                accepted: response.data.clubProfile.instructorsWhoAccepted
              }
            )
            .then(response => {
              setAccepted(response.data.accepted);
              setPending(response.data.pending);
            });
        }
      })
      .catch(error => {
        if (error && error.response.status === 406) {
          setProfileExists(false);
        }
      });
  }, []);

  function setBio() {
    setShowingBio(true);
    setShowingServices(false);
    setShowingInstructors(false);
  }

  function setServices() {
    setShowingServices(true);
    setShowingInstructors(false);
    setShowingBio(false);
  }

  function setInstructors() {
    setShowingInstructors(true);
    setShowingBio(false);
    setShowingServices(false);
  }

  const leftArrowClick = () => {
    if (showingBio) {
      setShowingServices(true);
      setShowingBio(false);
    } else if (showingServices) {
      setShowingInstructors(true);
      setShowingServices(false);
    }
  };

  function setNewPending(newPending) {
    const newPendingArray = [...pending, ...newPending];
    setPending(newPendingArray);
  }

  const rightArrowClick = () => {
    if (showingInstructors) {
      setShowingServices(true);
      setShowingInstructors(false);
    } else if (showingServices) {
      setShowingBio(true);
      setShowingServices(false);
    }
  };

  function getAmountOfResults(resultsNumber) {
    setResultsNumber(resultsNumber);
  }

  return (
    <div>
      {props.admin && <AdminNav />}
      <div id={styles.pTagAboveForm}>
        {!profileExists && (
          <p className={styles.pTag}>
            Thanks for signing up your club on Tennis Mate. To finish up the
            process, we ask that you add a bit more information about your club
            so we can give our users an accurate depiction of your Tennis Club.
            You can add the instructors at your tennis club, the services your
            club provides, and a small bio about your club as well. If you have
            any questions feel free to contact us.
          </p>
        )}
      </div>
      <div
        style={{
          height:
            resultsNumber < 4 ? "640px" : `${640 + (resultsNumber - 3) * 68}px`
        }}
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
              cursor: showingBio || showingServices ? "pointer" : "",
              color: showingBio || showingServices ? "black" : "lightgray"
            }}
            className="fas fa-chevron-left"
          ></i>
          <p
            onClick={setInstructors}
            className={styles.pTagsForSelection}
            id={showingInstructors ? styles.selectedPTag : ""}
          >
            Instructors
          </p>
          <p
            onClick={setServices}
            className={styles.pTagsForSelection}
            id={showingServices ? styles.selectedPTag : ""}
          >
            Services
          </p>
          <p
            onClick={setBio}
            className={styles.pTagsForSelection}
            id={showingBio ? styles.selectedPTag : ""}
          >
            Bio
          </p>
          <i
            onClick={rightArrowClick}
            style={{
              fontSize: "22px",
              marginTop: "4px",
              marginLeft: "8px",
              cursor: showingInstructors || showingServices ? "pointer" : "",
              color:
                showingInstructors || showingServices ? "black" : "lightgray"
            }}
            className="fas fa-chevron-right"
          ></i>
        </div>
        <div
          className={styles.divHolderNotAnimated}
          id={showingInstructors ? styles.divHolderAnimated : ""}
        >
          <p className={styles.pTag}>
            You can add instructors in the form below. If they have made a
            profile with us, you should be able to add them in no time. If they
            haven't made a profile with us. Please have them do so and you will
            then be able to register them as instructor of your club. Once you
            add an instructor a message will be sent to this instructor
            notifying them that you have registered them as an instructor. If
            they accept your request, they will be registered as an instructor
            at your club.
          </p>
          <InstructorsAddForm
            setNewDeletedPending={setNewDeletedPending}
            setNewDeletedCurrent={setNewDeletedAccepted}
            setNewPending={setNewPending}
            getAmountOfResults={getAmountOfResults}
            current={accepted}
            pending={pending}
            hideAlert={showingInstructors}
          />
        </div>

        <div
          className={styles.divHolderNotAnimated}
          id={showingServices ? styles.divHolderAnimated : ""}
        >
          <p className={styles.pTag}>
            Add some services that your club provides. Below we have some
            default services that most tennis clubs provide. These services are
            tennis lessons, group clinics, racquet stringing, a summer program,
            tournaments, and if your club offers a gym. You can check yes or no
            depending on if your tennis club provides that service. You can also
            add your own services below. You can always update these later on.{" "}
          </p>
          <ServicesForm profile={profile} />
        </div>
        <div
          className={styles.divHolderNotAnimated}
          id={showingBio ? styles.divHolderAnimated : ""}
        >
          <p className={styles.pTag}>
            Here you can add a bio that describes your club. This bio will
            provide more information to those interested in learning more about
            your tennis club. You can also include any additional services,
            activites, and other great things about your club. The bio will be
            limited to 400 characters. You can always update your clubs bio
            later.
          </p>
          <BioForm bio={profile.bio} />
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

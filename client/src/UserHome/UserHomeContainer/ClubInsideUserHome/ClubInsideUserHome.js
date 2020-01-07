import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./ClubInsideUserHome.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import { BOOK_A_COURT } from "../../../actions/actions";

const ClubInsideUserHome = props => {
  function bookACourt() {
    props.bookACourt();
    props.history.push(`/clubs/${props.club.clubNameAllLower}`);
  }

  function goToClub() {
    props.history.push(`/clubs/${props.club.clubNameAllLower}`);
  }

  function unfollowClub() {
    let objectToSend = {
      tennisClubId: props.club._id,
      userId: props.user.user.id
    };
    Axios.post("/api/userSubscribe/unfollow", objectToSend).then(response => {
      if (response.status === 200) {
        props.setNewClubs(response.data.tennisClubsAfterFilter);
      }
    });
  }

  return (
    <div id={styles.userClubContainer}>
      <div id={styles.leftContainer} className={styles.userSubContainer}>
        <p style={{ fontWeight: "bold" }} className={styles.clubItem}>
          {props.club.clubName}
        </p>
        <p className={styles.clubItem}>{props.club.address}</p>
        <p className={styles.clubItem}>{props.club.city}</p>
        <p className={styles.clubItem}>{props.club.state}</p>
        <p className={styles.clubItem}>{props.club.phoneNumber}</p>
        <p className={styles.clubItem}>
          {props.club.clubOpenTime} - {props.club.clubCloseTime}
        </p>
      </div>
      <div
        id={styles.rightContainer}
        className={styles.userSubContainer}
        id={styles.buttonsContainer}
      >
        <button className={styles.clubButton} onClick={unfollowClub}>
          Unfollow Club
        </button>
        <button className={styles.clubButton} onClick={goToClub}>
          View This Club
        </button>
        <button className={styles.clubButton} onClick={bookACourt}>
          Book A Court
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bookACourt: () => dispatch({ type: BOOK_A_COURT })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClubInsideUserHome)
);

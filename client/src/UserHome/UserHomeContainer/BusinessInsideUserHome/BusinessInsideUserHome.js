import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./BusinessInsideUserHome.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import { BOOK_A_COURT } from "../../../actions/actions";

const BusinessInsideUserHome = props => {
  function bookACourt() {
    props.bookACourt();
    props.history.push(`/businesses/${props.business._id}`);
  }

  function unfollowBusiness() {
    let objectToSend = {
      businessId: props.business._id,
      userId: props.user.user.id
    };
    Axios.post("/api/userSubscribe/unfollow", objectToSend).then(response => {
      if (response.status === 200) {
        props.unfollowBusiness();
      }
    });
  }

  return (
    <div id={styles.userClubContainer}>
      <div id={styles.leftContainer} className={styles.userSubContainer}>
        <p style={{ fontWeight: "bold" }} className={styles.businessItem}>
          {props.business.businessName}
        </p>
        <p className={styles.businessItem}>{props.business.address}</p>
        <p className={styles.businessItem}>{props.business.city}</p>
        <p className={styles.businessItem}>{props.business.state}</p>
        <p className={styles.businessItem}>{props.business.phoneNumber}</p>
        <p className={styles.businessItem}>{props.business.website}</p>
      </div>
      <div className={styles.centerContainer}>
        {props.business.schedule.map((daySchedule, index) => {
          let day = "";
          if (index === 0) {
            day = "Sun:"
          }
          else if (index === 1) {
            day ="Mon:"
          } 
          else if (index === 2) {
            day ="Tue:"
          }       
          else if (index === 3) {
            day ="Wed:"
          }       
          else if (index === 4) {
            day ="Thu:"
          }       
          else if (index === 5) {
            day ="Fri:"
          }
          else if (index === 6) {
            day ="Sat:"
          }  
         return <div key={index} style={{marginTop: '8px', marginBottom: '8px', display: 'flex', position: "relative", left: "40px"}}> <p style={{marginRight: '3px'}}>{day}</p><p>{daySchedule.open}-{daySchedule.close}</p></div>                  
         })}
      </div>
      <div
        className={styles.userSubContainer}
        id={styles.buttonsContainer}
      >
           <button className={styles.clubButton} onClick={bookACourt}>
          View Business
        </button>
        <button style={{backgroundColor: "lavenderblush"}} className={styles.clubButton} onClick={unfollowBusiness}>
          Unfollow Business
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
  connect(mapStateToProps, mapDispatchToProps)(BusinessInsideUserHome)
);

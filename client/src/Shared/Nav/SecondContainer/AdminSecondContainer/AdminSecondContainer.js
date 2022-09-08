import React from "react";
import styles from "../../Nav.module.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  SHOW_SCHEDULE,
  SHOW_NOTIFICATIONS,
  ADMIN_LOGOUT,
  SHOW_CREATE_BOOKING
} from "../../../../actions/actions";
import DropDown from "../../DropDown/DropDown";
import Axios from "axios";

const AdminSecondContainer = props => {
  const [notiNum, setNotiNum] = React.useState(0);


  // function getSecondBiggest(array) {
  //   let oldBiggest = array[0];
  //   let newBiggest = array[0];
  //   for (let i = 0; i < array.length; i++) {
  //       if (array[i] > newBiggest) {
  //         oldBiggest = newBiggest;
  //         newBiggest = array[i];
  //       }
  //       else if (array[i] > oldBiggest) {
  //         oldBiggest = array[i];
  //       }
  //     }
  //     if (oldBiggest === newBiggest) {
  //       oldBiggest = array[1];
  //       newBiggest = array[1];
  //       for (let i = 1; i < array.length; i++) {
  //         if (array[i] > newBiggest) {
  //           oldBiggest = newBiggest;
  //           newBiggest = array[i];
  //         }
  //         else if (array[i] > oldBiggest) {
  //           oldBiggest = array[i];
  //         }
  //       }
  //       oldBiggest = newBiggest;
  //     }
  //     return oldBiggest;
  //   }


  // function sortArray(array) {
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i])
  //   }
  // }


  function goToEditBusiness() {
    props.history.push(`/admin/${props.admin.admin.id}/createeditprofile`)
  } 


  function goToAdminNotifications() {
    props.history.push(`/admin/${props.admin.admin.id}/notifications`)
   } 

  React.useEffect(function () {
    Axios.get("/api/notifications/getAdminNotiNumber", {headers: {'x-auth-token': props.adminToken}}).then(function(response) {
      if (response.status === 200) {
        setNotiNum(response.data.num);
      }
    })
  }, [])

  return (
    <React.Fragment>
      <div id={styles.secondContainer}>
            <p
            style={{ cursor: "pointer" }}
            className={styles.links}
            onClick={goToEditBusiness}
            >
            Edit Business
            </p>
            <p
            style={{ cursor: "pointer" }}
            className={styles.links}
            onClick={goToAdminNotifications}
            >
            Notifications {notiNum !== 0 && <label style={{fontFamily: "initial", cursor: "pointer", color: "red", border: "1px solid red", padding: "4px 8px", position: "relative", top: "-3px", fontWeight: "bold", borderRadius: "60%", fontSize: "16px"}}>{notiNum}</label>}
            </p>
        <DropDown/>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    adminLogout: () => dispatch({ type: ADMIN_LOGOUT }),
    showNotifications: () => dispatch({ type: SHOW_NOTIFICATIONS })
  };
};

const mapStateToProps = state => {
  return {
    showDropDownState: state.booleanReducers.showDropDown,
    showNotificationsState: state.booleanReducers.showNotifications,
    admin: state.authReducer.admin,
    adminToken: state.authReducer.adminToken
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminSecondContainer)
);

import React from "react";
import styles from "../../Nav.module.css";
import axios from "axios";
import { connect } from "react-redux";
import DropDown from "../../DropDown/DropDown";
// import Notifications from "../../../../Notifications/Notifications";

import {withRouter} from 'react-router-dom';

const UserSecondContainer = props => {
  const [notiNum, setNotiNum] = React.useState(0);
  const [counter, setCounter] = React.useState(0);


  function goToNotifications() {
    props.history.push(`/user/${props.user.user.id}/notifications`);
    props.hideDropDown();
  }

  React.useEffect(() => {
    let num = setInterval(() => {
      setCounter(counter + 1)
    }, 20000);
    return () => clearInterval(num);
  })
  
  React.useEffect(function() {
    axios.post('/api/notifications/checkUserNotiNumber', {notiNum}, {headers: {'x-auth-token': props.token}}).then(
      response => {
        if (response.status === 201) {
          setNotiNum(response.data.num);
        }
      }
    )
  }, [counter])


  return (
    <div id={styles.secondContainer}>
      <p onClick={goToNotifications} className={styles.links}>Notifications {notiNum !== 0 && <label style={{fontFamily: "initial", cursor: "pointer", color: "red", border: "1px solid red", padding: "4px 8px", position: "relative", top: "-3px", fontWeight: "bold", borderRadius: "60%", fontSize: "16px"}}>{notiNum}</label>}</p>
      {/* {newNotifications.length > 0 && !props.showDropDownState && <NotificationNumber user={true} num={newNotifications.length}/>} */}
      {/* {props.showNotifications && (
        <Notifications notifications={notifications} />
      )} */}
      <DropDown/>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showDropDownState: state.booleanReducers.showDropDown,
    token: state.authReducer.token,
    showNotifications: state.booleanReducers.showNotifications,
    user: state.authReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(UserSecondContainer));

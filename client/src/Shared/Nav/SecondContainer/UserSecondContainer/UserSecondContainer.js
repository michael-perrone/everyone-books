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

  function viewBusinesses() {
    props.history.push('/businesslist')
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
      <p onClick={viewBusinesses} className={styles.links}>View Businesses</p>
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
    showNotifications: state.booleanReducers.showNotifications
  };
};

export default withRouter(connect(mapStateToProps)(UserSecondContainer));

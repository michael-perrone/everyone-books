import React from 'react';
import DropDownLink from '../DropDownLink/DropDownLink';
import {SHOW_NOTIFICATIONS, ADMIN_LOGOUT, REMOVE_CREATE_STATE} from '../../../../actions/actions'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const AdminDropDown = (props) => {
  
   function goHome() {
    props.history.push("/")
   } 

  function goToShifts() {
    props.history.push(`/admin/${props.admin.admin.businessId}/businessSchedule`)
  }

  function goToSettings() {
    props.history.push(`/`);
  }

  function goToGroups() {
    props.history.push(`/admin/${props.admin.admin.businessId}/groups`)
  }

  function adminLogout() {
    props.logoutAdmin()
    props.removeCreateState();
    props.history.push('/')
  }

    return (
        <React.Fragment>
          <DropDownLink clickProp={goHome}>
            Home
          </DropDownLink>
          <DropDownLink clickProp={goToGroups}>
            Groups
            </DropDownLink>
          <DropDownLink clickProp={goToSettings}>
            Settings
          </DropDownLink>
          <DropDownLink clickProp={goToShifts}>
            Shifts
          </DropDownLink>
          <DropDownLink clickProp={adminLogout}>
            Logout
          </DropDownLink>
          </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    showNotifications: () => dispatch({type: SHOW_NOTIFICATIONS}),
    logoutAdmin: () => dispatch({type: ADMIN_LOGOUT}),
    removeCreateState: () => dispatch({type: REMOVE_CREATE_STATE})
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AdminDropDown));

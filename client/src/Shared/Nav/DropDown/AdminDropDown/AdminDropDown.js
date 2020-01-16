import React from 'react';
import DropDownLink from '../DropDownLink/DropDownLink';
import {SHOW_NOTIFICATIONS, ADMIN_LOGOUT} from '../../../../actions/actions'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const AdminDropDown = (props) => {

   function goToFinancials() {
       props.history.push(`/admin/${props.admin.admin.id}/financials`)
   } 

  
  function editProfile() {
    props.history.push(`/instructor/${props.admin.admin.id}/createeditprofile`)
  }

  function goToSettings() {
    props.history.push(`/instructor/${props.instructorProfile.instructor._id}/settings`)
  }

  function adminLogout() {
    props.logoutAdmin()
    props.history.push('/')
  }

    return (
        <React.Fragment>
          <DropDownLink clickProps={goToFinancials}>
            Analytics
          </DropDownLink>
          <DropDownLink clickProps={goToSettings}>
            Settings
          </DropDownLink>
          <DropDownLink clickProp={editProfile}>
            Edit Business
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
    logoutAdmin: () => dispatch({type: ADMIN_LOGOUT})
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AdminDropDown));

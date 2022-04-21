import React from 'react';
import DropDownLink from '../DropDownLink/DropDownLink';
import {SHOW_NOTIFICATIONS, ADMIN_LOGOUT, REMOVE_CREATE_STATE} from '../../../../actions/actions'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const AdminDropDown = (props) => {

   function goHome() {
     console.log('HELLLOO')
    console.log(`/admin/${props.admin.admin.id}`)
    props.history.push(`/admin/${props.admin.admin.id}`)
   } 

  function editProfile() {
    console.log(props.admin.admin.id)
    props.history.push(`/admin/${props.admin.admin.id}/createeditprofile`)
  }

  function goToSettings() {
    props.history.push(`/admin/${props.admin.admin.id}/settings`)
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
          <DropDownLink clickProp={goToSettings}>
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
    logoutAdmin: () => dispatch({type: ADMIN_LOGOUT}),
    removeCreateState: () => dispatch({type: REMOVE_CREATE_STATE})
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AdminDropDown));

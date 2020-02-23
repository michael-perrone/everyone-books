import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserHomeContainer from "./UserHomeContainer/UserHomeContainer";

const UserHome = props => {
  return (
    <React.Fragment>
      <UserHomeContainer
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    userToken: state.authReducer.token
  };
};

export default withRouter(connect(mapStateToProps)(UserHome));

import React, {useEffect, useState} from "react";
import styles from "./Nav.module.css";
import axios from "axios";
import Title from "./Title/Title";
import SecondContainer from "./SecondContainer/SecondContainer";
import {connect} from 'react-redux';

function Nav(props) {
  
  useEffect(function() {
  }, [props.adminToken])
    return (
      <React.Fragment>
        <div id={styles.navBarContainer}>
          <Title />
          <SecondContainer />
        </div>
      </React.Fragment>
    );
}

const mapStateToProps = state => {
  return {
    adminToken: state.authReducer.adminToken
  }
}

export default connect(mapStateToProps)(Nav);

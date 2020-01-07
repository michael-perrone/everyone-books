import React from "react";
import styles from "./Nav.module.css";
import axios from "axios";
import Title from "./Title/Title";
import SecondContainer from "./SecondContainer/SecondContainer";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
      notifications: "",
      newNotifications: [],
      profile: {}
    };
  }

  render() {
    return (
      <React.Fragment>
        <div id={styles.navBarContainer}>
          <Title />
          <SecondContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Nav;

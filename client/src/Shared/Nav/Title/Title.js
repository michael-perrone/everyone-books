import React from "react";
import styles from "../Nav.module.css";
import {withRouter} from 'react-router';

function Title(props) {

  function clickTitle() {
    props.history.push("/")
  }

  return <p onClick={clickTitle} id={styles.title}>Everyone Books</p>;
};

export default withRouter(Title);

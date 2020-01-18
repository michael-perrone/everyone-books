import React from "react";
import styles from "./Title.module.css";

class Title extends React.Component {
  render() {
    return (
        <p id={styles.title}>
          Everyone Books
        </p>
    );
  }
}

export default Title;

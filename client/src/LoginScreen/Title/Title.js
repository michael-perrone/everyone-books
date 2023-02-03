import React from "react";
import styles from "./Title.module.css";
import logo from './yoo.png';

class Title extends React.Component {
  render() {
    return (
      <div>
        <p id={styles.title}>
          Everyone Books
        </p>
        <img className={styles.ah} src={logo}/>
        </div>
    );
  }
}

export default Title;

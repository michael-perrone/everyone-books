import React from "react";
import styles from "./LoginScreen.module.css";
import Title from "./Title/Title";
import LoginScreenRightSide from "./LoginScreenRightSide/LoginScreenRightSide";
import Captions from "./Captions/Captions";
import LoginForm from "./LoginForm/LoginForm";

class LoginScreen extends React.Component {
  render() {
    return (
      
        <div className={styles.loginScreenContainer} id={styles.loginScreenContainer}>
        <div className={styles.loginScreenContainer+" " +styles.coverDiv}>
          <div id={styles.loginScreenLeftSide}>
            <LoginForm />
            <Captions />
            <Title />
          </div>
          <LoginScreenRightSide />
        </div>
      </div>
    );
  }
}

export default LoginScreen;

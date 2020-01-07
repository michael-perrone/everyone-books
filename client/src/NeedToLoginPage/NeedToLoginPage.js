import React from "react";
import styles from "./NeedToLoginPage.module.css";
import { withRouter } from "react-router-dom";
import LoginForm from "../LoginScreen/LoginForm/LoginForm";
import UserRegisterForm from "../LoginScreen/LoginScreenRightSide/UserRegisterForm/UserRegisterForm";
import tennisNetCropped from "./TennisnetCropped.jpg";
import tennisBall from "./tennis-ball.png";

class NeedToLoginPage extends React.Component {
  render() {
    return (
      <div id={styles.mainContainer}>
        <div id={styles.loginFormLeftSide}>
          <div id={styles.pTagContainer}>
            <p
              style={{
                padding: "20px",
                fontSize: "14px",
                boxShadow: "0px 0px 6px black"
              }}
            >
              To see the clubs that have signed up for our site, you must be
              logged in as a user or be added as an instructor by this club. We
              do this to protect our clubs privacy. We hope you understand.
            </p>
          </div>
          <div id={styles.maybeGone}>
            <img id={styles.tennisBall} src={tennisBall}></img>
            <img style={{ width: "360px" }} src={tennisNetCropped} alt="net" />
          </div>
        </div>
        <div id={styles.registerFormRightSide}>
          <LoginForm
            alignSelf={"flex-end"}
            paddingBottom={"30px"}
            borderBottom={"2px solid white"}
            background={"black"}
            errorColor={"#ff4d4d"}
          />
          <UserRegisterForm />
        </div>
      </div>
    );
  }
}

export default withRouter(NeedToLoginPage);

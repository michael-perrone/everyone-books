/* eslint-disable no-useless-escape */
import React from "react";
import styles from './AdminSignup.module.css';
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SAVE_ADMIN_INFO, ADMIN_INFO_COMPLETE, SAVE_BUSINESS_INFO } from "../../actions/actions";
import Alert from "../../Alert/Alert";
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from "constants";
import OtherAlert from '../../OtherAlerts/OtherAlerts';



const AdminSignup = (props) => {
    const [formError, setFormError] = React.useState(false)
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [firstNameDirty, setFirstNameDirty] = React.useState(false);
    const [lastNameDirty, setLastNameDirty] = React.useState(false);
    const [emailDirty, setEmailDirty] = React.useState(false);
    const [passwordDirty, setPasswordDirty] = React.useState(false);
    const [passwordConfirmDirty, setPasswordConfirmDirty] = React.useState(false);


    function firstNameHandler(e) {
        setFirstName(e.target.value)
    }

    function lastNameHandler(e) {
        setLastName(e.target.value)
    }

    function emailHandler(e) {
        setEmail(e.target.value)
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    function confirmPasswordHandler(e) {
        setPasswordConfirm(e.target.value)
    }

    function firstNameHandlerDirty() {
        setFirstNameDirty(true)
    }

    function lastNameHandlerDirty() {
        setLastNameDirty(true)
    }

    function emailHandlerDirty() {
        setEmailDirty(true)
    }

    function passwordHandlerDirty() {
        setPasswordDirty(true)
    }

    function confirmPasswordHandlerDirty() {
        setPasswordConfirmDirty(true)
    }

    function storeAdminInfoInRedux() {
      /*       setFormError(false)
        if (firstName === "" || lastName === "" || !validateEmail(email) || password === "" || passwordConfirm !== password) {
            setTimeout(() => setFormError(true), 200)
            
        }
        else { */
        const admin = {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm
        }
        props.saveAdminInfo(admin)
    // }
}

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };
    


    return (
        <React.Fragment>
        <OtherAlert showAlert={formError} alertMessage={"Please check the information you've entered."}/>
        <div id={styles.adminSignUpContainer}>
        <div className={styles.inputContainer}>
            <input onBlur={firstNameHandlerDirty} placeholder="First Name" className={styles.adminInput} onChange={firstNameHandler}/>
            {firstName === "" && firstNameDirty === true && <Alert top={'25px'} alertPhrase={"Field Cannot Be Blank"}/>}
            </div>
            <div className={styles.inputContainer}>
            <input onBlur={lastNameHandlerDirty} placeholder="Last Name" className={styles.adminInput} onChange={lastNameHandler}/>
            {lastName === "" && lastNameDirty === true && <Alert top={'25px'} alertPhrase={"Field Cannot Be Blank"}/>}
            </div>
            <div className={styles.inputContainer}>
            <input onBlur={emailHandlerDirty} placeholder="Email" className={styles.adminInput} onChange={emailHandler}/>
            {!validateEmail(email) && emailDirty === true && <Alert top={'25px'} alertPhrase={"Not a Valid Email"}/>}
            </div>
            <div className={styles.inputContainer}>
            <input type="password" onBlur={passwordHandlerDirty} placeholder="Password" className={styles.adminInput} onChange={passwordHandler}/>
            {password.length < 7 && passwordDirty === true && <Alert top={'25px'} alertPhrase={"Must be eight characters or more"}/>}
            </div>
            <div className={styles.inputContainer}>
            <input type='password' onFocus={confirmPasswordHandlerDirty} placeholder="Confirm Password" className={styles.adminInput} onChange={confirmPasswordHandler}/>
            {passwordConfirm !== password && passwordConfirmDirty === true && <Alert top={'25px'} alertPhrase={"Passwords do not match"}/>}
            </div>
            <SubmitButton onClick={storeAdminInfoInRedux}>This is my Info!</SubmitButton>
        </div>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        saveAdminInfo: (adminInfo) => dispatch({type: SAVE_ADMIN_INFO, payload: adminInfo}),
    }
}

export default connect(null, mapDispatchToProps)(AdminSignup);

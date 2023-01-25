import React from 'react';
import styles from '../AdminSignup/AdminSignup.module.css';
import Alert from '../../Alert/Alert';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import {connect} from 'react-redux';
import {SAVE_BUSINESS_INFO, SET_BUSINESS_INFO_COMPLETE} from '../../actions/actions';

const BusinessInfoEnter = (props) => {
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [website, setWebsite] = React.useState('')
    const [addressDirty, setAddressDirty] = React.useState(false);
    const [cityDirty, setCityDirty] = React.useState(false);
    const [stateDirty, setStateDirty] = React.useState(false);
    const [zipDirty, setZipDirty] = React.useState(false);
    const [phoneNumberDirty, setPhoneNumberDirty] = React.useState(false);
    const [goodToGo, setGoodToGo] = React.useState(true)

    function validatePhone(phone) {
        let newRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return newRe.test(phone);
      };

    function websiteHandler(e) {
        setWebsite(e.target.value)
    }

    function addressHandler(e) {
        setAddress(e.target.value)
    }

    function cityHandler(e) {
        setCity(e.target.value)
    }

    function stateHandler(e) {
        setState(e.target.value)
    }

    function zipHandler(e) {
        setZip(e.target.value)
    }

    function phoneNumberHandler(e) {
        setPhoneNumber(e.target.value)
    }

    function addressHandlerDirty() {
        setAddressDirty(true)
    }

    function cityHandlerDirty() {
        setCityDirty(true)
    }

    function stateHandlerDirty() {
        setStateDirty(true)
    }

    function zipHandlerDirty() {
        setZipDirty(true)
    }

    function phoneNumberHandlerDirty() {
        setPhoneNumberDirty(true)
    }

    function storeAdminInfoInRedux() {
        if (!validatePhone(phoneNumber) || city === "" || state === "" || zip === "" || phoneNumber === "" || address === "") {
            setGoodToGo(false);
            return;
        }
        const business = {
            address,
            city,
            state,
            zip,
            phoneNumber,
            website
        }
        props.saveBusinessInfo(business)
        props.setBusinessInfoComplete() 
    }


   return (
       <div>
            <div style={{height: "400px"}} id={styles.adminSignUpContainer}>
            <div className={styles.inputContainer}>
            <input onBlur={addressHandlerDirty} placeholder="Street Address" className={styles.adminInput} onChange={addressHandler}/>
            {address === "" && addressDirty === true && <Alert top={'25px'} alertPhrase={"Field Cannot Be Blank"}/>}
            </div>
            <div className={styles.inputContainer}>
            <input onBlur={cityHandlerDirty} placeholder="City" className={styles.adminInput} onChange={cityHandler}/>
            {city === "" && cityDirty === true && <Alert top={'25px'} alertPhrase={"Field Cannot Be Blank"}/>}
            </div>
            <div className={styles.inputContainer}>
            <select style={{width: '258px'}} onBlur={stateHandlerDirty} placeholder="State" className={styles.adminInput} onChange={stateHandler}>
              <option>State</option>
              <option>AL</option>
              <option>AK</option>
              <option>AZ</option>
              <option>AR</option>
              <option>CA</option>
              <option>CO</option>
              <option>CT</option>
              <option>DE</option>
              <option>FL</option>
              <option>GA</option>
              <option>HI</option>
              <option>ID</option>
              <option>IL</option>
              <option>IN</option>
              <option>IA</option>
              <option>KS</option>
              <option>KY</option>
              <option>LA</option>
              <option>ME</option>
              <option>MD</option>
              <option>MA</option>
              <option>MI</option>
              <option>MN</option>
              <option>MS</option>
              <option>MO</option>
              <option>MT</option>
              <option>NE</option>
              <option>NV</option>
              <option>NH</option>
              <option>NJ</option>
              <option>NM</option>
              <option>NY</option>
              <option>NC</option>
              <option>ND</option>
              <option>OH</option>
              <option>OK</option>
              <option>OR</option>
              <option>PA</option>
              <option>RI</option>
              <option>SC</option>
              <option>SD</option>
              <option>TN</option>
              <option>TX</option>
              <option>UT</option>
              <option>VT</option>
              <option>VA</option>
              <option>WA</option>
              <option>WV</option>
              <option>WI</option>
              <option>WY</option>
            </select>
            {state === "" && stateDirty === true && <Alert top={'25px'} alertPhrase={"Not a Valid state"}/>}
            </div>
            <div className={styles.inputContainer}>
            <input onBlur={zipHandlerDirty} placeholder="Zip Code" className={styles.adminInput} onChange={zipHandler}/>
            {zip.length < 4 && zipDirty === true && <Alert top={'25px'} alertPhrase={"Not a valid Zip Code"}/>}
            </div>
            <div className={styles.inputContainer}>
            <input onBlur={phoneNumberHandlerDirty} placeholder="Phone Number" className={styles.adminInput} onChange={phoneNumberHandler}/>
            {!validatePhone(phoneNumber) && phoneNumberDirty === true && <Alert top={'25px'} alertPhrase={"Not a Valid Phone number"}/>}
            </div>
            
            <input placeholder="Business Website (If applicable)" className={styles.adminInput} onChange={websiteHandler}></input>
            {!goodToGo && <Alert bottom={"170px"} right={""} top={""} alertPhrase={"Please fill in required info above"}/>}
            <SubmitButton marginTop={"20px"} onClick={storeAdminInfoInRedux}>Let's Finish Up!</SubmitButton>
        </div>
       </div>
   ) 
}

const mapDispatchToProps = (dispatch) => {
    return {
    setBusinessInfoComplete: () => dispatch({type: SET_BUSINESS_INFO_COMPLETE}),
    saveBusinessInfo: (businessInfo) => dispatch({type: SAVE_BUSINESS_INFO, payload: businessInfo}),
    }
}

export default connect(null, mapDispatchToProps)(BusinessInfoEnter);

import React, {useState} from 'react';
import styles from '../BusinessSignup.module.css'
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import {connect} from 'react-redux';
import {ENTER_BUSINESS_SCHEDULE} from '../../actions/actions';
import Alert from '../../Alert/Alert';
import {badTimes} from '../../feutils/feutils';
import {withRouter} from 'react-router';

const BusinessScheduleCreate = (props) => {
   const [sundayOpen, setSundayOpen] = useState(localStorage.getItem("sundayOpen") ? localStorage.getItem("sundayOpen") : 'Open');
   const [sundayClose, setSundayClose] = useState(localStorage.getItem("sundayClose") ? localStorage.getItem("sundayClose") : 'Close');
   const [mondayOpen, setMondayOpen] = useState(localStorage.getItem("mondayOpen") ? localStorage.getItem("mondayOpen") : "Open");
   const [mondayClose, setMondayClose] = useState(localStorage.getItem("mondayClose") ? localStorage.getItem("mondayClose") : 'Close');
   const [tuesdayOpen, setTuesdayOpen] = useState(localStorage.getItem("tuesdayOpen") ? localStorage.getItem("tuesdayOpen") : 'Open');
   const [tuesdayClose, setTuesdayClose] = useState(localStorage.getItem("tuesdayClose") ? localStorage.getItem("tuesdayClose") : 'Close');
   const [wednesdayOpen, setWednesdayOpen] = useState(localStorage.getItem("wednesdayOpen") ? localStorage.getItem("wednesdayOpen") : 'Open');
   const [wednesdayClose, setWednesdayClose] = useState(localStorage.getItem("wednesdayClose") ? localStorage.getItem("wednesdayClose") : 'Close');
   const [thursdayOpen, setThursdayOpen] = useState(localStorage.getItem("thursdayOpen") ? localStorage.getItem("thursdayOpen") : 'Open');
   const [thursdayClose, setThursdayClose] = useState(localStorage.getItem("thursdayClose") ? localStorage.getItem("thursdayClose") : 'Close');
   const [fridayOpen, setFridayOpen] = useState(localStorage.getItem("fridayOpen") ? localStorage.getItem("fridayOpen") : 'Open');
   const [fridayClose, setFridayClose] = useState(localStorage.getItem("fridayClose") ? localStorage.getItem("fridayClose") : 'Close');
   const [saturdayOpen, setSaturdayOpen] = useState(localStorage.getItem("saturdayOpen") ? localStorage.getItem("saturdayOpen") : 'Open');
   const [saturdayClose, setSaturdayClose] = useState(localStorage.getItem("saturdayClose") ? localStorage.getItem("saturdayClose") : 'Close');
   const [notComplete, setNotComplete] = useState(false);
   const [timeError, setTimeError] = useState(false);


   function enterWholeBusinessArray() {
      if (sundayOpen === "Open" || sundayClose === "Close" || mondayOpen === "Open" || mondayClose === "Close" ||
       tuesdayOpen === "Open" || tuesdayClose === "Close" || wednesdayOpen === "Open" || wednesdayClose === "Close" || thursdayOpen === "Open" || thursdayClose === "Close" || 
       fridayOpen === "Open" || fridayClose === "Close" || saturdayOpen === "Open" || saturdayClose === "Close" ) {
            setTimeError(false);
            setNotComplete(true);
            return;
       }
       if (badTimes(sundayOpen, sundayClose) || badTimes(mondayOpen, mondayClose) || badTimes(tuesdayOpen, tuesdayClose) || badTimes(wednesdayOpen, wednesdayClose) || 
       badTimes(thursdayOpen, thursdayClose) || badTimes(fridayOpen, fridayClose) || badTimes(saturdayOpen, saturdayClose)) {
            console.log("ANYONE");
            setTimeError(true);
            return;
       }
       else {
          setTimeError(false);
       }
      let businessArray = [
      {open: sundayOpen, close: sundayClose},
      {open: mondayOpen, close: mondayClose},
      {open: tuesdayOpen, close: tuesdayClose},
      {open: wednesdayOpen, close: wednesdayClose},
      {open: thursdayOpen, close: thursdayClose},
      {open: fridayOpen, close: fridayClose},
      {open: saturdayOpen, close: saturdayClose}
   ]
      props.enterBusinessSchedule(businessArray);
      if (localStorage.getItem("typeOfBusiness") === "Restaurant") {
         props.history.push("/restaurantBuilder");
      }
   }

   function sundayOpenHandler(e){
      localStorage.setItem("sundayOpen", e.target.value);
      setSundayOpen(e.target.value)
   }

   function sundayCloseHandler(e) {
      localStorage.setItem("sundayClose", e.target.value);
      setSundayClose(e.target.value)
   }


   function mondayOpenHandler(e){
      localStorage.setItem("mondayOpen", e.target.value);
      setMondayOpen(e.target.value)
   }

   function mondayCloseHandler(e) {
      localStorage.setItem("mondayClose", e.target.value);
      setMondayClose(e.target.value)
   }

   function tuesdayOpenHandler(e){
      localStorage.setItem("tuesdayOpen", e.target.value);
      setTuesdayOpen(e.target.value)
   }

   function tuesdayCloseHandler(e) {
      localStorage.setItem("tuesdayClose", e.target.value);
      setTuesdayClose(e.target.value)
   }

   function wednesdayOpenHandler(e){
      localStorage.setItem("wednesdayOpen", e.target.value);
      setWednesdayOpen(e.target.value)
   }

   function wednesdayCloseHandler(e) {
      localStorage.setItem("wednesdayClose", e.target.value);
      setWednesdayClose(e.target.value)
   }

   function thursdayOpenHandler(e){
      localStorage.setItem("thursdayOpen", e.target.value);
      setThursdayOpen(e.target.value)
   }

   function thursdayCloseHandler(e) {
      localStorage.setItem("thursdayClose", e.target.value);
      setThursdayClose(e.target.value)
   }

   function fridayOpenHandler(e) {
      localStorage.setItem("fridayOpen", e.target.value);
      setFridayOpen(e.target.value)
   }

   function fridayCloseHandler(e) {
      localStorage.setItem("fridayClose", e.target.value);
      setFridayClose(e.target.value)
   }

   function saturdayOpenHandler(e) {
      localStorage.setItem("saturdayOpen", e.target.value);
      setSaturdayOpen(e.target.value)
   }

   function saturdayCloseHandler(e) {
      localStorage.setItem("saturdayClose", e.target.value);
      setSaturdayClose(e.target.value)
   }


    return (
        <div style={{height: '452px', marginTop: '80px', position: 'relative'}} id={styles.formContainer}>
              <div className={styles.daySeparator} >
              <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Sunday:</p>
                <span>Open: </span>
                  <select value={sundayOpen} onChange={sundayOpenHandler}>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
                <span style={{marginLeft: '14px'}}>Close: </span>
                 <select value={sundayClose} onChange={sundayCloseHandler}>
                    <option>Close</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
              </div>
              <div className={styles.daySeparator}>
              <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Monday:</p>
                <span>Open: </span>
                  <select value={mondayOpen} onChange={mondayOpenHandler}>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
                <span style={{marginLeft: '14px'}}>Close: </span>
                 <select value={mondayClose} onChange={mondayCloseHandler}>
                    <option>Close</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
              </div>

              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Tuesday:</p>
                <span>Open: </span>
                  <select value={tuesdayOpen} onChange={tuesdayOpenHandler}>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
                <span style={{marginLeft: '14px'}}>Close: </span>
                 <select value={tuesdayClose} onChange={tuesdayCloseHandler}>
                    <option>Close</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
              </div>
              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Wednesday:</p>
               <span>Open: </span>
                  <select value={wednesdayOpen} onChange={wednesdayOpenHandler}>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
                <span style={{marginLeft: '14px'}}>Close: </span>
                 <select value={wednesdayClose} onChange={wednesdayCloseHandler}>
                    <option>Close</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
              </div>
              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Thursday:</p>
                <span>Open: </span>
                  <select value={thursdayOpen} onChange={thursdayOpenHandler}>
                    <option>Open</option>
                    <option >Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
                <span style={{marginLeft: '14px'}}>Close: </span>
                 <select value={thursdayClose} onChange={thursdayCloseHandler}>
                    <option>Close</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
              </div>
              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Friday:</p>
                <span>Open: </span>
                  <select value={fridayOpen} onChange={fridayOpenHandler}>
                    <option>Open</option>
                    <option >Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
                <span style={{marginLeft: '14px'}}>Close: </span>
                 <select value={fridayClose} onChange={fridayCloseHandler}>
                    <option>Close</option>
                    <option>Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
              </div>
              <div style={{borderBottom: 'none'}} className={styles.daySeparator}>
              <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Saturday:</p>
                <span>Open: </span>
                  <select value={saturdayOpen} onChange={saturdayOpenHandler}>
                    <option>Open</option>
                    <option >Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
                <span style={{marginLeft: '14px'}}>Close: </span>
                 <select value={saturdayClose} onChange={saturdayCloseHandler}>
                    <option>Close</option>
                    <option >Closed</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                 </select>
              </div>
              <div>
                 {(timeError || notComplete) && <Alert bottom={"0px"} top={"none"} right={"20%"} alertPhrase={timeError ? "Close times must be after open" : "Open/close info not complete"}/>}
                <SubmitButton marginTop={"30px"} onClick={enterWholeBusinessArray}>Continue On!</SubmitButton>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
   return {
      typeOfBusiness: state.newReducers.kindOfBusiness
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      enterBusinessSchedule: (businessSchedule) => dispatch({type: ENTER_BUSINESS_SCHEDULE, payload: businessSchedule})  
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusinessScheduleCreate));
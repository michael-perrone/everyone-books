import React, {useState} from 'react';
import styles from '../BusinessSignup.module.css'
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import {connect} from 'react-redux';
import {ENTER_BUSINESS_SCHEDULE} from '../../actions/actions';

const BusinessScheduleCreate = (props) => {
   const [sundayOpen, setSundayOpen] = useState('Closed');
   const [sundayClose, setSundayClose] = useState('Closed');
   const [mondayOpen, setMondayOpen] = useState('Closed');
   const [mondayClose, setMondayClose] = useState('Closed');
   const [tuesdayOpen, setTuesdayOpen] = useState('Closed');
   const [tuesdayClose, setTuesdayClose] = useState('Closed');
   const [wednesdayOpen, setWednesdayOpen] = useState('Closed');
   const [wednesdayClose, setWednesdayClose] = useState('Closed');
   const [thursdayOpen, setThursdayOpen] = useState('Closed');
   const [thursdayClose, setThursdayClose] = useState('Closed');
   const [fridayOpen, setFridayOpen] = useState('Closed');
   const [fridayClose, setFridayClose] = useState('Closed');
   const [saturdayOpen, setSaturdayOpen] = useState('Closed');
   const [saturdayClose, setSaturdayClose] = useState('Closed');


   function enterWholeBusinessArray() {
   let businessArray = [
      {open: sundayOpen, close: sundayClose},
      {open: mondayOpen, close: mondayClose},
      {open: tuesdayOpen, close: tuesdayClose},
      {open: wednesdayOpen, close: wednesdayClose},
      {open: thursdayOpen, close: thursdayClose},
      {open: fridayOpen, close: fridayClose},
      {open: saturdayOpen, close: saturdayClose}
   ]
      props.enterBusinessSchedule(businessArray)
   }

   function sundayOpenHandler(e){
      setSundayOpen(e.target.value)
   }

   function sundayCloseHandler(e) {
      setSundayClose(e.target.value)
   }


   function mondayOpenHandler(e){
      setMondayOpen(e.target.value)
   }

   function mondayCloseHandler(e) {
      setMondayClose(e.target.value)
   }

   function tuesdayOpenHandler(e){
      setTuesdayOpen(e.target.value)
   }

   function tuesdayCloseHandler(e) {
      setTuesdayClose(e.target.value)
   }

   function wednesdayOpenHandler(e){
      setWednesdayOpen(e.target.value)
   }

   function wednesdayCloseHandler(e) {
      setWednesdayClose(e.target.value)
   }

   function thursdayOpenHandler(e){
      setThursdayOpen(e.target.value)
   }

   function thursdayCloseHandler(e) {
      setThursdayClose(e.target.value)
   }

   function fridayOpenHandler(e){
      setFridayOpen(e.target.value)
   }

   function fridayCloseHandler(e) {
      setFridayClose(e.target.value)
   }

   function saturdayOpenHandler(e){
      setSaturdayOpen(e.target.value)
   }

   function saturdayCloseHandler(e) {
      setSaturdayClose(e.target.value)
   }


    return (
        <div style={{height: '452px', marginTop: '8px', position: 'relative'}} id={styles.formContainer}>
        <div style={{position: 'absolute', bottom: '-42px'}}><SubmitButton onClick={enterWholeBusinessArray}>Continue On!</SubmitButton></div>
              <div className={styles.daySeparator} >
              <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Sunday:</p>
                <span>Open: </span>
                  <select onChange={sundayOpenHandler}>
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
                 <select onChange={sundayCloseHandler}>
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
              <div className={styles.daySeparator}>
              <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Monday:</p>
                <span>Open: </span>
                  <select onChange={mondayOpenHandler}>
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
                 <select onChange={mondayCloseHandler}>
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

              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Tuesday:</p>
                <span>Open: </span>
                  <select onChange={tuesdayOpenHandler}>
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
                 <select onChange={tuesdayCloseHandler}>
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
              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Wednesday:</p>
               <span>Open: </span>
                  <select onChange={wednesdayOpenHandler}>
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
                 <select onChange={wednesdayCloseHandler}>
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
              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Thursday:</p>
                <span>Open: </span>
                  <select onChange={thursdayOpenHandler}>
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
                 <select onChange={thursdayCloseHandler}>
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
              <div className={styles.daySeparator}>
               <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Friday:</p>
                <span>Open: </span>
                  <select onChange={fridayOpenHandler}>
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
                 <select onChange={fridayCloseHandler}>
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
              <div style={{borderBottom: 'none'}} className={styles.daySeparator}>
              <p style={{width: '100%', textAlign: 'center', marginBottom: '7px'}}>Saturday:</p>
                <span>Open: </span>
                  <select onChange={saturdayOpenHandler}>
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
                 <select onChange={saturdayCloseHandler}>
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
            
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
   return {
      enterBusinessSchedule: (businessSchedule) => dispatch({type: ENTER_BUSINESS_SCHEDULE, payload: businessSchedule})  
   }
}

export default connect(null, mapDispatchToProps)(BusinessScheduleCreate);
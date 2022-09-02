import React, {useState, useEffect} from 'react';
import styles from './BookTable.module.css';
import DateDrop from '../../../Shared/DateDrop/DateDrop';
import TimeList from '../../../Shared/TimeList/TimeList';
import {intToStringTime, createMaplist, getTimeRightAway, getTs} from '../../../feutils/feutils';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';
import axios from 'axios';
import {connect} from 'react-redux';
import StatementAppear from '../../../Shared/StatementAppear/StatementAppear';
import OtherAlert from '../../../OtherAlerts/OtherAlerts';


const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

function BookTable(props) {
    const [dateString, setDateString] = useState("");
    const [time, setTime] = useState("");
    const [times, setTimes] = useState([]);
    const [numOfPeople, setNumOfPeople] = useState("1");
    const [estTime, setEstTime] = useState("30 Minutes");
    const [canSendRequest, setCanSendRequest] = useState(false)
    const [ft, setft] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(function() {
        if (dateString && props.business.schedule) {
          console.log("yoooo");
          console.log(props.business);
          const day = new Date(dateString).getDay();
          console.log(day);
          const open = props.business.schedule[day].open;
          const close = props.business.schedule[day].close;
          console.log(getTs(open,close));
          const array = getTs(open,close);
        setTimes(array);
        setTime(intToStringTime[array[0]])
        }
    },[dateString, props.business])

    function toSetTime(time) {
        console.log("hello");
        setTime(time);
    }

    function toSetDateString(dateString1) {
        setDateString(dateString1)
    }

    function checkAvailability() {
        axios.post('/api/restaurant/userTableRequest', {time, numOfPeople, dateString, businessId: props.business._id, estTime}, {headers: {'x-auth-token': props.token}}).then(response => {
            if (response.status === 200) {
                setCanSendRequest(true);
                setft(time);
            }
        }).catch(error => {
            if (error.response.status === 406) {
                setError("");
                setTimeout(() => setError("There are no tables available at this time."), 200);
            }
            else if (error.response.status === 405) {
                setError("");
                setTimeout(() => setError("This time has already passed."), 200);
            }
        })
    }


    function sendRequest() {
        axios.post('/api/restaurant/sendRequest', {ft, numOfPeople, estTime, dateString, businessId: props.business._id, userId: props.user.id, name: props.user.name}, {headers: {'x-auth-token': props.token}}).then(response => {
            if (response.status === 200) {
                setSuccessMessage("");
                setTimeout(() => setSuccessMessage("Your table request has been sent!"), 200)
                setTimeout(() => setCanSendRequest(false), 500);
            }
        }).catch(error => {
            setError("");
            setTimeout(() => setError("The request cannot be submitted at this time."), 200);
        })
    }

    return <div id={styles.container}>
        <p style={{width: "100%", fontSize: "24px", textAlign: "center", marginTop: "6px"}}>Reserve Table</p>
        <div style={{marginTop: "10px", display: "flex" }}>
                <p style={{marginRight: "10px", marginTop: "2px"}} className={styles.ptags}>Select Date:</p>
                <DateDrop setDateString={(dateString) => toSetDateString(dateString)}/>
              </div>
              <div style={{marginTop: "22px", display: "flex"}}>
                <p style={{marginTop: "2px"}}>Estimated Sit Time:</p>
                <select style={{padding: "2px 0px", marginLeft: "6px"}} onChang={(e) => setEstTime(e.target.value)}>
                    <option>30 Minutes</option>
                    <option>40 Minutes</option>
                    <option>45 Minutes</option>
                    <option>50 Minutes</option>
                    <option>1 Hour</option>
                    <option>1 Hour 15 Minutes</option>
                    <option>1 Hour 30 Minutes</option>
                    <option>1 Hour 45 Minutes</option>
                    <option>2 Hours</option>
                </select>
            </div>
            <div style={{marginTop: "22px", display: "flex"}}>
                    <p style={{marginRight: "10px", marginTop: "3px"}}>Number of People at Table:</p>
                    <select onChange={(e) => setNumOfPeople(e.target.value)}>
                        {array.map(num => <option>{num}</option>)}
                    </select>
              </div>
              <div style={{marginTop: "23px", display: "flex"}}>
                   <p style={{position: "relative", top: "4px", marginRight: "10px"}} className={styles.ptags}>Select Time:</p>
                  <TimeList time={time} times={times} setTime={(time) => toSetTime(time)}/>
              </div>
           
 
              <div style={{marginTop: "22px", display: "flex", justifyContent: "center"}}>
                  <SubmitButton onClick={checkAvailability}>Check Availability</SubmitButton> 
            </div>
            {}
            <StatementAppear appear={canSendRequest}>
            <p style={{marginTop: "22px", padding: "0px 30px", textAlign: "left"}}>A table is open at {ft}. Would you like to send a request?</p>
              <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
              <SubmitButton marginTop={24} onClick={sendRequest}>Yes, send request!</SubmitButton> 
        </div>
       
            </StatementAppear>
            <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""}/>
    </div>
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        user: state.authReducer.user.user
    }
}

export default connect(mapStateToProps)(BookTable);
import React, { useEffect, useState } from 'react';
import styles from './EmployeeNotifications.module.css';
import axios from 'axios';
import {connect} from 'react-redux';
import EmployeeNotification from '../../Notifications/EmployeeNotification/EmployeeNotification';
import MessageView from './../../Notifications/MessageView/MessageView';
import Axios from 'axios';

function EmployeeNotifications(props) {

    const [notifications, setNotifications] = useState();
    const [type, setType] = useState("");
    const [chosen, setChosen] = useState();
    const [noNotis, setNoNotis] = useState("");

    function changeNotis(newNoti) {
        const notiRep = [...notifications];
        notiRep.shift();
        notiRep.unshift(newNoti);
        setNotifications(notiRep);
    }

    function toSetChosen(notification, type) {
            setType(type)
            setChosen(notification)
    }

    function notiClicked(notification) { // check this no reason to send so much back
        axios.post("/api/notifications/changeToRead", {notificationId: notification._id}).then(response => {
            if (response.status == 200) {
                const newerNotis = [...notifications];
                newerNotis.shift();
                newerNotis.unshift(response.data.notification);
                setNotifications(newerNotis);
            }
        })
    }

    

    useEffect(function() {
        axios.get("/api/notifications/employeeNotifications", {headers: {'x-auth-token' : props.employeeToken}}).then(
            response => {
                if (response.status === 200) {
                    if (response.data.notifications.length) {
                        const data = response.data.notifications;
                        const flippedNotis = [];
                        let i = response.data.notifications.length - 1;
                        while (i >= 0) {
                            flippedNotis.push(data[i]);
                            console.log(data[i])
                            i--;
                        }
                        console.log(flippedNotis)
                        setNotifications(flippedNotis);
                        setChosen(flippedNotis[0]);
                        if (flippedNotis[0].type === "BAE") { 
                            setType("Choice");
                        }
                        else if (flippedNotis[0].type === "BAER" || flippedNotis[0].type === "BAW" || flippedNotis[0].type === "BAWR") { 
                            setType("Alert");
                        }
                        else if (flippedNotis[0].type === "UBU") {
                            setType("Booking");
                        }
                        else if (flippedNotis[0].type === "AAUR") { 
                            setType("Alert")
                        }
                        else if (flippedNotis[0].type === "EAUR") {
                            setType("Alert");
                        }
                    }
                    else {
                        setNoNotis(true);
                    }
                }
            }
        )
    },[])

    return (
            <div id={styles.frame}>
             <div id={styles.notificationsContainer}>
             <p style={{fontSize: "28px", marginTop: "10px", position: "absolute", top: "-50px", left: "100px"}}>Notifications</p>
                {noNotis && <p style={{padding: "20px", lineHeight: "22px"}}>You do not have any notifications yet! When a business invites you to join their business or when a business accepts or declines your request to join their business as an employee you will see it here!</p>}
                {notifications && notifications.length > 0 && (
                    <div>
                        {notifications.map(notification => {
                            return (
                                <EmployeeNotification notificationClicked={notiClicked} chosen={chosen} toSetChosen={toSetChosen} notification={notification}/> 
                            )
                        })}
                    </div>
                )}
            </div>
            {!noNotis && <MessageView changeNotis={changeNotis} toSetChosen={toSetChosen} notification={chosen} type={type}/>}
            </div>
    )
}

const mapStateToProps = state => {
    return {
        employeeToken: state.authReducer.employeeToken
    }
}

export default connect(mapStateToProps)(EmployeeNotifications);
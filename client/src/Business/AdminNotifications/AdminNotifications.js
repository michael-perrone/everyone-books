import React, { useEffect, useState } from 'react';
import styles from './AdminNotifications.module.css';
import axios from 'axios';
import {connect} from 'react-redux';
import AdminNotification from '../../Notifications/AdminNotification/AdminNotification';
import YesNoNotification from '../../Notifications/YesNoNotification/YesNoNotification';
import MessageView from './../../Notifications/MessageView/MessageView';
import Axios from 'axios';

function AdminNotifications(props) {

    const [notifications, setNotifications] = useState();
    const [fakeNotifications, setFakeNotifications] = useState([]);
    const [type, setType] = useState("");
    const [chosen, setChosen] = useState();

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

    function notiClicked(notification) { // check this... this is lazy to request so much back and bad practice
        if (notification.type === "ERY" || notification.type === "BAW" || notification.type === "ELB" || notification.type === "BBY" || notification.type === "YURA" || notification.type === "UATG" || notification.type === "ERN") {
            Axios.post('/api/notifications/changeToRead', {notificationId: notification._id}).then(response => {
                if (response.status === 200) {
                    axios.get("/api/notifications/getAdminNotis", {headers: {'x-auth-token' : props.adminToken}}).then(
                        response => {
                            if (response.status === 200) {
                                const data = response.data.notifications;
                                const flippedNotis = [];
                                let i = response.data.notifications.length - 1;
                                while (i >= 0) {
                                    flippedNotis.push(data[i]);
                                    i--;
                                }
                                setNotifications(flippedNotis);
                            }
                        }
                    )
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    

    useEffect(function() {
        axios.get("/api/notifications/getAdminNotis", {headers: {'x-auth-token' : props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    const data = response.data.notifications;
                    const flippedNotis = [];
                    let i = response.data.notifications.length - 1;
                   
                    while (i >= 0) {
                        flippedNotis.push(data[i]);
                        i--;
                    }
                    setNotifications(flippedNotis);
                    setChosen(flippedNotis[0]);
                    if (data.length === 0) {
                        return;
                    }
                    if (flippedNotis[0].type === "ESIDDR") { 
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "ERN" || flippedNotis[0].type === "ERNR") {
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "ESID") { 
                        setType("Choice")
                    }
                    else if (flippedNotis[0].type === "ERY" || flippedNotis[0].type === "ERYR") { 
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "ELBR" || flippedNotis[0].type === "ELB") { 
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "YDER") { 
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "AAUR") { 
                        setType("Alert")
                    }
                    else if (flippedNotis[0].type === "EAUR") {
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "ADUR") { 
                        setType("Alert")
                    }
                    else if (flippedNotis[0].type === "UBU") {
                        setType("Booking");
                    }
                }
            }
        )
    },[])

    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
             <p style={{marginTop: "20px", fontSize: "20px", fontWeight: "bold"}}>Notifications Center</p>
            <div style={{display: "flex", justifyContent: 'space-around', width: "100%", marginTop: "20px"}}> 
             <div id={styles.notificationsContainer}>
                {notifications && notifications.length === 0 && <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold", marginTop: "10px"}}>You do not have any notifications!</p>}
                {notifications && notifications.length > 0 && (
                    <div>
                        {notifications.map(notification => {
                            console.log(notification)
                            return (
                                <AdminNotification notificationClicked={notiClicked} chosen={chosen} toSetChosen={toSetChosen} notification={notification}/> 
                            )
                        })}
                    </div>
                )}
            </div>
            <MessageView changeNotis={changeNotis} toSetChosen={toSetChosen} notification={chosen} type={type}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapStateToProps)(AdminNotifications);
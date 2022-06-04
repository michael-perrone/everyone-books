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
    const [type, setType] = useState("");
    const [chosen, setChosen] = useState();

    function changeNotis(newNoti) {
        const notiRep = [...notifications];
        for (let i = 0; i < notiRep.length; i++) {
            if (newNoti._id === notiRep[i]._id) {
                notiRep[i].type = newNoti.type;
            }
        }
        setNotifications(notiRep);
    }

    function toSetChosen(notification, type) {
            setType(type)
            setChosen(notification)
    }

    function notiClicked(notification) {
        console.log(notification)
        if (notification.type === "ERY" || notification.type === "BAR" || notification.type === "ELB" || notification.type === "BBY" || notification.type === "YURA" || notification.type === "UATG" || notification.type === "ERN") {
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
                                    console.log(data[i])
                                    i--;
                                }
                                console.log(flippedNotis)
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
                        console.log(data[i])
                        i--;
                    }
                    console.log(flippedNotis)
                    setNotifications(flippedNotis);
                    setChosen(flippedNotis[0]);
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
                    else if (flippedNotis[0].type === "ADUR") { 
                        setType("Alert")
                    }
                }
            }
        )
    },[])

    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: 'space-around', width: "100%", marginTop: "20px"}}>
             <div id={styles.notificationsContainer}>
             <p style={{fontSize: "28px", marginTop: "10px", position: "absolute", top: "-50px", left: "100px"}}>Notifications</p>
                {notifications && notifications.length === 0 && <p>You do not have any notifications!</p>}
                {notifications && notifications.length > 0 && (
                    <div>
                        {notifications.map(notification => {
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
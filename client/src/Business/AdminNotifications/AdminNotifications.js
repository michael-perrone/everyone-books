import React, { useEffect, useState } from 'react';
import styles from './AdminNotifications.module.css';
import axios from 'axios';
import {connect} from 'react-redux';
import AdminNotification from '../../Notifications/AdminNotification/AdminNotification';
import YesNoNotification from '../../Notifications/YesNoNotification/YesNoNotification';
import MessageView from './../../Notifications/MessageView/MessageView';
import Axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';

function AdminNotifications(props) {

    const [notifications, setNotifications] = useState();
    const [typeo, setType] = useState("");
    const [chosen, setChosen] = useState();
    const [eq, setEq] = useState("");
    const [bct, setBct] = useState(""); 
    const [bcn, setBcn] = useState("");
    const [loading, setLoading] = useState(true);
    const [notiNum, setNotiNum] = useState();
    const [counter, setCounter] = useState(0);

    function changeNotis(newNoti) {
        const allNotis = [...notifications];
        for (let i = 0; i < notifications.length; i++) {
            if (newNoti._id === allNotis[i]._id) {
                allNotis[i].type = newNoti.type;
            }
        }
        setNotifications(allNotis);
    }

    function alterType(type, notification) {
        const allNotis = [...notifications];
        for (let i = 0; i < notifications.length; i++) {
            if (notification._id === allNotis[i]._id) {
                allNotis[i].type = type;
            }
        }
        setType("Alert");
        reduceNotiNum();
        setNotifications(allNotis);
    }

    function reduceNotiNum() {
        setNotiNum(notiNum - 1);
    }

    function removeDeadNoti(id) {
        const notificationsCopy = notifications;
        const updatedNotis = notificationsCopy.filter(e => {
            return e._id !== id;
        })
        setNotifications(updatedNotis);
        if (chosen._id === id) {
            setChosen(updatedNotis[0]);
        }
    }

    // React.useEffect(() => {
    //     let num = setInterval(() => {
    //       setCounter(counter + 1)
    //     }, 20000);
    //     return () => clearInterval(num);
    //   })
    
    //   React.useEffect(function() {
    //         if (!notifications) {
    //             return
    //         }
    //         let numbo = 0;
    //         for (let i = 0; i < notifications.length; i++) {
    //             if (notifications[i].type.split("")[notifications[i].type.length - 1] !== "R") {
    //                 numbo++;
    //             }
    //         }
    //         Axios.post('/api/notifications/checkAdminNotis', {notiNum: numbo}, {headers: {'x-auth-token': props.adminToken}}).then(
    //             response => {
    //                 if (response.status === 201) {
    //                     const newNotis = [...response.data.newNotis, ...notifications];
    //                     setNotifications(newNotis);
                     
    //                 }
    //             }
    //           )
    //   }, [counter])

    // function notiClicked(notification) { // check this... this is lazy to request so much back and bad practice
    //     if (notification.type === "ERY" || notification.type === "BAW" || notification.type === "ELB" || notification.type === "BBY" || notification.type === "YURA" || notification.type === "UATG" || notification.type === "ERN") {
    //         Axios.post('/api/notifications/changeToRead', {notificationId: notification._id}).then(response => {
    //             if (response.status === 200) {
    //                 console.log("Hello?");
    //                 reduceNotiNum();
    //                 axios.get("/api/notifications/getAdminNotis", {headers: {'x-auth-token' : props.adminToken}}).then(
    //                     response => {
    //                         if (response.status === 200) {
    //                             const data = response.data.notifications;
    //                             const flippedNotis = [];
    //                             let i = response.data.notifications.length - 1;
    //                             while (i >= 0) {
    //                                 flippedNotis.push(data[i]);
    //                                 i--;
    //                             }
    //                             setNotifications(flippedNotis);
    //                         }
    //                     }
    //                 )
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //     }
    // }

    function notiClicked(notification, type) {
        if (chosen._id !== notification._id) {
             setChosen(notification); 
        }
        // check this no reason to send so much back --- awful
        if (notification.type.split("")[notification.type.length - 1] !== "R" && typeo === "Alert" && type !== "Booking") {
            axios.post("/api/notifications/changeToRead", {notificationId: notification._id}).then(response => {
                if (response.status == 200) {
                    reduceNotiNum();
                    const newerNotis = [...notifications];
                    for (let i = 0; i < newerNotis.length; i++) {
                        if (newerNotis[i]._id === notification._id) {
                            newerNotis[i].type = notification.type + "R";
                        }
                    }
                    setNotifications(newerNotis);
                }
            })
        }
        setType(type);
    }

    

    useEffect(function() {
        setLoading(true);
        axios.get("/api/notifications/getAdminNotis", {headers: {'x-auth-token' : props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setLoading(false);
                    setBcn(response.data.bcn)
                    setBct(response.data.bct);
                    setEq(response.data.eq);
                    let dotiNum = response.data.notifications.length;
                    for (let i = 0; i < response.data.notifications.length; i++) {
                        const arr = response.data.notifications[i].type.split("");
                        if (arr[arr.length - 1] === "R") {
                            dotiNum = dotiNum - 1;
                        }
                    }
                    setNotiNum(dotiNum);
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
                    if (flippedNotis[0].type === "UBT" || flippedNotis[0].type === "UBTR") {
                        setType("Choice");
                    }
                    if (flippedNotis[0].type === "ESIDDR") { 
                        setType("Alert");
                    }
                    if (flippedNotis[0].type === "EIB" || flippedNotis[0].type === "EIBR") {
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
                setLoading(false);
            }
        )
    },[])

    return (
        loading ? <Spinner/> :
        <div id={styles.bigContainer} style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
             <p style={{marginTop: "30px", fontSize: "24px", fontFamily: "Josefin Sans", fontWeight: "bold", marginBottom: "20px"}}>Notifications Center</p>
            <div id={styles.mainContainer}> 
            {notifications && notifications.length === 0 && <p id={styles.alsoYo} style={{fontSize: "16px", marginTop: "10px",  lineHeight: "24px"}}>You do not have any notifications yet. There are many reasons why your business may get a notification so be sure to keep an eye on your notifications tab! Some of the reasons you may get a notification include users requesting a booking or asking to join a group. Make sure you add some services on the business edit page otherwise your business won't be able to schedule services. </p>}
            {notifications && notifications.length > 0 && (  <div id={styles.notificationsContainer}>
                
                    <div>
                        {notifications.map((notification,index) => {
                            return (
                                <AdminNotification count={notifications.length} notificationClicked={notiClicked} chosen={chosen} index={index} notification={notification}/> 
                            )
                        })}
                    </div>
                
            </div>)}
            <div id={styles.yooooo} style={{display: 'flex', flexDirection: "column", justifyContent: "space-between", height: "160px"}}>
                <SubmitButton>Go To Edit Business</SubmitButton>
                <SubmitButton>Go To Advertisements</SubmitButton>
                <SubmitButton>Go To Group Schedule</SubmitButton>
                
            </div>
            {notifications && notifications.length > 0 && <MessageView notiClicked={notiClicked} alterType={alterType} reduceNotiNum={reduceNotiNum} removeDeadNoti={removeDeadNoti} bcn={bcn} eq={eq} bct={bct} changeNotis={changeNotis} notification={chosen} type={typeo}/>}
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
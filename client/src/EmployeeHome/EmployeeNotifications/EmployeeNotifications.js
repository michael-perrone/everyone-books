import React, { useEffect, useState } from 'react';
import styles from './EmployeeNotifications.module.css';
import axios from 'axios';
import {connect} from 'react-redux';
import EmployeeNotification from '../../Notifications/EmployeeNotification/EmployeeNotification';
import MessageView from './../../Notifications/MessageView/MessageView';
import Axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import Advertisement from '../../Shared/Advertisement/Advertisement';

function EmployeeNotifications(props) {

    const [notifications, setNotifications] = useState();
    const [typeo, setType] = useState("Alert");
    const [chosen, setChosen] = useState();
    const [noNotis, setNoNotis] = useState("");
    const [counter, setCounter] = useState(0);
    const [notiNum, setNotiNum] = useState();
    const [loading, setLoading] = useState(true);
    const [eq, setEq] = useState();
    const [bcn, setBcn] = useState();
    const [bct, setBct] = useState();
    const [ads, setAds] = useState([]);

    React.useEffect(function() {
        Axios.post("/api/ads/getRandomE", {limit: 3}).then(response => {
            setAds(response.data.ads);
        })
    }, [])

    function denied(id) {
        const notiCopy = [...notifications];
        for (let i = 0; i < notiCopy.length; i++) {
            if (notiCopy[i]._id === id) {
                notiCopy[i].o = "BAEDR";
            }
        }
        setType("Alert");
        setNotifications(notiCopy);
    }

    function reduceNotiNum() {
        setNotiNum(notiNum - 1);
    }

    function changeNotis(newNoti) {
        const allNotis = [...notifications];
        for (let i = 0; i < notifications.length; i++) {
            if (newNoti._id === allNotis[i]._id) {
                allNotis[i].type = newNoti.type;
            }
        }
        setNotifications(allNotis);
    }

    function removeDeadNoti(id) {
        const notificationsCopy = [...notifications];
        const updatedNotis = notificationsCopy.filter(e => {
            return e._id !== id;
        })
        setNotifications(updatedNotis);
        if (chosen._id === id) {
            setChosen(updatedNotis[0]);
        }
    }

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

    React.useEffect(() => {
        let num = setInterval(() => {
          setCounter(counter + 1)
        }, 20000);
        return () => clearInterval(num);
      })
    
      React.useEffect(function() {
        if (notiNum !== undefined) {
            let notiNumToSend = 0;
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].type.split("")[notifications[i].type.length - 1] !== "R") {
                    notiNumToSend++;
                }
            }
            console.log(notiNumToSend);
            Axios.post('/api/notifications/checkEmployeeNotis', {notiNum: notiNumToSend}, {headers: {'x-auth-token': props.employeeToken}}).then(
                response => {
                    if (response.status === 201) {
                        const newNotis = [...response.data.newNotis, ...notifications];
                        setNotifications(newNotis);
                        setNotiNum(notiNum + 1);
                    }
                }
              )
          }
      }, [counter])

    

    useEffect(function() {
        axios.get("/api/notifications/employeeNotifications", {headers: {'x-auth-token' : props.employeeToken}}).then(
            response => {
                if (response.status === 200) {
                    if (response.data.notifications.length) {
                        setEq(response.data.eq)
                        setBcn(response.data.bcn);
                        setBct(response.data.bct);
                        const data = response.data.notifications;
                        const flippedNotis = [];
                        let counta = 0;
                        let i = response.data.notifications.length - 1;
                        while (i >= 0) {
                            flippedNotis.push(data[i]);
                            if (response.data.notifications[i].type.split("")[response.data.notifications[i].type.length - 1] !== "R") {
                                counta++;
                            } 
                            i--;
                        }
                        setNotiNum(counta);
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
                        else if (flippedNotis[0].type === "BDS" || flippedNotis[0].type === "BDSR") {
                            setType("Alert");
                        }
                        else if (flippedNotis[0].type === "BAED" || flippedNotis[0].type === "BAEDR") {
                            setType("Alert");
                        }
                    }
                    else {
                        setNoNotis(true);
                    }
                    setLoading(false);
                }
            }
        )
    },[])

    return (
        loading ? <Spinner/> :
            <div id={styles.frame}>
            <p id={styles.gah} style={{position: "absolute", fontWeight: "bold", top: 0, fontSize: "24px", fontFamily: "Josefin Sans"}}>Notifications Center</p>
            {noNotis && <p id={styles.help} style={{paddingLeft: "15px", marginTop: "60px", paddingTop: "8px", lineHeight: "22px", backgroundColor: "rgb(24,24,24)", boxShadow: "0px 0px 3px #f9e9f9", borderRadius: "10px"}}>No notifications are here yet! When a business invites you to join their business or when a business accepts or declines your request to join their business as an employee you will see it here! If you are looking for a job you should check out our careers portal and see if any of the businesses on our site are looking for great employees like you.</p>}
            {!noNotis && <div id={styles.notificationsContainer}>
                {!noNotis && !loading && (
                    <div>
                     <p style={{fontSize: "28px", marginTop: "10px", position: "absolute", top: "-50px", left: "100px"}}>Notifications</p>
                        {notifications.map(notification => {
                            return (
                                <EmployeeNotification notification={notification} notificationClicked={notiClicked} chosen={chosen} /> 
                            )
                        })}
                    </div>
                )}
            </div>}
            <div style={{display: "flex", flexDirection: "column", paddingBottom: "30px"}}>
            {noNotis && ads.map(ad => {
                     return  <div style={{marginTop: "50px"}}>
                     <Advertisement ad={ad}/>
                  </div>
                })}
            </div>
            {!noNotis && !loading && <div id={styles.gotcha}><MessageView eq={eq} bcn={bcn} bct={bct} notification={chosen} removeDeadNoti={removeDeadNoti} reduceNotiNum={reduceNotiNum} changeNotis={changeNotis} notiClicked={notiClicked} denied={denied} type={typeo}/></div>}
            </div>
    )
}

const mapStateToProps = state => {
    return {
        employeeToken: state.authReducer.employeeToken
    }
}

export default connect(mapStateToProps)(EmployeeNotifications);
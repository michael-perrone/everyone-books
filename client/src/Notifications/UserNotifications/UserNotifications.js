import React, { useEffect, useState } from 'react';
import styles from './UserNotifications.module.css';
import axios from 'axios';
import {connect} from 'react-redux';
import UserNotification from './UserNotification/UserNotification';
import YesNoNotification from '../../Notifications/YesNoNotification/YesNoNotification';
import MessageView from './../../Notifications/MessageView/MessageView';
import Axios from 'axios';
import Spinner from '../../Spinner/Spinner';

function UserNotifications(props) {

    const [notifications, setNotifications] = useState();
    const [type, setType] = useState("Alert");
    const [chosen, setChosen] = useState();
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const [notiNum, setNotiNum] = useState();

    function reduceNotiNum() {
        setNotiNum(notiNum - 1);
    }

    function changeNotis(newNoti) {
        const notiRep = [...notifications];
        for (let i = 0; i < notiRep.length; i++) {
            if (notiRep[i]._id === newNoti._id) {
                notiRep[i].type = notiRep[i].type + "R";
            }
        }
        setNotifications(notiRep);
    }

    function toSetChosen(notification) {
            setChosen(notification)
    }

    function notiClicked(notification, index) { 
        if (notification.type === "ERY" || notification.type === "BAW" || notification.type === "ELB" || notification.type === "BBY" || notification.type === "YURA" || notification.type === "UATG" || notification.type === "ERN" || notification.type === "BDB") {
            Axios.post('/api/notifications/changeToRead', {notificationId: notification._id}).then(response => {
                if (response.status === 200) {
                    reduceNotiNum();
                    const newNotis = [...notifications];
                    newNotis[index].type = notification.type + "R";
                    console.log(newNotis[index].type);
                    setNotifications(newNotis);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    React.useEffect(() => {
        let num = setInterval(() => {
          setCounter(counter + 1)
        }, 20000);
        return () => clearInterval(num);
      })

      React.useEffect(function() {
        if (notiNum !== undefined) {
            Axios.post('/api/notifications/checkUserNotis', {notiNum}, {headers: {'x-auth-token': props.userToken}}).then(
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
        axios.get("/api/notifications/getUserNotis", {headers: {'x-auth-token' : props.userToken}}).then(
            response => {
                if (response.status === 200) {
                    const data = response.data.allNotis;
                    const flippedNotis = [];
                    let i = response.data.allNotis.length - 1;
                    while (i >= 0) {
                        flippedNotis.push(data[i]);
                        i--;
                    }
                    setNotifications(flippedNotis);
                    setChosen(flippedNotis[0]);
                    if (data.length === 0) {
                        setLoading(false);
                        return;
                    }
                    if (flippedNotis[0].type === "UATG" || flippedNotis[0].type === "UATGR") { 
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "BDB" || flippedNotis[0].type === "BDBR") {
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "BBY" || flippedNotis[0].type === "BBYR") {
                        setType("Alert");
                    }
                    else if (flippedNotis[0].type === "ERN" || flippedNotis[0].type === "ERNR") {
                        setType("Alert");
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
                    else if (flippedNotis[0].type === "YURA" || flippedNotis[0].type === "YURAR") {
                        setType("Alert");
                    }
                    setLoading(false);
                   
                }
                   
            }
        ).catch(function(error) {
            console.log("POTATO");
            setLoading(false);
        })
    },[])

    return (
        <div id={styles.main} style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <p style={{marginTop: "20px", fontSize: "20px", fontWeight: "bold"}}>Notifications Center</p>
            {!loading ? <div id={styles.holder} style={{display: "flex", justifyContent: 'space-around', width: "100%", marginTop: "20px"}}> 
             <div id={styles.notificationsContainer}>
                {notifications && notifications.length === 0 && <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold", marginTop: "10px"}}>You do not have any notifications!</p>}
                {notifications && notifications.length > 0 && (
                    <div>
                        {notifications.map((notification, index) => {
                            return (
                                <UserNotification key={notification._id} index={index} notificationClicked={notiClicked} chosen={chosen} toSetChosen={toSetChosen} notification={notification}/> 
                            )
                        })}
                    </div>
                )}
            </div>
            {notifications && notifications.length > 0 && <MessageView reduceNotiNum={reduceNotiNum} changeNotis={changeNotis} notification={chosen} type={type}/>}
            </div> : <Spinner/> } 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userToken: state.authReducer.token
    }
}

export default connect(mapStateToProps)(UserNotifications);
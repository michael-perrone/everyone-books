import React, {useState, useEffect} from 'react';
import styles from './UserNotification.module.css';
import closed from "../../closed-env.png";
import open from '../../open-env.png';


function UserNotification(props) {
    const [isRead, setIsRead] = useState();
    const [notiMessage, setNotiMessage] = useState("");
    const [actualType, setActualType] = useState()

    function notiClicked() {
        props.toSetChosen(props.notification, actualType);
        props.notificationClicked(props.notification, props.index);
        if (actualType === "Alert") {
            setIsRead(true);
        }
    }

    useEffect(function() {
        let type = props.notification.type;
            if (type === "BBY" || type === "BBYR") {
                setNotiMessage(props.notification.fromString + " has booked you for a booking at their business.");
                setActualType("Alert");
            }
            else if (type === "BDB" || type === "BDBR") { 
                setNotiMessage(props.notification.fromString + " has canceled a booking that you had scheduled at their business.");
                setActualType("Alert");
            }
            else if (type === "UATG" || type === "UATGR") { 
                setNotiMessage(props.notification.fromString + " has added you to a group/event at their business.");
                setActualType("Alert");
            }
            else if (type === "ERN" || type === "ERNR") {
                setNotiMessage(props.notification.fromString + " has declined your invitation to join your business.");
                setActualType("Alert");
            }
            else if (type === "ESID") { 
                setNotiMessage(props.notification.fromString + " has asked to be added as an employee.");
                setActualType("Choice")
            }
            else if (type === "ERY" || type === "ERYR") { 
            // fix this check this YAER is a problem
                setNotiMessage(props.notification.fromString + " has accepted your request to join your business as an employee");;
                setActualType("Alert");
            }
            else if (type === "ELBR" || type === "ELB") { 
                setNotiMessage(props.notification.fromString + " has left your business as an employee");
                setActualType("Alert");
            }
            else if (type === "YDER") { 
                setNotiMessage(props.notification.fromString + " was denied from becoming an employee.");
                setActualType("Alert");
            }
            else if (type === "AAUR") { 
                setNotiMessage("This booking request from " + props.notification.fromString + " was accepted by you.");
                setActualType("Alert")
            }
            else if (type === "EAUR") { 
                setNotiMessage("This booking request from " + props.notification.fromString + " was accepted by the employee.");
                setActualType("Alert")
            }  
            else if (type === "ADUR") { 
                setNotiMessage("This booking request from " + props.notification.fromString + " was denied");
                setActualType("Alert")
            }
            else if (type === "UBU") {
                setNotiMessage("Your business has a booking request from " + props.notification.fromString + ".")
                setActualType("Booking");
            }
            else if (type === "YURA" || type === "YURAR") {
                setNotiMessage("Your booking request at the business " + props.notification.fromString + " has been accepted.");
            }
    },[props.notification]);


    useEffect(function() {
        let newArray = props.notification.type.split("");
        let lastLetter = newArray[newArray.length - 1];
        console.log(lastLetter);
        if (lastLetter === "R") {
            setIsRead(true);
        }
    }, [props.notification]);

    return (
        <div onClick={notiClicked} id={styles.notificationContainer} className={props.chosen && props.chosen._id === props.notification._id ? styles.selected : ""}>
            <p style={{fontSize: "14px", position: "absolute", top: "5px", right: "20px"}}>{props.notification.date}</p>
            <img style={{height: "30px", width: "30px", marginLeft: "10px", marginTop: "5px"}} src={isRead ? open : closed}/>
            <p style={{marginTop: "5px",padding: "15px"}}>{notiMessage}</p>
        </div>
    )
}

export default UserNotification;
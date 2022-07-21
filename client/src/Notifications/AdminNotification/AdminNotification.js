import React, {useState, useEffect} from 'react';
import styles from './AdminNotification.module.css';
import closed from '../closed-env.png';
import open from '../open-env.png';


function AdminNotification(props) {
    const [isRead, setIsRead] = useState();
    const [notiMessage, setNotiMessage] = useState("");
    const [type, setType] = useState()

    function notiClicked() {
        props.toSetChosen(props.notification, type);
        props.notificationClicked(props.notification);
    }

    useEffect(function() {
        let type = props.notification.type;
            if (type === "ESIDDR") { 
                setNotiMessage(props.notification.fromString + " was denied from becoming an employee at your business.");
                setType("Alert");
            }
            else if (type === "ERN" || type === "ERNR") {
                setNotiMessage(props.notification.fromString + " has declined your invitation to join your business.");
                setType("Alert");
            }
            else if (type === "ESID") { 
                setNotiMessage(props.notification.fromString + " has asked to be added as an employee.");
                setType("Choice")
            }
            else if (type === "ERY" || type === "ERYR") { 
            // fix this check this YAER is a problem
                setNotiMessage(props.notification.fromString + " has accepted your request to join your business as an employee");;
                setType("Alert");
            }
            else if (type === "ELBR" || type === "ELB") { 
                setNotiMessage(props.notification.fromString + " has left your business as an employee");
                setType("Alert");
            }
            else if (type === "YDER") { 
                setNotiMessage(props.notification.fromString + " was denied from becoming an employee.");
                setType("Alert");
            }
            else if (type === "AAUR") { 
                setNotiMessage("This booking request from " + props.notification.fromString + " was accepted by you.");
                setType("Alert")
            }
            else if (type === "EAUR") { 
                setNotiMessage("This booking request from " + props.notification.fromString + " was accepted by the employee.");
                setType("Alert")
            }  
            else if (type === "ADUR") { 
                setNotiMessage("This booking request from " + props.notification.fromString + " was denied");
                setType("Alert")
            }
            else if (type === "UBU") {
                setNotiMessage("Your business has a booking request from " + props.notification.fromString + ".")
                setType("Booking");
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

export default AdminNotification;
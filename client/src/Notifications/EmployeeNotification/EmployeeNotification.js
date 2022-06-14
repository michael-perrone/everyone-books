import React, {useState, useEffect} from 'react';
import styles from './EmployeeNotification.module.css';
import closed from '../closed-env.png';
import open from '../open-env.png';

function EmployeeNotification(props) {
    const [isRead, setIsRead] = useState();
    const [notiMessage, setNotiMessage] = useState("");
    const [type, setType] = useState()

    function notiClicked() {
        props.toSetChosen(props.notification, type);
        props.notificationClicked(props.notification);
    }

    useEffect(function() {
        let type = props.notification.type;
            if (type === "BAE") { 
                setNotiMessage(props.notification.fromString + " has invited you to join their business as an employee.");
                setType("Choice");
            }
            else if (type === "BAER") { 
                setNotiMessage(`You have accepted an invite from ${props.notification.fromString} to join their business as an employee.`);
                setType("Alert")
            }
            else if (type === "BAW" || type === "BAWR") {
                setNotiMessage(`Your request to join ${props.notification.fromString}'s business has been accepted.`);
                setType("Alert")
            }
            else if (type === "ERY" || type === "ERYR") { 
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
                setNotiMessage("This booking request from " + props.notification.fromString + " was accepted");
                setType("Alert")
            } 
            else if (type === "ADUR") { 
                setNotiMessage("This booking request from " + props.notification.fromString + " was denied");
                setType("Alert")
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

export default EmployeeNotification;
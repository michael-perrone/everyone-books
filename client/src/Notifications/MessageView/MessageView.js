import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import styles from './MessageView.module.css';
import {connect} from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import BCAList from '../../Shared/BCAList/BCAList';
import Spinner from '../../Spinner/Spinner';
import EmployeeInquireInfo from './EmployeeInquireInfo/EmployeeInquireInfo';

function MessageView(props) {
    const [message, setMessage] = useState("");
    const [header, setHeader] = useState("");
    const [success, setSuccess] = useState("");
    const [hideButtons, setHideButtons] = useState(false);
    const [bcn, setBcn] = useState("");
    const [error, setError] = useState("");
    const [bcnArray, setBcnArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEIQ, setShowEIQ] = useState(false);
    const [eiq, setEIQ] = useState("");



    useEffect(function() {
        if (props.bcn) {
            for (let i = 1; i <= props.bcn; i++) {
                bcnArray.push(i);
            }
        }
    }, [props.bcn])

    function acceptEmployeeRequest() {
        Axios.post("api/notifications/employerAcceptedEmployee", {"employeeId": props.notification.fromId, "notificationId": props.notification._id, businessId: props.admin.admin.businessId}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                setSuccess("");
                setTimeout(() => setSuccess("Employee successfully added"), 200);
                props.reduceNotiNum();
                props.notiClicked(response.data.notification, "Alert");
                props.changeNotis(response.data.notification);
                
            }
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(function() {
        if (props.admin && props.type === "Choice" && props.admin.admin.tob === "Restaurant" && (props.notification.type === "UBT" || props.notification.type === "UBTR ")) {
            Axios.post("/api/restaurant/getExtraInfo", {notificationId: props.notification._id}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            }).catch(error => {
                if (error.response.status === 405) {
                    setMessage("The user booking request has been removed due to the time and/or date the user requested having already passed.");
                    setHideButtons(true);
                    Axios.post("api/notifications/changeToRead", {notificationId: props.notification._id}).then(response => {
                        console.log(response.status);
                    })
                }
            })
        }
    }, [props.type])

    useEffect(function() {
        if (props.type === "Booking") {
            setLoading(true);
            Axios.post("/api/notifications/getExtraInfo", {notificationId: props.notification._id, type: props.notification.type}).then(response => {
                if (response.status === 200) {
                    let servicesString = "";
                    for (let i = 0; i < response.data.services.length; i++) {
                        if (i !== response.data.services.length - 1 && i !== response.data.services.length - 2) {
                            servicesString += response.data.services[i].serviceName + ", ";
                        }
                        else if (i === response.data.services.length - 2) {
                            servicesString += response.data.services[i].serviceName + " ";
                        }
                        else {
                            servicesString += "and " + response.data.services[i].serviceName;
                        }
                    }
                    setMessage(`Your business has a booking request from ${props.notification.fromString}. They have requested that the employee ${response.data.employee.fullName} perfrom the services ${servicesString} at the time of ${props.notification.potentialStartTime} on the date of ${props.notification.potentialDate}. If you click book below this booking will be added into your schedule.`)
                }
                else if (response.status === 201) {
                    props.alterType(response.data.type, props.notification);
                    setError("");
                    setTimeout(() => setError("This booking request was " + (response.data.type.includes("D") ? "denied" : "accepted") + " by another member of your business."), 200);
                    
                }
                setLoading(false);
            }).catch(error => {
                setLoading(false);
            })
        }
    }, [props.type, props.notification && props.notification._id])

    function denyEmployeeRequest() {
        Axios.post("api/notifications/employerDeniedEmployee", {notificationId: props.notification._id, employeeId: props.notification.fromId}, {headers: {"x-auth-token": props.adminToken}}).then(response => {
            if (response.status === 200) {
                props.notiClicked(response.data.notification, "Alert");
                props.changeNotis(response.data.notification);
                props.reduceNotiNum();
                setSuccess("");
                setTimeout(() => setSuccess("Employee Denied From Joining Business"), 200);
            }
        }).catch(error => {
            setError("");
            setTimeout(() => setError("Something went wrong."))
        })
    }

    function acceptEmployerRequest() {
        Axios.post('api/notifications/employeeClickedYesIos', {employeeId: props.employee.employee.id, notificationId: props.notification._id}).then(
            response => {
                setSuccess("");
                props.reduceNotiNum();
                setTimeout(() => setSuccess("You successfully accepted this employers request."), 200);
                setTimeout(() => window.document.location.reload(), 600)
            }
        )
    }

    function denyEmployerRequest() {
        Axios.post("/api/notifications/employeeDeniedRequest", {notificationId: props.notification._id}, {headers: {'x-auth-token': props.employeeToken}}).then(
            response => {
                if (response.status === 200) {
                    props.denied(props.notification._id);
                    props.reduceNotiNum();
                }
            }
        ).catch(error => {
            setError("")
            setTimeout(() => setError("Something went wrong!"), 200);
        })
    }

    function toSetBcn(bcn) {
        return function() {
            setBcn(bcn);
        }
    }

    useEffect(function() {
        if (props.notification) {
            let type = props.notification.type;
                if (type === "ESIDDR") {
                    setMessage("You denied " + props.notification.fromString + "'s request to become an employee at your business. If this was a mistake, you can add them to your business in the edit business profile menu.");
                    setHeader("Employee Denied");
                }
                else if (type === "EIB" || type === "EIBR") {
                    setHeader("Individual Inquired")
                    setMessage(`An invidual has inquired about joining your business as an employee. Below is all the information that the individual has provided to our service.`)
                    Axios.post('/api/employeeInfo/li', {employeeId: props.notification.fromId}).then(
                        response => {
                            if (response.status === 200) {
                                setShowEIQ(true);
                                setEIQ(<EmployeeInquireInfo
                                     phoneNumber={response.data.employee.phone}
                                     preferredWage={response.data.employee.pw}
                                     jobTitle={response.data.employee.jt}
                                     preferredHours={response.data.employee.ph}
                                     currentlyWorking={response.data.employee.cw}
                                     fullName={response.data.employee.fullName}
                                     urgent={response.data.employee.ur}
                                     />)
                            }
                        }
                    ).catch(
                        error => {
                            if (error.response.status === 404) {
                                setError("");
                                setTimeout(() => setError("Could not retrieve employee info"), 200);
                            }
                        }
                    )
                }
                else if (type === "UBT") {
                    setHeader("Table Booking Request");
                    setMessage(props.notification.fromString + ` has requested a table at your restaurant. The requested time is at ${props.notification.potentialStartTime} on ${props.notification.potentialDate}. The estimated duration of stay at the table is ${props.notification.estDuration}. If you click accept, they will be booked at an unreserved table that fits the needs of their reservation.`)
                }
                else if (type === "UBTR") {
                    setMessage(props.notification.fromString + ` requested a table at your restaurant. The requested time was ${props.notification.potentialStartTime} on ${props.notification.potentialDate} but this time has passed.`);
                    setHeader("Table Request Expired")
                }
                else if (type === "BAED" || type === "BAEDR") {
                    setHeader("Employment Invite Denied");
                    setMessage("You denied an employment invite from " + props.notification.fromString + ". If this was a mistake please contact your employer and ask them for another invite.");
                }
                else if (type === "ERN" || type === "ERNR") {
                    console.log("type");
                    console.log(type);
                    setMessage(props.notification.fromString + " has declined your request to join your business as an employee. If you believe this was a mistake please contact this indvidual and try again.");
                    setHeader("Employee Declined Request")
                }
                else if (type === "ESID") { 
                    setMessage(props.notification.fromString + " has requested that they be added as a current working employee to your business. Would you like to add " + 
                    props.notification.fromString + "? If yes, this employee will be able to be booked on your current schedule and will be able to be scheduled for shifts in applicable.");
                    setHeader("Employee Join Request")
                }
                else if (type === "BAE") {
                    setMessage(props.notification.fromString + " has used your unique id to add you as an employee to their business. If you accept this request, this employer will be able to add you to their shift schedule right away. Would you like to confirm youself as an employee?");
                    setHeader("Business Join Request")
                }
                else if (type === "BAER") {
                    setMessage(props.notification.fromString + " has accepted your request to join their business. You are now an employee at this business and can be booked for shifts (if applicable) and will be available to be booked by customers and the business admin.");
                    setHeader("Business Join Request")
                }
                else if (type === "EA" || type == "EAR"){
                    // checking this does EAR mean employee Accepted Request
                    setMessage("You accepted this request from " + props.notification.fromString + " to join there business as an employee! You will now be able to be added to their shift schedule.");
                    setHeader("Request Accepted");
                }
                
                else if (type === "ERY" || type === "ERYR" || type === "BRYR") {
                    setMessage("Your business accepted a request from " + props.notification.fromString + " to join your business as an employee. They can now be added to your shift schedule.");
                    setHeader("Employee Accepted");
                }
                else if (type === "BAW" || type === "BAWR") {
                    setHeader("Business Accepted");
                    setMessage(props.notification.fromString + " has accepted your request to join their business as an employee. You can now be added to their shift schedule!");
                }
                else if (type === "AAUR") {
                    setHeader("Booking Request Accepted");
                    setMessage("A booking request from  " + props.notification.fromString + " has been accepted by the business. This booking is now in the schedule.");
                }
                else if (type === "ADU" || type === "ADUR") {
                    setHeader("Booking Request Denied");
                    setMessage("You have denied a booking request from " + props.notification.fromString + ".");
                }
                else if (type === "ELB" || type === "ELBR") {
                    setHeader("Employee Left Business");
                    setMessage(props.notification.fromString + " has left your business. All bookings that " + props.notification.fromString + " was scheduled for have been deleted.");
                }
                else if (type === "BBY" || type === "BBYR") {
                    setHeader("Business Added Booking");
                    setMessage(props.notification.fromString + " has booked you for a booking at their business on the date of " + props.notification.potentialDate + " at " + props.notification.potentialStartTime  + ". You can find information about this booking on your bookings home page. Enjoy!");
                }
                else if (type === "BDB" || type === "BDBR") {
                    setHeader("Business Deleted Booking");
                    setMessage(props.notification.fromString + " has deleted a booking that you had scheduled at their business. This will be reflected in your upcoming bookings list on your home bookings page.");
                }
                else if (type === "YURA" || type === "YURAR") {
                    setHeader("User Request Accepted");
                    setMessage("Your request for a booking at " + props.notification.fromString + " has been accepted. You can find the information for this booking on your bookings page. Enjoy!");
                }
                else if (type === "UATG" || type === "UATGR") {
                    setHeader("Group Addition");
                    setMessage("You have been added as a member of a group by " + props.notification.fromString + " on the date of " + props.notification.potentialDate + " at " + props.notification.potentialStartTime + ". You can find this information on your bookings page.");
                }
                else if (type === "UBU") {
                    setHeader("Booking Request");
                }
                else if (type === "EAUR") {
                    setHeader("Booking Request Accepted");
                    setMessage("A booking request from  " + props.notification.fromString + " has been accepted by the employee. This booking is now in the schedule.");
                }
                else if (type === "BDS" || type === "BDSR") {
                    setHeader("Shift Deleted");
                    setMessage("A shift you were sheduled for has been deleted. Please check your schedule and contact your employer if you believe this is a mistake.") // check this // i dont mention the date because it may be a pain to create a date for just this
                }
            }
    }, [props.notification && props.notification._id, props.notification && props.notification.type])

    function book() {
        if (props.adminToken) {
            Axios.post('/api/iosBooking/acceptedUserRequest', {notiId: props.notification._id, businessId: props.admin.admin.businessId, bcn: bcn}, {headers: {'x-auth-token': props.adminToken}}).then(
                response => {
                    if (response.status === 200) {
                        setSuccess("");
                        props.reduceNotiNum();
                        setTimeout(() => setSuccess("This booking has been added to your schedule."), 200);
                        Axios.post('/api/notifications/changeAcceptedUserRequestNoti', {notiId: props.notification._id, businessId: props.admin.admin.businessId}).then(response => {
                            if (response.status === 200) {
                                props.notiClicked(response.data.notification, "Alert");
                                props.changeNotis(response.data.notification);
                            }
                        })
                    }
                    if(response.status === 201 ) {
                        props.reduceNotiNum();
                        props.alterType(response.data.type, props.notification);
                        setError("");
                        setTimeout(() => setError("This booking request was " + (response.data.type.includes("D") ? "denied" : "accepted") + " by another member of your business."), 200);
                    }
                }
            ).catch(error => {
                if (error.response.status === 409) {
                    props.removeDeadNoti(props.notification._id);
                    props.reduceNotiNum();
                    setError("");
                    setTimeout(() => setError("The time of this booking has already passed and this booking request will be deleted."), 200);
                }
            })
        }
        else if (props.employeeToken) {
            Axios.post('/api/iosBooking/acceptedUserRequestEmployee', {notiId: props.notification._id, employeeId: props.employee.employee.id, bcn: bcn}, {headers: {'x-auth-token': props.employeeToken}}).then(
                response => {
                    if (response.status === 200) {
                        setSuccess("");
                        props.reduceNotiNum();
                        setTimeout(() => setSuccess("This booking has been added to your schedule."), 200);
                        Axios.post('/api/notifications/changeAcceptedUserRequestNoti', {notiId: props.notification._id, employeeId: props.employee.employee.id}).then(response => {
                            if (response.status === 200) {
                                props.notiClicked(response.data.notification, "Alert");
                                props.changeNotis(response.data.notification);
                            }
                        })
                    }
                    if(response.status === 201 ) {
                        props.reduceNotiNum();
                        props.alterType(response.data.type, props.notification);
                        setError("");
                        setTimeout(() => setError("This booking request was " + (response.data.type.includes("D") ? "denied" : "accepted") + " by another member of your business."), 200);
                    }
                }
            ).catch(error => {   
                if (error.response.status === 409) {
                    setError("");
                    setTimeout(() => setError("The time of this booking has already passed and this booking request will be deleted."), 200);
                    props.removeDeadNoti(props.notification._id);
                    props.reduceNotiNum();
                }
            })
        }
    }

    function decline() {
        Axios.post("/api/notifications/changeDeniedUserRequestNoti", {notiId: props.notification._id}).then(response => {
            if (response.status === 200) {
                props.reduceNotiNum();
                setSuccess("");
                setTimeout(() => setSuccess("Booking request denied successfully."), 200);
                props.notiClicked(props.notification, "Alert");
                props.changeNotis(response.data.notification);
            }
            if(response.status === 201 ) {
                props.reduceNotiNum();
                props.alterType(response.data.type, props.notification);
                setError("");
                setTimeout(() => setError("This booking request was " + (response.data.type.includes("D") ? "denied" : "accepted") + " by another member of your business."), 200);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    function bookTable() {
        const obj = {date: props.notification.potentialDate, selectedTime: props.notification.potentialStartTime, }
        Axios.post("/api/restaurant/bookTable", obj, {headers: {'x-auth-token': props.adminToken}})
    }

    return (
        <div style={{width: "360px", height: props.height ? props.height : ""}}>  
            {props.type === "Alert" &&
            <div id={styles.messageViewContainer}>
            {props.notification && <p className={styles.date}>{props.notification.date}</p>}
                <p className={styles.header}>{header}</p>
                <div style={{ position: "relative", top: "75px"}}>
                    
                 <p className={styles.message}>{message}</p>
                 {showEIQ && eiq}
                </div>
            </div>
            }
           
            
            {props.type === "Choice" &&
            <div id={styles.messageViewContainer}>
                <p className={styles.date}>{props.notification.date}</p>
                <p className={styles.header}>{header}</p>
                <div style={{ position: "relative", top: "75px"}}>
                
                <p className={styles.message}>{message}</p>
                {props.adminToken && !hideButtons && <div style={{display: "flex", width: "370px", justifyContent: "space-around", marginTop: "50px"}}>
                <button onClick={acceptEmployeeRequest} className={styles.bu}>Accept</button>
                <button onClick={denyEmployeeRequest} className={styles.bu}>Decline</button>
                </div>
                }
                   {props.employeeToken && !hideButtons && <div style={{display: "flex", width: "370px", justifyContent: "space-around", marginTop: "50px"}}>
                <button onClick={acceptEmployerRequest} className={styles.bu}>Accept</button>
                <button onClick={denyEmployerRequest} className={styles.bu}>Decline</button>
                </div>
                }
            </div>
            </div>}

            {props.type === "Booking" && !loading &&
                 <div id={styles.messageViewContainer}>
                    <p className={styles.date}>{props.notification.date}</p>
                    <p className={styles.header}>{header}</p>
                <div style={{ position: "relative", top: "75px"}}>
                 <p  className={styles.message}>{message}</p>
                 <div style={{display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                 {props.eq === "n" && <p style={{fontSize: "22px", marginTop: "8px", paddingRight: "15px"}}>{props.bct}:</p>}
                 {props.eq === "n" && <BCAList selectBcn={(bcn) => toSetBcn(bcn)} selectedBcn={bcn} bcnList={bcnArray}/>}
                 </div>
                 <div style={{display: "flex", justifyContent: "space-around", marginTop: "50px"}}>
                    <button disabled={props.eq === "n" && bcn === ""} onClick={book} className={styles.bu}>Book</button>
                    <button onClick={decline} className={styles.bu}>Decline</button>
                 </div>
                 </div>
             </div>}
             {loading && <Spinner/>}
             <OtherAlert alertType={"success"} alertMessage={success} showAlert={success !== ""}/>
             <OtherAlert alertType={"error"} alertMessage={error} showAlert={error !== ""}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.authReducer.admin,
        adminToken: state.authReducer.adminToken,
        employeeToken: state.authReducer.employeeToken,
        employee: state.authReducer.employee
    }
}

export default connect(mapStateToProps)(MessageView);
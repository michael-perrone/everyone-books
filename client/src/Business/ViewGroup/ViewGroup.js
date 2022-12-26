import React, {useEffect, useState} from 'react';
import styles from './ViewGroup.module.css';
import x from '../BookingHelpers/AdminBooking/x.png';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import Axios from 'axios';
import {connect} from 'react-redux';
import {EXIT_NUM} from '../../actions/actions';
import SmallList from '../../Shared/SmallList/SmallList';
import {createMaplistElement} from '../../feutils/feutils';

function ViewGroup(props) {
    const [time, setTime] = useState(props.group.time);
    const [cost, setCost] = useState(props.group.cost)
    const [customers, setCustomers] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [groupBack, setGroupBack] = useState({});
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deleting, setDeleting] = useState(false);
    


    useEffect(function() {
        console.log(props.group);
        if (props.group._id) {
            Axios.post('api/groups/info', {groupId: props.group._id}).then(response => {
                if (response.status === 200) {
                    setGroupBack(response.data.groupBack);
                    setCustomers(response.data.groupBack.users);
                }
                setLoading(false);
            }).catch(error => {
                setError("There was an error in finding this groups information.");
                setLoading(false);
            })
        }
    }, [props.group])

    // check this -- make it so that

    function deleteGroup() {
        if (deleting) {
        Axios.post("/api/groups/delete", {groupId: props.group._id}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                props.hide();
                setSuccessMessage("");
                setTimeout(setSuccessMessage("Group successfully deleted"));
                if (props.adminToken) {
                    props.reload();
                }
                else {
                    //props.addExitNum();
                }
                setDeleting(false);
            }
        }).catch(error => {
            console.log(error);
            setDeleting(false);
        })
        }
        else {
            setDeleting(true);
        }
    }


    function hide() {
        props.hide();
        if (props.employeeToken) {
            props.addExitNum();
            console.log("yoooo");
        }
    }

    function searchPhone() {
        Axios.post("api/groups/addNewCustomer", {phoneNumber, date: props.date, groupId: props.group._id}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                for (let i = 0; i < customers.length; i++) {
                    if (customers[i].id === response.data.user._id) {
                        setError("");
                        setTimeout(() => setError("Customer has already been added."), 200);
                        return;
                    }
                }
                const newCustomersForGroup = [...customers];
                newCustomersForGroup.push({fullName: response.data.user.fullName});
                setCustomers(newCustomersForGroup);
            }
        }).catch(error => {
            if (error.response.status === 400) {
                setError("");
                setTimeout(() => setError("Customer not found!"), 200);
            }
            else if (error.response.status === 406) {
                setError("");
                setTimeout(() => setError("Customer already is in this group."), 200);
            }
        })
    }

    return (
        !loading &&
        <div id={styles.viewBookingContainer}>
            <p style={{fontWeight: "bold", fontSize: "18px", position: "absolute", top: 5}}>Booking Info</p>
            <img onClick={hide} style={{position: "absolute", right: 20, top: 20, cursor: "pointer"}} src={x}/>
            <div id={styles.leftContainer}>
                <div>
                    <p className={styles.bolder}>Employee Name:</p>
                    <p className={styles.fontFourteen}>{groupBack.employeeName}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Time of Group:</p>
                    <p className={styles.fontFourteen}>{time}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Date of Group:</p>
                    <p className={styles.fontFourteen}>{props.group.date}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Open to public:</p>
                    <p className={styles.fontFourteen}>{props.group.openToPublic ? "Yes" : "No"}</p>
                </div>
                 <div>
                    <p className={styles.bolder}>Cost of Group:</p>
                    <p className={styles.fontFourteen}>{props.group.price}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Group Limit Number:</p>
                    <p className={styles.fontFourteen}>{props.group.groupLimitNumber}</p>
                </div>
                <button onClick={deleteGroup} style={{backgroundColor: "salmon", height: "35px", width: "120px", position: "absolute", bottom: "40px", marginTop: "80px", fontWeight: "bold", boxShadow: "0px 0px 2px black", border: "none"}}>{!deleting ? "Delete Group" : "Confirm"}</button>
            </div>
            <div style={{width: "200px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "80px"}}>
                <p style={{textAlign: "center"}} className={styles.bolder}>Customers:</p>
                <div style={{marginTop: "10px"}}>
                <SmallList list={customers}/>
                </div>
                <p style={{marginTop: "40px", fontWeight: "bold"}}>Add Member:</p>
                <div style={{display: "flex"}}>
                    <input style={{marginTop: "2px"}} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter Customer Phone" className={styles.specialI}/>
                    <p onClick={searchPhone} style={{fontSize: "32px", position: "relative", top: "6px", fontWeight: "bold", cursor: "pointer" }}>+</p>
                </div>
            </div>
            <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
             <OtherAlert showAlert={error !== ""} alertMessage={error} alertType={"notgood"}/>
        </div> 
    )
}

const mapStateToProps = state => {
    return {
      adminToken: state.authReducer.adminToken,
      employeeToken: state.authReducer.employeeToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addExitNum: () => dispatch({type: EXIT_NUM})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewGroup);
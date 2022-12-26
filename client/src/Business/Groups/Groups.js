import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import styles from './Groups.module.css';
import CreateGroup from './CreateGroup/CreateGroup';
import GroupSchedule from './GroupSchedule/GroupSchedule';
import {stringToIntTime} from '../../feutils/feutils';
import {connect} from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';

function Groups(props) {
    const [groups, setGroups] = useState([]);
    const [dateString, setDateString] = useState(new Date().toDateString());
    const [bct, setBct] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(function () {
        Axios.post("api/groups/list", {dateString}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                setGroups(response.data.groups);
                setBct(response.data.bct);
            }
        })
    }, [dateString])


   
    function createGroup(price, startTime, endTime, businessId, bcn, employeeBooked, date, type, customers, groupOpen, groupLimitNumber) { 
        if (type === "") {
            setError("");
            setTimeout(() => setError("Group name cannot be blank"), 200);
            return;
        }
        if (Number(price) !== Number(price) || price === "") {
            setError("");
            setTimeout(() => setError("Price must be a number"), 200);
            return;
        }
        if (!employeeBooked) {
            setError("");
            setTimeout(() => setError(`Please select an employee`), 200);
            return;
        }
        if (!bcn) {
            setError("");
            setTimeout(() => setError(`Please select a ${bct} number`), 200);
            return;
        }
        if (groupOpen === undefined) {
            setError("");
            setTimeout(() => setError(`Please choose if the group is open to the public`), 200);
            return;
        }
        if (stringToIntTime[endTime] < stringToIntTime[startTime]) {
            setError("");
            setTimeout(() => setError(`The start time cannot be after the end time.`), 200);
            return;
        }
        Axios.post("api/groups/create", {price, startTime, endTime, businessId, bcn,
             employeeBooked, date, type, customers, groupOpen, groupLimitNumber}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
                    if (response.status === 200) {
                        setSuccessMessage("");
                        setTimeout(() => setSuccessMessage("Group successfully created"), 200);
                        const pickleGroups = [...groups];
                        pickleGroups.push({price, startTime, endTime, businessId, bcn, employeeBooked, date, type, customers, groupOpen, groupLimitNumber});
                        setGroups(pickleGroups);
                    }
             }).catch(error => {
                 if (error.response.status === 403) {
                    setError("");
                    setTimeout(() => setError(`${error.response.data.cName} is already booked for another booking at this time.`), 200);
                 }
                 else if (error.response.status === 406) {
                    console.log("HIIII");
                     setError("")
                     if (error.response.data.bcnArray.length === 0) {
                        setTimeout(() => setError(`Could not create group, there are no available ${error.response.data.bcn}s at this time.`), 200);
                     }
                     else {
                         let bcnStr = ``;
                         for (let i = 0; i < error.response.data.bcnArray.length; i++) {
                            if (i !== error.response.data.bcnArray.length - 1) {
                                bcnStr += bct + " " + error.response.data.bcnArray[i] + ", ";
                            }
                            else {
                                bcnStr += bct + " " + error.response.data.bcnArray[i];
                            }
                        }
                        setTimeout(() => setError(`${bct} not available, however, ${bcnStr} is/are available.`), 200);
                     }
                 }
             })
    }


    function setDateo(dateo) {
        setDateString(dateo)
    }

    return (
        <div id={styles.main}>
            <CreateGroup createGroup={createGroup}/>
            <GroupSchedule bct={bct} setDateo={setDateo} groups={groups}/>
            <OtherAlert showAlert={successMessage !== ""} alertType={"success"} alertMessage={successMessage}/>
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""}/>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        date: new Date(state.dateReducer.dateChosen),
        adminToken: state.authReducer.adminToken,
        businessId: state.authReducer.admin.admin.businessId
    }
}

export default connect(mapStateToProps)(Groups);
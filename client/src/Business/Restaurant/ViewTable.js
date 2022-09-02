import React, {useEffect, useState} from 'react';
import styles from './ViewTable.module.css';
import Maplist from '../../Shared/Maplist/Maplist';
import ServiceList from '../../Shared/ServiceList/ServiceList';
import x from '../BookingHelpers/AdminBooking/x.png';
import StatementAppear from '../../Shared/StatementAppear/StatementAppear';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import Axios from 'axios';
import {connect} from 'react-redux';
import {EXIT_NUM} from '../../actions/actions';
import {getTime, getTimes, timesArray} from '../../feutils/feutils';


function ViewTable(props) {
    const [nums, setNums] = React.useState([]);
    const [selectedTime, setSelectedTime] = React.useState(props.selectedTime);
    const [selectedEmployee, setSelectedEmployee] = React.useState("");
    const [employees, setEmployees] = React.useState([]);
    const [customerName, setCustomerName] = React.useState("");
    const [estDuration, setEstDuration] = React.useState("1 Hour");
    const [numPeople, setNumPeople] = React.useState(props.num);
    const [isUser, setIsUser] = React.useState();
    const [error, setError] = React.useState("");
    const [successMessage, setSuccessMessage] = useState("");

    React.useEffect(function() {
        Axios.get("/api/businessProfile/employeesWorking", {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                setEmployees(response.data.realEmployees)
            }
        })
    },[])


    function toSetEmployee(e) {
        setSelectedEmployee(e.target.value);
        console.log(e.target.value);
    }

    function toSetNumPeople(e) {
        setNumPeople(e.target.value)
    }

    React.useEffect(function() {
        let i = props.num - 4;
        const toBeNums = [];
        while (i < props.num + 5) {
            if (i > 0) {
                toBeNums.push(i);
            }
            i++;
        }
        setNums(toBeNums);
    }, [props.num])

    function hide() {
        props.hide();
    }

    function toSetSelectedTime(e) {
        setSelectedTime(e.target.value);
    }
    
    function bookTable() {
        if (selectedEmployee === "") {
            setError("Please select an employee");
            return;
        }
        else if (customerName === "") {
            setError("Please enter customer name");
            return;
        }
        else {
            setError("");
        }
        let check;
        let data;
        console.log(props.fakeId);
        if (isUser !== false && isUser !== true) {
            check = checkIfIsEmail();
            data = {selectedEmployee, customerName, estDuration, numPeople, selectedTime, date: props.dateString, check, fakeId: props.fakeId};
        }
        else {
            data = {selectedEmployee, customerName, estDuration, numPeople, selectedTime, date: props.dateString, isUser, fakeId: props.fakeId, numOfPeople: numPeople};
        }
        
        Axios.post("/api/restaurant/bookTable", data, {headers: {'x-auth-token': props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setSuccessMessage("Table successfully booked");
                    setTimeout(() => props.exitTableView(), 2000);
                }
                console.log(response.data)
            }
        ).catch(error => {
            if (error.response.status === 400) {
                setError("Time has already passed.");
            }
            else if (error.response.status === 406) {
                setError("This table is not available at this time.");
            }
            console.log(error);
        })
    }

    function toSetCustomerName(e) {
        setCustomerName(e.target.value);
    }

    function toSetEstDuration(e) {
        setEstDuration(e.target.value);
    }

    function checkIfIsEmail() {
        Axios.post("/api/restaurant/checkIfUser", {input: customerName}, {headers: {'x-auth-token': props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setIsUser(true);
                    return true;
                }
                else if (response.status === 204) {
                    setIsUser(false);
                    return false;
                }
            }
        )
    }

    return (
        <div id={styles.viewTableContainer}>
            <p style={{fontWeight: "bold", fontSize: "18px", position: "absolute", top: 5}}></p>
            <img onClick={hide} style={{position: "absolute", right: 20, top: 20, cursor: "pointer"}} src={x}/>
            {props.check === "a" &&
             <div style={{fontSize: "20px"}}>
                 <p style={{marginTop: "14px", textAlign: "center", fontSize: "24px"}}>Book Table</p>
                 <div style={{display: "flex", marginTop: "30px" }}>
                     <p>Num of persons: </p>
                 <select value={numPeople} onChange={toSetNumPeople} style={{width: "70px", marginLeft: "10px", border: "none", boxShadow: "0px 0px 2px black", height: "24px", paddingLeft: "10px"}}>
                    {nums.map(num => {
                        return <option>{num}</option>
                    })}
                 </select>
                 </div>
                 <div style={{display: "flex", marginTop: "40px"}}>
                     <p>Start Time: </p>
                 <select onChange={toSetSelectedTime} value={selectedTime} style={{width: "100px", marginLeft: "12px", border: "none", boxShadow: "0px 0px 2px black", height: "24px", paddingLeft: "10px"}}>
                    {props.times.map(time => {
                        return <option>{time}</option>
                    })}
                 </select>
                 </div>
                 <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", marginTop: "40px"}}>
                <p>Employee: </p>
                 <select onChange={toSetEmployee} value={selectedEmployee} style={{width: "170px", marginLeft: "12px", border: "none", boxShadow: "0px 0px 2px black", height: "24px", paddingLeft: "10px"}}>
                    <option> </option>
                    {employees.map(employee => {
                        return <option value={employee._id}>{employee.fullName}</option>
                    })}
                 </select>
                 </div>
                 <div style={{display: "flex", marginTop: "40px"}}>
                 <p>Est Duration:</p>
                 <select onChange={toSetEstDuration} value={estDuration} style={{width: "150px", marginLeft: "12px", border: "none", boxShadow: "0px 0px 2px black", height: "24px", paddingLeft: "10px"}}>
                    {timesArray.map(element => {
                        return <option>{element}</option>
                    })}
                 </select>
                 </div>
                 <input onChange={toSetCustomerName} placeholder={"Customer Name/Email"} style={{borderBottom: "2px solid black", width: "240px", fontSize: "20px", marginTop: "40px", borderLeft: "none", borderRight: "none", borderTop: "none", backgroundColor: "transparent"}}/>
                 <p style={{marginTop: "45px"}}>Date: {props.dateString}</p>
                 <button onClick={bookTable} style={{marginTop: "50px", width: "120px", fontSize: "18px", border: "none", boxShadow: "0px 0px 2px black", height: "30px", alignSelf: "center"}}>Book Table</button>
                <p style={{color: "red", position: "absolute", bottom: "30px", width: "360px", left: 0, textAlign: "center"}}>{error}</p>
                </div>
            </div>
            }
             <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
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


  

export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);
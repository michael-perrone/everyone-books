import React, {useState, useEffect} from "react";
import styles from './AddEditEmployees.module.css';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';
import Axios from "axios";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";
import {connect} from 'react-redux';
import Maplist from "../../../Shared/Maplist/Maplist";
import { createMaplist } from '../../../feutils/feutils';

function AddEmployees(props) {

    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeIdBack, setEmployeeIdBack] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [selected, setSelected] = useState("Add");
    const [employeesHere, setEmployeesHere] = useState([]);
    const [employeesPending, setEmployeesPending] = useState([]);

    function deleteEmployeeHere(id) {
        return () => {
        Axios.post('/api/businessProfile/employeeDeleteFromBusiness', {employeeId: id}, {headers: {"x-auth-token": props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    let newEmployees = [...employeesHere].filter(e => {
                        return e.id !== id;
                    })
                    setEmployeesHere(newEmployees);
                    setSuccessMessage("");
                    setTimeout(() => setSuccessMessage("Employee successfully deleted!"), 200);
                }
            }
        ).catch(error => {
            setError("");
                setTimeout(() => setError("Something went wrong"), 200);
        })
        }
    }

    function deleteEmployeePending(id) {
        return () => {
        Axios.post('/api/businessProfile/removeFromPending', {employeeId: id}, {headers: {"x-auth-token": props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    let newEmployees = [...employeesPending].filter(e => {
                        return e.id !== id;
                    })
                    setEmployeesPending(newEmployees);
                    setSuccessMessage("");
                    setTimeout(() => setSuccessMessage("Employee successfully deleted!"), 200);
                }
            }
        ).catch(error => {
            setError("");
                setTimeout(() => setError("Something went wrong"), 200);
        })
        }
    }


    useEffect(function() {
        Axios.get("api/businessProfile/myEmployees", {headers: {"x-auth-token": props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    if (response.data) {
                        setEmployeesHere(createMaplist(response.data.employeesHere, "fullName"));
                        setEmployeesPending(createMaplist(response.data.employeesPending, "fullName"));
                    } 
                }
            }
        ).catch(error => {
            setError("");
            setTimeout(() => setError("Something went wrong"), 200);
        })
    },[selected])

    function settingSelected(selecting) {
        return function() {
            if (selecting === "Pending" || selecting === "Current") {

            }
            setSelected(selecting)
        }
    }

    function findEmployee() {
       setSuccessMessage("");
       Axios.post("/api/employeeList", {employeeId}).then(function(response) {
           if(response.data) {
               console.log(response.data)
               if (response.data) {
                   setEmployeeName(response.data.name);
                   setEmployeeIdBack(response.data.id);
               }
           }
       }).catch(error => {
           setError("");
           if (error.response.status === 406) {
            setEmployeeName("");
            setTimeout(() => setError("Employee not found!"), 200);
           }
       })
    }

    function addEmployee() {
        Axios.post("/api/businessProfile/addEmployeeToBusinessApp", {employeeId: employeeIdBack},
         {headers: {"x-auth-token": props.adminToken}})
         .then(response => {
            if (response.status === 200) {
                setSuccessMessage("");
                setTimeout(() => setSuccessMessage("Employee added to business!"), 200);
            }
        }).catch(error => {
                setError("");
            if (error.response.status === 406) {
                setTimeout(() => setError("Employee already has been added"), 200);
            }
            else {
                setTimeout(() => setError("Something went wrong"), 200);
            }
        })
    }

    function employeeIdChanged(e) {
        e.preventDefault();
        setEmployeeId(e.target.value);
    }

    return (
        <div id={styles.mainContainer}>
            <div style={{display: "flex", width: "330px", justifyContent: "space-between", marginTop: "20px", marginBottom: "20px", alignSelf: "center"}}>
                <p onClick={settingSelected("Add")} style={selected === "Add" ? {backgroundColor: "lavenderblush", boxShadow: "0px 0px 4px black"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Add</p>
                <p onClick={settingSelected("Pending")} style={selected === "Pending" ? {backgroundColor: "lavenderblush", boxShadow: "0px 0px 4px black"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Pending</p>
                <p onClick={settingSelected("Current")} style={selected === "Current" ? {backgroundColor: "lavenderblush", boxShadow: "0px 0px 4px black"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Current</p>
            </div>
            {selected === "Add" &&
            <React.Fragment>
            <p>Enter the employee username or unique ID to find an employee. Once employee is found, click the add button to add the employee to your business. Once the employee accepts your employment request they will be able to be scheduled at your business.</p>
            <div style={{display: 'flex', marginTop: "15px", justifyContent: "center"}}>
                <input value={employeeId} onChange={employeeIdChanged} style={{width: "200px", height: "27px", fontSize: "14px", paddingLeft: "5px"}} placeholder={"Enter Employee ID"}/>
                <SubmitButton onClick={findEmployee}>Find Employee</SubmitButton>
            </div>
            {employeeName !== "" && successMessage === "" && <div style={{display: 'flex', width: "300px", marginTop: "20px", justifyContent: "space-between", alignSelf: "center", boxShadow: "0px 0px 5px black", padding: "10px"}}>
                <p style={{fontSize: "18px", marginTop: "4px"}}>{employeeName}</p>
                <SubmitButton onClick={addEmployee}>Add Employee</SubmitButton>       
            </div>}
            </React.Fragment>}
            {selected === "Pending" &&
            <React.Fragment>
                <p style={{marginBottom: "20px"}}>The employees listed below if any are employees that you have recently invited to join your business as employees. If you wish to undo this request, you can delete the employee from the list below.</p>
                <Maplist delete={(id) => deleteEmployeePending(id)} array={employeesPending} none={"No employees currently invited"}/>
            </React.Fragment>
            }
            {selected === "Current" &&
             <React.Fragment>
             <p style={{marginBottom: "20px"}}>The employees listed below are registered employees of your business. If you wish to remove an employee, you can delete the employee from the list below. Please keep in mind this action is permanent.</p>
             <Maplist delete={(id) => deleteEmployeeHere(id)} array={employeesHere} none={"No employees currently employed"}/>
            </React.Fragment>
            }
            <OtherAlert showAlert={successMessage !== ""} alertType={"success"} alertMessage={successMessage}/>
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""}/>
        </div>
    )
}


const mapStateToProps = state => {
    return {
      adminToken: state.authReducer.adminToken
    };
  }; 

export default connect(mapStateToProps)(AddEmployees);
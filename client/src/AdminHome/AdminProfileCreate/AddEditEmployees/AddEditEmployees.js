import React, {useState, useEffect} from "react";
import styles from './AddEditEmployees.module.css';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';
import Axios from "axios";
import OtherAlert from "../../../OtherAlerts/OtherAlerts";
import {connect} from 'react-redux';
import Maplist from "../../../Shared/Maplist/Maplist";
import { createMaplist, createGridList2 } from '../../../feutils/feutils';
import x from '../../../Business/BookingHelpers/AdminBooking/x.png';

function AddEmployees(props) {

    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeIdBack, setEmployeeIdBack] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [selected, setSelected] = useState("Add");
    const [employeesHere, setEmployeesHere] = useState([]);
    const [employeesPending, setEmployeesPending] = useState([]);
    const [ur, setUr] = useState("");
    const [hi, setHi] = useState("");
    const [inquire, setInquire] = useState("");
    const [desired, setDesired] = useState(["dwdqwd"]);
    const [newDesired, setNewDesired] = useState([]);
    const [newItem, setNewItem] = useState("");

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

    function addToNewDesired() {
        const nDesired = [...newDesired, newItem];
        setNewDesired(nDesired);
        const desiredd = [...desired, newItem];
        setDesired(desiredd);
        setNewItem("");
    }

    useEffect(function() {
        Axios.get('/api/business/desired', {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                if (response.data.desired) {
                    setDesired(response.data.desired);
                }
                if (response.data.ur) {
                    console.log("did i work");
                    setUr(response.data.ur)
                }
                if (response.data.hi === 1) {
                    setHi("Yes");
                }
                else if (response.data.hi === 0) {
                    setHi("No");
                }
                if (response.data.in === 1) {
                    setInquire("Yes");
                }
                else if (response.data.in === 0) {
                    setInquire("No");
                }
            }
        }).catch(error => {
            console.log("me?")
            setError("");
            setTimeout(() => setError("Something went wrong"));
        })
    }, [])


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

    function cHiring() {
        Axios.post("/api/business/hiring", {ur, hi: hi === "Yes" ? 1 : 0, in: inquire === "Yes" ? 1 : 0, desired: newDesired}, {headers: {'x-auth-token': props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setSuccessMessage("");
                    setTimeout(function() {
                        setSuccessMessage("You have saved the above information.");
                    }, 300);
                }
            }
        )
    }

    function employeeIdChanged(e) {
        e.preventDefault();
        setEmployeeId(e.target.value);
    }

    function removeDesired(item) {
        const filtered = desired.filter(e => e !== item);
        setDesired(filtered);
        if (!newDesired.length || !newDesired.includes(item)) {
            Axios.post("api/business/removeDesired", {item}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
                setSuccessMessage("");
                setTimeout(function() {
                    setSuccessMessage("You have saved the above information.");
                }, 300);
            })
        }
        else {
            const newFiltered = newDesired.filter(e => e !== item);
            setNewDesired(newFiltered);
        }
    }

    return (
        <div id={styles.mainContainer}>
            <div style={{display: "flex", width: "330px", justifyContent: "space-between", marginTop: "20px", marginBottom: "20px", alignSelf: "center"}}>
                <p onClick={settingSelected("Add")} style={selected === "Add" ? {backgroundColor: "black", boxShadow: "0px 0px 4px black"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Add</p>
                <p onClick={settingSelected("Pending")} style={selected === "Pending" ? {backgroundColor: "black", boxShadow: "0px 0px 4px black"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Pending</p>
                <p onClick={settingSelected("Current")} style={selected === "Current" ? {backgroundColor: "black", boxShadow: "0px 0px 4px black"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Current</p>
                <p onClick={settingSelected("Hiring")} style={selected === "Hiring" ? {backgroundColor: "black", boxShadow: "0px 0px 4px black"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Hiring</p>
            </div>
            {selected === "Add" &&
            <React.Fragment>
            <p>Enter the employee username or unique ID to find an employee. Once employee is found, click the add button to add the employee to your business. Once the employee accepts your employment request they will be able to be scheduled at your business.</p>
            <div style={{display: 'flex', marginTop: "15px", justifyContent: "center"}}>
                <input value={employeeId} onChange={employeeIdChanged} style={{width: "200px", height: "27px", border: "none", boxShadow: "0px 0px 5px #f9e9f9", fontSize: "14px", paddingLeft: "5px"}} placeholder={"Enter Employee ID"}/>
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
            {selected === "Hiring" &&
             <React.Fragment>
                <p>This is the EveryoneBooks Hiring Portal. Here you can set your hiring settings depending on whether you are looking for additional employees. These can be changed at any time.</p>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <div className={styles.q} style={{display: "flex", width: "375px", justifyContent: "space-around"}}>
                        <p style={{position: "relative", right: "4px"}}>Is your business currently hiring?</p>
                        <select value={hi} onChange={(e) => setHi(e.target.value)} className={styles.defaultInput} style={{width: "80px", position: "relative", left: "5px", paddingLeft: "4px"}}>
                            <option> </option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className={styles.q} style={{display: "flex", width: "375px", justifyContent: "space-around", marginTop: "40px"}}>
                        <p>Urgency of business hiring process:</p>
                        <select value={ur} onChange={(e) => setUr(e.target.value)} className={styles.defaultInput} style={{width: "80px", paddingLeft: "4px"}}>
                            <option> </option>
                            <option>Urgent</option>
                            <option>Somewhat Urgent</option>
                            <option>Not Urgent</option>
                        </select>
                    </div>
                    <div className={styles.q} style={{display: "flex", width: "375px", justifyContent: "space-around"}}>
                        <p style={{width: "250px"}}>Allow potential employees to inquire about employment?</p>
                        <select value={inquire} onChange={(e) => setInquire(e.target.value)} style={{width: "80px", position: "relative", left: "1.5px", height: "20px", marginTop: "10px", paddingLeft: "4px"}} className={styles.defaultInput}>
                            <option> </option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className={styles.q} style={{display: "flex", marginTop: "30px", flexDirection: "column", width: "375px", justifyContent: "space-around", alignItems: "center"}}>
                        <p style={{width: "300px", position: "relative"}}>Employee roles or titles your looking for:</p>
                        <div value={newItem} style={{display: "flex", position: "relative", marginTop: "8px"}}>
                            <input onChange={(e) => setNewItem(e.target.value)} placeholder="Ex: Waxer, Hair Stylist, Instructor" style={{width: "220px", paddingLeft: "4px", border: "none", boxShadow: "0px 0px 3px #f9e9f9", height: "24px"}} />
                            <button id={styles.addButton} style={{border: "none", marginLeft: "20px", padding: "4px", height: "24px", padding: "0px 8px", fontSize: "16px" }} onClick={addToNewDesired}>Add</button>
                        </div>
                        {desired && <div style={{maxWidth: "300px", width: "300px", marginTop: "20px", overflow: "auto", display: "grid", gridTemplateColumns: createGridList2(desired)}}>
                            {desired.map(function(e) {
                                return <div style={{display: "flex", justifyContent: "space-around", padding: "12px 6px", border: "1.8px solid lightgray"}}><p>{e}</p><img onClick={() => removeDesired(e)} style={{height: "22px", cursor: "pointer", width: "22px", position: "relative", top: "-3px"}} src={x}/></div>
                            })}
                        </div>}
                    </div>
                    <button onClick={cHiring} id={styles.b} style={{marginTop: "25px", boxShadow: "0px 0px 4px #f9e9f9", backgroundColor: "rgb(24,24,24)", height: "30px", fontFamily: "Josefin Sans", padding: "4px 10px", fontSize: "22px", border: "none"}}>Save Information</button>
                </div>
                
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
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
            
    {selected === "Add" &&
            <div>
                <p style={{fontSize: "28px", fontFamily: "Josefin Sans", marginTop: "18px", textAlign: "center"}}>Add Employees</p>
                <ul style={{marginTop: "14px", width: "350px",}}>
                    <li style={{ lineHeight: "20px"}}>Enter Employee ID or Phone Number below to send an invite to potential employees to join your business.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>If the employee accepts the invitation, they will be able to scheduled and start working for your business.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>You will receive a notification whether they accepted or declined your invitation.</li>
                </ul>
            </div>
    }
     {selected === "Pending" &&
            <div>
                <p style={{fontSize: "28px", fontFamily: "Josefin Sans", marginTop: "18px", textAlign: "center"}}>Pending Employees</p>
                <ul style={{marginTop: "14px", width: "350px",}}>
                    <li style={{ lineHeight: "20px"}}>These are the employees that you have already invited to join your business.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>If the employee accepts the invitation, they will be able to scheduled and start working for your business.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>If you would like to remove the employee, you can click the delete button next to their name.</li>
                </ul>
            </div>
    }
     {selected === "Current" &&
            <div>
                <p style={{fontSize: "28px", fontFamily: "Josefin Sans", marginTop: "18px", textAlign: "center"}}>Current Employees</p>
                <ul style={{marginTop: "14px", width: "350px",}}>
                    <li style={{ lineHeight: "20px"}}>These are the current employees working for your business.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>If an employee no longer works at your business, you can delete them from your current employees list.</li>
                    
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>You will be prompted to enter the password for your admin account again to confirm the removal.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>Once an employee is removed, all further scheduled bookings with that employee will be deleted.</li>
                </ul>
            </div>
    }
     {selected === "Hiring" &&
            <div>
                <p style={{fontSize: "28px", fontFamily: "Josefin Sans", marginTop: "18px", textAlign: "center"}}>Hiring Portal</p>
                <ul style={{marginTop: "14px", width: "350px",}}>
                    <li style={{ lineHeight: "20px"}}>In the hiring portal, you can set the hiring preferences for your business.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>All of these things will be visible to potential employees currently looking for jobs.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>You will see any inquirements about employment for your business appear in your notifications.</li>
                    <li style={{marginTop: "12px", lineHeight: "20px"}}>.</li>
                </ul>
            </div>
    }
                        {/* <ul>Enter the employee username or unique ID to find an employee. Once employee is found, click the add button to add the employee to your business. Once the employee accepts your employment request they will be able to be scheduled at your business.</ul> */}
            
            <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", width: "360px", justifyContent: "space-around", marginTop: "20px", marginBottom: "20px", alignSelf: "center"}}>
                <p onClick={settingSelected("Add")} style={selected === "Add" ? {backgroundColor: "black", boxShadow: "0px 0px 4px #f9e9f9"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Add</p>
                <p onClick={settingSelected("Pending")} style={selected === "Pending" ? {backgroundColor: "black", boxShadow: "0px 0px 4px #f9e9f9"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Pending</p>
                <p onClick={settingSelected("Current")} style={selected === "Current" ? {backgroundColor: "black", boxShadow: "0px 0px 4px #f9e9f9"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Current</p>
                <p onClick={settingSelected("Hiring")} style={selected === "Hiring" ? {backgroundColor: "black", boxShadow: "0px 0px 4px #f9e9f9"} : {backgroundColor: "", boxShadow: ""}} className={styles.miniTabs}>Hiring</p>
            </div>
            {selected === "Add" &&
            <React.Fragment>
    
            <div style={{display: 'flex', marginTop: "15px", justifyContent: "center"}}>
                <input value={employeeId} onChange={employeeIdChanged} style={{width: "200px", height: "27px", border: "none", boxShadow: "0px 0px 5px #f9e9f9", fontSize: "14px", backgroundColor: "rgb(24,24,24)", paddingLeft: "5px"}} placeholder={"Enter Employee ID"}/>
                <SubmitButton onClick={findEmployee}>Find Employee</SubmitButton>
            </div>
            {employeeName !== "" && successMessage === "" && <div style={{display: 'flex', width: "300px", marginTop: "20px", justifyContent: "space-between", backgroundColor: "rgb(65,65,65)", alignSelf: "center", boxShadow: "0px 0px 5px #f9e9f9", padding: "10px"}}>
                <p style={{fontSize: "18px", marginTop: "4px"}}>{employeeName}</p>
                <SubmitButton onClick={addEmployee}>Add Employee</SubmitButton>       
            </div>}
            </React.Fragment>}
            {selected === "Pending" &&
            <React.Fragment>

                <Maplist delete={(id) => deleteEmployeePending(id)} array={employeesPending} none={"No employees currently invited"}/>
            </React.Fragment>
            }
            {selected === "Current" &&
             <React.Fragment>

             <Maplist delete={(id) => deleteEmployeeHere(id)} array={employeesHere} none={"No employees currently employed"}/>
            </React.Fragment>
            }
            {selected === "Hiring" &&
             <React.Fragment>

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
                            <input onChange={(e) => setNewItem(e.target.value)} placeholder="Ex: Waxer, Hair Stylist, Instructor" style={{width: "220px", paddingLeft: "4px", backgroundColor: "rgb(24,24,24)", border: "none", boxShadow: "0px 0px 3px #f9e9f9", height: "24px"}} />
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
            </div>
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
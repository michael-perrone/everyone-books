import React from 'react';
import styles from '../AddEditEmployees/AddEditEmployees.module.css';
import ColorButton from '../../../Shared/ColorButton/ColorButton';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';
import Maplist from '../../../Shared/Maplist/Maplist';
import Axios from 'axios';
import {connect} from 'react-redux';
import {createMaplist, createMaplistElement} from '../../../feutils/feutils';
import OtherAlert from '../../../OtherAlerts/OtherAlerts';

function AddEditServices(props) {
    const [requiresEmployee, setRequiresEmployee] = React.useState();
    const [services, setServices] = React.useState([]);
    const [error, setError] = React.useState("");
    const [serviceName, setServiceName] = React.useState("");
    const [timeDuration, setTimeDuration] = React.useState("");
    const [cost, setCost] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");


    React.useEffect(function() {
        Axios.get("api/services", {headers: {"x-auth-token": props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    if (response.data.services.length === 0) {
                        setServices([]);
                    }
                    else {
                        setServices(createMaplist(response.data.services, "serviceName"));
                    }
                }
                else if (response.status === 204) {
                    setServices([]);
                }
            }
        ).catch(error => {
                setError("Something went wrong");
            }
        )
    }, [])

    function getServiceName(e) {
        setServiceName(e.target.value);
    }

    function getCost(e) {
        setCost(e.target.value);
    }

    function getTimeDuration(e) {
        setTimeDuration(e.target.value);
    }

    function requiresEmployeeSet(bool) {
        return function () {
            setRequiresEmployee(bool)
        }
    }

    function deleteService(id) {
        return () => {
            Axios.post('/api/services/delete', {serviceId: id}, {headers: {"x-auth-token": props.adminToken}}).then(
                response => {
                    if (response.status === 200) {
                        let newServices = [...services].filter(e => {
                            return e.id !== id;
                        })
                        setServices(newServices);
                        setSuccessMessage("");
                        setTimeout(() => setSuccessMessage("Service Deleted!"), 200);
                    }
                }
            ).catch(error => {
                setError("");
                setTimeout(() => setError("Something went wrong"), 200);
            })
        }
    }

    function addService() {
        let exit = false;
        if (requiresEmployee !== undefined && serviceName !== "" && cost !== "" && timeDuration !== "") {
            if (Number.isNaN(Number(cost))) {
                setError("");
                setTimeout(() => setError("Cost must be a number"), 200);
            }
            else {
                if (services.length > 0) {
                    services.forEach(element => {
                        if (element.displayName === serviceName) {
                            setError("");
                            setTimeout(() => setError("Service already exists"), 200);
                            exit = true;
                        }
                    })
                }
                if (exit) {
                    return;
                }
                     Axios.post("api/services/create", {cost, timeDuration, requiresEmployee, serviceName}, { headers: {"x-auth-token": props.adminToken}}).then(
                      response => {
                        if (response.status === 200 || response.status === 201) {
                            setSuccessMessage("");
                            setTimeout(() => setSuccessMessage("Service Created"), 200);
                            const newServices = [...services];
                            newServices.push(createMaplistElement(response.data.newServiceType, "serviceName"));
                            setServices(newServices);
                        }
                    }
                    ).catch(error => {
                        console.log(error)
                 })
            }
         }
        else {
            setError("");
            setTimeout(() => setError("Please fill in all fields"), 200);
        }  
    }

    return (
        <div id={styles.mainContainerServices}>
            <p style={{marginTop: "16px"}}>Add the services that your business offers below followed by the price and the time duration of that service. Then select if the service requires an employee for the service to be conducted.</p>
            <div id={styles.subContainer}>
            <div style={{width: "330px", backgroundColor: "lavenderblush", padding: "20px", boxShadow: "0px 0px 3px black", marginTop: "30px", height: "300px"}}>
                <p style={{fontSize: "18px", fontWeight: "bold", textAlign: "center", marginBottom: "20px"}}>Add Service:</p>
                <input onChange={getServiceName} value={serviceName} placeholder={"Enter Service Name"} className={styles.inputs}/>
                <div style={{display: "flex", marginTop: "24px", position: 'relative', right: "13px", width: "365px"}}>
                    <p style={{fontSize: "22px", marginTop: "4px"}}>$</p>
                    <input onChange={getCost} value={cost} className={styles.inputs} style={{width: "110px", marginLeft: "2px"}} placeholder={"Service Cost"}/>
                    <select onChange={getTimeDuration} value={timeDuration} style={{width: "190px", marginLeft: "20px", backgroundColor: "white", border: "1px solid rgb(145, 145, 145)", borderRadius: "2px"}}>
                        <option>Service Time Duration</option>
                        <option>5 Minutes</option>
                        <option>10 Minutes</option>
                        <option>15 Minutes</option>
                        <option>20 Minutes</option>
                        <option>25 Minutes</option>
                        <option>30 Minutes</option>
                        <option>45 Minutes</option>
                        <option>1 Hour</option>
                        <option>1 Hour 15 Minutes</option>
                        <option>1 Hour 30 Minutes</option>
                        <option>1 Hour 45</option>
                        <option>2 Hours</option>
                    </select>
                </div>
                <div style={{display: "flex", marginTop: "24px", justifyContent: "space-between"}}>
                    <p style={{fontSize: "18px"}}>Requires Employee:</p>
                    <ColorButton backgroundColor={requiresEmployee ? "#919191" : ""} clicked={requiresEmployeeSet(true)}>Yes</ColorButton>
                    <ColorButton backgroundColor={requiresEmployee === false ? "#919191" : ""} clicked={requiresEmployeeSet(false)}>No</ColorButton>
                </div>   
                <div style={{display: 'flex', justifyContent: "center", marginTop: "30px"}}>
                    <SubmitButton onClick={addService}>Add Service</SubmitButton>
                </div>   
            </div>
            {services && services.length > 0 &&
            <div style={{display: 'flex', alignItems: "center", marginTop: "20px", flexDirection: "column"}}>
                    <p style={{fontSize: "18px", fontWeight: "bold", marginBottom: "15px"}}>Services:</p>
                    <Maplist delete={(id) => deleteService(id)} array={services}/>
            </div>
            }
            {services.length === 0 && <p style={{fontSize: "18px", fontWeight: "bold", marginTop: "20px"}}>You have no registered services!</p>}
            </div>
            <OtherAlert alertType={"success"} alertMessage={successMessage} showAlert={successMessage !== ""}/>
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapStateToProps)(AddEditServices);
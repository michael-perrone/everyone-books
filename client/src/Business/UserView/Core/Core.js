import React, {useEffect, useState} from 'react';
import styles from './Core.module.css';
import Axios from 'axios';
import StatementAppear from '../../../Shared/StatementAppear/StatementAppear';
import DateDrop from "../../../Shared/DateDrop/DateDrop";
import TimeList from "../../../Shared/TimeList/TimeList";
import {intToStringTime, createMaplist, getTimeRightAway, getTs} from '../../../feutils/feutils';
import ColorButton from '../../../Shared/ColorButton/ColorButton';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';
import ServiceList from "../../../Shared/ServiceList/ServiceList";
import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import SelectOneList from "../../../Shared/SelectOneList/SelectOneList";
import BCAList from "../../../Shared/BCAList/BCAList";
import {connect} from 'react-redux';

const Core = (props) => {
    const [dateChosen, setDateChosen] = React.useState('');
    const [employeeChosen, setEmployeeChosen] = React.useState('');
    const [dateString, setDateString] = useState("");
    const [employees, setEmployees] = useState([]);
    const [time, setTime] = useState(getTimeRightAway);
    const [times, setTimes] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [employeeNeeded, setEmployeeNeeded] = useState();
    const [employeesBack, setEmployeesBack] = useState([]);
    const [error, setError] = useState("");
    const [bookingType, setBookingType] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedBcn, setSelectedBcn] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [cost, setCost] = useState(0);
    const [showAreaSuccess, setShowAreaSuccess] = useState(false);

      function createBooking() {
       if (bookingType === "Regular") {
         Axios.post("api/iosBooking/sendNotiFromUser", selectedBcn ? {timeStart: time, date: dateString, serviceIds: selectedServices,
           businessId: props.admin.admin.businessId, bcn: selectedBcn, employeeId: selectedEmployee } : {timeStart: time, date: dateString,
             serviceIds: selectedServices, businessId: props.business._id, employeeId: selectedEmployee}, {headers: {'x-auth-token': props.userToken}}).then(
          response => {
            if (response.status === 200) {
              setEmployeesBack([]);
              setSelectedEmployee();
            

              setSelectedBcn("");
              setSuccessMessage("");
              setTimeout(() => setSuccessMessage("Your booking request has been sent and you will be notified if it is accepted."), 200);
              props.loadSchedule(); // check this
            }
          }
        ).catch(error => {
          console.log(error)
        })
       }
   
       else if (bookingType === "Areas") {
         Axios.post("api/iosBooking/user/area", {timeStart: time, date: dateString, serviceIds: selectedServices,
           businessId: props.business._id, bcn: selectedBcn}, {headers: {'x-auth-token': props.userToken}}).then(
          response => {
            if (response.status === 200) {
              setSelectedBcn("");
              setSuccessMessage("");
              setShowAreaSuccess(false);
              setSelectedServices([]);
              setTimeout(() => setSuccessMessage("Your booking request has been sent and you will be notified if it is accepted."), 200);
              props.bookingAdded(); // check this
            }
          }
        ).catch(error => {
          console.log(error);
        })
       }
      }


      useEffect(function() {
          if (dateString && props.business.schedule) {
            console.log("yoooo");
            console.log(props.business);
            const day = new Date(dateString).getDay();
            console.log(day);
            const open = props.business.schedule[day].open;
            const close = props.business.schedule[day].close;
            console.log(getTs(open,close));
          setTimes(getTs(open, close));
          }
      },[dateString, props.business])

    function getAvailableEmployees() {
        if (selectedServices.length === 0) {
          setError("");
          setTimeout(() => setError("Choose at least one service to be performed"), 200);
          return;
        }
        if (employeeNeeded === false) {
          Axios.post('/api/getBookings/areas', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.business._id}).then(
            response => {
              if (response.status === 201) {
                setError("");
                setTimeout(() => setError("The business will close before the service can end"))
              }
              if (response.status === 200) {
                setBookingType("Areas")
                setShowAreaSuccess(true);
              }
            }
          ).catch(error => {
            if (error.response.status === 409) {
              console.log("ISNT THIS ME");
              setError("");
              setTimeout(() => setError("This time has already passed and cannot be scheduled"))
            }
            else if (error.response.status === 406) {
              setError("");
              setTimeout(() => setError("There is no availability at this time"), 200);
            }
          })
          setEmployeesBack([])
          return;
        }
  
        if (employeeNeeded === true) {
        Axios.post('api/getBookings', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.admin.admin.businessId}, {headers: {'x-auth-token': props.adminToken}}).then(
          response => {
             if (response.status === 200) {
               setBookingType("Regular")
               setEmployeesBack(createMaplist(response.data.employees, "fullName"));
               props.slideLeft()
             }
             if (response.status === 201) {
              setError("");
              setTimeout(() => setError("The business will close before the service can end"))
             }
          }
        ).catch(error => {
          if (error.response) {
            if (error.response.status === 409) {
              setError("");
              setTimeout(() => setError("This time has already passed and cannot be scheduled"))
            }
            else if (error.response.status === 406) {
              setError("");
              setTimeout(() => setError("There is no availability at this time"), 200);
            }
            else {
              console.log(error)
            }
          }
        })
      }
    }
  

    React.useEffect(() => {
        setEmployees(props.employees)
    }, [props.employees])

    function toSetTime(time) {
        setTime(time);
    }

    function minusService(id) {
        return function() {
        const selectedServiceIds = [...selectedServices].filter((e) => {
          return e !== id
        });
        setSelectedServices(selectedServiceIds);
        if (selectedServiceIds.length === 0) {
          setEmployeeNeeded();
          setEmployeesBack([]);
        }
        }
      }

      function unSelectEmployee() {
        setSelectedEmployee();
      }
  
      function selectEmployee(id) {
        console.log(id)
          setSelectedEmployee(id)
      }
  


    function getDate(e) {
        let dateArray = e.target.value.split('-');
         setDateChosen(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString())
    }

    function toSetDateString(dateString1) {
        setDateString(dateString1)
    }

    function unSelectEmployee() {
        setSelectedEmployee();
    }

      function toSetBcn(bcn) {
        return function() {
          setSelectedBcn(bcn);
        }
      }

    function selectService(service) {
        return function() {
           if (employeeNeeded && service.requiresEmployee === false) {
              setError("");
              setTimeout(() => setError("Please reselect your services, these cannot be combined due to employee requrements."))
              setSelectedServices([]);
              setEmployeeNeeded();
              setEmployeesBack([]);
              return;
          }
          if (employeeNeeded === false && service.requiresEmployee === true) {
            setError("");
            setTimeout(() => setError("Please reselect your services, these cannot be combined due to employee requrements."))
            setSelectedServices([]);
            setEmployeeNeeded();
            setEmployeesBack([]);
            return;
          }
          setEmployeeNeeded(service.requiresEmployee)
          const selectedServiceIds = [...selectedServices];
          selectedServiceIds.push(service._id);
          setSelectedServices(selectedServiceIds);
        }
      }

    React.useEffect(() => {
        if (dateChosen) {
        Axios.post('/api/employees_dates/dates', {date: dateChosen, businessId: props.business._id}).then(
            response => {
                setEmployees(response.data.availableEmployees)
            }
          )
          setEmployeeChosen('')
        }
    }, [dateChosen])


    return (
            <div id={styles.actualCoreContainer}>
               <div id={styles.newContainer}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} className={styles.holder}>
              <div style={{marginTop: "10px", display: "flex" }}>
                <p className={styles.ptags}>Select Date:</p>
                <DateDrop setDateString={(dateString) => toSetDateString(dateString)}/>
              </div>
              <div style={{marginTop: "13px", display: "flex"}}>
                   <p style={{position: "relative", top: "4px"}} className={styles.ptags}>Select Time:</p>
                  <TimeList time={time} times={times} setTime={(time) => toSetTime(time)}/>
              </div>
              </div>
              <div>
              <div style={{marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p style={{fontSize: "18px", fontWeight: 'bold', marginTop: "12px", textAlign: "center", position: 'relative', right: "20px", marginBottom: "10px"}}>Choose Services:</p>
                <ServiceList minusService={(id) => minusService(id)} selectedServices={selectedServices} addService={(id) => selectService(id)} array={props.services ? props.services : []} />
              </div>
                <div style={{marginTop: "22px", display: "flex", justifyContent: "center"}}>
                  {props.services && props.services.length > 0 ? <SubmitButton onClick={getAvailableEmployees}>Check Availability</SubmitButton> : <p style={{width: "330px", marginLeft: "10px"}}>This business has no services, please edit your business profile to create services and add employees!</p>}
                </div>
              </div>
              <div style={{display: "flex", flexDirection: 'column',}}>
              {/* <StatementAppear center={true} appear={employeeNeeded && employeesBack.length > 0 && selectedServices.length > 0 && (bcnArray === undefined) || employeesBack.length > 0 && selectedServices.length > 0 && (bcnArray && bcnArray.length > 0)}>
                <p style={{fontWeight: "bold", fontSize: "18px", marginBottom: "10px", marginTop: "26px"}}>Employees Available:</p>
                <SelectOneList unSelectOne={unSelectEmployee} array={employeesBack} selected={selectedEmployee} selectOne={(id) => selectEmployee(id)}/>
              </StatementAppear> */}
              <StatementAppear appear={showAreaSuccess}>
              <p style={{marginTop: "20px"}}>There is availability at this time for the selected {selectedServices.length > 0 ? "services" : "service"}, click the button below to send your request.</p>
              <div style={{width: "350px", marginTop: "20px"}}><SubmitButton onClick={createBooking}>Send Request</SubmitButton></div>
              </StatementAppear>
              <OtherAlert alertType={"error"} alertMessage={error} showAlert={error !== ""}/>
              <OtherAlert alertMessage={successMessage} showAlert={successMessage !== ""} alertType="success" />
              </div>
        </div>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        userToken: state.authReducer.token
    }
}

export default connect(mapStateToProps)(Core);
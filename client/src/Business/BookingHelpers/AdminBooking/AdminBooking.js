import React, {useState, useEffect} from "react";
import styles from "./AdminBooking.module.css";
import { connect } from "react-redux";
import {
  BOOKING_TYPE,
  TIME_SELECTED,
  EMPLOYEE_CHOSEN,
  EMPLOYEE_SHIFT_ERROR,
  HIDE_DROP_DOWN,
  BREAK_ALERT,
  ONE_SHIFT_ONE_BREAK,
  ONE_SHIFT_NO_BREAK,
  TWO_SHIFTS_NO_BREAK,
  TWO_SHIFTS_ONE_BREAK,
  TWO_SHIFTS_TWO_BREAKS
} from "../../../actions/actions";
import Calendar from "../../Calendar/Calendar";
import Axios from "axios";
import TimeList from "../../../Shared/TimeList/TimeList";
import DateDrop from "../../../Shared/DateDrop/DateDrop";
import ColorButton from '../../../Shared/ColorButton/ColorButton';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';
import {intToStringTime, createMaplist, getTimeRightAway} from '../../../feutils/feutils';
import ServiceList from "../../../Shared/ServiceList/ServiceList";
import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import StatementAppear from '../../../Shared/StatementAppear/StatementAppear';
import SelectOneList from "../../../Shared/SelectOneList/SelectOneList";
import BCAList from "../../../Shared/BCAList/BCAList";
import x from './x.png'
import e from "cors";




  function AdminBooking(props) {

    const [cloneBooking, setCloneBooking] = useState();
    const [dateString, setDateString] = useState("");
    const [numberOfTimesToClone, setNumberOfTimesToClone] = useState("1");
    const [time, setTime] = useState(getTimeRightAway);
    const [daysBetweenBookings, setDaysBetweenBookings] = useState("1");
    const [times, setTimes] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [employeesBack, setEmployeesBack] = useState([]);
    const [bcnArray, setBcnArray] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [customerFound, setCustomerFound] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedBcn, setSelectedBcn] = useState("");
    const [registeringNewGuest, setRegisteringNewGuest] = useState(false);
    const [newGuestName, setNewGuestName] = useState("");
    const [employeeNeeded, setEmployeeNeeded] = useState();
    const [bookingType, setBookingType] = useState("");
    const [datesForClone, setDatesForClone] = useState("");
    const [services, setServices] = useState([]);

    

    function createBooking() {
     // data = ["phone": phone ,"timeStart": timeStart, "date": date, "serviceIds": serviceIdsArray,
      // "businessId": Utilities().decodeAdminToken()!["businessId"], "bcn": selectedBcn, "cost": costForTable]
      if (phoneNumber === "") {
        setError("");
        setTimeout(() => setError("Please fill in phone number"), 200);
      }
      if (!registeringNewGuest && !customerFound) {
        setError("");
        setTimeout(() => setError("Please fill in phone number"), 200);
      }
      if (registeringNewGuest && newGuestName === "") {
        setError("");
        setTimeout(() => setError("Please fill in new guest name"), 200);
      }

    if (bookingType === "Regular") {
      Axios.post("api/iosBooking/admin", selectedBcn ? {phone: phoneNumber, timeStart: time, date: dateString, serviceIds: selectedServices,
        businessId: props.admin.admin.businessId, bcn: selectedBcn, employeeId: selectedEmployee } : {phone: phoneNumber, timeStart: time, date: dateString,
          serviceIds: selectedServices, businessId: props.admin.admin.businessId,  employeeId: selectedEmployee}).then(
       response => {
         if (response.status === 200) {
           setEmployeesBack([]);
           setSelectedEmployee();
           setPhoneNumber("");
           setNewGuestName("");
           setCustomerFound();
           setSelectedBcn("");
           setSuccessMessage("");
           setTimeout(() => setSuccessMessage("Booking successfully created"), 200);
           props.loadSchedule(); // check this
         }
       }
     ).catch(error => {
       console.log(error)
     })
    }

    else if (bookingType === "Area") {
      Axios.post("api/iosBooking/admin/area", {phone: phoneNumber, timeStart: time, date: dateString, serviceIds: selectedServices,
        businessId: props.admin.admin.businessId, bcn: selectedBcn}).then(
       response => {
         if (response.status === 200) {
           setEmployeesBack([]);
           setSelectedEmployee();
           setPhoneNumber("");
           setNewGuestName("");
           setCustomerFound();
           setSelectedBcn("");
           setSuccessMessage("");
           setTimeout(() => setSuccessMessage("Booking successfully created"), 200);
           props.bookingAdded(); // check this
         }
       }
     ).catch(error => {
       console.log(error)
     })
    }

    else if (bookingType === "Clone") {
      Axios.post("api/iosBooking/admin/clone", selectedBcn ? {phone: phoneNumber, timeStart: time, date: dateString, serviceIds: selectedServices,
        businessId: props.admin.admin.businessId, bcn: selectedBcn, employeeId: selectedEmployee, dates: datesForClone} : {phone: phoneNumber, timeStart: time, date: dateString,
          serviceIds: selectedServices, businessId: props.admin.admin.businessId,  employeeId: selectedEmployee, datesForClone}).then(
       response => {
         if (response.status === 200) {
           setEmployeesBack([]);
           setSelectedEmployee();
           setPhoneNumber("");
           setNewGuestName("");
           setCustomerFound();
           setSelectedBcn("");
           setSuccessMessage("");
           setTimeout(() => setSuccessMessage("Booking successfully created"), 200);
           props.bookingAdded(); // check this
         }
       }
     ).catch(error => {
       console.log(error)
     })
    }

    else if (bookingType === "Clone Areas") {
      Axios.post("api/iosBooking/admin/clone/area", {phone: phoneNumber, timeStart: time, date: dateString, serviceIds: selectedServices,
        businessId: props.admin.admin.businessId, bcn: selectedBcn, dates: datesForClone}).then(
       response => {
         if (response.status === 200) {
             setEmployeesBack([]);
             setSelectedEmployee();
             setPhoneNumber("");
             setNewGuestName("");
             setCustomerFound();
             setSelectedBcn("");
             setSuccessMessage("");
             setTimeout(() => setSuccessMessage("Booking successfully created"), 200);
             props.bookingAdded(); // check this
           }
         }
      ).catch(error => {
          console.log(error)
        })
      }
    }

    function toSetNewGuestName(e) {
      setNewGuestName(e.target.value)
    }

    function cancelRegisteringNewGuest() {
      setRegisteringNewGuest(false);
    }


    function registerNewGuest() {
      setRegisteringNewGuest(true)
    }


    function toSetDateString(dateString1) {
          setDateString(dateString1)
    }

    function findGuest() {
      console.log("hello")
      Axios.post("api/getCustomers/addNewCustomer", {phoneNumber}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
          if (response.status === 200) {
            setCustomerFound(response.data.user);
          }
      }).catch(error => {
        setError("");
        setTimeout(() => setError("Customer Not Found"), 200);
      })
    }

    function toSetBcn(bcn) {
      return function() {
        setSelectedBcn(bcn);
      }
    }

    function removeFound() {
      setCustomerFound();
    }

    function toSetPhoneNumber(e) {
      setPhoneNumber(e.target.value)
    }

    function toSetTime(time) {
        setTime(time);
    }

    function toSetCloneBooking(bool) {
        return () => {
          setCloneBooking(bool);
        }
    }

    function selectService(service) {
      return function() {
         if (employeeNeeded && service.requiresEmployee === false) {
            setError("");
            setTimeout(() => setError("Please reselect your services, these cannot be combined due to employee requrements."))
            setSelectedServices([]);
            setEmployeeNeeded();
            setBcnArray();
            setEmployeesBack([]);
            return;
        }
        if (employeeNeeded === false && service.requiresEmployee === true) {
          setError("");
          setTimeout(() => setError("Please reselect your services, these cannot be combined due to employee requrements."))
          setSelectedServices([]);
          setEmployeeNeeded();
          setBcnArray();
          setEmployeesBack([]);
          return;
        }
        setEmployeeNeeded(service.requiresEmployee)
        const selectedServiceIds = [...selectedServices];
        selectedServiceIds.push(service._id);
        setSelectedServices(selectedServiceIds);
      }
    }

    function minusService(id) {
      return function() {
      const selectedServiceIds = [...selectedServices].filter((e) => {
        return e !== id
      });
      setSelectedServices(selectedServiceIds);
      if (selectedServiceIds.length === 0) {
        setEmployeeNeeded();
        setBcnArray()
        setEmployeesBack([]);
      }
      }
    }

    function getAvailableEmployees() {

      if (cloneBooking === undefined) {
        setError("");
        setTimeout(() => setError("Choose whether this booking will be cloned"), 200);
        return;
      }
      if (selectedServices.length === 0) {
        setError("");
        setTimeout(() => setError("Choose at least one service to be performed"), 200);
        return;
      }

      if (employeeNeeded === false && cloneBooking === true) {
        Axios.post('/api/getBookings/cloneAreas', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.admin.admin.businessId, cloneNum: numberOfTimesToClone, daysBetween: daysBetweenBookings, cloneNum: numberOfTimesToClone, daysBetween: daysBetweenBookings}).then(
          response => {
            if (response.status === 200) {
              if (response.data.bcnArray) {
                 setBcnArray(response.data.bcnArray);
              }
              setDatesForClone(response.data.dates);
              setBookingType("Clone Areas");
              setEmployeesBack(createMaplist(response.data.employees, "fullName"));
              props.slideLeft()
            }
            if (response.status === 201) {
               if (response.data.day) {
                setError("");
                setTimeout(() => setError(`The business will be closed on ${response.data.day} at this time. Please choose a different time.`))
               }
               else {
                setError("");
                setTimeout(() => setError(`The business will be not be open yet on ${response.data.openError} at this time. Please choose a different time.`))
               }
             }
          }
        ).catch(error => {
          if (error.response) {
            if (error.response.status === 409) {
              setError("");
              setTimeout(() => setError("This time has already passed and cannot be scheduled"), 200);
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

      if (employeeNeeded === false && cloneBooking === false) {
        Axios.post('/api/getBookings/areas', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.admin.admin.businessId, cloneNum: numberOfTimesToClone, daysBetween: daysBetweenBookings}).then(
          response => {
            if (response.status === 201) {
              setError("");
              setTimeout(() => setError("The business will close before the service can end"))
            }
            if (response.status === 200) {
              setBcnArray(response.data.bcnArray);
              setBookingType("Areas")
            }
          }
        ).catch(error => {
          if (error.response.status === 409) {
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

      if (cloneBooking === true && employeeNeeded === true) {
        Axios.post('api/getBookings/clone', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.admin.admin.businessId, cloneNum: numberOfTimesToClone, daysBetween: daysBetweenBookings}, {headers: {'x-auth-token': props.adminToken}}).then(
          response => {
             if (response.status === 200) {
               if (response.data.bcnArray) {
                  setBcnArray(response.data.bcnArray);  
               }
               setDatesForClone(response.data.dates);
               setBookingType("Clone");
               setEmployeesBack(createMaplist(response.data.employees, "fullName"));
               props.slideLeft()
             }
             if (response.status === 201) {
              if (response.data.day) {
               setError("");
               setTimeout(() => setError(`The business will be closed on ${response.data.day} at this time. Please choose a different time.`))
              }
              else {
               setError("");
               setTimeout(() => setError(`The business will be not be open yet on ${response.data.openError} at this time. Please choose a different time.`))
              }
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

      if (cloneBooking === false && employeeNeeded === true) {
      Axios.post('api/getBookings', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.admin.admin.businessId}, {headers: {'x-auth-token': props.adminToken}}).then(
        response => {
           if (response.status === 200) {
             if (response.data.bcnArray) {
                setBcnArray(response.data.bcnArray);
             }
             setBookingType("Regular")
             setEmployeesBack(createMaplist(response.data.employees, "fullName"));
             props.slideLeft()
           }
           if (response.status === 201) {
             console.log(response.data)
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

    function selectEmployee(id) {
      console.log(id)
        setSelectedEmployee(id)
    }

    function unSelectEmployee() {
      setSelectedEmployee();
    }

    

    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];



    useEffect(function() {
      if (dateString !== "") {
        Axios.post("api/business/startEndTime", {date: dateString}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
               const newTimes = [];
               let i = response.data.open;
               let timeRightAway = "";
               while (i <= response.data.close) {
                  if (intToStringTime[i] === getTimeRightAway()) {
                    timeRightAway = intToStringTime[i];
                  }
                  newTimes.push(i);
                  i++;
               }
               timeRightAway === "" ? setTime(intToStringTime[response.data.open]) : setTime(timeRightAway); 
               setTimes(newTimes)  
            }
        })
      }
       
    }, [dateString])

    //appear={employeesBack.length > 0 && (bcnArray === undefined || (bcnArray && bcnArray.length > 0))}

    function toSetCloneNumber(e) {
        setNumberOfTimesToClone(e.target.value);
    }

    function toSetDaysBetweenBookings(e) {
      setDaysBetweenBookings(e.target.value);
  }

    return (
      <div id={styles.bookingHolder} onClick={props.hideDropDown}>
          <div id={styles.coolContainer} style={{maxWidth: "400px"}}>
          <Calendar/>
          </div>
          <div id={styles.newContainer}>
              <div className={styles.holder}>
              <p style={{fontSize: "18px", fontWeight: 'bold', marginTop: "20px", textAlign: "center", position: 'relative', right: "20px"}}>Create Booking:</p>
              <div style={{marginTop: "32px"}}>
                <p className={styles.ptags}>Select Date:</p>
                <DateDrop setDateString={(dateString) => toSetDateString(dateString)}/>
              </div>
              <div style={{marginTop: "26px"}}>
                   <p className={styles.ptags}>Select Time:</p>
                  <TimeList time={time} times={times} setTime={(time) => toSetTime(time)}/>
              </div>
              <div style={{marginTop: "24px"}}>
                  <p className={styles.ptags}>Clone Booking?</p>
                  <ColorButton backgroundColor={cloneBooking === true ? "darkgray": ""} clicked={toSetCloneBooking(true)}>Yes</ColorButton>
                  <ColorButton backgroundColor={cloneBooking === false ? "darkgray": ""} clicked={toSetCloneBooking(false)}>No</ColorButton>
              </div> 
                <React.Fragment>
                  <div style={{marginTop: "24px"}}>
                    <p className={styles.ptags}>Number of Times to Clone:</p>
                    <select onChange={toSetCloneNumber} value={numberOfTimesToClone} style={{width: "60px"}}>
                      {!cloneBooking && <option>0</option>}
                      {cloneBooking && days.map(element => <option key={element}>{element}</option>)}
                    </select>
                  </div>
                    <div style={{marginTop: "24px"}}>
                    <p className={styles.ptags}>Days Between Clones:</p>
                    <select onChange={toSetDaysBetweenBookings} value={daysBetweenBookings}  style={{width: "60px"}}>
                      {cloneBooking && days.map(element => <option key={element}>{element}</option>)}
                      {!cloneBooking && <option>0</option>}
                    </select>
                  </div>
                  </React.Fragment>
              </div>
              <div>
              <div style={{marginTop: "18px", display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p style={{fontSize: "18px", fontWeight: 'bold', marginTop: "20px", textAlign: "center", position: 'relative', right: "20px", marginBottom: "20px"}}>Choose Services:</p>
                <ServiceList minusService={(id) => minusService(id)} selectedServices={selectedServices} addService={(id) => selectService(id)} array={props.services} />
              </div>
                <div style={{marginTop: "22px", textAlign: "center"}}>
                  {props.services.length > 0 ? <SubmitButton onClick={getAvailableEmployees}>Check Availability</SubmitButton> : <p style={{width: "350px", marginLeft: "10px"}}>Your business has no services, please edit your business profile to create services and add employees!</p>}
                </div>
              </div>
              <div style={{display: "flex", flexDirection: 'column',}}>
              <StatementAppear center={true} appear={employeeNeeded && employeesBack.length > 0 && selectedServices.length > 0 && (bcnArray === undefined) || employeesBack.length > 0 && selectedServices.length > 0 && (bcnArray && bcnArray.length > 0)}>
                <p style={{fontWeight: "bold", fontSize: "18px", marginBottom: "10px", marginTop: "26px"}}>Employees Available:</p>
                <SelectOneList unSelectOne={unSelectEmployee} array={employeesBack} selected={selectedEmployee} selectOne={(id) => selectEmployee(id)}/>
              </StatementAppear>
              {(bcnArray !== undefined || employeesBack.length > 0) && <div style={{height: "40px", width: "375px"}}><p style={{fontWeight: "bold", fontSize: "18px", textAlign: 'center', marginTop: employeesBack.length > 0 ? "25px": "0px"}}>Find Customer:</p></div>}
              <StatementAppear appear={selectedServices.length > 0 && ((bcnArray && bcnArray.length > 0) || props.eq === "y" && employeesBack.length > 0)} center={true}>
                <div style={{display: 'flex', marginTop: "20px"}}>
                <input value={phoneNumber} onChange={toSetPhoneNumber} style={{width: "220px", height: "28px", fontSize: "18px", borderBottom: "2px solid black", backgroundColor: "transparent", borderTop: "none", borderLeft: "none", borderRight: "none "}} placeholder="Customer Phone #"/>
                {!registeringNewGuest && <SubmitButton onClick={findGuest}>Find Guest</SubmitButton>}
                {registeringNewGuest && <img src={x} alt="cancel" onClick={cancelRegisteringNewGuest} style={{fontWeight: "bold", marginLeft: "20px", marginTop: '-3px'}}/>}
                </div>
                {customerFound === undefined && !registeringNewGuest &&
                <React.Fragment>
                <p style={{marginTop: "10px"}}>or...</p>
                <SubmitButton onClick={registerNewGuest} marginTop={"10px"}>Register New Guest</SubmitButton>
                </React.Fragment>
                  }
                  {registeringNewGuest && <div style={{textAlign: "left"}}><input value={newGuestName} onChange={toSetNewGuestName} style={{width: "220px", marginLeft: "30px", height: "28px", fontSize: "18px", borderBottom: "2px solid black", backgroundColor: "transparent", borderTop: "none", borderLeft: "none", borderRight: "none "}} placeholder="New Guest Name"/></div>}
                {customerFound !== undefined &&
                <React.Fragment>
                  <p style={{fontWeight: "bold", fontSize: "18px", marginTop: "12px", width: "200px", textAlign: "left"}}>Customer:</p>
                  <div style={{display: "flex"}}><p style={{ padding: "10px", marginTop: "14px", boxShadow: "0px 0px 3px black", width: "200px"}}>{customerFound.fullName}</p><img src={x} alt={"cancel"} onClick={removeFound} style={{position: 'relative', top: "12px", marginLeft: "18px", cursor: "pointer", height: "36px", width: "36px"}}/></div>
                 </React.Fragment>}
                 {bcnArray && bcnArray.length > 0 && <p style={{fontWeight: "bold", fontSize: "18px", marginTop: "35px"}}>{props.bct}:</p>}
                 {bcnArray && bcnArray.length > 0 && <div style={{ marginTop: "14px"}}><BCAList selectBcn={(bcn) => toSetBcn(bcn)} selectedBcn={selectedBcn} bcnList={bcnArray}/></div>}
                 <div style={{height: '30px', width: "375px"}}></div>
                 <StatementAppear appear={(customerFound && selectedBcn !== "" && selectedEmployee) || (registeringNewGuest && phoneNumber !== "" && newGuestName !== "") ||
                  (bcnArray === undefined && customerFound && selectedEmployee) ||
                  (selectedBcn !== "" && employeesBack.length === 0 && customerFound) ||
                   (selectedBcn !== "" && registeringNewGuest && newGuestName !== "" && phoneNumber !== "") }><div style={{width: "150px"}}><SubmitButton onClick={createBooking}>Create Booking</SubmitButton></div></StatementAppear>
                 <div style={{height: '50px', width: "375px"}}></div>
              </StatementAppear>
              </div>
        </div>
        <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
        <OtherAlert showAlert={error !== ""} alertMessage={error} alertType={"notgood"}/>
      </div>
    );
  }



const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    employee: state.authReducer.employee,
    admin: state.authReducer.admin,
    bookingType: state.bookingInfoReducer.bookingType,
    employeeChosen: state.bookingInfoReducer.employeeChosen,
    timeChosen: state.bookingInfoReducer.timeSelected,
    date: state.dateReducer.dateChosen,
    adminToken: state.authReducer.adminToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
   
    setBreakAlert: (obj) => dispatch({type: BREAK_ALERT, payload: obj}),
    setEmployeeShiftError: (trueOrFalse) => dispatch({type: EMPLOYEE_SHIFT_ERROR, payload: trueOrFalse}),
    getBookingType: bookingType =>
      dispatch({ type: BOOKING_TYPE, payload: { bookingType } }),
    getTimeChosen: timeChosen =>
      dispatch({ type: TIME_SELECTED, payload: { timeSelected: timeChosen } }),
    getEmployeeChosen: employeeChosen =>
      dispatch({ type: EMPLOYEE_CHOSEN, payload: { employeeChosen } }),
    setOneShiftOneBreak: (onlyShiftStarts, onlyShiftEnds, onlyBreakStarts, onlyBreakEnds) =>
      dispatch({type: ONE_SHIFT_ONE_BREAK, payload: {onlyBreakStarts, onlyShiftEnds, onlyBreakEnds, onlyShiftStarts}}),
    setOneShiftNoBreak: (onlyShiftStarts, onlyShiftEnds) => 
      dispatch({type: ONE_SHIFT_NO_BREAK, payload: {onlyShiftStarts, onlyShiftEnds}}),
    setTwoShiftsNoBreak: (firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds) =>
      dispatch({type: TWO_SHIFTS_NO_BREAK, payload: {firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds}}),
    setTwoShiftsOneBreak: (firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, onlyBreakStarts, onlyBreakEnds) => 
      dispatch({type: TWO_SHIFTS_ONE_BREAK, payload: {firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, onlyBreakStarts, onlyBreakEnds}}),
    setTwoShiftsTwoBreaks: (firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, firstBreakStarts, firstBreakEnds, secondBreakStarts, secondBreakEnds) => 
      dispatch({type: TWO_SHIFTS_TWO_BREAKS, payload: {firstShiftStarts, firstShiftEnds, secondShiftStarts, secondShiftEnds, firstBreakStarts, firstBreakEnds, secondBreakStarts, secondBreakEnds}})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooking);

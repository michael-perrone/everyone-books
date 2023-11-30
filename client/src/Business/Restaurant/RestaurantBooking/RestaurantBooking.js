import React, {useState, useEffect} from "react";
import styles from "./RestaurantBooking.module.css";
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
import x from '../../BookingHelpers/AdminBooking/x.png'
import {withRouter} from 'react-router-dom';





  function RestaurantBooking(props) {

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


    function goToEditBusiness() {
      props.history.push(`/admin/${props.admin.admin.id}/createeditprofile`)
    }

    useEffect(function() {

    }, [])



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
          setBcnArray();
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

      if (employeeNeeded === false && cloneBooking === false) {
        Axios.post('/api/getBookings/areas', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.admin.admin.businessId, cloneNum: numberOfTimesToClone, daysBetween: daysBetweenBookings}).then(
          response => {
            if (response.status === 201) {
              setError("");
              setTimeout(() => setError("The business will close before the service can end"))
            }
            if (response.status === 200) {
              setBcnArray(response.data.bcnArray);
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


      if (cloneBooking === false && employeeNeeded === true) {
      Axios.post('api/getBookings', {date: dateString, serviceIds: selectedServices, timeChosen: time, businessId: props.admin.admin.businessId}, {headers: {'x-auth-token': props.adminToken}}).then(
        response => {
           if (response.status === 200) {
             if (response.data.bcnArray) {
                setBcnArray(response.data.bcnArray);
             }
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

    function selectEmployee(id) {
        setSelectedEmployee(id)
    }

    function unSelectEmployee() {
      setSelectedEmployee();
    }

    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

    useEffect(function() {
      if (dateString !== "") {
        if (props.adminToken && props.admin.admin) {
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
        }).catch(error => {
          console.log(error);
        })
      }
    }
  
       
    }, [dateString, props.adminToken, props.admin.admin])

    //appear={employeesBack.length > 0 && (bcnArray === undefined || (bcnArray && bcnArray.length > 0))}

    function toSetCloneNumber(e) {
        setNumberOfTimesToClone(e.target.value);
    }

    function toSetDaysBetweenBookings(e) {
      setDaysBetweenBookings(e.target.value);
  }

    return (
      <div id={styles.bookingHolder} onClick={props.hideDropDown}>
          <div id={styles.coolContainer} className={styles.calWidth}>
          <Calendar/>
          </div>
          <div id={styles.newContainer}>
              <div className={styles.holder}>
              <p style={{fontSize: "18px", fontWeight: 'bold', marginTop: "20px", textAlign: "center", position: 'relative', right: "20px"}}>Create Table:</p>
              <div style={{marginTop: "32px"}}>
                <p className={styles.ptags}>Select Date:</p>
                <DateDrop setDateString={(dateString) => toSetDateString(dateString)}/>
              </div>
              <div style={{marginTop: "26px"}}>
                   <p className={styles.ptags}>Select Time:</p>
                  <TimeList time={time} times={times} setTime={(time) => toSetTime(time)}/>
              </div>
              </div>
              <div style={{paddingBottom: "20px"}}>
                <div style={{marginTop: "22px", justifyContent: "flex-start", display: 'flex'}}>
                 <p style={{marginLeft: "20px"}} className={styles.ptags}>Select Table:</p>
                 <select style={{width: "70px", paddingLeft: "6px", border: "none", boxShadow: '0px 0px 4px #f9e9f9'}}>
                  {props.tables.map(table => <option>{table}</option>)}
                  
                 </select>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantBooking));

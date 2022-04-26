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
import {intToStringTime, createMaplist} from '../../../feutils/feutils';
import ServiceList from "../../../Shared/ServiceList/ServiceList";


  function AdminBooking(props) {
    const [cloneBooking, setCloneBooking] = useState();
    const [dateString, setDateString] = useState("");
    const [numberOfTimesToClone, setNumberOfTimesToClone] = useState("1");
    const [time, setTime] = useState("");
    const [daysBetweenBookings, setDaysBetweenBookings] = useState("1");
    const [times, setTimes] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    function toSetDateString(dateString1) {
          setDateString(dateString1)
    }

    function toSetTime(time) {
        setTime(time);
    }

    function toSetCloneBooking(bool) {
        return () => {
          setCloneBooking(bool);
        }
    }

    function selectService(id) {
      return function() {
      const selectedServiceIds = [...selectedServices];
      selectedServiceIds.push(id);
      setSelectedServices(selectedServiceIds);
      }
    }

    function minusService(id) {
      return function() {
      const selectedServiceIds = [...selectedServices].filter(e => e.id !== id);
      setSelectedServices(selectedServiceIds);
      }
    }

    

    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];


    useEffect(function() {
      Axios.get("api/services/getServices", {headers: {'x-auth-token': props.adminToken}}).then(response => {
          if (response.data.services) {
            setServiceList(createMaplist(response.data.services, "serviceName"))
          }
      }).catch(error => {
        console.log(error)
      })
    },[]);

    useEffect(function() {
      if (dateString !== "") {
        Axios.post("api/business/startEndTime", {date: dateString}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
               const newTimes = [];
               let i = response.data.open;
               while (i <= response.data.close) {
                  newTimes.push(i);
                  i++;
               }
               setTimes(newTimes)
               setTime(intToStringTime[response.data.open])
            }
        })
      }
       
    }, [dateString])

    function toSetCloneNumber(e) {
        setNumberOfTimesToClone(e.target.value);
    }

    function toSetDaysBetweenBookings(e) {
      setDaysBetweenBookings(e.target.value);
  }

    return (
      <div id={styles.bookingHolder} onClick={props.hideDropDown}>
        <div
         id={styles.divWhereWidthChanges}
        >
          <div id={styles.coolContainer} style={{borderRight: "2px solid black", maxWidth: "400px"}}>
          <Calendar/>
          </div>
          <div id={styles.coolContainer}>
          <div className={styles.bookingHolderContainer} style={{maxWidth: "830px"}}>
            <div id={styles.addBookingContainer}>
              <div className={styles.holder}>
              <p style={{fontSize: "18px", fontWeight: 'bold', marginTop: "-10px", position: 'relative', left: "175px"}}>Create Booking with Services:</p>
              <div style={{marginTop: "12px"}}>
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
                {cloneBooking &&
                <React.Fragment>
                  <div style={{marginTop: "24px"}}>
                    <p className={styles.ptags}>Number of Times to Clone:</p>
                    <select onChange={toSetCloneNumber} value={numberOfTimesToClone} style={{width: "60px"}}>
                      {days.map(element => <option key={element}>{element}</option>)}
                    </select>
                  </div>
                    <div style={{marginTop: "24px"}}>
                    <p className={styles.ptags}>Days Between Bookings:</p>
                    <select onChange={toSetDaysBetweenBookings} value={daysBetweenBookings}  style={{width: "60px"}}>
                      {days.map(element => <option key={element}>{element}</option>)}
                    </select>
                  </div>
                  </React.Fragment>
                }
              
              </div>
              <div>
              <div style={{width: "270px", marginLeft: "20px", marginTop: "24px", maxHeight: "220px", overflow: "auto", boxShadow: "0px 0px 2px black"}}>
                <ServiceList selectedServices={selectedServices} addService={(id) => selectService(id)} array={serviceList} />
              </div>
              <div style={{marginTop: "20px", display: "flex", justifyContent: "center", position: "relative", right: "150px"}}>
                  <SubmitButton>Check Availability</SubmitButton>
                </div>
                </div>
            </div>
          </div>
          </div>
        </div>
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

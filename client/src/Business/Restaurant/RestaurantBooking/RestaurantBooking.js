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
    const [dateString, setDateString] = useState("");
    const [time, setTime] = useState(getTimeRightAway);
    // const [daysBetweenBookings, setDaysBetweenBookings] = useState("1");
    const [times, setTimes] = useState([]);
    // const [selectedServices, setSelectedServices] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [customerFound, setCustomerFound] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    // const [selectedBcn, setSelectedBcn] = useState("");
    const [registeringNewGuest, setRegisteringNewGuest] = useState(false);
    const [newGuestName, setNewGuestName] = useState("");
    // const [employeeNeeded, setEmployeeNeeded] = useState();
    const [guestNotFound, setGuestNotFound] = useState(false);
    const [guestFound, setGuestFound] = useState(false);
    const [guestName, setGuestName] = useState("");
    const [selectedTable, setSelectedTable] = useState();
    const [occupants, setOccupants] = useState("1");
  
    useEffect(function() {
      setSelectedTable(props.tables[0]);
    }, [props.tables.length])

    function goToEditBusiness() {
      props.history.push(`/admin/${props.admin.admin.id}/createeditprofile`)
    }

    useEffect(function() {
      Axios.get('/api/getEmployees', {headers: {"x-auth-token": localStorage.getItem("adminToken")}}).then(
        response => {
          if (response.status === 200) {
            setEmployees(response.data.employees)
            setSelectedEmployee(response.data.employees[0]._id)
          }
        }
      )
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
            setGuestFound(true);
            setGuestNotFound(false)
          }
      }).catch(error => {
        if (error.response.status === 406 || error.response.status === 400) {
            setGuestNotFound(true);
            setGuestFound(false)
        }        
      })
    }

   

    function removeFound() {
      setCustomerFound();
    }


    function toSetTime(time) {
        setTime(time);
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


    function bookTable() {
      Axios.post('/api/restaurant/createTableBooking', {
          time,
          date: dateString,
          customer: customerFound._id,
          tableId: selectedTable,
          numOfPeople: occupants,
          employeeBooked: selectedEmployee
        },
          {headers: {"x-auth-token": localStorage.getItem("adminToken")}}).then(
        response => {
          console.log(response.data)
        }
      )
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
              <div style={{marginTop: "24px", justifyContent: "flex-start", display: 'flex'}}>
                 <p style={{ marginTop: "4px"}} className={styles.ptags}>Guest Phone:</p>
                 <input value={phoneNumber} placeholder="Guest Phone Number"  onChange={(e) => setPhoneNumber(e.target.value)} style={{backgroundColor: "rgb(20,20,20)", height: "28px", width: "145px", boxShadow: "0px 0px 4px #f9e9f9", paddingLeft: "6px"}}/>
                 <button style={{boxShadow: "0px 0px 4px #f9e9f9", border: "none", paddingLeft: "10px", paddingRight: "10px", marginLeft: "15px"}} className={styles.buttono} onClick={findGuest}>Search</button>
              </div>
              
                {guestNotFound && <StatementAppear appear={guestNotFound}>
                  <p style={{marginLeft: "20px", width: "300px", marginTop: "20px"}}>We couldn't find this customer in our system.</p>
                  <p style={{marginLeft: "20px", width: "300px", marginTop: "4px"}}> Optionally, you can add first and last name.</p>
                  <div style={{marginTop: "24px", justifyContent: "flex-start", display: 'flex'}}>
                 <p style={{ marginTop: "4px"}} className={styles.ptags}>Guest Name:</p>
                 <input placeholder="Guest Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} style={{backgroundColor: "rgb(20,20,20)", height: "28px", width: "170px", boxShadow: "0px 0px 4px #f9e9f9", paddingLeft: "6px"}}/>
                </div>
                  </StatementAppear>}
                  {guestFound && <StatementAppear appear={guestFound}>
                  <p style={{marginLeft: "20px", width: "300px", marginTop: "20px"}}>Guest Found: {customerFound.fullName}</p>
                  </StatementAppear>}
                  <div style={{marginTop: "20px", justifyContent: "flex-start", display: 'flex'}}>
                 <p style={{ marginTop: "4px"}} className={styles.ptags}>Select Employee:</p>
                 <select style={{width: "150px", height: "28px", paddingLeft: "6px", border: "none", boxShadow: '0px 0px 4px #f9e9f9'}}>
                  {employees.map(employee => <option onClick={(e) => setSelectedEmployee(employee._id)}>{employee.fullName}</option>)}
                 </select>
                </div>
              <div style={{marginTop: "20px"}}>
                   <p className={styles.ptags}>Select Time:</p>
                  <TimeList time={time} times={times} setTime={(time) => toSetTime(time)}/>
              </div>
              </div>
              <div style={{paddingBottom: "20px"}}>
                <div style={{marginTop: "22px", justifyContent: "flex-start", display: 'flex'}}>
                 <p style={{marginLeft: "20px", marginTop: "4px"}} className={styles.ptags}>Select Table:</p>
                 <select onChange={(e) => setSelectedTable(e.target.value)} style={{width: "70px", height: "28px", paddingLeft: "6px", border: "none", boxShadow: '0px 0px 4px #f9e9f9'}}>
                  {props.tables.map(table => <option>{table}</option>)}
                 </select>
                </div>
                <div style={{marginTop: "22px", justifyContent: "flex-start", display: 'flex'}}>
                 <p style={{marginLeft: "20px", marginTop: "4px"}} className={styles.ptags}>Occupants:</p>
                 <select onChange={(e) => setOccupants(e.target.value)} style={{width: "70px", height: "28px", paddingLeft: "6px", border: "none", boxShadow: '0px 0px 4px #f9e9f9'}}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                 </select>
                </div>
              </div>
            <div style={{display: "flex", justifyContent: "center", paddingBottom: "20px", marginTop: "20px"}}>
              <button onClick={bookTable} className={styles.buttono} style={{fontSize: "16px", width: "120px", height: "30px", border: "none", boxShadow: "0px 0px 4px #f9e9f9"}}>Create Table</button>
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

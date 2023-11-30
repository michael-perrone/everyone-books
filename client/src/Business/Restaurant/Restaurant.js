import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Restaurant.module.css";
import RestaurantBooking from "./RestaurantBooking/RestaurantBooking";
import { connect } from "react-redux";
import TableContainer from "./TableContainer/TableContainer";
import ViewTable from './ViewTable/ViewTable';
import Spinner from '../../Spinner/Spinner';
import {sortGroupsIntoSingleArray} from "../../feutils/feutils";
import Chatty from "../../Chatty/Chatty";

function Restaurant(props) {
  const [sortedBookings, setSortedBookings] = useState([]);
//   const [bcn, setBcn] = useState("");
//   const [bct, setBct] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
//   const [updateBookings, setUpdateBookings] = useState();
  const [showBackDropBooking, setShowBackDropBooking] = useState(false);
  const [bookingToView, setBookingToView] = useState({});
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [tables, setTables] = useState([]);
  const [employees, setEmployees] = useState([]);


  function loadSchedule() {
    axios.get('/api/restaurant/checkBusiness', {headers:{'x-auth-token': localStorage.getItem("adminToken")}}).then(
        response => {
            if (response.status === 200) {
                setTables(sortGroupsIntoSingleArray(response.data.business.groups));
                const daySched = response.data.business.schedule[new Date(props.dateChosen).getDay()];
                console.log(daySched)
                setOpenTime(daySched.open);
                setCloseTime(daySched.close)
                setLoading(false);   
            }
        }
    )
  }

  function addBookingFromChat() {

  }


  useEffect(function() {
    axios.get('api/getEmployees/', {headers: {'x-auth-token': props.adminToken}}).then(response => {
      if (response.status === 200) {
        setEmployees(response.data.employees);
      }
    })
  }, [])


  function clickBooking(booking) {
    return () => {
      axios.post('/api/getBookings/moreBookingInfo', {bookingId: booking._id}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
          if (response.status === 200) {
              const newBooking = booking;
              newBooking.services = response.data.services;
              newBooking.customer = response.data.customer;
              newBooking.products = response.data.products;
              newBooking.employeeName = response.data.employeeName;
              setBookingToView(newBooking);
              setShowBackDropBooking(true);
          }
      }).catch(error => {
        console.log(error);
      })  
    }
  }
  

  useEffect(function() { 
    if (props.dateChosen) {
      loadSchedule();
    }
  },[props.dateChosen])

  function hide() {
    setShowBackDropBooking(false);
    loadSchedule() // check this dont love how much this runs; // DID I EVER FIX THIS
  }


    return (
          <div id={styles.businessContainer}>
           {showBackDropBooking && <div style={{display: "flex", position: "absolute", top: 0, lef: 0, width: "100%", justifyContent: "center"}}><div onClick={() => setShowBackDropBooking(false)} id={styles.backDrop}></div> <ViewTable reload={loadSchedule}  hide={hide} booking={bookingToView}/></div>}
                <RestaurantBooking
                  tables={tables}
                  loadSchedule={loadSchedule}    
                />
                {!loading && <Chatty loadSchedule={loadSchedule}  employees={employees}/>}
                
                {!loading ? <TableContainer tables={tables} clickBooking={clickBooking} sortedBookings={sortedBookings} openTime={openTime} closeTime={closeTime}/> : 
                  <Spinner/>
                }
          </div>
    );
  }


const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    adminToken: state.authReducer.adminToken,
    employee: state.authReducer.employee,
    bookAThing: state.booleanReducers.bookAThing,
    user: state.authReducer.user,
    dateChosen: state.dateReducer.dateChosen
  };
};

export default connect(mapStateToProps)(Restaurant);





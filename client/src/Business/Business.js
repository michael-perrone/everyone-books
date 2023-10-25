import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Business.module.css";
import AdminBooking from "./BookingHelpers/AdminBooking/AdminBooking";
import { connect } from "react-redux";
import CourtContainer from "./CourtContainer/CourtContainer";
import ViewBooking from './ViewBooking/ViewBooking';
import Spinner from '../Spinner/Spinner';
import ViewGroup from "./ViewGroup/ViewGroup";
import Chatty from "../Chatty/Chatty";

function Business(props) {
  const [sortedBookings, setSortedBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [eq, setEq] = useState("");
  const [bcn, setBcn] = useState("");
  const [bct, setBct] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [updateBookings, setUpdateBookings] = useState();
  const [showBackDropBooking, setShowBackDropBooking] = useState(false);
  const [showBackDropGroup, setShowBackDropGroup] = useState(false);
  const [bookingToView, setBookingToView] = useState({});
  const [groupToView, setGroupToView] = useState({});
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [employees, setEmployees] = useState([]);


  function loadSchedule() {
    axios
    .post("/api/adminSchedule", {
      date: props.dateChosen.toDateString()
    }, {headers: {
      'x-auth-token': props.adminToken
    }})
    .then(response => {
      if (response.status === 200) {
        setLoading(false);
        setBcn(response.data.bcn);
        setBct(response.data.bct);
        setOpenTime(response.data.open);
        setCloseTime(response.data.close);
        setEq(response.data.eq);
        setProducts(response.data.products);
        const sorted = [];
        const sortedGroups = [];
        const bookings = response.data.bookings;
        const groups = response.data.groups;
        let g = 1;
        let t = 1;
        while(t <= Number(response.data.bcn)) {
          const array = [];
          sorted.push(array);
          t++;
        }
        while(g <= Number(response.data.bcn)) {
          const array = [];
          sortedGroups.push(array);
          g++;
        }
        console.log(sorted);
        console.log(sortedGroups);
        for (let e = 0; e < bookings.length; e++) {
            sorted[bookings[e].bcn - 1].push(bookings[e])
        }
        for (let i = 0 ; i < groups.length; i++) {
          console.log(groups[i]);
          sortedGroups[groups[i].bcn - 1].push(groups[i]);
        }
        setGroups(sortedGroups);
        setSortedBookings(sorted);
      }
    })
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

  useEffect(function() {
    axios.post("api/services/getServices", {businessId: props.admin.admin.businessId}).then(response => {
      if (response.status === 200) {
        setServices(response.data.services);
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

  function clickGroup(group) {
    return () => {
      setGroupToView(group);
      setShowBackDropGroup(true);
    }
  }
  

  useEffect(function() { // check this
    if (props.dateChosen) {
      loadSchedule();
    }
  },[props.dateChosen])

  function hide() {
    setShowBackDropBooking(false);
    setShowBackDropGroup(false);
    loadSchedule() // check this dont love how much this runs;
  }


    return (
          <div id={styles.businessContainer}>
           {showBackDropBooking && <div style={{display: "flex", position: "absolute", top: 0, lef: 0, width: "100%", justifyContent: "center"}}><div onClick={() => setShowBackDropBooking(false)} id={styles.backDrop}></div> <ViewBooking reload={loadSchedule} products={products} services={services} hide={hide} booking={bookingToView}/></div>}
           {showBackDropGroup && <div style={{display: "flex", position: "absolute", top: 0, lef: 0, width: "100%", justifyContent: "center"}}><div onClick={() => setShowBackDropGroup(false)} id={styles.backDrop}></div> <ViewGroup reload={loadSchedule} products={products} services={services} hide={hide} group={groupToView}/></div>}
                <AdminBooking
                  loadSchedule={loadSchedule}
                  services={services}
                  eq={eq}
                  bct={bct}    
                />
                {!loading && <Chatty loadSchedule={loadSchedule} eq={eq} name={bct} employees={employees} services={services}/>}
                
                {!loading ? <CourtContainer clickGroup={clickGroup} sortedGroups={groups} clickBooking={clickBooking} sortedBookings={sortedBookings} openTime={openTime} closeTime={closeTime} bct={bct} bcn={bcn}/> : 
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

export default connect(mapStateToProps)(Business);

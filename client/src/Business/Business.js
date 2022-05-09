import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Business.module.css";
import AdminBooking from "./BookingHelpers/AdminBooking/AdminBooking";
import { connect } from "react-redux";
import CourtContainer from "./CourtContainer/CourtContainer";
import ViewBooking from './ViewBooking/ViewBooking';

function Business(props) {
  const [business, setBusiness] = useState("");
  const [timeOpen, setTimeOpen] = useState("");
  const [timeClose, setTimeCLose] = useState("");
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [eq, setEq] = useState("");
  const [bcn, setBcn] = useState("");
  const [bct, setBct] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [sortedBookings, setsortedBookings] = useState([]);
  const [updateBookings, setUpdateBookings] = useState();
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [bookingToView, setBookingToView] = useState({});

  function bookingAdded() {
    axios
    .post("/api/adminSchedule", {
      date: props.dateChosen.toDateString()
    }, {headers: {
      'x-auth-token': props.adminToken
    }})
    .then(response => {
      if (response.status === 200) {
        console.log(response.data)
        setBcn(response.data.bcn);
        setBct(response.data.bct);
        setOpenTime(response.data.open);
        setCloseTime(response.data.close);
        setEq(response.data.eq);
        setProducts(response.data.products);
        const sorted = [];
        const bookings = response.data.bookings;
        let i = 1;
        while(i <= Number(response.data.bcn)) {
          const array = [];
          sorted.push(array);
          i++;
        }
        for (let e = 0; e < bookings.length; e++) {
            sorted[bookings[e].bcn - 1].push(bookings[e])
        }
        setsortedBookings(sorted);
      }
    })
  }

  useEffect(function() {
    axios.get("api/services/getServices", {headers: {'x-auth-token': props.adminToken}}).then(response => {
      if (response.status === 200) {
        setServices(response.data.services);
      }
    })
}, [])

  function clickBooking(booking) {
    console.log("anything");
    return () => {
      console.log(booking)
      axios.post('/api/getBookings/moreBookingInfo', {bookingId: booking._id}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
          if (response.status === 200) {
            console.log(response.data)
              const newBooking = booking;
              newBooking.services = response.data.services;
              newBooking.customer = response.data.customer;
              newBooking.products = response.data.products;
              newBooking.employeeName = response.data.employeeName;
              setBookingToView(newBooking);
              setShowBackDrop(true);
          }
      }).catch(error => {
        console.log(error);
      })  
    }
  }
  

  useEffect(function() { // check this
    bookingAdded();
  },[props.dateChosen])


    return (
          <div id={styles.businessContainer}>
           {showBackDrop && <div style={{display: "flex", position: "absolute", top: 0, lef: 0, width: "100%", justifyContent: "center"}}><div onClick={() => setShowBackDrop(false)} id={styles.backDrop}></div> <ViewBooking reload={bookingAdded} products={products} services={services} hide={() => setShowBackDrop(false)} booking={bookingToView}/></div>}
                <AdminBooking
                  bookingAdded={bookingAdded}
                  services={services}
                  eq={eq}
                  bct={bct}    
                />
                <CourtContainer clickBooking={clickBooking} sortedBookings={sortedBookings} openTime={openTime} closeTime={closeTime} bct={bct} bcn={bcn}/>
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

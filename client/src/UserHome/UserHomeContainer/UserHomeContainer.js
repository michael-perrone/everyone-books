import React, { useEffect, useState } from "react";
import styles from "./UserHomeContainer.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import BusinessInsideUserHome from "./BusinessInsideUserHome/BusinessInsideUserHome";
import UserBooking from "./UserBooking/UserBooking";


const UserHomeContainer = props => {
  const [businesses, setBusinesses] = useState([]);
  const [noBusinesses, setNoBusinesses] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [noBookings, setNoBookings] = useState(false);


  useEffect(() => {
    Axios.get("/api/userBusinesses", {
      headers: { "x-auth-token": props.userToken }
    }).then(response => {
      if (response.status === 200) {
        setBusinesses(response.data.businesses);
      } else {
        setNoBusinesses(true);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("/api/getBookings", {
      headers: { "x-auth-token": props.userToken }
    }).then(response => {
      if (response.status === 200) {
        setBookings(response.data.bookings);
      } else {
        setNoBookings(true);
      }
    });
  }, []);

  function setNewBusinesses(newClubs) {
    setBusinesses(newClubs);
  }

  return (
    <div
      id={styles.userHomeContainer}
      className={
        bookings.length > 1 || businesses.length > 1 ? "" : styles.homeContainerClass
      }
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute"
        }}
      >
      </div>
      <div className={styles.half} id={styles.clubsSubscribedHalf}>
        <p
          style={{
            marginBottom: "6px",
            fontFamily: '"Josefin Sans", sans-serif'
          }}
        >
         Places you follow
        </p>
        {businesses.length > 0 &&
          businesses.map(individualBusiness => {
            return (
              <BusinessInsideUserHome
                setNewBusinesses={setNewBusinesses}
                business={individualBusiness}
              />
            );
          })}

        {noBusinesses && (
          <React.Fragment>
            <div className={styles.noClubsBookingsContainer}>
              <p>
                You have not subscribed to any places yet. You can do this by
                hitting View Businesses. There you can search for Businesses
                in your area and you will be able to subscribe to the business of
                your choice. 
              </p>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className={styles.half} id={styles.bookingsHalf}>
        <p
          style={{
            marginBottom: "6px",
            fontFamily: '"Josefin Sans", sans-serif'
          }}
        >
          Your bookings coming up
        </p>
        {noBookings && (
          <p
            className={styles.noClubsBookingsContainer}
          >
            You are currently not scheduled for any bookings. If you would like
            to schedule one, please search for the club or instructor that you'd
            like to book with.
          </p>
        )}
        {bookings.map(booking => {
          return <UserBooking bookingInfo={booking} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userToken: state.authReducer.token
  };
};

export default connect(mapStateToProps)(UserHomeContainer);

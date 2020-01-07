import React, { useEffect, useState } from "react";
import styles from "./UserHomeContainer.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import ClubInsideUserHome from "./ClubInsideUserHome/ClubInsideUserHome";
import UserBooking from "./UserBooking/UserBooking";
import InstructorSearch from "./UserBooking/InstructorSearch/InstructorSearch";

const UserHomeContainer = props => {
  const [clubs, setClubs] = useState([]);
  const [noClubs, setNoClubs] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [noBookings, setNoBookings] = useState(false);

  useEffect(() => {
    Axios.get("/api/userClubs", {
      headers: { "x-auth-token": props.userToken }
    }).then(response => {
      if (response.status === 200) {
        setClubs(response.data.tennisClubs);
      } else {
        setNoClubs(true);
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

  function setNewClubs(newClubs) {
    setClubs(newClubs);
  }

  return (
    <div
      id={styles.userHomeContainer}
      className={
        bookings.length > 1 || clubs.length > 1 ? "" : styles.homeContainerClass
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
        <InstructorSearch
          searching={props.searching}
          searchingHandler={props.searchingHandler}
        />
      </div>
      <div className={styles.half} id={styles.clubsSubscribedHalf}>
        <p
          style={{
            marginBottom: "6px",
            fontFamily: '"Josefin Sans", sans-serif'
          }}
        >
          Clubs you follow
        </p>
        {clubs.length > 0 &&
          clubs.map(individualClub => {
            return (
              <ClubInsideUserHome
                setNewClubs={setNewClubs}
                club={individualClub}
              />
            );
          })}

        {noClubs && (
          <React.Fragment>
            <div className={styles.noClubsBookingsContainer}>
              <p>
                You have not subscribed to any clubs yet. You can do this by
                hitting View Clubs below. There you can search for Tennis Clubs
                in your area and you will be able to subscribe to the clubs of
                your choice. If you are searching for an instructor, use the
                instructor search above.
              </p>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className={styles.half} id={styles.bookingsHalf}>
        <p
          style={{
            marginBottom: "10px",
            fontFamily: '"Josefin Sans", sans-serif'
          }}
        >
          Your bookings coming up
        </p>
        {noBookings && (
          <p
            style={{ backgroundColor: "white" }}
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

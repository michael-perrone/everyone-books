import React, { useEffect, useState } from "react";
import styles from "./UserHomeContainer.module.css";
import Axios from "axios";
import { connect } from "react-redux";
import BusinessInsideUserHome from "./BusinessInsideUserHome/BusinessInsideUserHome";
import UserBooking from "./UserBooking/UserBooking";
import UserGroup from './UserGroup/UserGroup';
import Spinner from "../../Spinner/Spinner";


const UserHomeContainer = props => {
  const [businesses, setBusinesses] = useState([]);
  const [noBusinesses, setNoBusinesses] = useState(false);

  const [groupsAndBookings, setGroupsAndBookings] = useState([]);
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(true);

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

  function unfollowBusiness(id) {
    const nbs = [...businesses];
    const businessesNeeded = nbs.filter(business => business._id !== id);
    setBusinesses(businessesNeeded);
    if (businessesNeeded.length === 0) {
      setNoBusinesses(true);
    }
  }

  useEffect(() => {
    Axios.get("/api/getBookings/ios", {
      headers: { "x-auth-token": props.userToken }
    }).then(response => {
      if (response.status === 200) {
          const allezBookingsAndGroups = [...response.data.bookings, ...response.data.groups];
          allezBookingsAndGroups.sort(function(a,b) {
            return new Date(`${a.date}, ${a.time.split("-")[0]}`) - new Date(`${b.date}, ${b.time.split("-")[0]}`)
          })
          setGroupsAndBookings(allezBookingsAndGroups);
          setLoading(false);
      }
    }).catch(error => {
      setLoading(false);
    })
  }, []);

  function setNewBusinesses(newClubs) {
    setBusinesses(newClubs);
  }

  useEffect(function() {
      if (groupsAndBookings.length > 2 || businesses.length > 2) {
        setHeight("");
      }
      else if (window.innerWidth < 725 && groupsAndBookings.length + businesses.length > 1) {
        setHeight("");
      }
      else {
        setHeight("100vh")
      }
  }, [groupsAndBookings.length, businesses.length])

  return (
    loading ? <Spinner/> :
    <div
      id={styles.userHomeContainer}
      style={{height: height}}
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
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: "20px"
          }}
        >
         Places you follow
        </p>
        {businesses.length !== undefined && businesses.length > 0 &&
          businesses.map(individualBusiness => {
            return (
              <BusinessInsideUserHome
                key={individualBusiness._id}
                setNewBusinesses={setNewBusinesses}
                business={individualBusiness}
                unfollowBusiness={() => unfollowBusiness(individualBusiness._id)}
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
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: "20px"
          }}
        >
          Your bookings coming up
        </p>
        {groupsAndBookings.length === 0 && (
          <p
            className={styles.noClubsBookingsContainer}
          >
            You are currently not scheduled for any bookings. If you would like
            to schedule one, please search for the club or instructor that you'd
            like to book with.
          </p>
        )}
        {groupsAndBookings.map(bOrG => {
          if (bOrG.serviceNames && bOrG.serviceNames.length > 0) {
            return <UserBooking key={bOrG._id} bookingInfo={bOrG} />;
          }
          else {
            return <UserGroup key={bOrG._id} groupInfo={bOrG}/>;
          }
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

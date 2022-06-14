import React from "react";
import { connect } from "react-redux";
import styles from "./Schedule.module.css";
import axios from "axios";
import {getDateInFormat} from '../../../feutils/feutils';



const Schedule = props => {

  const [employeeBookings, setEmployeeBookings] = React.useState([]);
  const [dateFromPicker, setDateFromPicker] = React.useState(getDateInFormat());
  const [dateNeeded, setDateNeeded] = React.useState(new Date().toDateString());
  const [scheduled, setScheduled] = React.useState('');
  const [shift, setShift] = React.useState('');
  const [message, setMessage] = React.useState();
  const [bookings, setBookings] = React.useState("");
  const [bct, setBct] = React.useState();

  function datePickerHandler(e) {
    setDateFromPicker(e.target.value)
  }

  React.useEffect(() => {
    if (dateFromPicker) {
      let dateArray = dateFromPicker.split('-');
      if (new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString() !== dateNeeded) {
        setDateNeeded(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString());
      }
    }
  },[dateFromPicker])


  React.useEffect(() => {
      axios.post('api/shifts/getEmployeeBookingsForDay', {employeeId: props.employee.employee.id, date: dateNeeded}).then(
        response => {
          if (response.data.bct) {
            setBct(response.data.bct);
          }
          console.log(response)
          if (response.data.bookings) {
            setBookings(response.data.bookings);
            console.log(response.data.bookings);
          }
          if (response.status === 201) {
            if (response.data.bcn === "None") {
              setMessage(`You are scheduled to work today at ${response.data.shiftTimes.start} until ${response.data.shiftTimes.end}.`);
            }
            else {
              setMessage(`You are scheduled to work today but your schedule is empty. You are scheduled to be in ${response.data.bct} ${response.data.bcn}. Your shift starts at ${response.data.shiftTimes.start} and ends at ${response.data.shiftTimes.end}.` );
            }
          }
         else if (response.status === 206) {
            if (response.data.bcn === "None") {
              setMessage(`You are scheduled to work today at ${response.data.shiftTimes.start} until ${response.data.shiftTimes.end}. You have a break from ${response.data.breakStart} until ${response.data.breakEnd}.`);
            }
            else {
              setMessage(`You are scheduled to work today at ${response.data.shiftTimes.start} until ${response.data.shiftTimes.end} but your schedule is empty. You are scheduled to be in ${response.data.bct} ${response.data.bcn}. You have a break from ${response.data.breakStart} until ${response.data.breakEnd}.`);
            }
           
          }
          else if (response.status === 203) {
            setMessage(`You are scheduled to work today at ${response.data.shiftTimes.start} until ${response.data.shiftTimes.end}.`);
          }
          else if (response.status === 202) {
            setMessage(`You are scheduled to work today at ${response.data.shiftTimes.start} until ${response.data.shiftTimes.end}. You have a break from ${response.data.breakStart} until ${response.data.breakEnd}.`);
          }
          else if (response.status === 205) {
            setMessage("You have no bookings scheduled for today.");
          }
          else if (response.status === 200) {
            if (response.data.breakTime) {
                const breakArray = response.data.breakTime.split("-");
                const breakStart = breakArray[0];
                const breakEnd = breakArray[1];
                setMessage(`You are working today from ${response.data.shiftTimes.start} until ${response.data.shiftTimes.end}. You have a break scheduled from ${breakStart} to ${breakEnd}.`);
            }
            else {
                setMessage(`You are working today from ${response.data.shiftTimes.start} until ${response.data.shiftTimes.end}.`);
            } 
          }
        }
      
      ).catch(error => {
        if (error.response && error.response.status === 406) {
          setShift(false);
          setMessage("You are not scheduled to work on this day.");
          setBookings([]);
          setBct("");
        }
      })
      console.log("date needed")
  }, [dateNeeded, props.exitNum])



  return (
    <React.Fragment>
      <div
        className={styles.scheduleContainer}
      >
        <p style={{textAlign: 'center'}}>Schedule</p>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontFamily: "sans",
              marginRight: "10px"
            }}
          >
            Choose Date:
          </p>
          <input
            onChange={datePickerHandler}
            value={dateFromPicker}
            style={{ height: "22px" }}
            type="date"
          />
        </div>
        <div
          style={{
            height: "600px",
            maxHeight: "600px",
            overflow: "auto",
            width: "100%",
            backgroundColor: "rgb(248, 248, 248)",
            border: '1px solid black',
            marginTop: "10px"
          }}
        >
          {shift && <p style={{fontSize: '14px', paddingTop: '10px', paddingBottom: '10px', width: '100%', textAlign: 'center', borderBottom: '1px solid black'}}>{message}</p>}
          {!shift && <p style={{fontSize: '14px', paddingTop: '10px', paddingBottom: '10px', width: '100%', textAlign: 'center', borderBottom: '1px solid black'}}>{message}</p>}
          {bookings && bookings.length > 0 && bookings.map(booking => {
              return (
                <div className={styles.employeeBookingContainer}>
                  <div>
                  <p className={styles.bold}>Services Included</p>
                  {booking.serviceNames.map(serviceName => {
                    return <div className={styles.littleDiv}>
                       <p className={styles.sn}>{serviceName}</p>
                    </div>
                  })}
                  </div>
                  <div className={styles.secondBox}>
                    <p className={styles.padABit}>{booking.time}</p>
                    <p className={styles.padABit}>{bct} {booking.bcn}</p>
                    <p className={styles.padABit}>{booking.cName}</p>
                    <p className={styles.padABit}>{booking.cost}</p>
                    <button onClick={props.viewBooking(booking)} style={{border: "none", boxShadow: "0px 0px 2px black", width: "100px", height: "30px", fontWeight: "bold", padding: "4px", marginTop: "8px", fontSize: "16px"}}>View</button>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    employee: state.authReducer.employee,
    exitNum: state.employeeShiftReducer.exitNum
  };
};



export default connect(mapStateToProps)(Schedule);

import React from "react";
import { connect } from "react-redux";
import styles from "./Schedule.module.css";
import { HIDE_SCHEDULE } from "../../../actions/actions";
import axios from "axios";

const Schedule = props => {

  function getDateInFormat() {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }

  const [employeeBookings, setEmployeeBookings] = React.useState([]);
  const [dateFromPicker, setDateFromPicker] = React.useState(getDateInFormat());
  const [dateNeeded, setDateNeeded] = React.useState(new Date().toDateString());
  const [scheduled, setScheduled] = React.useState('');
  const [shiftInfo, setShiftInfo] = React.useState('');

  function datePickerHandler(e) {
    setDateFromPicker(e.target.value)
  }

  React.useEffect(() => {
    if (dateFromPicker) {
      let dateArray = dateFromPicker.split('-');
      setDateNeeded(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString());
      console.log(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]))
    }
  },[dateFromPicker])



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
            height: "85%",
            width: "100%",
            backgroundColor: "rgb(248, 248, 248)",
            border: '1px solid black',
            marginTop: "10px"
          }}
        >
          {shiftInfo && <p style={{fontSize: '14px', paddingTop: '10px', paddingBottom: '10px', width: '100%', textAlign: 'center', borderBottom: '1px solid black'}}>You are scheduled to work on this day from {shiftInfo.timeStart} - {shiftInfo.timeEnd}.</p>}
          {!shiftInfo && <p style={{fontSize: '14px', paddingTop: '10px', paddingBottom: '10px', width: '100%', textAlign: 'center', borderBottom: '1px solid black'}}>You are not scheduled to work today.</p>}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              fontSize: "16px"
            }}
          >
            <div
              style={{
                marginLeft: "-4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <p
                style={{
                  marginTop: "5px",
                  textDecoration: "underline",
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Service
              </p>
              {employeeBookings.map((booking, index) => {
                if (index < 9) {
                  return (
                    <p style={{ marginTop: "8px" }}>{booking.serviceName}</p>
                  );
                }
              })}
            </div>
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <p
                style={{
                  marginTop: "5px",
                  width: '100%',
                  textAlign: 'center',
                  textDecoration: "underline"
                }}
              >
                Time
              </p>
              {employeeBookings.map((booking, index) => {
                if (index < 9) {
                  return (
                    <p style={{ marginTop: "8px" }}>
                      {booking.timeStart}-{booking.timeEnd}
                    </p>
                  );
                }
              })}
            </div>
            {/*
            <div
              style={{
                marginLeft: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <p
                style={{
                  marginTop: "5px",
                  textDecoration: "underline"
                }}
              >
                Room
              </p>
              {employeeBookings.map((booking, index) => {
                if (index < 9) {
                  return (
                    <p style={{ marginTop: "8px" }}>
                      {booking.thingIds[0].split("")[0]}
                    </p>
                  );
                }
              })}
            </div>*/}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    employee: state.authReducer.employee
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideSchedule: () => dispatch({ type: HIDE_SCHEDULE })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

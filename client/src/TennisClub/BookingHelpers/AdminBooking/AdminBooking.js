import React from "react";
import styles from "./AdminBooking.module.css";
import { connect } from "react-redux";
import {
  BOOKING_TYPE,
  TIME_SELECTED,
  INSTRUCTOR_CHOSEN
} from "../../../actions/actions";
import Calendar from "../../Calendar/Calendar";

class AdminBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructorSelected: "",
      timeChosen: "",
      bookingType: ""
    };
    this.selectInstructorWithClick = this.selectInstructorWithClick.bind(this);
    this.selectTime = this.selectTime.bind(this);
  }

  selectInstructorWithClick(instructorSelected) {
    return () => {
      this.setState({ instructorSelected });
      this.props.getInstructorChosen(instructorSelected);
    };
  }

  selectTime(timeChosen) {
    return () => {
      this.setState({ timeChosen });
      this.props.getTimeChosen(timeChosen);
    };
  }

  selectBookingType(bookingType) {
    return () => {
      this.setState({ bookingType });
      this.props.getBookingType(bookingType);
    };
  }

  render() {
    return (
      <div id={styles.bookingHolder}>
        <div
          style={{
            width: "1100px",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Calendar
            date={this.props.date}
            onDateClick={this.props.onDateClick}
          />
          <div className={styles.bookingHolderContainer}>
            <p style={{ marginBottom: "-8px" }}>Choose Instructor</p>
            <div className={styles.bookingHolderSubContainer}>
              {this.props.instructors.map(element => {
                return (
                  <p
                    style={{
                      backgroundColor:
                        this.state.instructorSelected._id === element._id
                          ? "navy"
                          : "",
                      color:
                        this.state.instructorSelected._id === element._id
                          ? "white"
                          : ""
                    }}
                    onClick={this.selectInstructorWithClick(element)}
                    className={styles.itemPTag}
                  >
                    {element.fullName}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.bookingHolderContainer}>
            <p style={{ marginBottom: "-8px" }}>Choose Time Amount</p>
            <div className={styles.bookingHolderSubContainer}>
              {this.props.times.map(element => {
                return (
                  <p
                    style={{
                      backgroundColor:
                        this.state.timeChosen === element ? "navy" : "",
                      color: this.state.timeChosen === element ? "white" : ""
                    }}
                    onClick={this.selectTime(element)}
                    className={styles.itemPTag}
                  >
                    {element}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.bookingHolderContainer}>
            <p style={{ marginBottom: "-8px" }}>Choose Booking Type</p>
            <div className={styles.bookingHolderSubContainer}>
              {this.props.bookingTypes.map(element => {
                if (
                  this.props.user &&
                  (element === "Open Clinic" ||
                    element === "Employee Court Time" ||
                    element === "Tournament")
                ) {
                  return "";
                } else if (
                  this.props.admin ||
                  this.props.instructor ||
                  this.props.user
                ) {
                  return (
                    <p
                      style={{
                        backgroundColor:
                          this.state.bookingType === element ? "navy" : "",
                        color: this.state.bookingType === element ? "white" : ""
                      }}
                      onClick={this.selectBookingType(element)}
                      className={styles.itemPTag}
                    >
                      {element}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminBooking.defaultProps = {
  times: [
    "30 Minutes",
    "1 Hour",
    "1 Hour 30 Minutes",
    "2 Hours",
    "2 Hours 30 Minutes",
    "3 Hours",
    "3 Hours 30 Minutes",
    "4 Hours",
    "4 Hours 30 Minutes",
    "5 Hours"
  ],
  bookingTypes: [
    "Open Clinic",
    "Group Lesson",
    "Private Clinic",
    "Private Lesson",
    "Court Time",
    "Employee Time",
    "Tournament",
    "Other"
  ]
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    instructor: state.authReducer.instructor,
    admin: state.authReducer.admin,
    bookingType: state.bookingInfoReducer.bookingType,
    instructorChosen: state.bookingInfoReducer.instructorChosen,
    timeChosen: state.bookingInfoReducer.timeSelected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBookingType: bookingType =>
      dispatch({ type: BOOKING_TYPE, payload: { bookingType } }),
    getTimeChosen: timeChosen =>
      dispatch({ type: TIME_SELECTED, payload: { timeSelected: timeChosen } }),
    getInstructorChosen: instructorChosen =>
      dispatch({ type: INSTRUCTOR_CHOSEN, payload: { instructorChosen } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooking);

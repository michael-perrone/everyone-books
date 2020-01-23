import React from "react";
import styles from "./AdminBooking.module.css";
import { connect } from "react-redux";
import {
  BOOKING_TYPE,
  TIME_SELECTED,
  EMPLOYEE_CHOSEN
} from "../../../actions/actions";
import Calendar from "../../Calendar/Calendar";

class AdminBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeSelected: "",
      timeChosen: "",
      bookingType: ""
    };
    this.selectEmployeeWithClick = this.selectEmployeeWithClick.bind(this);
    this.selectTime = this.selectTime.bind(this);
  }

  selectEmployeeWithClick(employeeSelected) {
    return () => {
      this.setState({ employeeSelected });
      this.props.getEmployeeChosen(employeeSelected);
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
    console.log(this.props)
    return (
      <div id={styles.bookingHolder}>
        <div
          style={{
            width: "1100px",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Calendar/>
          <div className={styles.bookingHolderContainer}>
            <p style={{ marginBottom: "-8px" }}>Choose Employee</p>
            <div className={styles.bookingHolderSubContainer}>
              {this.props.employees && this.props.employees.map(element => {
                return (
                  <p
                    style={{
                      backgroundColor:
                        this.state.employeeSelected._id === element._id
                          ? "navy"
                          : "",
                      color:
                        this.state.employeeSelected._id === element._id
                          ? "white"
                          : ""
                    }}
                    onClick={this.selectEmployeeWithClick(element)}
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
              {this.props.services && this.props.services.map(element => {
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
              )}
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
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    employee: state.authReducer.employee,
    admin: state.authReducer.admin,
    bookingType: state.bookingInfoReducer.bookingType,
    employeeChosen: state.bookingInfoReducer.employeeChosen,
    timeChosen: state.bookingInfoReducer.timeSelected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBookingType: bookingType =>
      dispatch({ type: BOOKING_TYPE, payload: { bookingType } }),
    getTimeChosen: timeChosen =>
      dispatch({ type: TIME_SELECTED, payload: { timeSelected: timeChosen } }),
    getEmployeeChosen: employeeChosen =>
      dispatch({ type: EMPLOYEE_CHOSEN, payload: { employeeChosen } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooking);

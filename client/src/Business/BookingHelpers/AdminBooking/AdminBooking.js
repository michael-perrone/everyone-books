import React from "react";
import styles from "./AdminBooking.module.css";
import { connect } from "react-redux";
import {
  BOOKING_TYPE,
  TIME_SELECTED,
  EMPLOYEE_CHOSEN,
  EMPLOYEE_SHIFT_ERROR,
  HIDE_DROP_DOWN,
  BREAK_ALERT
} from "../../../actions/actions";
import Calendar from "../../Calendar/Calendar";
import Axios from "axios";

class AdminBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeSelected: "",
      timeChosen: "",
      bookingType: "",
      employees: []
    };
    this.selectEmployeeWithClick = this.selectEmployeeWithClick.bind(this);
    this.selectTime = this.selectTime.bind(this);
  }

  componentDidMount() {
    if (this.props.businessId) {
    Axios.post('/api/employees_dates/dates', {date: this.props.date.toDateString(), businessId: this.props.businessId}).then(
      response => {
          this.setState({employees: response.data.availableEmployees})
      }
    )
  }
}

  componentDidUpdate(prevProps) {
    if (this.props.date.toDateString() !== prevProps.date.toDateString()) {
      Axios.post('/api/employees_dates/dates', {date: this.props.date.toDateString(), businessId: this.props.businessId}).then(
        response => {
            this.setState({employees: response.data.availableEmployees})
        }
      )
    }
  }

  selectEmployeeWithClick(employeeSelected) {
    return () => {
      this.setState({ employeeSelected });
      this.props.getEmployeeChosen(employeeSelected);
      if (this.props.date && employeeSelected) {
        Axios.post('/api/shifts/employee', {date: this.props.date.toDateString(), employeeId: employeeSelected._id}).then(
          response => {
            if (response.data.scheduled === false ) {
              console.log('cooked')
              this.props.setEmployeeShiftError(true)
              this.props.setBreakAlert("");
            }
            if (response.data.scheduled === true ) {
              this.props.setEmployeeShiftError(false)
              if (response.data.shift.breakStart && response.data.shift.breakEnd) {
                this.props.setBreakAlert({breakStart: response.data.shift.breakStart, breakEnd: response.data.shift.breakEnd})
              }
            }
          }
        )
      }
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
      <div id={styles.bookingHolder} onClick={this.props.hideDropDown}>
        <div
         id={styles.divWhereWidthChanges}
        >
          <div id={styles.coolContainer}>
          <Calendar/>
          </div>
          <div id={styles.coolContainer}>
          <div className={styles.bookingHolderContainer}>
            <p style={{ marginBottom: "-8px" }}>Choose Employee</p>
            <div className={styles.bookingHolderSubContainer}>
              {this.state.employees.length === 0 && <p style={{marginLeft: '7px', marginTop: '4px'}}>No Employees working today</p>}
              {this.state.employees.length && this.state.employees.map(element => {
                return (
                  <p
                    style={{
                      backgroundColor:
                       this.props.employeeChosen && this.props.employeeChosen.employeeChosen._id === element._id
                          ? "navy"
                          : "",
                      color:
                       this.props.employeeChosen &&  this.props.employeeChosen.employeeChosen._id === element._id
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
          </div>
          <div id={styles.coolContainer}>
          <div className={styles.bookingHolderContainer}> 
          {this.props.user && <div id={styles.coverUser}></div>}
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
          </div>
          <div id={styles.coolContainer}>
          <div className={styles.bookingHolderContainer}>
            <p style={{ marginBottom: "-8px" }}>Choose Service Type</p>
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
                      {element.serviceName}
                    </p>
                  );
                }
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

AdminBooking.defaultProps = {
  times: [
    "15 Minutes",
    "30 Minutes",
    "45 Minutes",
    "1 Hour",
    "1 Hour 15 Minutes",
    "1 Hour 30 Minutes",
    "1 Hour 45 Minutes",
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
    timeChosen: state.bookingInfoReducer.timeSelected,
    date: state.dateReducer.dateChosen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBreakAlert: (obj) => dispatch({type: BREAK_ALERT, payload: obj}),
    setEmployeeShiftError: (trueOrFalse) => dispatch({type: EMPLOYEE_SHIFT_ERROR, payload: trueOrFalse}),
    getBookingType: bookingType =>
      dispatch({ type: BOOKING_TYPE, payload: { bookingType } }),
    getTimeChosen: timeChosen =>
      dispatch({ type: TIME_SELECTED, payload: { timeSelected: timeChosen } }),
    getEmployeeChosen: employeeChosen =>
      dispatch({ type: EMPLOYEE_CHOSEN, payload: { employeeChosen } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooking);

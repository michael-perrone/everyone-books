import React from "react";
import  {format, startOfWeek, addDays, endOfWeek, startOfMonth, endOfMonth, addMonths, subMonths, isSameDay, isSameMonth, parse} from "date-fns";
import "./Calendar.css";
import {connect} from 'react-redux';
import {CHOOSE_DATE, EMPLOYEE_CHOSEN, EMPLOYEE_SHIFT_ERROR, BREAK_ALERT} from '../../actions/actions';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  //selected

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return (
      <div style={{ display: "flex", backgroundColor: "rgb(24,24,24)", color: "#f9e9f9", justifyContent: "space-around" }}>
        <p className="dayInHeader">Sun</p>
        <p className="dayInHeader">Mon</p>
        <p
          className="dayInHeader"
        >
          Tue
        </p>
        <p
          className="dayInHeader"
        >
          Wed
        </p>
        <p
          className="dayInHeader"
        >
          Thu
        </p>
        <p
          className="dayInHeader"
        >
          Fri
        </p>
        <p
          className="dayInHeader"
        >
          Sat
        </p>
      </div>
    );
  }

  renderCells() {
    const { currentMonth } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, this.props.dateChosen)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              this.props.chooseDate(parse(cloneDay))
              this.props.unselectEmployee()
              this.props.setBreakAlert()
              this.props.setEmployeeShiftError()
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div id="body">
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setEmployeeShiftError: () => dispatch({type: EMPLOYEE_SHIFT_ERROR, payload: false}),
    setBreakAlert: () => dispatch({type: BREAK_ALERT, payload: ""}), 
    chooseDate: (dateChosen) => dispatch({type: CHOOSE_DATE, payload: {dateChosen}}),
    unselectEmployee: () => dispatch({type: EMPLOYEE_CHOSEN, payload: "" })
    
  }
}

const mapStateToProps = (state) => {
  return {
    dateChosen: state.dateReducer.dateChosen.toDateString()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

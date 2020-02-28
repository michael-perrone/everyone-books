import React from "react";
import styles from "./CourtContainer.module.css";
import axios from "axios";
import CourtColumns from "./CourtColumns/CourtColumns";
import CheckBookingModal from "./CheckBookingModal/CheckBookingModal";
import TryingToBookModal from "./TryingToBookModal/TryingToBookModal";

import { connect } from "react-redux";
import OtherAlert from "../../OtherAlerts/OtherAlerts";
import { HOVER_NUMBER } from "../../actions/actions";
import BookingButtons from "./BookingButtons/BookingButtons";

// BookingIntro

class CourtContainer extends React.Component {
  constructor(props) {
    super(props);
    this.thingNumbersToThingColumns = this.thingNumbersToThingColumns.bind(
      this
    );
    this.deleteBooking = this.deleteBooking.bind(this);
    this.convertTimeToThings = this.convertTimeToThings.bind(this);
    this.setShowDeleteSuccess = this.setShowDeleteSuccess.bind(this);
    this.thingClicked = this.thingClicked.bind(this);
    this.state = {
      blockBooking: false,
      showDeleteSuccess: false,
      slotsClicked: false,
      firstSlotInArray: {},
      lastSlotInArray: {},
      bookedThings: [],
      bookingArray: [],
      bookingError: "",
      booking: false,
      showBookingModalState: false,
      objectToModal: {},
      tryingToBookModalState: false,
      bookingToSend: null,
      token: "",
      bookingSuccess: false,
      newBooking: {},
      playersComingBack: [],
      thingHoverNumber: null,
      doubleBookError: false,
      employeeChosenError: false,
      chooseServiceError: false,
      employeeNotWorking: "",
      datePassed: false
    };
  }

  componentDidMount() {
    axios
      .post("/api/thingBooked/getthings", {
        businessId: this.props.businessId,
        date: this.props.dateChosen
      })
      .then(response => {
        this.setState({ bookedThings: response.data.bookings });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.dateChosen !== this.props.dateChosen ||
      prevProps.businessName !== this.props.businessName
    ) {
      axios
        .post("/api/thingBooked/getthings", {
          businessId: this.props.businessId,
          date: this.props.dateChosen
        })
        .then(response => {
          this.setState({ bookedThings: response.data.bookings });
        });
    }
  }



  setShowDeleteSuccess() {
    this.setState({ showDeleteSuccess: false });
    setTimeout(() => this.setState({ showDeleteSuccess: true }), 200);
  }
  

  deleteBooking(bookingId) {
    return () => {
      axios
        .post("/api/thingBooked/delete", {
          bookingId,
          businessName: this.props.businessName,
          date: this.props.dateChosen
        })
        .then(response => {
          this.setState({ bookedThings: response.data.bookings });
          if (response.status === 200) {
            this.setState({ showBookingModalState: false });
            this.setShowDeleteSuccess();
          }
        });
    };
  }
  thingClicked() {
    if (this.props.timeChosen.timeSelected) { 
        this.setState(prevState => {
        return { slotsClicked: !prevState.slotsClicked };
        });
    }
  }
  showBookingModal = objectToModal => () => {
    this.setState({ objectToModal, showBookingModalState: true });
  };

  cancelBookingModal = () => {
    this.setState({ showBookingModalState: false });
  };

  thingArray = (topOfArray, thingsToLoopOver) => {
    if (this.state.slotsClicked === false) {
      let numToAdd = "";
      if (this.props.timeChosen.timeSelected === "15 Minutes") {
        numToAdd = 0;
      } else if (this.props.timeChosen.timeSelected === "30 Minutes") {
        numToAdd = 1;
      } else if (this.props.timeChosen.timeSelected === "45 Minutes") {
        numToAdd = 2;
      } else if (this.props.timeChosen.timeSelected === "1 Hour") {
        numToAdd = 3;
      }  else if (this.props.timeChosen.timeSelected === "1 Hour 15 Minutes") {
        numToAdd = 4;
      } else if (this.props.timeChosen.timeSelected === "1 Hour 30 Minutes") {
        numToAdd = 5;
      } else if (this.props.timeChosen.timeSelected === "1 Hour 45 Minutes") {
        numToAdd = 6;
      } 
      else if (this.props.timeChosen.timeSelected === "2 Hours") {
        numToAdd = 7;
      } else if (this.props.timeChosen.timeSelected === "2 Hours 30 Minutes") {
        numToAdd = 9;
      } else if (this.props.timeChosen.timeSelected === "3 Hours") {
        numToAdd = 11;
      }
      const newArray = [];
      for (
        let i = topOfArray.thingId;
        i <= topOfArray.thingId + numToAdd;
        i++
      ) {
        let thingIdArray = i.toString().split("");
        thingIdArray.shift();
        let stringNeeded = thingIdArray.join("");
        let numberNeeded = parseInt(stringNeeded);
        newArray.push({
          thing: thingsToLoopOver[numberNeeded],
          thingId: i
        });
      }

      let bookingIdsArray = [];
      newArray.forEach(element => {
        bookingIdsArray.push(element.thingId);
      });
      let bookedIdsArray = [];
      this.state.bookedThings.forEach(element => {
        bookedIdsArray.push(...element.thingIds);
      });
      const found = bookingIdsArray.some(id => {
        return bookedIdsArray.includes(id.toString());
      });
      if (!found) {
        this.setState({ bookingArray: newArray });
        this.setState({ firstSlotInArray: newArray[0] });
        this.setState({
          lastSlotInArray: newArray[newArray.length - 1]
        });
        this.setState({ thingHoverNumber: newArray[0].thingId });
      }
    }
  };

  setPlayersComingBack = players => {
    if (this.props.user) {
      let playerAlreadyHereArray = [
        { name: this.props.user.user.userName, id: this.props.user.user.id },
        ...players
      ];
      this.setState({ playersComingBack: playerAlreadyHereArray });
    }
    this.setState({ playersComingBack: players });
  };

  bookThingArray = () => {
    if (this.state.bookingToSend !== null) {
      let playerIds = [];
      if (this.state.playersComingBack.length > 0) {
        for (let i = 0; i < this.state.playersComingBack.length; i++) {
          playerIds.push(this.state.playersComingBack[i].id);
        }
      }
      axios
        .post("/api/thingBooked", {
          booking: this.state.bookingToSend,
          players: playerIds,
          date: this.props.dateChosen
        })
        .then(firstResponse => {
          if (firstResponse.status === 200) {
            if (this.props.employeeChosen) {
              const objectToSend = {
                employeeId: this.props.employeeChosen.employeeChosen._id,
                newBooking: firstResponse.data.newBooking._id
              };
              axios
                .post("/api/employeeBookings", objectToSend)
                .then(secondResponse => {
                  if (secondResponse.status === 200 && this.props.user) {
                    axios.post("/api/notifications/userBookedEmployee", {
                      employeeId: this.props.employeeChosen.employeeChosen
                        ._id,
                      userId: this.props.user.user.id,
                      bookingId: firstResponse.data.newBooking._id
                    });
                  }
                  if (
                    secondResponse.status === 200 &&
                    this.props.employee &&
                    firstResponse.data.newBooking.customers.length > 0
                  ) {
                    axios.post("/api/notifications/employeeBookedCustomer", {
                      users: firstResponse.data.newBooking.customers,
                      employeeId: this.props.employeeChosen.employeeChosen
                        ._id,
                      bookingId: firstResponse.data.newBooking._id
                    });
                  }
                  else if (secondResponse.status === 200 && this.props.admin && 
                    firstResponse.data.newBooking.customers.length > 0) {
                      axios.post('/api/notifications/businessBookedCustomer', {
                        employeeId: this.props.employeeChosen.employeeChosen._id,
                        users: firstResponse.data.newBooking.customers,
                        businessId: this.props.admin.admin.businessId,
                        bookingId: firstResponse.data.newBooking._id
                      })
                    }
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
          let clubsMatchArray = [];
          firstResponse.data.bookings.forEach(element => {
            if (this.props.dateChosen === element.date) {
              clubsMatchArray.push(element);
            }
          });
          this.setState({ bookedThings: clubsMatchArray });
        });
    }
    this.setState({ bookingArray: [] });
    this.setState({ tryingToBookModalState: false });
    this.setState({ slotsClicked: false });
  };

  thingNumbersToThingColumns() {
    const newThingsArray = [];
    for (let i = 1; i <= parseInt(this.props.numberColumns); i++) {
      newThingsArray.push({ thingNumber: i });
    }
    return newThingsArray;
  }

 times = {
   "12:00 AM": 0, "12:30 AM": 2,
  "1:00 AM": 4, "1:30 AM": 6, "2:00 AM": 8,
   "2:30 AM": 10, "3:00 AM": 12, "3:30 AM": 14,
   "4:00 AM": 16, "4:30 AM": 18, "5:00 AM": 20, "5:30 AM": 22, "6:00 AM": 24, "6:30 AM": 26,
   "7:00 AM": 28, "7:30 AM": 30, "8:00 AM": 32, "8:30 AM": 34, "9:00 AM": 36, "9:30 AM": 38,
   "10:00 AM": 40, "10:30 AM": 42, "11:00 AM": 44, "11:30 AM": 46,
    "12:00 PM": 48, "12:30 PM": 50,
   "1:00 PM": 52, "1:30 PM": 54, "2:00 PM": 56,
    "2:30 PM": 58, "3:00 PM": 60, "3:30 PM": 62,
    "4:00 PM": 64, "4:30 PM": 66, "5:00 PM": 68, "5:30 PM": 70, "6:00 PM": 72, "6:30 PM": 74,
    "7:00 PM": 76, "7:30 PM": 78, "8:00 PM": 80, "8:30 PM": 82, "9:00 PM": 84, "9:30 PM": 86,
    "10:00 PM": 88, "10:30 PM": 90, "11:00 PM": 92, "11:30 PM": 94, }

  convertTimeToThings(numberTime) {
    let timeThingNumber = this.times[numberTime]
    return timeThingNumber;
  }

  

  showTryingToBookModal = () => {
    this.setState({datePassed: false})
    console.log(this.props.dateChosen, this.state.firstSlotInArray.thing.timeStart)
  // if (new Date(this.props.dateChosen, this.state.firstSlotInArray.timeStart) < new Date()) {
      if (new Date(`${this.props.dateChosen}, ${this.state.firstSlotInArray.thing.timeStart}`) < new Date()) {
        setTimeout(() => this.setState({datePassed: true}), 400)
    }
    else {
    this.setState({employeeNotWorking: ""});
    this.setState({employeeChosenError: false});
    this.setState({ doubleBookError: false });
    let blockBooking;
    if (this.props.employeeChosen) {
      let thingIds = [];
      this.state.bookingArray.forEach(element => {
        let thingIdArray = element.thingId.toString().split("");
        thingIdArray.shift();
        let realId = thingIdArray.join("");
        thingIds.push(realId);
      });
      console.log(thingIds)
      axios
        .post("/api/checkEmployeeAvailability", {
          employeeId: this.props.employeeChosen.employeeChosen._id,
          thingIds,
          date: this.props.dateChosen
        })
        .then(response => {
          if (response.data.bookingNotOkay === true) {
            setTimeout(() => this.setState({ doubleBookError: true }), 200);
            this.setState({slotsClicked: false})
            blockBooking = true;
            return;
          }
          if (!this.props.bookingType) {
            this.setState({chooseServiceError: false})
            setTimeout(() => this.setState({chooseServiceError: true}), 200)
            this.setState({slotsClicked: false})
            return;
          }

          if (!blockBooking && this.props.bookingType) {
            let shiftError = false;
            axios.post('api/shifts/employee', {date: this.props.dateChosen, employeeId: this.props.employeeChosen.employeeChosen._id}).then(
              response => {
                if (response.data.scheduled) {
                  let shiftStartDate = new Date(`${this.props.dateChosen}, ${response.data.shift.timeStart}`);
                  let shiftEndDate = new Date(`${this.props.dateChosen}, ${response.data.shift.timeEnd}`)
                  let requestedTimeStart = new Date(`${this.props.dateChosen}, ${this.state.firstSlotInArray.thing.timeStart}`)
                  let requestedTimeEnd = new Date(`${this.props.dateChosen}, ${this.state.lastSlotInArray.thing.timeEnd}`)

                  if (shiftStartDate > requestedTimeEnd || shiftStartDate > requestedTimeStart) {
                    setTimeout(() => this.setState({employeeNotWorking: "This employees shift does not start until later"}), 200)
                    shiftError = true;
                    return;
                  }
                  else if (shiftEndDate < requestedTimeStart) {
                    setTimeout(() =>this.setState({employeeNotWorking: "This employees shift has aleady concluded"}), 200)
                    shiftError = true;
                    return;
                  }
                  else if (shiftEndDate > requestedTimeStart && shiftEndDate < requestedTimeEnd) {
                    setTimeout(() => this.setState({employeeNotWorking: "This employees shift will end before the estimated service conclusion"}), 200)
                    shiftError = true
                    return;
                  }
                }
                else {
                  setTimeout(() => this.setState({employeeNotWorking: "This employee is not working today."}), 200)
                  shiftError = true
                  return;
                }
              
              console.log(shiftError)
            let nameForBooking = "";
            let employeeName;
            let employeeId;
            if (this.props.admin) {
              nameForBooking = this.props.admin.admin.name;
            } else if (this.props.instructor) {
              nameForBooking = this.props.instructor.instructor.instructorName;
            } else if (this.props.user) {
              nameForBooking = this.props.user.user.userName;
            }
            if (this.props.employeeChosen) {
              employeeName = this.props.employeeChosen.employeeChosen.fullName;
              employeeId = this.props.employeeChosen.employeeChosen._id;
            }
            if (this.state.bookingArray.length > 1 || this.props.timeChosen.timeSelected === "15 Minutes") {
              const thingIdsArray = [];
              this.state.bookingArray.forEach(element => {
                thingIdsArray.push(element.thingId);
              });
              let thingNumberComing = thingIdsArray[0].toString();
              let thingNumberString = thingNumberComing.split("");
              let thingNumber = parseInt(thingNumberString[0]);
              const bookingToSend = {
                businessId: this.props.businessId,
                bookingType: this.props.bookingType.bookingType,
                employeeName,
                employeeId,
                bookedBy: nameForBooking,
                timeStart: this.state.firstSlotInArray.thing.timeStart,
                timeEnd: this.state.lastSlotInArray.thing.timeEnd,
                thingIds: thingIdsArray,
                minutes: this.props.timeChosen.timeSelected === "15 Minutes" ? 15 : this.state.bookingArray.length * 15,
                clubName: this.props.clubName,
                date: this.props.dateChosen,
                thingNumber,
                businessName: this.props.businessName
              };
              this.setState({ bookingToSend });
              this.setState(prevState => {
                return {
                  tryingToBookModalState: !prevState.tryingToBookModalState
                };
              });
            }
          })
          }
        });
    }
    else {
      setTimeout(() => this.setState({employeeChosenError: true}), 300);
      this.setState({slotsClicked: false})
      
      }
    }
  };

  cancelBooking = () => {
    this.setState({ tryingToBookModalState: false });
    this.setState({ slotsClicked: false });
    this.setState({ bookingArray: [] });
  };


  // Business
  render() {
    if (this.props.openTime !== "Closed" || this.props.closeTime !== "Closed") {
    return (
      <div style={{ position: "relative" }}>
        {this.state.showBookingModalState && (
          <CheckBookingModal
            cancel={this.cancelBookingModal}
            deleteBooking={this.deleteBooking}
            objectToModal={this.state.objectToModal}
          />
        )}
        <OtherAlert
        alertType="error"
        alertMessage={"This time or date has already passed."}
        showAlert={this.state.datePassed}
        />
        <OtherAlert
        alertType="error"
        alertMessage={this.state.employeeNotWorking}
        showAlert={this.state.employeeNotWorking !== ""}
        />
        <OtherAlert
          alertType="success"
          alertMessage="Booking Deleted"
          showAlert={this.state.showDeleteSuccess}
        />
          <OtherAlert
          alertType="error"
          alertMessage="Please Choose A Service"
          showAlert={this.state.chooseServiceError}
        />
        <OtherAlert
          alertType="error"
          alertMessage="You must choose an employee."
          showAlert={this.state.employeeChosenError}
          />
        
        <OtherAlert
          alertType="error"
          alertMessage="This employee is already booked at this time."
          showAlert={this.state.doubleBookError}
        />
        {this.state.tryingToBookModalState && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <TryingToBookModal
              bookingColumnType={this.props.bookingColumnType}
              businessNameAllLower={this.props.businessNameAllLower}
              booking={this.state.bookingToSend}
              cancelBooking={this.cancelBooking}
              bookThing={this.bookThingArray}
              setPlayersComingBack={this.setPlayersComingBack}
            />
          </div>
        )}
        <div id={styles.bookingIntroDiv}>
          <BookingButtons
            bookingColumnType={this.props.bookingColumnType}
            thingsClicked={this.state.slotsClicked}
            cancelBooking={this.cancelBooking}
            showTryingToBookModal={this.showTryingToBookModal}
          />
        </div>
        <div
          id={styles.courtContainerParent} style={{display: this.props.numberColumns > 6 ? "block" : ""}}
          onClick={this.thingClickedOn}
        > 
        <div style={{width: `${this.props.numberColumns * 185}px`, display: 'flex', justifyContent: 'center'}}>
          <div
            id={styles.thingContainer}
            style={{
              width: `${this.props.numberColumns * 178}px`
            }}
          >
            
            {this.props.breakAlert !== "" && !this.props.user && <p style={{position: 'absolute', left: '20px', top: '-50px',color: 'red'}}>This employee has a break from {this.props.breakAlert.breakStart}-{this.props.breakAlert.breakEnd}</p>}
            
            {this.props.breakAlert !== "" && this.props.user && <p style={{position: 'absolute', left: '20px', top: '-50px',color: 'red'}}>This employee is not available from {this.props.breakAlert.breakStart}-{this.props.breakAlert.breakEnd}</p>}
            {this.thingNumbersToThingColumns().map((element, index) => {
              return (
                <CourtColumns
                  bookingColumnType={this.props.bookingColumnType}
                  hoverNumber={this.state.thingHoverNumber}
                  thingClicked={this.thingClicked}
                  numberThings={parseInt(this.props.numberThings)}
                  cancelModal={this.cancelBookingModal}
                  bookingArray={this.state.bookingArray}
                  getModalObject={this.showBookingModal}
                  getThing={this.thingArray}
                  businessName={this.props.businessName}
                  bookedThings={this.state.bookedThings}
                  businessOpenNumber={this.convertTimeToThings(
                    this.props.openTime
                  )}
                  businessCloseNumber={this.convertTimeToThings(
                    this.props.closeTime
                  )}
                  key={element.thingNumber}
                  thingNumber={element.thingNumber}
                  firstSlotInArray={this.state.firstSlotInArray}
                  lastSlotInArray={this.state.lastSlotInArray}
                  date={this.props.dateChosen}
                />
              );
            })}
          </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return <p>Sorry we are closed on the day you have selected!!</p>
  }
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    instructor: state.authReducer.instructor,
    user: state.authReducer.user,
    timeChosen: state.bookingInfoReducer.timeSelected,
    bookingType: state.bookingInfoReducer.bookingType,
    employeeChosen: state.bookingInfoReducer.employeeChosen,
    employeeShiftError: state.alertReducer.employeeShiftError,
    breakAlert: state.alertReducer.breakAlert
  };
};

export default connect(mapStateToProps)(CourtContainer);

import React from "react";
import styles from "./CourtContainer.module.css";
import axios from "axios";
import CourtColumns from "./CourtColumns/CourtColumns";
import CheckBookingModal from "./CheckBookingModal/CheckBookingModal";
import TryingToBookModal from "./TryingToBookModal/TryingToBookModal";
import BookingIntro from "./BookingIntro/BookingIntro";
import { connect } from "react-redux";
import OtherAlert from "../../OtherAlerts/OtherAlerts";
import { HOVER_NUMBER } from "../../actions/actions";
import BookingButtons from "./BookingButtons/BookingButtons";

class CourtContainer extends React.Component {
  constructor(props) {
    super(props);
    this.courtNumbersToCourtColumns = this.courtNumbersToCourtColumns.bind(
      this
    );
    this.deleteBooking = this.deleteBooking.bind(this);
    this.convertTimeToCourts = this.convertTimeToCourts.bind(this);
    this.setShowDeleteSuccess = this.setShowDeleteSuccess.bind(this);
    this.courtClicked = this.courtClicked.bind(this);
    this.state = {
      blockBooking: false,
      showDeleteSuccess: false,
      courtsClicked: false,
      firstSlotInArray: {},
      lastSlotInArray: {},
      bookedCourts: [],
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
      courtHoverNumber: null,
      doubleBookError: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.date !== this.props.date ||
      prevProps.clubName !== this.props.clubName
    ) {
      axios
        .post("/api/courtBooked/getcourts", {
          clubName: this.props.clubName,
          date: this.props.date
        })
        .then(response => {
          this.setState({ bookedCourts: response.data.bookings });
        });
    }
  }

  setShowDeleteSuccess() {
    this.setState({ showDeleteSuccess: false });
    setTimeout(() => this.setState({ showDeleteSuccess: true }), 200);
  }

  //dwd

  deleteBooking(bookingId) {
    return () => {
      axios
        .post("/api/courtBooked/delete", {
          bookingId,
          clubName: this.props.clubName,
          date: this.props.date
        })
        .then(response => {
          this.setState({ bookedCourts: response.data.bookings });
          if (response.status === 200) {
            this.setState({ showBookingModalState: false });
            this.setShowDeleteSuccess();
          }
        });
    };
  }

  courtClicked() {
    this.setState(prevState => {
      return { courtsClicked: !prevState.courtsClicked };
    });
  }

  showBookingModal = objectToModal => () => {
    this.setState({ objectToModal, showBookingModalState: true });
  };

  cancelBookingModal = () => {
    this.setState({ showBookingModalState: false });
  };

  courtArray = (topOfArray, courtsToLoopOver) => {
    if (this.state.courtsClicked === false) {
      let numToAdd = "";
      if (this.props.timeChosen.timeSelected === "30 Minutes") {
        numToAdd = 1;
      } else if (this.props.timeChosen.timeSelected === "1 Hour") {
        numToAdd = 3;
      } else if (this.props.timeChosen.timeSelected === "1 Hour 30 Minutes") {
        numToAdd = 5;
      } else if (this.props.timeChosen.timeSelected === "2 Hours") {
        numToAdd = 7;
      } else if (this.props.timeChosen.timeSelected === "2 Hours 30 Minutes") {
        numToAdd = 9;
      } else if (this.props.timeChosen.timeSelected === "3 Hours") {
        numToAdd = 11;
      }
      const newArray = [];
      for (
        let i = topOfArray.courtId;
        i <= topOfArray.courtId + numToAdd;
        i++
      ) {
        let courtIdArray = i.toString().split("");

        courtIdArray.shift();

        let stringNeeded = courtIdArray.join("");

        let numberNeeded = parseInt(stringNeeded);

        newArray.push({
          court: courtsToLoopOver[numberNeeded],
          courtId: i
        });
      }

      let bookingIdsArray = [];
      newArray.forEach(element => {
        bookingIdsArray.push(element.courtId);
      });
      let bookedIdsArray = [];
      this.state.bookedCourts.forEach(element => {
        bookedIdsArray.push(...element.courtIds);
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
        this.setState({ courtHoverNumber: newArray[0].courtId });
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

  bookCourtArray = () => {
    if (this.state.bookingToSend !== null) {
      let playerIds = [];
      if (this.state.playersComingBack.length > 0) {
        for (let i = 0; i < this.state.playersComingBack.length; i++) {
          playerIds.push(this.state.playersComingBack[i].id);
        }
      }
      axios
        .post("/api/courtBooked", {
          booking: this.state.bookingToSend,
          players: playerIds,
          date: this.props.date
        })
        .then(firstResponse => {
          if (firstResponse.status === 200) {
            if (this.props.instructorChosen) {
              const objectToSend = {
                instructorId: this.props.instructorChosen.instructorChosen._id,
                newBooking: firstResponse.data.newBooking._id
              };
              axios
                .post("/api/instructorCourtsBooked", objectToSend)
                .then(secondResponse => {
                  if (secondResponse.status === 200 && this.props.user) {
                    axios.post("/api/notifications/userBookedInstructor", {
                      instructorId: this.props.instructorChosen.instructorChosen
                        ._id,
                      userId: this.props.user.user._id,
                      bookingId: firstResponse.data.newBooking._id
                    });
                  }
                  if (
                    secondResponse.status === 200 &&
                    this.props.instructor &&
                    firstResponse.data.newBooking.players.length > 0
                  ) {
                    axios.post("/api/notifications/instructorBookedUser", {
                      users: firstResponse.data.newBooking.players,
                      instructorId: this.props.instructorChosen.instructorChosen
                        ._id,
                      bookingId: firstResponse.data.newBooking._id
                    });
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
          let clubsMatchArray = [];
          firstResponse.data.bookings.forEach(element => {
            if (this.props.date === element.date) {
              clubsMatchArray.push(element);
            }
          });
          this.setState({ bookedCourts: clubsMatchArray });
        });
    }
    this.setState({ bookingArray: [] });
    this.setState({ tryingToBookModalState: false });
    this.setState({ courtsClicked: false });
  };

  courtNumbersToCourtColumns() {
    const newCourtsArray = [];
    for (let i = 1; i <= this.props.numberCourts; i++) {
      newCourtsArray.push({ courtNumber: i });
    }
    return newCourtsArray;
  }

  convertTimeToCourts(numberTime) {
    let courtTimeNumber = null;
    if (numberTime === "12:00 AM") {
      courtTimeNumber = 0;
    } else if (numberTime === "12:30 AM") {
      courtTimeNumber = 2;
    } else if (numberTime === "1:00 AM") {
      courtTimeNumber = 4;
    } else if (numberTime === "1:30 AM") {
      courtTimeNumber = 6;
    } else if (numberTime === "2:00 AM") {
      courtTimeNumber = 8;
    } else if (numberTime === "2:30 AM") {
      courtTimeNumber = 10;
    } else if (numberTime === "3:00 AM") {
      courtTimeNumber = 12;
    } else if (numberTime === "3:30 AM") {
      courtTimeNumber = 14;
    } else if (numberTime === "4:00 AM") {
      courtTimeNumber = 16;
    } else if (numberTime === "4:30 AM") {
      courtTimeNumber = 18;
    } else if (numberTime === "5:00 AM") {
      courtTimeNumber = 20;
    } else if (numberTime === "5:30 AM") {
      courtTimeNumber = 22;
    } else if (numberTime === "6:00 AM") {
      courtTimeNumber = 24;
    } else if (numberTime === "6:30 AM") {
      courtTimeNumber = 26;
    } else if (numberTime === "7:00 AM") {
      courtTimeNumber = 28;
    } else if (numberTime === "7:30 AM") {
      courtTimeNumber = 30;
    } else if (numberTime === "8:00 AM") {
      courtTimeNumber = 32;
    } else if (numberTime === "8:30 AM") {
      courtTimeNumber = 34;
    } else if (numberTime === "9:00 AM") {
      courtTimeNumber = 36;
    } else if (numberTime === "9:30 AM") {
      courtTimeNumber = 38;
    } else if (numberTime === "10:00 AM") {
      courtTimeNumber = 40;
    } else if (numberTime === "10:30 AM") {
      courtTimeNumber = 42;
    } else if (numberTime === "11:00 AM") {
      courtTimeNumber = 44;
    } else if (numberTime === "11:30 AM") {
      courtTimeNumber = 46;
    } else if (numberTime === "12:00 PM") {
      courtTimeNumber = 48;
    } else if (numberTime === "12:30 PM") {
      courtTimeNumber = 50;
    } else if (numberTime === "1:00 PM") {
      courtTimeNumber = 52;
    } else if (numberTime === "1:30 PM") {
      courtTimeNumber = 54;
    } else if (numberTime === "2:00 PM") {
      courtTimeNumber = 56;
    } else if (numberTime === "2:30 PM") {
      courtTimeNumber = 58;
    } else if (numberTime === "3:00 PM") {
      courtTimeNumber = 60;
    } else if (numberTime === "3:30 PM") {
      courtTimeNumber = 62;
    } else if (numberTime === "4:00 PM") {
      courtTimeNumber = 64;
    } else if (numberTime === "4:30 PM") {
      courtTimeNumber = 66;
    } else if (numberTime === "5:00 PM") {
      courtTimeNumber = 68;
    } else if (numberTime === "5:30 PM") {
      courtTimeNumber = 70;
    } else if (numberTime === "6:00 PM") {
      courtTimeNumber = 72;
    } else if (numberTime === "6:30 PM") {
      courtTimeNumber = 74;
    } else if (numberTime === "7:00 PM") {
      courtTimeNumber = 76;
    } else if (numberTime === "7:30 PM") {
      courtTimeNumber = 78;
    } else if (numberTime === "8:00 PM") {
      courtTimeNumber = 80;
    } else if (numberTime === "8:30 PM") {
      courtTimeNumber = 82;
    } else if (numberTime === "9:00 PM") {
      courtTimeNumber = 84;
    } else if (numberTime === "9:30 PM") {
      courtTimeNumber = 86;
    } else if (numberTime === "10:00 PM") {
      courtTimeNumber = 88;
    } else if (numberTime === "10:30 PM") {
      courtTimeNumber = 90;
    } else if (numberTime === "11:00 PM") {
      courtTimeNumber = 92;
    } else if (numberTime === "11:30 PM") {
      courtTimeNumber = 94;
    }
    return courtTimeNumber;
  }

  showTryingToBookModal = () => {
    this.setState({ doubleBookError: false });
    let blockBooking;
    if (this.props.instructorChosen) {
      let courtIds = [];
      this.state.bookingArray.forEach(element => {
        let courtIdArray = element.courtId.toString().split("");
        courtIdArray.shift();
        let realId = courtIdArray.join("");
        console.log(realId);
        courtIds.push(realId);
      });
      axios
        .post("/api/checkInstructorAvailability", {
          instructorId: this.props.instructorChosen.instructorChosen._id,
          courtIds,
          date: this.props.date
        })
        .then(response => {
          if (response.data.bookingNotOkay === true) {
            setTimeout(() => this.setState({ doubleBookError: true }), 200);
            blockBooking = true;
          }
          if (!blockBooking) {
            console.log("HELLLO");
            let nameForBooking = "";
            let instructorName = "None";
            let instructorId;
            if (this.props.admin) {
              nameForBooking = this.props.admin.admin.name;
            } else if (this.props.instructor) {
              nameForBooking = this.props.instructor.instructor.instructorName;
            } else if (this.props.user) {
              nameForBooking = this.props.user.user.userName;
            }
            if (this.props.instructorChosen) {
              instructorName = this.props.instructorChosen.instructorChosen
                .fullName;
              instructorId = this.props.instructorChosen.instructorChosen._id;
            }
            if (this.state.bookingArray.length > 1) {
              const courtIdsArray = [];
              this.state.bookingArray.forEach(element => {
                courtIdsArray.push(element.courtId);
              });
              let courtNumberComing = courtIdsArray[0].toString();
              let courtNumberString = courtNumberComing.split("");
              let courtNumber = parseInt(courtNumberString[0]);
              const bookingToSend = {
                bookingType: this.props.bookingType.bookingType,
                instructorName,
                instructorId,
                bookedBy: nameForBooking,
                timeStart: this.state.firstSlotInArray.court.timeStart,
                timeEnd: this.state.lastSlotInArray.court.timeEnd,
                courtIds: courtIdsArray,
                minutes: this.state.bookingArray.length * 15,
                clubName: this.props.clubName,
                date: this.props.date,
                courtNumber
              };
              this.setState({ bookingToSend });

              this.setState(prevState => {
                return {
                  tryingToBookModalState: !prevState.tryingToBookModalState
                };
              });
            }
          }
        });
    } else {
      let nameForBooking = "";
      let instructorName = "None";
      let instructorId;
      if (this.props.admin) {
        nameForBooking = this.props.admin.admin.name;
      } else if (this.props.instructor) {
        nameForBooking = this.props.instructor.instructor.instructorName;
      } else if (this.props.user) {
        nameForBooking = this.props.user.user.userName;
      }
      if (this.props.instructorChosen) {
        instructorName = this.props.instructorChosen.instructorChosen.fullName;
        instructorId = this.props.instructorChosen.instructorChosen._id;
      }
      if (this.state.bookingArray.length > 1) {
        const courtIdsArray = [];
        this.state.bookingArray.forEach(element => {
          courtIdsArray.push(element.courtId);
        });
        let courtNumberComing = courtIdsArray[0].toString();
        let courtNumberString = courtNumberComing.split("");
        let courtNumber = parseInt(courtNumberString[0]);
        const bookingToSend = {
          bookingType: this.props.bookingType.bookingType,
          instructorName,
          instructorId,
          bookedBy: nameForBooking,
          timeStart: this.state.firstSlotInArray.court.timeStart,
          timeEnd: this.state.lastSlotInArray.court.timeEnd,
          courtIds: courtIdsArray,
          minutes: this.state.bookingArray.length * 15,
          clubName: this.props.clubName,
          date: this.props.date,
          courtNumber
        };
        this.setState({ bookingToSend });

        this.setState(prevState => {
          return {
            tryingToBookModalState: !prevState.tryingToBookModalState
          };
        });
      }
    }
  };

  cancelBooking = () => {
    this.setState({ tryingToBookModalState: false });
    this.setState({ courtsClicked: false });
    this.setState({ bookingArray: [] });
  };

  render() {
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
          alertType="success"
          alertMessage="Court Deleted"
          showAlert={this.state.showDeleteSuccess}
        />
        <OtherAlert
          alertType="error"
          alertMessage="This instructor is already booked at this time."
          showAlert={this.state.doubleBookError}
        />
        {this.state.tryingToBookModalState && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <TryingToBookModal
              clubNameAllLower={this.props.clubNameAllLower}
              booking={this.state.bookingToSend}
              cancelBooking={this.cancelBooking}
              bookCourt={this.bookCourtArray}
              setPlayersComingBack={this.setPlayersComingBack}
            />
          </div>
        )}
        <div id={styles.bookingIntroDiv}>
          <BookingIntro
            openTime={this.props.clubOpenTime}
            closeTime={this.props.clubCloseTime}
            clubName={this.props.clubName}
          />
          <BookingButtons
            courtsClicked={this.state.courtsClicked}
            cancelBooking={this.cancelBooking}
            showTryingToBookModal={this.showTryingToBookModal}
          />
        </div>
        <div
          id="hello"
          style={{
            overflow: "auto"
          }}
          onClick={this.courtClickedOn}
        >
          <div
            id={styles.courtContainer}
            style={{
              width: `${this.props.numberCourts * 178}px`
            }}
          >
            {this.courtNumbersToCourtColumns().map((element, index) => {
              return (
                <CourtColumns
                  hoverNumber={this.state.courtHoverNumber}
                  courtClicked={this.courtClicked}
                  numberCourts={parseInt(this.props.numberCourts)}
                  cancelModal={this.cancelBookingModal}
                  bookingArray={this.state.bookingArray}
                  getModalObject={this.showBookingModal}
                  getCourt={this.courtArray}
                  clubName={this.props.clubName}
                  bookedCourts={this.state.bookedCourts}
                  clubOpenNumber={this.convertTimeToCourts(
                    this.props.clubOpenTime
                  )}
                  clubCloseNumber={this.convertTimeToCourts(
                    this.props.clubCloseTime
                  )}
                  key={element.courtNumber}
                  courtNumber={element.courtNumber}
                  firstSlotInArray={this.state.firstSlotInArray}
                  lastSlotInArray={this.state.lastSlotInArray}
                  date={this.props.date}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.authReducer.admin,
    instructor: state.authReducer.instructor,
    user: state.authReducer.user,
    timeChosen: state.bookingInfoReducer.timeSelected,
    bookingType: state.bookingInfoReducer.bookingType,
    instructorChosen: state.bookingInfoReducer.instructorChosen
  };
};

export default connect(mapStateToProps)(CourtContainer);

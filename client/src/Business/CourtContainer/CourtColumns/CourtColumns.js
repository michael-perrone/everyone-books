import React from "react";
import styles from "./CourtColumns.module.css";
import CourtSlot from "./CourtSlot/CourtSlot";

class CourtColumns extends React.PureComponent {
  constructor(props) {
    super(props);
    this.turnNumberIntoCourts = this.turnNumberIntoCourts.bind(this);
    this.convertNumberBackToTime = this.convertNumberBackToTime.bind(this);
    this.state = {
      courtsInColumn: [],
      bookedCourts: this.props.bookedCourts,
      bookingArray: []
    };
  }

  componentDidMount() {
    this.turnNumberIntoCourts();
  }

  convertNumberBackToTime(number) {
    let timeFromNumber = "";
    if (number === 0) {
      timeFromNumber = "12:00 AM";
    } else if (number === 1) {
      timeFromNumber = "12:15 AM";
    } else if (number === 2) {
      timeFromNumber = "12:30 AM";
    } else if (number === 3) {
      timeFromNumber = "12:45 AM";
    } else if (number === 4) {
      timeFromNumber = "1:00 AM";
    } else if (number === 5) {
      timeFromNumber = "1:15 AM";
    } else if (number === 6) {
      timeFromNumber = "1:30 AM";
    } else if (number === 7) {
      timeFromNumber = "1:45 AM";
    } else if (number === 8) {
      timeFromNumber = "2:00 AM";
    } else if (number === 9) {
      timeFromNumber = "2:15 AM";
    } else if (number === 10) {
      timeFromNumber = "2:30 AM";
    } else if (number === 11) {
      timeFromNumber = "2:45 AM";
    } else if (number === 12) {
      timeFromNumber = "3:00 AM";
    } else if (number === 13) {
      timeFromNumber = "3:15 AM";
    } else if (number === 14) {
      timeFromNumber = "3:30 AM";
    } else if (number === 15) {
      timeFromNumber = "3:45 AM";
    } else if (number === 16) {
      timeFromNumber = "4:00 AM";
    } else if (number === 17) {
      timeFromNumber = "4:15 AM";
    } else if (number === 18) {
      timeFromNumber = "4:30 AM";
    } else if (number === 19) {
      timeFromNumber = "4:45 AM";
    } else if (number === 20) {
      timeFromNumber = "5:00 AM";
    } else if (number === 21) {
      timeFromNumber = "5:15 AM";
    } else if (number === 22) {
      timeFromNumber = "5:30 AM";
    } else if (number === 23) {
      timeFromNumber = "5:45 AM";
    } else if (number === 24) {
      timeFromNumber = "6:00 AM";
    } else if (number === 25) {
      timeFromNumber = "6:15 AM";
    } else if (number === 26) {
      timeFromNumber = "6:30 AM";
    } else if (number === 27) {
      timeFromNumber = "6:45 AM";
    } else if (number === 28) {
      timeFromNumber = "7:00 AM";
    } else if (number === 29) {
      timeFromNumber = "7:15 AM";
    } else if (number === 30) {
      timeFromNumber = "7:30 AM";
    } else if (number === 31) {
      timeFromNumber = "7:45 AM";
    } else if (number === 32) {
      timeFromNumber = "8:00 AM";
    } else if (number === 33) {
      timeFromNumber = "8:15 AM";
    } else if (number === 34) {
      timeFromNumber = "8:30 AM";
    } else if (number === 35) {
      timeFromNumber = "8:45 AM";
    } else if (number === 36) {
      timeFromNumber = "9:00 AM";
    } else if (number === 37) {
      timeFromNumber = "9:15 AM";
    } else if (number === 38) {
      timeFromNumber = "9:30 AM";
    } else if (number === 39) {
      timeFromNumber = "9:45 AM";
    } else if (number === 40) {
      timeFromNumber = "10:00 AM";
    } else if (number === 41) {
      timeFromNumber = "10:15 AM";
    } else if (number === 42) {
      timeFromNumber = "10:30 AM";
    } else if (number === 43) {
      timeFromNumber = "10:45 AM";
    } else if (number === 44) {
      timeFromNumber = "11:00 AM";
    } else if (number === 45) {
      timeFromNumber = "11:15 AM";
    } else if (number === 46) {
      timeFromNumber = "11:30 AM";
    } else if (number === 47) {
      timeFromNumber = "11:45 AM";
    } else if (number === 48) {
      timeFromNumber = "12:00 PM";
    } else if (number === 49) {
      timeFromNumber = "12:15 PM";
    } else if (number === 50) {
      timeFromNumber = "12:30 PM";
    } else if (number === 51) {
      timeFromNumber = "12:45 PM";
    } else if (number === 52) {
      timeFromNumber = "1:00 PM";
    } else if (number === 53) {
      timeFromNumber = "1:15 PM";
    } else if (number === 54) {
      timeFromNumber = "1:30 PM";
    } else if (number === 55) {
      timeFromNumber = "1:45 PM";
    } else if (number === 56) {
      timeFromNumber = "2:00 PM";
    } else if (number === 57) {
      timeFromNumber = "2:15 PM";
    } else if (number === 58) {
      timeFromNumber = "2:30 PM";
    } else if (number === 59) {
      timeFromNumber = "2:45 PM";
    } else if (number === 60) {
      timeFromNumber = "3:00 PM";
    } else if (number === 61) {
      timeFromNumber = "3:15 PM";
    } else if (number === 62) {
      timeFromNumber = "3:30 PM";
    } else if (number === 63) {
      timeFromNumber = "3:45 PM";
    } else if (number === 64) {
      timeFromNumber = "4:00 PM";
    } else if (number === 65) {
      timeFromNumber = "4:15 PM";
    } else if (number === 66) {
      timeFromNumber = "4:30 PM";
    } else if (number === 67) {
      timeFromNumber = "4:45 PM";
    } else if (number === 68) {
      timeFromNumber = "5:00 PM";
    } else if (number === 69) {
      timeFromNumber = "5:15 PM";
    } else if (number === 70) {
      timeFromNumber = "5:30 PM";
    } else if (number === 71) {
      timeFromNumber = "5:45 PM";
    } else if (number === 72) {
      timeFromNumber = "6:00 PM";
    } else if (number === 73) {
      timeFromNumber = "6:15 PM";
    } else if (number === 74) {
      timeFromNumber = "6:30 PM";
    } else if (number === 75) {
      timeFromNumber = "6:45 PM";
    } else if (number === 76) {
      timeFromNumber = "7:00 PM";
    } else if (number === 77) {
      timeFromNumber = "7:15 PM";
    } else if (number === 78) {
      timeFromNumber = "7:30 PM";
    } else if (number === 79) {
      timeFromNumber = "7:45 PM";
    } else if (number === 80) {
      timeFromNumber = "8:00 PM";
    } else if (number === 81) {
      timeFromNumber = "8:15 PM";
    } else if (number === 82) {
      timeFromNumber = "8:30 PM";
    } else if (number === 83) {
      timeFromNumber = "8:45 PM";
    } else if (number === 84) {
      timeFromNumber = "9:00 PM";
    } else if (number === 85) {
      timeFromNumber = "9:15 PM";
    } else if (number === 86) {
      timeFromNumber = "9:30 PM";
    } else if (number === 87) {
      timeFromNumber = "9:45 PM";
    } else if (number === 88) {
      timeFromNumber = "10:00 PM";
    } else if (number === 89) {
      timeFromNumber = "10:15 PM";
    } else if (number === 90) {
      timeFromNumber = "10:30 PM";
    } else if (number === 91) {
      timeFromNumber = "10:45 PM";
    } else if (number === 92) {
      timeFromNumber = "11:00 PM";
    } else if (number === 93) {
      timeFromNumber = "11:15 PM";
    } else if (number === 94) {
      timeFromNumber = "11:30 PM";
    } else if (number === 95) {
      timeFromNumber = "11:45 PM";
    }
    return timeFromNumber;
  }

  turnNumberIntoCourts() {
    const newCourtsArray = [];
    for (
      let i = this.props.clubOpenNumber;
      i < this.props.clubCloseNumber;
      i++
    ) {
      newCourtsArray.push({
        timeStart: this.convertNumberBackToTime(i),
        timeEnd: this.convertNumberBackToTime(i + 1)
      });
    }
    this.setState({ courtsInColumn: newCourtsArray });
  }

  sendBookingInfo = courtId => {
    let objectSending = null;
    this.props.bookedCourts.forEach(element => {
      if (courtId == element.courtIds[element.courtIds.length / 2 - 1]) {
        objectSending = element;
      }
    });
    return objectSending;
  };

  borderDivEnd = courtId => {
    let getLastElement = "";
    this.props.bookedCourts.forEach(element => {
      if (
        courtId == element.courtIds[element.courtIds.length - 1] &&
        element.courtIds.length > 1
      ) {
        getLastElement = true;
      }
    });
    return getLastElement;
  };

  //

  checkBooked = courtId => {
    let booked = [];
    let checkingVar = false;
    if (this.props.bookedCourts.length > 0) {
      this.props.bookedCourts.forEach(element1 => {
        element1.courtIds.forEach(element => {
          booked.push(element);
        });
      });

      booked.forEach(element => {
        if (courtId == element) {
          checkingVar = true;
        }
      });
      return checkingVar;
    } else {
      return false;
    }
  };

  beingBooked = courtId => {
    let beingBooked = false;
    this.props.bookingArray.forEach(element => {
      if (element.courtId == courtId) {
        beingBooked = true;
      }
    });
    return beingBooked;
  };

  getCourts = court => () => {
    this.props.getCourt(court, this.state.courtsInColumn);
  };

  render() {
    return (
      <div>
        <p style={{ textAlign: "center" }}>Court: {this.props.courtNumber}</p>
        <div
          className={styles.courtColumn}
          style={{
            width: "170px"
          }}
        >
          {this.state.courtsInColumn.map((element, index) => {
            return (
              <CourtSlot
                hoverNumber={this.props.hoverNumber}
                courtClicked={this.props.courtClicked}
                bookingArray={this.props.bookingArray}
                date={this.props.date}
                firstSlotInArray={this.props.firstSlotInArray}
                lastSlotInArray={this.props.lastSlotInArray}
                cancelModal={this.props.cancelModal}
                beingBooked={this.beingBooked(
                  this.props.courtNumber * 100 + index
                )}
                getModalObject={this.props.getModalObject}
                isLast={this.borderDivEnd(this.props.courtNumber * 100 + index)}
                booked={this.checkBooked(this.props.courtNumber * 100 + index)}
                bookingInfo={this.sendBookingInfo(
                  this.props.courtNumber * 100 + index
                )}
                getCourt={this.getCourts}
                clubName={this.props.clubName}
                courtNumber={this.props.courtNumber}
                timeStart={element.timeStart}
                timeEnd={element.timeEnd}
                key={this.props.courtNumber * 100 + index}
                courtId={this.props.courtNumber * 100 + index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CourtColumns;

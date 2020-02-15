import React from "react";
import styles from "./CourtSlot.module.css";

class CourtSlot extends React.Component {
  constructor(props) {
    super(props);

    // 
    this.state = {
      booking: false,
    };
  }
  // getModalObject

 
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.timeStart !== nextProps.timeStart) {
      return true;
    }
    if (this.props.booked && this.props.hoverNumber === nextProps.hoverNumber) {
      return true;
    }
    if (this.props.date !== nextProps.date) {
      return true;
    }
    if (this.props.booked != nextProps.booked) {
      return true;
    }

    if (this.props.bookingInfo != nextProps.bookingInfo) {
      return true;
    }
    if (this.state.clicked) {
      return true;
    }

    if (this.props.beingBooked == nextProps.beingBooked) {
      if (
        this.props.thingId == nextProps.firstSlotInArray.thingId ||
        this.props.thingId == nextProps.lastSlotInArray.thingId ||
        this.props.thingId == this.props.lastSlotInArray.thingId ||
        this.props.thingId == this.props.firstSlotInArray.thingId
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  phoneClick = () => {
    this.setState({ clicked: true });
    let peacock = true;
    if (this.props.bookingArray.length === 0 || this.state.clicked || peacock) {
      this.props.getThings({
        thingId: this.props.thingId,
        timeStart: this.props.timeStart,
        endTime: this.props.timeEnd,
        clubName: this.props.clubName
      })();
    } else {
      return;
    }
  };

  render() {

    let color = "";

    if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Employee Time"
    ) {
      color = "#faff73";
    }
    if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Open Clinic"
    ) {
      color = "#c5ffa1";
    } else if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Employee Court Time"
    ) {
      color = "#faff73";
    } else if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Private Lesson"
    ) {
      color = "#82fff3";
    } else if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Private Clinic"
    ) {
      color = "#fd66ff  ";
    } else if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Group Lesson"
    ) {
      color = "white";
    } else if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Other"
    ) {
      color = "pink";
    } else if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Tournament"
    ) {
      color = "#cda1ff";
    } else if (
      this.props.bookingInfo &&
      this.props.bookingInfo.bookingType === "Court Time"
    ) {
      color = "lightsalmon";
    }
    return (
      <div
        style={{
          backgroundColor:
            this.props.beingBooked && !this.props.booked ? "lightgreen" : "",
          borderBottom:
            this.props.beingBooked && !this.props.booked
              ? "1px solid lightgreen"
              : ""
        }}
        id={
          !this.props.booked
            ? styles.thingSlotNotBooked
            : styles.thingSlotBooked
        }
      >
        {this.props.booked && this.props.isLast && !this.props.bookingInfo && (
          <div
            style={{
              borderTop: "none",
              height: "100%",
              width: "100%",
              borderBottom: "2px solid black"
            }}
          />
        )}

        {this.props.booked && this.props.bookingInfo !== null && 
        this.props.bookingInfo && this.props.bookingInfo.thingIds.length !== 1 && this.props.bookingInfo.thingIds.length % 2 === 0 &&(
          <div
            onClick={this.props.getModalObject(this.props.bookingInfo)}
            id={styles.bookingInfo}
          >
            <button
              style={{
                position: 'relative',
                top: '7px',
                backgroundColor: color
              }}
              id={styles.bookedCheckButton}
            >
              {this.props.bookingInfo.serviceName}
            </button>
          </div>
        )}
         {this.props.booked && this.props.bookingInfo !== null && 
        this.props.bookingInfo && this.props.bookingInfo.thingIds.length !== 1 && this.props.bookingInfo.thingIds.length % 2 === 1 &&(
          <div
            onClick={this.props.getModalObject(this.props.bookingInfo)}
            id={styles.bookingInfo}
          >
            <button
              style={{
                position: 'relative',
                top: '-11px',
                backgroundColor: color
              }}
              id={styles.bookedCheckButton}
            >
              {this.props.bookingInfo.serviceName}
            </button>
          </div>
        )}
        
        {this.props.booked && this.props.bookingInfo !== null &&
         this.props.bookingInfo && this.props.bookingInfo.thingIds.length === 1 &&(
          <div
            onClick={this.props.getModalObject(this.props.bookingInfo)}
            id={styles.bookingInfo}
            style={{borderBottom: '2px solid black'}}
          >
            <button
              style={{
                position: 'relative',
                top: '-9px',
                backgroundColor: color,
              }}
              id={styles.bookedCheckButton}
            >
              {this.props.bookingInfo.serviceName}
            </button>
          </div>
        )}

        {!this.props.booked && !this.props.beingBooked && (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: "2",
              justifyContent: "center"
            }}
            onClick={this.phoneClick}
            onMouseEnter={this.props.getThings({
              thingId: this.props.thingId,
              timeStart: this.props.timeStart,
              endTime: this.props.timeEnd,
              clubName: this.props.clubName
            })}
          >
            <p id={styles.time}>{this.props.timeStart}</p>
          </div>
        )}
        {!this.props.booked &&
          this.props.beingBooked &&
          this.props.thingId == this.props.firstSlotInArray.thingId &&
          this.props.firstSlotInArray.thingId !=
            this.props.lastSlotInArray.thingId && (
            <div
              style={{
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
                height: "100%",
                width: "100%",
                backgroundColor: "lightgreen",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: "2"
              }}
              onClick={this.props.thingClicked}
              onMouseEnter={this.props.getThings({
                thingId: this.props.thingId,
                timeStart: this.props.timeStart,
                endTime: this.props.timeEnd,
                clubName: this.props.clubName
              })}
            >
              <p id={styles.time}>{this.props.timeStart}</p>
            </div>
          )}
        {!this.props.booked &&
          this.props.beingBooked &&
          this.props.thingId == this.props.lastSlotInArray.thingId &&
          this.props.lastSlotInArray.thingId !=
            this.props.firstSlotInArray.thingId && (
            <div
              onClick={this.props.thingClicked}
              style={{
                borderBottom: "1px solid black",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
                borderTop: "none",
                height: "100%",
                width: "100%",
                backgroundColor: "lightgreen",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "2"
              }}
              onMouseEnter={this.props.getThings({
                thingId: this.props.thingId,
                timeStart: this.props.timeStart,
                endTime: this.props.timeEnd,
                clubName: this.props.clubName
              })}
            >
              <p id={styles.time}>{this.props.timeEnd}</p>
            </div>
          )}
        {!this.props.booked &&
          this.props.beingBooked &&
          this.props.thingId != this.props.firstSlotInArray.thingId &&
          this.props.thingId != this.props.lastSlotInArray.thingId &&
          this.props.bookingArray.length > 0 && (
            <div
              onClick={this.props.thingClicked}
              style={{
                height: "100%",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
                width: "100%",
                backgroundColor: "lightgreen",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: "2"
              }}
              onMouseEnter={this.props.getThings({
                thingId: this.props.thingId,
                timeStart: this.props.timeStart,
                endTime: this.props.timeEnd,
                clubName: this.props.clubName
              })}
            ></div>
          )}
        {this.props.firstSlotInArray.thingId ==
          this.props.lastSlotInArray.thingId &&
          this.props.beingBooked &&
          !this.props.booked && (
            <div
              style={{
                height: "100%",
                border: "1px solid black",
                width: "100%",
                backgroundColor: "lightgreen",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "2"
              }}
              onClick={this.props.thingClicked}
              onMouseEnter={this.props.getThings({
                thingId: this.props.thingId,
                timeStart: this.props.timeStart,
                endTime: this.props.timeEnd,
                clubName: this.props.clubName
              })}
            >
              <p id={styles.time}>{this.props.timeStart}</p>
            </div>
          )}
      </div>
    );
  }
}

export default CourtSlot;

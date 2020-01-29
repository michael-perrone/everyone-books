import React from "react";
import styles from "../../../../Business/CourtContainer/CourtColumns/CourtSlot/CourtSlot.module.css";

class ScheduleSlot extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      booking: false,
    };
  }
  //firstSlot

 // color
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
        this.props.slotId == nextProps.firstSlotInArray.slotId ||
        this.props.slotId == nextProps.lastSlotInArray.slotId ||
        this.props.slotId == this.props.lastSlotInArray.slotId ||
        this.props.slotId == this.props.firstSlotInArray.slotId
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
      this.props.getSlots({
        slotId: this.props.slotId,
        timeStart: this.props.timeStart,
        endTime: this.props.timeEnd,
        clubName: this.props.clubName
      })();
    } else {
      return;
    }
  };

  render() {
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
        {this.props.booked && this.props.isLast && (
          <div
            style={{
              borderTop: "none",
              height: "100%",
              width: "100%",
              borderBottom: "2px solid black"
            }}
          />
        )}

        {this.props.booked && this.props.bookingInfo !== null && (
          <div
            onClick={this.props.getModalObject(this.props.bookingInfo)}
            id={styles.bookingInfo}
          >
            <button
              style={{
                position: "relative",
                top: "7px",
                backgroundColor: 'green'
              }}
              id={styles.bookedCheckButton}
            >
              {this.props.bookingInfo.bookingType}
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
            onMouseEnter={this.props.getSlots({
              slotId: this.props.slotId,
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
          this.props.slotId == this.props.firstSlotInArray.slotId &&
          this.props.firstSlotInArray.slotId !=
            this.props.lastSlotInArray.slotId && (
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
              onMouseEnter={this.props.getSlots({
                slotId: this.props.slotId,
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
          this.props.slotId == this.props.lastSlotInArray.slotId &&
          this.props.lastSlotInArray.slotId !=
            this.props.firstSlotInArray.slotId && (
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
              onMouseEnter={this.props.getSlots({
                slotId: this.props.slotId,
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
          this.props.slotId != this.props.firstSlotInArray.slotId &&
          this.props.slotId != this.props.lastSlotInArray.slotId &&
          this.props.bookingArray.length > 1 && (
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
              onMouseEnter={this.props.getSlots({
                slotId: this.props.slotId,
                timeStart: this.props.timeStart,
                endTime: this.props.timeEnd,
                clubName: this.props.clubName
              })}
            ></div>
          )}
        {this.props.firstSlotInArray.slotId ==
          this.props.lastSlotInArray.slotId &&
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
              onMouseEnter={this.props.getSlots({
                slotId: this.props.slotId,
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

export default ScheduleSlot;

import React from 'react';
import styles from './ScheduleColumns.module.css';
import ScheduleSlot from './ScheduleSlot/ScheduleSlot';

const ScheduleColumns = props => {
 const [openNumber, setOpenNumber] = React.useState('');
 const [closeNumber, setCloseNumber] = React.useState('');
 const [slotsInColumn, setSlotsInColumn] = React.useState([]);

 function getOpenClose(numberTime) {
     let openCloseNumber;
    if (numberTime === "12:00 AM") {
      openCloseNumber = 0;
    } else if (numberTime === "12:30 AM") {
      openCloseNumber = 2;
    } else if (numberTime === "1:00 AM") {
      openCloseNumber = 4;
    } else if (numberTime === "1:30 AM") {
      openCloseNumber = 6;
    } else if (numberTime === "2:00 AM") {
      openCloseNumber = 8;
    } else if (numberTime === "2:30 AM") {
      openCloseNumber = 10;
    } else if (numberTime === "3:00 AM") {
      openCloseNumber = 12;
    } else if (numberTime === "3:30 AM") {
      openCloseNumber = 14;
    } else if (numberTime === "4:00 AM") {
      openCloseNumber = 16;
    } else if (numberTime === "4:30 AM") {
      openCloseNumber = 18;
    } else if (numberTime === "5:00 AM") {
      openCloseNumber = 20;
    } else if (numberTime === "5:30 AM") {
      openCloseNumber = 22;
    } else if (numberTime === "6:00 AM") {
      openCloseNumber = 24;
    } else if (numberTime === "6:30 AM") {
      openCloseNumber = 26;
    } else if (numberTime === "7:00 AM") {
      openCloseNumber = 28;
    } else if (numberTime === "7:30 AM") {
      openCloseNumber = 30;
    } else if (numberTime === "8:00 AM") {
      openCloseNumber = 32;
    } else if (numberTime === "8:30 AM") {
      openCloseNumber = 34;
    } else if (numberTime === "9:00 AM") {
      openCloseNumber = 36;
    } else if (numberTime === "9:30 AM") {
      openCloseNumber = 38;
    } else if (numberTime === "10:00 AM") {
      openCloseNumber = 40;
    } else if (numberTime === "10:30 AM") {
      openCloseNumber = 42;
    } else if (numberTime === "11:00 AM") {
      openCloseNumber = 44;
    } else if (numberTime === "11:30 AM") {
      openCloseNumber = 46;
    } else if (numberTime === "12:00 PM") {
      openCloseNumber = 48;
    } else if (numberTime === "12:30 PM") {
      openCloseNumber = 50;
    } else if (numberTime === "1:00 PM") {
      openCloseNumber = 52;
    } else if (numberTime === "1:30 PM") {
      openCloseNumber = 54;
    } else if (numberTime === "2:00 PM") {
      openCloseNumber = 56;
    } else if (numberTime === "2:30 PM") {
      openCloseNumber = 58;
    } else if (numberTime === "3:00 PM") {
      openCloseNumber = 60;
    } else if (numberTime === "3:30 PM") {
      openCloseNumber = 62;
    } else if (numberTime === "4:00 PM") {
      openCloseNumber = 64;
    } else if (numberTime === "4:30 PM") {
      openCloseNumber = 66;
    } else if (numberTime === "5:00 PM") {
      openCloseNumber = 68;
    } else if (numberTime === "5:30 PM") {
      openCloseNumber = 70;
    } else if (numberTime === "6:00 PM") {
      openCloseNumber = 72;
    } else if (numberTime === "6:30 PM") {
      openCloseNumber = 74;
    } else if (numberTime === "7:00 PM") {
      openCloseNumber = 76;
    } else if (numberTime === "7:30 PM") {
      openCloseNumber = 78;
    } else if (numberTime === "8:00 PM") {
      openCloseNumber = 80;
    } else if (numberTime === "8:30 PM") {
      openCloseNumber = 82;
    } else if (numberTime === "9:00 PM") {
      openCloseNumber = 84;
    } else if (numberTime === "9:30 PM") {
      openCloseNumber = 86;
    } else if (numberTime === "10:00 PM") {
      openCloseNumber = 88;
    } else if (numberTime === "10:30 PM") {
      openCloseNumber = 90;
    } else if (numberTime === "11:00 PM") {
      openCloseNumber = 92;
    } else if (numberTime === "11:30 PM") {
      openCloseNumber = 94;
     }
     return openCloseNumber;
    }  

    function changeNumberBackToTime(number) {
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

    React.useEffect(() => {
        setOpenNumber(getOpenClose(props.open));
        setCloseNumber(getOpenClose(props.close))     
    },[props.open, props.close])

    React.useEffect(() => {
        let newSlotsInColumn = []
        for (let i = openNumber; i <= closeNumber; i++) {
            newSlotsInColumn.push({ 
              timeStart: changeNumberBackToTime(i),
              timeEnd: changeNumberBackToTime(i + 1)
            })
        }
        for (let n = 0; n < newSlotsInColumn.length; n++) {
          newSlotsInColumn[n].id = props.columnNumber * 100 + n;
        }
        setSlotsInColumn(newSlotsInColumn)
    },[openNumber, closeNumber])

    function getSlots(slot) {
    return () => {
      props.getSlots(slot, slotsInColumn)
    }
  }

    function beingBooked(slotId) {
      let beingBooked = false;
      props.bookingArray.forEach(slot => {
        if (slot.slot.id === slotId) {
          beingBooked = true;
        }
      })
      return beingBooked;
    }

    return (
        <div id={styles.scheduleColumn}>
            {slotsInColumn.map(slot => {
              return <ScheduleSlot
               hoverNumber={props.hoverNumber}
               booked={false} // check
             //  slotClicked={props.slotClicked}
               bookingArray={props.bookingArray}  // good
               firstSlotInArray={props.firstSlotInBookingArray} // good
               lastSlotInArray={props.lastSlotInBookingArray} // good
               beingBooked={beingBooked(slot.id)} // i think good
               getModalObject={props.showConfirmBooking} // maybe clean this up later
              // isLast={borderDivEnd} // probably better way to do this
              // booked={booked} // prob did this fine
             //  bookingInfo={sendBookingInfo} // come bakc here
               getSlots={getSlots} // good
               dayNumber={props.columnNumber} // good
               timeStart={slot.timeStart} // good
               timeEnd={slot.timeEnd} // good
               key={slot.id} // good 
               slotId={slot.id} // good
               />
            })}
        </div>
    )
}


export default ScheduleColumns;
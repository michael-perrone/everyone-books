import React from 'react';
import styles from './ScheduleContainer.module.css';
import ScheduleColumns from './ScheduleColumns/ScheduleColumns';
import {connect} from 'react-redux';

const ScheduleContainer = (props) => {
    const [bookingArray, setBookingArray] = React.useState([]);
    const [firstSlotInBookingArray, setFirstSlotInBookingArray] = React.useState('');
    const [lastSlotInBookingArray, setLastSlotInBookingArray] = React.useState('');
    const [hoverNumber, setHoverNumber] = React.useState('');
    const [bookingToBookState, setBookingToBookState] = React.useState('');
    
    function slotArray (topOfArray, slotsToLoopOver) {
        console.log(topOfArray)
        let numToAdd = "";
        if (props.shiftDuration === "30 Minutes") {
            numToAdd = 1;
        }
        else if (props.shiftDuration === "1 Hour") {
            numToAdd = 3;
        }
        else if (props.shiftDuration === "1 Hour 30 Minutes") {
            numToAdd = 5;
        }
        else if (props.shiftDuration === "2 Hours") {
            numToAdd = 7;
        }
        else if (props.shiftDuration === "2 Hours 30 Minutes") {
            numToAdd = 9;
        }
        else if (props.shiftDuration === "3 Hours") {
            numToAdd = 11;
        }
        else if (props.shiftDuration === "3 Hours 30 Minutes") {
            numToAdd = 13;
        }
        else if (props.shiftDuration === "4 Hours") {
            numToAdd = 15;
        }
        else if (props.shiftDuration === "4 Hours 30 Minutes") {
            numToAdd = 17;
        }
        else if (props.shiftDuration === "5 Hours") {
            numToAdd = 19;
        }
        else if (props.shiftDuration === "5 Hours 30 Minutes") {
            numToAdd = 21;
        }
        else if (props.shiftDuration === "6 Hours") {
            numToAdd = 23;
        }
        else if (props.shiftDuration === "6 Hours 30 Minutes") {
            numToAdd = 25;
        }
        else if (props.shiftDuration === "7 Hours") {
            numToAdd = 27;
        }
        else if (props.shiftDuration === "7 Hour 30 Minutes") {
            numToAdd = 29;
        }
        else if (props.shiftDuration === "8 Hours") {
            numToAdd = 31;
        }
        else if (props.shiftDuration === "8 Hours 30 Minutes") {
            numToAdd = 33;
        }
        else if (props.shiftDuration === "9 Hours") {
            numToAdd = 35;
        }
        else if (props.shiftDuration === "9 Hours 30 Minutes") {
            numToAdd = 37;
        }
        else if (props.shiftDuration === "10 Hours") {
            numToAdd = 39;
        }
        else if (props.shiftDuration === "10 Hours 30 Minutes") {
            numToAdd = 41;
        }
        else if (props.shiftDuration === "11 Hours") {
            numToAdd = 43;
        }
        else if (props.shiftDuration === "11 Hours 30 Minutes") {
            numToAdd = 45;
        }
        else if (props.shiftDuration === "12 Hours") {
            numToAdd = 47;
        }

        const newArray = []

        for (let i = topOfArray.slotId; i <= topOfArray.slotId + numToAdd; i++) {
            let slotIdArray = i.toString().split('');
            slotIdArray.shift();
            let stringNeeded = slotIdArray.join('');
            let numberNeeded = parseInt(stringNeeded);
            newArray.push({
                slot: slotsToLoopOver[numberNeeded], 
            })
        }
        setBookingArray(newArray)
        setFirstSlotInBookingArray(newArray[0]);
        setLastSlotInBookingArray(newArray[newArray.length - 1])
        setHoverNumber(newArray[0].slotId)

      //  let slotIdsArray = [];
       // newArray.forEach(element => {
        //    slotIdsArray.push(element.slotId)
        // })
    }

    function showConfirmBooking() {
        let blockBooking;
        let slotIds = [];
        this.state.bookingArray.forEach(slot => {
            let slotIdArray = slot.slotId.toString().split('');
            slotIdArray.shift();
            let realId = slotIdArray.join('');
            slotIds.push(realId)
        })
        // use info above to check employee availability
        let nameForBooking = "";
        if (props.admin) {
            nameForBooking = props.admin.admin.fullName
        }
        else if (props.employee) {
            nameForBooking = props.employee.employee.fullName
        }
        if (bookingArray.length > 0) {
            const slotIdsArray = [];
            bookingArray.forEach(slot => {
                slotIdsArray.push(slot.slotId)
            })

            let slotNumberString = slotIdsArray[0].toString();
            let slotNumberArray = slotNumberString.split('')
            let slotNumber = parseInt(slotNumberArray[0]);

            const bookingToBook = {
                businessId: props.admin.admin.businessId,
                employeeName: props.employeeToSchedule.fullName,
                employeeId: props.employeeToSchedule.id,
                timeStart: firstSlotInBookingArray.timeStart,
                timeEnd: lastSlotInBookingArray.timeEnd,
                minutes: bookingArray.length * 15,
                slotNumber // i think this is equiv to court number yep
            }
            setBookingToBookState(bookingToBook)
        }
    }
    console.log(props)

    return (
        <div id={styles.scheduleContainer}>
           {props.schedule && props.schedule.map((day, index) => {
               return <ScheduleColumns
               bookingArray={bookingArray}
               showConfirmBooking={showConfirmBooking}
               firstSlotInBookingArray={firstSlotInBookingArray}
               lastSlotInBookingArray={lastSlotInBookingArray}
               getSlots={slotArray}
               hoverNumber={hoverNumber}
               columnNumber={index + 1}
               key={index + 1}
               open={day.open}
               close={day.close}/>
           })} 
        </div>
    )
}

function mapStateToProps(state) { 
    return {
        employee: state.authReducer.employee,
        admin: state.authReducer.admin,
        shiftDuration: state.scheduleReducer.timeForBooking,
        employeeToSchedule: state.scheduleReducer.employeeToSchedule,

    }
}

export default connect(mapStateToProps)(ScheduleContainer);
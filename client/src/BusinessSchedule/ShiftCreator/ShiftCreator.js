import React from 'react';
import Axios from 'axios';
import styles from './ShiftCreator.module.css';
import {connect} from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';


function ShiftCreator(props)  {
    const [date, setDate] = React.useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
    const [shiftDuration, setShiftDuration] = React.useState('');
    const [shiftStart, setShiftStart] = React.useState('');
    const [employeeId, setEmployeeId] = React.useState('');
    const [employeeName, setEmployeeName] = React.useState('');
    const [dateNeeded, setDateNeeded] = React.useState('')
    const [endOfShift, setEndOfShift] = React.useState('');
    const [isBreak, setBreak] = React.useState("");
    const [breakStart, setBreakStart] = React.useState('')
    const [breakEnd, setBreakEnd] = React.useState('')
    const [breakError, setBreakError] = React.useState('');
    const [readyToGo, setReadyToGo] = React.useState(false)
    const [shiftCloneNumber, setShiftCloneNumber] = React.useState('');
    const [shiftCloneDates, setShiftCloneDates] = React.useState([])
    const [clone, setClone] = React.useState('')
    const [success, setSuccess] = React.useState(false);
    const [optionsNumber, setOptionsNumber] = React.useState();
    const [shiftError, setShiftError] = React.useState('');

    function shiftCloneNumberHandler(e) {
        setShiftCloneNumber(parseInt(e.target.value))
    } 

    React.useEffect(() => {
        if (shiftCloneNumber) {
        let newShiftCloneDates = []
        let dateForLoop = new Date(dateNeeded)
        for (let i = 0 ; i < shiftCloneNumber; i++) {
            newShiftCloneDates.push(new Date(dateForLoop.getFullYear(), dateForLoop.getMonth(), dateForLoop.getDate() + (i * 7)).toDateString())
        }
        setShiftCloneDates(newShiftCloneDates)
      }
    }, [shiftCloneNumber])

    function cloneHandler(value) {
        return () => {
            setClone(value)
        }
    }

    React.useEffect(() => {
        if (breakEnd && breakStart && shiftStart && endOfShift && (isBreak === true && breakStart && breakEnd || isBreak === false)) {
            if (shiftCalcNum(breakStart) < shiftCalcNum(shiftStart)) {
                setBreakError("Break cannot start before shift.")
            }
            else if (shiftCalcNum(breakStart) > shiftCalcNum(endOfShift)) {
                setBreakError("Break cannot start after shift ends.")
            }
            else if (shiftCalcNum(breakEnd) < shiftCalcNum(shiftStart)) {
                setBreakError("Break cannot end before shift.")
            } 
            else if (shiftCalcNum(breakEnd) > shiftCalcNum(endOfShift)) {
                setBreakError('Break cannot end after shift ends.')
            }
            else if (shiftCalcNum(breakStart) === shiftCalcNum(breakEnd)) {
                setBreakError("Break cannot start and end at same time.")
            }
            else if (breakStart && breakEnd && (new Date(`${dateNeeded}, ${breakEnd}`) < new Date(`${dateNeeded}, ${breakStart}`))) {
                   setBreakError("Break cannot end before it starts.")
            }
            else if (employeeName && dateNeeded ) {
                setBreakError('');
                setReadyToGo(true)
            }
        }
        if (isBreak === false && shiftStart && endOfShift && employeeName && employeeId && dateNeeded) {
            setBreakError('');
            setReadyToGo(true)
        }
    }, [breakEnd, breakStart, shiftStart, endOfShift, isBreak])


    function shiftStartHandler(e) {
        setShiftStart(e.target.value)
    } 

    function breakStartHandler(e) {
        setBreakStart(e.target.value)
    }
 
    function breakEndHandler(e) {
        setBreakEnd(e.target.value)
    }

    function setDateHandler(e) {
        setDate(e.target.value)
    }

    function shiftDurationHandler(e) {
        setShiftDuration(e.target.value)
    }

    function shiftCalcNum(time) {
        let num;
        if (time === "12:00 AM") {
            num = 0;
        }
        else if (time === "12:30 AM") {
            num = 1
        }
        else if (time === "1:00 AM") {
            num = 2
        }
        else if (time === "1:30 AM") {
            num = 3
        }
        else if (time === "2:00 AM") {
            num = 4
        }
        else if (time === "2:30 AM") {
            num = 5
        }
        else if (time === "3:00 AM") {
            num = 6
        }
        else if (time === "3:30 AM") {
            num = 7
        }
        else if (time === "4:00 AM") {
            num = 8
        }
        else if (time === "4:30 AM") {
            num = 9
        }
        else if (time === "5:00 AM") {
            num = 10
        }
        else if (time === "5:30 AM") {
            num = 11
        }
        else if (time === "6:00 AM") {
            num = 12
        }
        else if (time === "6:30 AM") {
            num = 13
        }
        else if (time === "7:00 AM") {
            num = 14
        }
        else if (time === "7:30 AM") {
            num = 15
        }
        else if (time === "8:00 AM") {
            num = 16
        }
        else if (time === "8:30 AM") {
            num = 17
        }
        else if (time === "9:00 AM") {
            num = 18
        }
        else if (time === "9:30 AM") {
            num = 19
        }
        else if (time === "10:00 AM") {
            num = 20
        }
        else if (time === "10:30 AM") {
            num = 21
        }
        else if (time === "11:00 AM") {
            num = 22
        }
        else if (time === "11:30 AM") {
            num = 23
        }
       else if (time === "12:00 PM") {
            num = 24;
        }
        else if (time === "12:30 PM") {
            num = 25
        }
        else if (time === "1:00 PM") {
            num = 26
        }
        else if (time === "1:30 PM") {
            num = 27
        }
        else if (time === "2:00 PM") {
            num = 28
        }
        else if (time === "2:30 PM") {
            num = 29
        }
        else if (time === "3:00 PM") {
            num = 30
        }
        else if (time === "3:30 PM") {
            num = 31
        }
        else if (time === "4:00 PM") {
            num = 32
        }
        else if (time === "4:30 PM") {
            num = 33
        }
        else if (time === "5:00 PM") {
            num = 34
        }
        else if (time === "5:30 PM") {
            num = 35
        }
        else if (time === "6:00 PM") {
            num = 36
        }
        else if (time === "6:30 PM") {
            num = 37
        }
        else if (time === "7:00 PM") {
            num = 38
        }
        else if (time === "7:30 PM") {
            num = 39
        }
        else if (time === "8:00 PM") {
            num = 40
        }
        else if (time === "8:30 PM") {
            num = 41
        }
        else if (time === "9:00 PM") {
            num = 42
        }
        else if (time === "9:30 PM") {
            num = 43
        }
        else if (time === "10:00 PM") {
            num = 44
        }
        else if (time === "10:30 PM") {
            num = 45
        }
        else if (time === "11:00 PM") {
            num = 46
        }
        else if (time === "11:30 PM") {
            num = 47
        }
        return num;
    }

    function turnShiftDurationIntoNum(shiftDur) {
        let num;
        if (shiftDur === "30 Minutes") {
            num = 1;
        }
        else if (shiftDur === "1 Hour") {
            num = 2;
        }
        else if (shiftDur === "1 Hour 30 Minutes") {
            num = 3;
        }
        else if (shiftDur === "2 Hours") {
            num = 4;
        }
        else if (shiftDur === "2 Hours 30 Minutes") {
            num = 5;
        }
        else if (shiftDur === "3 Hours") {
            num = 6;
        }
        else if (shiftDur === "3 Hours 30 Minutes") {
            num = 7;
        }
        else if (shiftDur === "4 Hours") {
            num = 8;
        }
        else if (shiftDur === "4 Hours 30 Minutes") {
            num = 9;
        }
        else if (shiftDur === "5 Hours") {
            num = 10;
        }
        else if (shiftDur === "5 Hours 30 Minutes") {
            num = 11;
        }
        else if (shiftDur === "6 Hours") {
            num = 12;
        }
        else if (shiftDur === "6 Hours 30 Minutes") {
            num = 13;
        }
        else if (shiftDur === "7 Hours") {
            num = 14;
        }
        else if (shiftDur === "7 Hours 30 Minutes") {
            num = 15;
        }
        else if (shiftDur === "8 Hours") {
            num = 16;
        }
        else if (shiftDur === "8 Hours 30 Minutes") {
            num = 17;
        }
        else if (shiftDur === "9 Hours") {
            num = 18;
        }
        else if (shiftDur === "9 Hours 30 Minutes") {
            num = 19;
        }
        else if (shiftDur === "10 Hours") {
            num = 20;
        }
        else if (shiftDur === "10 Hours 30 Minutes") {
            num = 21;
        }
        else if (shiftDur === "11 Hours") {
            num = 22; 
        }
        else if (shiftDur === '11 Hours 30 Minutes') {
            num = 23;
        }
        else if (shiftDur === '12 Hours') {
            num = 24;
        }
        return num;
    }

     function shiftCalcTime(num) {
        let time;
        if (num === 0) {
            time = "12:00 AM";
        }
        else if (num === 1) {
            time = "12:30 AM"
        }
        else if (num === 2) {
            time = "1:00 AM"
        }
        else if (num === 3) {
            time = "1:30 AM"
        }
        else if (num === 4) {
            time = "2:00 AM"
        }
        else if (num === 5) {
            time = "2:30 AM"
        }
        else if (num === 6) {
            time = "3:00 AM"
        }
        else if (num === 7) {
            time = "3:30 AM"
        }
        else if (num === 8) {
            time = "4:00 AM"
        }
        else if (num === 9) {
            time = "4:30 AM"
        }
        else if (num === 10) {
            time = "5:00 AM"
        }
        else if (num === 11) {
            time = "5:30 AM"
        }
        else if (num === 12) {
            time = "6:00 AM"
        }
        else if (num === 13) {
            time = "6:30 AM"
        }
        else if (num === 14) {
            time = "7:00 AM"
        }
        else if (num === 15) {
            time = "7:30 AM"
        }
        else if (num === 16) {
            time = "8:00 AM"
        }
        else if (num === 17) {
            time = "8:30 AM"
        }
        else if (num === 18) {
            time = "9:00 AM"
        }
        else if (num === 19) {
            time = "9:30 AM"
        }
        else if (num === 20) {
            time = "10:00 AM"
        }
        else if (num === 21) {
            time = "10:30 AM"
        }
        else if (num === 22) {
            time = "11:00 AM"
        }
        else if (num === 23) {
            time = "11:30 AM"
        }
        if (num === 24) {
            time = "12:00 PM";
        }
        else if (num === 25) {
            time = "12:30 PM"
        }
        else if (num === 26) {
            time = "1:00 PM"
        }
        else if (num === 27) {
            time = "1:30 PM"
        }
        else if (num === 28) {
            time = "2:00 PM"
        }
        else if (num === 29) {
            time = "2:30 PM"
        }
        else if (num === 30) {
            time = "3:00 PM"
        }
        else if (num === 31) {
            time = "3:30 PM"
        }
        else if (num === 32) {
            time = "4:00 PM"
        }
        else if (num === 33) {
            time = "4:30 PM"
        }
        else if (num === 34) {
            time = "5:00 PM"
        }
        else if (num === 35) {
            time = "5:30 PM"
        }
        else if (num === 36) {
            time = "6:00 PM"
        }
        else if (num === 37) {
            time = "6:30 PM"
        }
        else if (num === 38) {
            time = "7:00 PM"
        }
        else if (num === 39) {
            time = "7:30 PM"
        }
        else if (num === 40) {
            time = "8:00 PM"
        }
        else if (num === 41) {
            time = "8:30 PM"
        }
        else if (num === 42) {
            time = "9:00 PM"
        }
        else if (num === 43) {
            time = "9:30 PM"
        }
        else if (num === 44) {
            time = "10:00 PM"
        }
        else if (num === 45) {
            time = "10:30 PM"
        }
        else if (num === 46) {
            time = "11:00 PM"
        }
        else if (num === 47) {
            time = "11:30 PM"
    }
    else if (num === 48) {
        time = "12:00 AM"
    }
    else if (num === 49) {
        time = "12:30 AM"
    }
    else if (num === 50) {
        time = "1:00 AM"
    }
    else if (num === 51) {
        time = "1:30 AM"
    }
    else if (num === 52) {
        time = "2:00 AM"
    }
    else if (num === 53) {
        time = "2:30 AM"
    }
    else if (num === 54) {
        time = "3:00 AM"
    }
    else if (num === 55) {
        time = "3:30 AM"
    }
    else if (num === 56) {
        time = "4:00 AM"
    }
    else if (num === 57) {
        time = "4:30 AM"
    }
    else if (num === 58) {
        time = "5:00 AM"
    }
    else if (num === 59) {
        time = "5:30 AM"
    }
    else if (num === 60) {
        time = "6:00 AM"
    }
    else if (num === 61) {
        time = "6:30 AM"
    }
    else if (num === 62) {
        time = "7:00 AM"
    }
    else if (num === 63) {
        time = "7:30 AM"
    }
    else if (num === 64) {
        time = "8:00 AM"
    }
    else if (num === 65) {
        time = "8:30 AM"
    }
    else if (num === 66) {
        time = "9:00 AM"
    }
    else if (num === 67) {
        time = "9:30 AM"
    }
    else if (num === 68) {
        time = "10:00 AM"
    }
    else if (num === 69) {
        time = "10:30 AM"
    }
    else if (num === 70) {
        time = "11:00 AM"
    }
    else if (num === 71) {
        time = "11:30 AM"
    }
    return time;
}


    React.useEffect(() => {
        setEndOfShift(shiftCalcTime(shiftCalcNum(shiftStart) + turnShiftDurationIntoNum(shiftDuration)))
    }, [shiftStart, shiftDuration])
    
    React.useEffect(() => {
        let dateArray = date.split('-');
         setDateNeeded(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString())
    },[date])

    function addShifts() {
        setShiftError("")
        const obSending = {
            shiftDates: shiftCloneDates,
            timeStart: shiftStart,
            timeEnd: endOfShift,
            employeeId,
            employeeName,
            shiftDuration,
            businessId: props.admin.businessId,
            isBreak,
            breakStart,
            breakEnd,
            bookingColumnNumber: optionsNumber
        }
        Axios.post('/api/shifts/multiplecreate', obSending).then(response => {
            if (response.status === 201) {
                props.getNewShifts()
                setTimeout(() => setSuccess(true), 500)
            }
        }).catch(error => {
                setTimeout(() => setShiftError("dqsdqsdq"), 500)
        })
    }


    function addShift() {
        const obSending = {
            shiftDate: dateNeeded,
            timeStart: shiftStart,
            timeEnd: endOfShift,
            employeeId,
            employeeName,
            shiftDuration,
            businessId: props.admin.businessId,
            isBreak,
            breakStart,
            breakEnd,
            bookingColumnNumber: optionsNumber
        }
        
        Axios.post('/api/shifts/create', obSending).then(response => {
                if (response.status === 201) {
                    setTimeout(() => setSuccess(true), 500)
                    props.getNewShifts()
                }
           }
        ).catch(error => {
                setTimeout(() => setShiftError("dwdqwd"), 500)
        })
    }

    React.useEffect(() => {
        if (breakError) {
            setReadyToGo(false)
        }

    }, [breakError])

    function breakHandler(e) {
        if (e.target.value === "Yes") {
            setBreak(true)
        }
        else if (e.target.value === "No") {
            setBreak(false)
            setBreakEnd("")
            setBreakStart('')
        }
    }

    function createOptions() {
        let optionsArray = [];
        optionsArray.push(<option>None</option>)
        for (let i = 0; i < props.bookingColumnsNumber; i++) {
            optionsArray.push(<option>{i + 1}</option>)
        }
        return optionsArray;
    }

    function getOptionsNumber(e) {
        setOptionsNumber(e.target.value)
    }
   
    
    return (
            <div id={styles.scheduleContainer}>
                <p style={{position: 'absolute', left: '40px', top: '-20px', color: 'darkred'}}>{breakError}</p>
                <p style={{width: '100%', textAlign: 'center', fontSize: '20px'}}>Add New Shift</p>
                <div>
                <span >Shift Date:</span>
                <input style={{position: 'relative', top: '-4px'}} className={styles.inputs} onChange={setDateHandler} placeholder="select date" type="date"/>
                </div>
                <div>
                    Employee:
                <select id='changer' onChange={(e) => {
                    console.log(e.target.options)
                    setEmployeeName(e.target.options[e.target.options.selectedIndex].text)
                    setEmployeeId(e.target.options[e.target.options.selectedIndex].value)}} className={styles.inputs}>
                <option>{ }</option>
                {props.employees && props.employees.map(employee => {
                    return <option value={employee._id}>{employee.fullName}</option>
                })}
                </select>
                </div>
                <div style={{display: 'flex'}}>
                        <p>{props.bookingColumnsType} number:</p>
                        <select style={{position: 'relative', top: '-3px', left: '5px'}} onChange={getOptionsNumber}>
                            {createOptions()}
                        </select>
                        
                    </div>
                <div>
                <span>Shift Time Start: </span>              
                <select className={styles.inputs} onChange={shiftStartHandler}>
                 <option>{ }</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                    </select>   
                    </div>
                    <div>
                    <span>Shift Time Duration:</span>
                <select className={styles.inputs} onChange={shiftDurationHandler}>
                    {props.shiftTimeDurations.map(time => {
                        return <option>{time}</option>
                    })}
                    
                </select>
                </div>  <div style={{display: 'flex'}}>
                    <span>Break?</span>
                    <input onClick={breakHandler} value="Yes" style={{marginLeft: '27px', position: 'relative', top: '-2px'}} name="YesNo" id="Yes" type="radio"/>
                    <label style={{marginLeft:'4px', position: 'relative'}} htmlFor="Yes">Yes</label>
                    <input value="No" onClick={breakHandler} style={{marginLeft: '20px', position: 'relative', top: '-2px'}} name="YesNo" id="No" type="radio"/>
                    <label style={{marginLeft:'5px', position: 'relative'}} htmlFor="No">No</label>
                    </div>
                    {isBreak &&
                    <div>
                  <span>Break-Start:</span> 
                   <select style={{marginLeft: '2px', width: '76px'}} onChange={breakStartHandler}>
                    <option>{ }</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                    </select>
                    <span  style={{marginLeft: '5px'}}>Break-Finish:</span> 
                   <select style={{marginLeft: '2px', width: '76px'}} onChange={breakEndHandler}>
                    <option>{ }</option>
                    <option>12:00 AM</option>
                    <option>12:30 AM</option>
                    <option>1:00 AM</option>
                    <option>1:30 AM</option>
                    <option>2:00 AM</option>
                    <option>2:30 AM</option>
                    <option>3:00 AM</option>
                    <option>3:30 AM</option>
                    <option>4:00 AM</option>
                    <option>4:30 AM</option>
                    <option>5:00 AM</option>
                    <option>5:30 AM</option>
                    <option>6:00 AM</option>
                    <option>6:30 AM</option>
                    <option>7:00 AM</option>
                    <option>7:30 AM</option>
                    <option>8:00 AM</option>
                    <option>8:30 AM</option>
                    <option>9:00 AM</option>
                    <option>9:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                    <option>2:00 PM</option>
                    <option>2:30 PM</option>
                    <option>3:00 PM</option>
                    <option>3:30 PM</option>
                    <option>4:00 PM</option>
                    <option>4:30 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                    <option>10:30 PM</option>
                    <option>11:00 PM</option>
                    <option>11:30 PM</option>
                    </select>
                    </div>}
                    <p style={{lineHeight: '24px', fontSize: '16px'}}>Would you like to clone this shift for multiple weeks?</p>
                    <div style={{position: 'relative', top: isBreak ? "-31px" : readyToGo ? "-35px" : '-39px', left: '60px', display: 'flex'}}>
                    <input id="AlsoYes" name="AlsoYes" checked={clone} onClick={cloneHandler(true)} type="radio"/><label style={{position: 'relative', top: '2px', margin: '0px 14px 0px 4px'}} htmlFor="AlsoYes">Yes</label>
                    <input id="AlsoNo" name="AlsoNo" checked={clone === false} onClick={cloneHandler(false)} type="radio"/><label style={{marginLeft: '4px', position: 'relative', top: '2px'}} htmlFor="AlsoNo">No</label>
                    {clone &&
                     <div style={{display: 'flex', position: 'absolute', left: '100px', top: '2px'}}>
                        <p style={{marginRight: '6px'}}>Weeks:</p>
                        <select style={{position: 'relative', top: '-3px'}} onChange={shiftCloneNumberHandler}>
                            <option> </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                            <option>32</option>
                            <option>33</option>
                            <option>34</option>
                            <option>35</option>
                            <option>36</option>
                            <option>37</option>
                            <option>38</option>
                            <option>39</option>
                            <option>40</option>
                            <option>41</option>
                            <option>42</option>
                            <option>43</option>
                            <option>44</option>
                            <option>45</option>
                            <option>46</option>
                            <option>47</option>
                            <option>48</option>
                            <option>49</option>
                            <option>50</option>
                            <option>51</option>
                            <option>52</option>
                        </select>
                    </div>}
                    </div>
                    <OtherAlert alertMessage={"There is a conflict with the shift details."} showAlert={shiftError !== ""} alertType="error"/>
                    <OtherAlert alertMessage={'Shifts Added Successfully'} showAlert={success} alertType="success"/>
                {endOfShift && ((clone === true && shiftCloneNumber) || clone === false)  &&
                <div style={{position: 'relative', top: '-10px'}}>
                <span>Shift End: {endOfShift}</span>
                {!clone && readyToGo && <button disabled={!readyToGo} onClick={addShift} style={{cursor: !readyToGo ? "not-allowed" : 'pointer', marginLeft: '80px', backgroundColor: 'white', border: 'none', boxShadow: '0px 0px 3px black', padding: '6px'}}>Add Shift</button>}
                {clone && readyToGo && shiftCloneNumber &&<button disabled={!readyToGo} onClick={addShifts} style={{cursor: !readyToGo ? "not-allowed" : 'pointer' ,marginLeft: '80px', backgroundColor: 'white', border: 'none', boxShadow: '0px 0px 3px black', padding: '6px'}}>Add Shifts</button>}
                </div>}   
            </div>
    )
}


ShiftCreator.defaultProps = {
    shiftTimeDurations: [
        " ",
        '30 Minutes',
        '1 Hour',
        '1 Hour 30 Minutes',
        '2 Hours',
        '2 Hours 30 Minutes',
        '3 Hours',
        '3 Hours 30 Minutes',
        '4 Hours',
        '4 Hours 30 Minutes',
        '5 Hours',
        '5 Hours 30 Minutes',
        '6 Hours',
        '6 Hours 30 Minutes',
        '7 Hours',
        '7 Hours 30 Minutes',
        '8 Hours',
        '8 Hours 30 Minutes',
        '9 Hours',
        '9 Hours 30 Minutes',
        '10 Hours',
        '10 Hours 30 Minutes',
        '11 Hours',
        '11 Hours 30 Minutes',
        '12 Hours',
    ]
}


const mapStateToProps = state => {
    return {
        dateChosen: state.scheduleReducer.dateChosen
    }
}

export default connect(mapStateToProps)(ShiftCreator);
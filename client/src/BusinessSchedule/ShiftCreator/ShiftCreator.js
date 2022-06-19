import React, { useState } from 'react';
import Axios from 'axios';
import styles from './ShiftCreator.module.css';
import { connect } from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import {stringToIntTime, intToStringTime, getDateInFormat, getTimes} from '../../feutils/feutils';

function createCloneNumbers() {
    let i = 1;
    const array = [];
    while (i < 53) {
        array.push(i);
        i++;
    }
    return array;
}

function ShiftCreator(props) {
    const [date, setDate] = React.useState(getDateInFormat());
    const [shiftDuration, setShiftDuration] = React.useState('');
    const [shiftStart, setShiftStart] = React.useState('');
    const [employeeId, setEmployeeId] = React.useState('');
    const [employeeName, setEmployeeName] = React.useState('');
    const [dateNeeded, setDateNeeded] = React.useState('')
    const [endOfShift, setEndOfShift] = React.useState('');
    const [isBreak, setBreak] = React.useState("");
    const [breakError, setBreakError] = React.useState('');
    const [shiftCloneNumber, setShiftCloneNumber] = React.useState(1);
    const [shiftCloneDates, setShiftCloneDates] = React.useState([])
    const [clone, setClone] = React.useState('')
    const [success, setSuccess] = React.useState(false);
    const [optionsNumber, setOptionsNumber] = React.useState();
    const [shiftError, setShiftError] = React.useState('');
    const [schedule, setSchedule] = React.useState([]);
    const [times, setTimes] = useState([]);
    const [endTimes, setEndTimes] = useState([]);
    const [breakStart, setBreakStart] = React.useState("")
    const [breakEnd, setBreakEnd] = React.useState("")

    React.useEffect(function () {
        if (isBreak && breakStart) {
            console.log(stringToIntTime[breakStart] < stringToIntTime[shiftStart], stringToIntTime[breakStart], stringToIntTime[shiftStart])
            if (stringToIntTime[breakStart] < stringToIntTime[shiftStart]) {
                console.log("here peter")
                setBreakStart(intToStringTime[stringToIntTime[shiftStart] + 1]);
                setBreakEnd(intToStringTime[stringToIntTime[shiftStart] + 1])
                console.log(intToStringTime[stringToIntTime[shiftStart]])
            }
        }
    }, [shiftStart, isBreak])


    function shiftCloneNumberHandler(e) {
        setShiftCloneNumber(parseInt(e.target.value))
    }

    function cloneHandler(value) {
        return () => {
            setClone(value)
        }
    }


    React.useEffect(() => {
        if (schedule.length) {
            const dayNum = new Date(props.dateChosen).getDay();
            setTimes(getTimes(schedule[dayNum].open, schedule[dayNum].close));
            setEndTimes(getTimes(intToStringTime[stringToIntTime[schedule[dayNum].open] + 1], schedule[dayNum].close))
            setBreakStart(intToStringTime[stringToIntTime[schedule[dayNum].open] + 1])
            setShiftStart(schedule[dayNum].open);
            setEndOfShift(intToStringTime[stringToIntTime[schedule[dayNum].open] + 2]);
            setBreakEnd(intToStringTime[stringToIntTime[schedule[dayNum].open] + 1]);
        }
    }, [schedule, props.dateChosen])

    React.useEffect(() => {
        Axios.post('/api/business/bct', {id: props.businessId}).then(
            response => {
                if (response.status === 200) {
                    setSchedule(response.data.schedule);
                }
            }
        )
    }, []);

    function shiftStartHandler(e) {
        setShiftStart(e.target.value);
        const dayNum = new Date(props.dateChosen).getDay();
        setEndTimes(getTimes(intToStringTime[stringToIntTime[e.target.value] + 1], schedule[dayNum].close));
    }

    function breakStartHandler(e) {
        setBreakStart(e.target.value)
    }

    function breakEndHandler(e) {
        console.log(e.target.value);
        setBreakEnd(e.target.value)
    }

    function setDateHandler(e) {
        console.log("anyone");
        console.log(e.target.value);
        setDate(e.target.value)
    }

    function shiftEndHandler(e) {
        setEndOfShift(e.target.value);
        console.log(e.target.value);
    }
  

    React.useEffect(() => {
        let dateArray = date.split('-');
        setDateNeeded(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString())
    }, [date])

    function addShifts() {
        if(isBreak === "") {
            setBreakError("Please enter if there is a break");
            return;
        }

        if (stringToIntTime[breakStart] < stringToIntTime[shiftStart]) {
            console.log(breakStart);
            setBreakError("Break cannot start before shift.")
            return;
        }
        else if (stringToIntTime[breakStart] > stringToIntTime[endOfShift]) {
            console.log(breakStart, endOfShift);
            setBreakError("Break cannot start after shift ends.")
            return;
        }
        else if (stringToIntTime[breakEnd] < stringToIntTime[shiftStart]) {
            setBreakError("Break cannot end before shift.")
            return;
        }
        else if (stringToIntTime[breakEnd] > stringToIntTime[endOfShift]) {
            setBreakError('Break cannot end after shift ends.')
            return;
        }
        else if (isBreak && stringToIntTime[breakStart] === stringToIntTime[breakEnd]) {
            setBreakError("Break cannot start and end at same time.")
            return;
        }
        else if (breakStart && breakEnd && (new Date(`${dateNeeded}, ${breakEnd}`) < new Date(`${dateNeeded}, ${breakStart}`))) {
            setBreakError("Break cannot end before it starts.")
            return;
        }
        
        if (!shiftCloneNumber || shiftCloneNumber < 1) {
            setBreakError("Please set shift clone number");
            return;
        }

        setBreakError("");
    
        const obSending = {
            shiftDate: dateNeeded,
            cloneNumber: shiftCloneNumber,
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
            setTimeout(() => setShiftError("There is a conflicting shift that makes this employee unable to be booked."), 200)
        })
    }

    function addShift() {
        if (employeeId === "") {
            setBreakError("Please select an employee for this shift");
            return
        }
        if (isBreak === "") {
            setBreakError("Please select if there is a break for this shift");
            return;
        }
        if (clone === "") {
            setBreakError("Please select if this shift will be cloned");
            return;
        }
        if (stringToIntTime[breakStart] < stringToIntTime[shiftStart]) {
            console.log(breakStart);
            setBreakError("Break cannot start before shift.")
            return;
        }
        else if (stringToIntTime[breakStart] > stringToIntTime[endOfShift]) {
            console.log(breakStart, endOfShift);
            setBreakError("Break cannot start after shift ends.")
            return;
        }
        else if (stringToIntTime[breakEnd] < stringToIntTime[shiftStart]) {
            setBreakError("Break cannot end before shift.")
            return;
        }
        else if (stringToIntTime[breakEnd] > stringToIntTime[endOfShift]) {
            setBreakError('Break cannot end after shift ends.')
            return;
        }
        else if (isBreak && stringToIntTime[breakStart] === stringToIntTime[breakEnd]) {
            setBreakError("Break cannot start and end at same time.")
            return;
        }
        else if (breakStart && breakEnd && (new Date(`${dateNeeded}, ${breakEnd}`) < new Date(`${dateNeeded}, ${breakStart}`))) {
            setBreakError("Break cannot end before it starts.")
            return;
        }
        
        const obSending = {
            shiftDate: dateNeeded,
            timeStart: shiftStart,
            timeEnd: endOfShift,
            employeeId,
            employeeName,
            businessId: props.admin.businessId,
            isBreak,
            breakStart,
            breakEnd,
            bookingColumnNumber: optionsNumber
        }

        setBreakError("");

        Axios.post('/api/shifts/create', obSending).then(response => {
            if (response.status === 201) {
                setTimeout(() => setSuccess(true), 200);
                props.getNewShifts()
            }
        }
        ).catch(error => {
           // setShiftError("");
            if (error.response.status === 406) {
                setShiftError("");
                if (error.response.data.error === "ebcn") {
                    setTimeout(() => setShiftError(`This ${props.bookingColumnsType} already is scheduled for another shift that overlaps with this time.`), 200);
                } 
               if (error.response.data.error === "ee") {
                setTimeout(() => setShiftError("This employee is already scheduled for a shift that overlaps with this time."), 200);
               }
            }
        })
    }

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
            <p style={{ position: 'absolute', left: '40px', bottom: "10px", color: 'darkred' }}>{breakError}</p>
            <p style={{ width: '100%', textAlign: 'center', fontSize: '20px', position: "relative", top: "8px" }}>Add New Shift</p>
            <div style={{marginTop: "20px"}}>
                <span >Shift Date:</span>
                <input style={{ position: 'relative', top: '-2px' }} className={styles.inputs} onChange={setDateHandler} value={date} placeholder="select date" type="date" />
            </div>
            <div style={{ display: "flex", marginTop: "15px"}}>
                <p>Employee:</p>
                <select id='changer' onChange={(e) => {
                    setEmployeeName(e.target.options[e.target.options.selectedIndex].text)
                    setEmployeeId(e.target.options[e.target.options.selectedIndex].value)
                }} className={styles.inputs}>
                    <option>{}</option>
                    {props.employees && props.employees.map(employee => {
                        return <option value={employee._id}>{employee.fullName}</option>
                    })}
                </select>
            </div>
            <div style={{ display: 'flex', marginTop: "15px" }}>
                <p>{props.bookingColumnsType} number:</p>
                <select style={{ position: 'relative', top: '0px', left: '5px' }} onChange={getOptionsNumber}>
                    {createOptions()}
                </select>

            </div>
            <div style={{marginTop: "15px"}}>
                <span>Shift Time Start: </span>
                <select className={styles.inputs} value={shiftStart} onChange={shiftStartHandler}>
                    {times.map(element => {
                        return <option style={{color: "black"}}>{element}</option>
                    })}
                </select>
            </div>
            <div style={{marginTop: "15px"}}>
                <span>Shift Time End:</span>
                <select style={{marginLeft: "10px"}} className={styles.inputs} value={endOfShift} onChange={shiftEndHandler}>
                    {endTimes.map(element => {
                        return <option style={{color: "black"}}>{element}</option>
                    })}
                </select>
            </div>  
            <div style={{ display: 'flex', marginTop: "15px" }}>
                <span>Break?</span>
                <input onClick={breakHandler} value="Yes" style={{ marginLeft: '27px', position: 'relative' }} name="YesNo" id="Yes" type="radio" />
                <label style={{ marginLeft: '4px', position: 'relative' }} htmlFor="Yes">Yes</label>
                <input value="No" onClick={breakHandler} style={{ marginLeft: '20px', position: 'relative' }} name="YesNo" id="No" type="radio" />
                <label style={{ marginLeft: '5px', position: 'relative' }} htmlFor="No">No</label>
            </div>
            {isBreak &&
                <div style={{position: "absolute", top: "250px"}}>
                    <span>Break-Start:</span>
                    <select style={{width: '76px', marginLeft: "4px" }} value={breakStart} onChange={breakStartHandler}>
                    {endTimes.map(element => {
                        return <option style={{color: "black"}}>{element}</option>
                    })}
                       
                    </select>
                    <span style={{ marginLeft: '10px' }}>Break-End:</span>
                    <select style={{ marginLeft: '4px', width: '76px' }} value={breakEnd} onChange={breakEndHandler}>
                    {endTimes.map(element => {
                        return <option style={{color: "black"}}>{element}</option>
                    })}
                    </select>
                </div>}
            <p style={{ lineHeight: '24px', fontSize: '16px', marginTop: "40px" }}>Would you like to clone this shift for multiple weeks?</p>
            <div style={{ position: 'relative', left: '60px', display: 'flex', top: "-20px" }}>
                <input id="AlsoYes" name="AlsoYes" checked={clone} onClick={cloneHandler(true)} type="radio" /><label style={{ position: 'relative', margin: '0px 14px 0px 4px' }} htmlFor="AlsoYes">Yes</label>
                <input id="AlsoNo" name="AlsoNo" checked={clone === false} onClick={cloneHandler(false)} type="radio" /><label style={{ marginLeft: '4px', position: 'relative' }} htmlFor="AlsoNo">No</label>
                {clone &&
                    <div style={{ display: 'flex', position: 'absolute', left: "-60px", top: '26px' }}>
                        <p style={{ marginRight: '6px' }}>Number of times to clone:</p>
                        <select style={{ position: 'relative', zIndex: "200", top: '-1px', width: "80px" }} onChange={shiftCloneNumberHandler}>
                            {createCloneNumbers().map(element => {
                                return <option style={{color: "black", backgroundColor: "black"}}>{element}</option>
                            })}
                        </select>
                    </div>}
            </div>
            <OtherAlert alertMessage={shiftError} showAlert={shiftError !== ""} alertType="error" />
            <OtherAlert alertMessage={'Shifts Added Successfully'} showAlert={success} alertType="success" />
                <div style={{ position: 'relative', top: '10px' }}>
                   {!clone && <button onClick={addShift} style={{marginLeft: '80px', backgroundColor: 'white', width: "120px", border: 'none', boxShadow: '0px 0px 3px black', padding: '6px' }}>Add Shift</button>}
                    {clone && <button  onClick={addShifts} style={{ marginLeft: '80px', position: "relative", top: "30px", width: "120px", backgroundColor: 'white', border: 'none', boxShadow: '0px 0px 3px black', padding: '6px' }}>Add Shifts</button>}
                </div>
        </div>
    )
}




const mapStateToProps = state => {
    return {
        dateChosen: state.scheduleReducer.dateChosen,
        businessId: state.authReducer.admin.admin.businessId
    }
}

export default connect(mapStateToProps)(ShiftCreator);
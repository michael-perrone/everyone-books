import React, { useState } from 'react';
import Axios from 'axios';
import styles from './ShiftEditor.module.css';
import { connect } from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import {stringToIntTime, intToStringTime, getDateInFormat, getTimes} from '../../feutils/feutils';


function ShiftEditor(props) {
    const [date, setDate] = React.useState(getDateInFormat());
    const [shiftDuration, setShiftDuration] = React.useState('');
    const [shiftStart, setShiftStart] = React.useState('');
    const [employeeId, setEmployeeId] = React.useState('');
    const [employeeName, setEmployeeName] = React.useState('');
    const [dateNeeded, setDateNeeded] = React.useState('')
    const [endOfShift, setEndOfShift] = React.useState('');
    const [isBreak, setBreak] = React.useState("");
    const [breakError, setBreakError] = React.useState('');
    const [clone, setClone] = React.useState('')
    const [success, setSuccess] = React.useState(false);
    const [optionsNumber, setOptionsNumber] = React.useState();
    const [shiftError, setShiftError] = React.useState('');
    const [schedule, setSchedule] = React.useState([]);
    const [times, setTimes] = useState([]);
    const [endTimes, setEndTimes] = useState([]);
    const [breakStart, setBreakStart] = React.useState("")
    const [breakEnd, setBreakEnd] = React.useState("")


    // React.useEffect(function () {
    //     if (isBreak && breakStart) {
    //         console.log(stringToIntTime[breakStart] < stringToIntTime[shiftStart], stringToIntTime[breakStart], stringToIntTime[shiftStart])
    //         if (stringToIntTime[breakStart] < stringToIntTime[shiftStart]) {
    //             console.log("here peter")
    //             setBreakStart(intToStringTime[stringToIntTime[shiftStart] + 1]);
    //             setBreakEnd(intToStringTime[stringToIntTime[shiftStart] + 1])
    //             console.log(intToStringTime[stringToIntTime[shiftStart]])
    //         }
    //     }
    // }, [shiftStart, isBreak])

    React.useEffect(() => {
        if (schedule.length) {
            const dayNum = new Date(props.dateChosen).getDay();
            setTimes(getTimes(schedule[dayNum].open, schedule[dayNum].close));
            setEndTimes(getTimes(intToStringTime[stringToIntTime[schedule[dayNum].open] + 1], schedule[dayNum].close))
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

    React.useEffect(function () {
        if (props.editingShift) {
            if (props.editingShift.breakStart && props.editingShift.breakEnd) {
                setBreak(true);
                setBreakStart(props.editingShift.breakStart);
                setBreakEnd(props.editingShift.breakEnd);
            }
            else {
                setBreak(false)
            }
            setShiftStart(props.editingShift.timeStart);
            setEndOfShift(props.editingShift.timeEnd)
            setEmployeeName(props.editingShift.employeeName);
            setOptionsNumber(props.editingShift.bookingColumnNumber);
            setDate(getDateInFormat(props.dateChosen));
        }
    }, [props.editingShift])

 
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

    function shiftStartHandler(e) {
        setShiftStart(e.target.value);
    }

    function shiftEndHandler(e) {
        setEndOfShift(e.target.value);
    }
  

    React.useEffect(() => {
        let dateArray = date.split('-');
        setDateNeeded(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString())
    }, [date])

    function updateShift() {
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
            bookingColumnNumber: optionsNumber,
            shiftId: props.shiftBeingEdited
        }

        setBreakError("");

        Axios.post('/api/shifts/edit', obSending).then(response => {
            if (response.status === 200) {
                setSuccess("");
                setTimeout(() => setSuccess("The shift has been updated!"));
                props.getShifts()
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
            <p style={{ width: '100%', textAlign: 'center', fontSize: '20px' }}>Edit Shift</p>
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
                    <option> </option>
                    {props.employees && props.employees.map(employee => {
                        return <option value={employee._id}>{employee.fullName}</option>
                    })}
                </select>
            </div>
            <div style={{ display: 'flex', marginTop: "15px" }}>
                <p>{props.bookingColumnsType} number:</p>
                <select style={{ position: 'relative', top: '0px', left: '5px' }} value={optionsNumber} onChange={getOptionsNumber}>
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
                <input onClick={breakHandler} checked={isBreak} value="Yes" style={{ marginLeft: '27px', position: 'relative' }} name="YesNo" id="Yes" type="radio" />
                <label style={{ marginLeft: '4px', position: 'relative' }} htmlFor="Yes">Yes</label>
                <input checked={!isBreak} value="No" onClick={breakHandler} style={{ marginLeft: '20px', position: 'relative' }} name="YesNo" id="No" type="radio" />
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
            <OtherAlert alertMessage={shiftError} showAlert={shiftError !== ""} alertType="error" />
            <OtherAlert alertMessage={'Shifts Added Successfully'} showAlert={success} alertType="success" />
                <div style={{ position: 'relative', top: '50px' }}>
                   {!clone && <button onClick={updateShift} style={{marginLeft: '80px', backgroundColor: 'white', width: "120px", border: 'none', boxShadow: '0px 0px 3px black', padding: '6px' }}>Update Shift</button>}
                    
                </div>
        </div>
    )
}




const mapStateToProps = state => {
    return {
        dateChosen: state.scheduleReducer.dateChosen,
        businessId: state.authReducer.admin.admin.businessId,
        editingShift: state.editShiftReducer.shift
    }
}

export default connect(mapStateToProps)(ShiftEditor);
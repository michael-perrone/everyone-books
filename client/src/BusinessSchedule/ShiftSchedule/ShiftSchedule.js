import React from 'react';
import styles from './ShiftSchedule.module.css';
import Spinner from '../../Spinner/Spinner';
import {connect} from 'react-redux';
import { EDIT_SHIFT, DONE_EDITING } from '../../actions/actions';

const ShiftSchedule = props => {

    function toEditShift(shift) {
       return function () {
            props.editShift(shift);
            props.selectEditingShift(shift._id);
        }
    }

    function toBeDoneEditing() {
        props.doneEditing();
        props.selectEditingShift("");
     }


    return ( 
        <div id={styles.shiftSchedule} style={{fontSize: '14px', width: '340px'}}>
            <p style={{fontSize: '24px', marginTop: '6px', textAlign: 'center', marginBottom: '11px'}}>Shift Schedule - {props.shiftDate}</p> 
            <div id={styles.scrollable}>
            {props.shifts.map(shift => {
                return (
                    <div className={styles.shiftContainer}>
                        <div className={styles.insideShiftContainer}>
                            <div className={styles.flipper}>
                            <p>{shift.employeeName}</p>
                            {shift.breakStart && shift.breakEnd && <p>Break: {shift.breakStart}-{shift.breakEnd}</p>}
                            {(!shift.breakStart || !shift.breakEnd) && <p>No Break</p>}  
                            </div>
                            <div className={styles.flipper}>
                            <p>{shift.timeStart}-{shift.timeEnd}</p>
                        {shift.bookingColumnNumber && shift.bookingColumnNumber !== "None" && <p>{props.bookingColumnsType}: {shift.bookingColumnNumber}</p> }
                        {(!shift.bookingColumnNumber || shift.bookingColumnNumber === "None") && <p>No {props.bookingColumnsType}</p> }
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "260px", display: "flex", justifyContent: "space-between", marginLeft: "30px"}}>
                            <button onClick={props.deleteShift(shift._id)} style={{backgroundColor: "salmon", border: "none", boxShadow: "0px 0px 2px black", height: "30px", width: "90px", fontWeight: "bold"}}>Delete</button>
                            {props.shiftBeingEdited !== shift._id && <button onClick={toEditShift(shift)} style={{backgroundColor: "white", border: "none", boxShadow: "0px 0px 2px black", height: "30px", width: "90px"}}>Edit</button>}
                            {props.shiftBeingEdited === shift._id && <button onClick={toBeDoneEditing} style={{backgroundColor: "lightgray", border: "none", boxShadow: "0px 0px 2px black", height: "30px", width: "90px"}}>Done Editing</button>}
                        </div>
                    </div>
                )
            })}
            {props.shifts && props.shifts.length === 0 && <p style={{padding: "20px", fontSize: '16px', textAlign: "center"}}>No shifts scheduled for this day</p>}
            </div>
        </div> 
    )
}

const mapDispatchToProps = dispatch => {
    return {
      editShift: (shift) => dispatch({ type: EDIT_SHIFT, payload: shift }),
      doneEditing: () => dispatch({type: DONE_EDITING})
    };
  };

export default connect(null, mapDispatchToProps)(ShiftSchedule);
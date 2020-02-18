import React from 'react';
import styles from './ShiftSchedule.module.css';
import Spinner from '../../Spinner/Spinner';

const ShiftSchedule = props => {

    return ( !props.loading ? <div id={styles.shiftSchedule} style={{fontSize: '14px', width: '360px',}}>
            <p style={{fontSize: '24px', marginTop: '6px', textAlign: 'center', marginBottom: '11px'}}>Shift Schedule - {props.shiftDate}</p>
            {props.shifts && props.shifts.length > 0 &&
            <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div>
                <p style={{textAlign: 'center', textDecoration: 'underline', marginBottom: '5px'}}>Name</p>
                {props.shifts && props.shifts.map(shift => {
                    return <p>{shift.employeeName}</p>
                })}
                </div>
                <div>
                <p  style={{textAlign: 'center', textDecoration: 'underline', marginBottom: '5px'}}>Time</p>
                {props.shifts && props.shifts.map(shift => {
                    return <p>{shift.timeStart}-{shift.timeEnd}</p>
                })}
                </div>
                <div>
                <p  style={{textAlign: 'center', textDecoration: 'underline', marginBottom: '5px'}}>Break</p>
                {props.shifts && props.shifts.map(shift => {
                    if (shift.breakStart && shift.breakEnd) {
                    let breakStart = shift.breakStart.split(' ')[0];
                    let breakEnd = shift.breakEnd.split(' ')[0]
                    return <p>{breakStart}-{breakEnd}</p>
                    }
                    else {
                        return <p>None</p>
                    }
                })}
                </div>

            </div>
            </React.Fragment>
            }
            {props.shifts && props.shifts.length === 0 && <p style={{ fontSize: '16px'}}>No shifts Scheduled for this day</p>}
        </div> : <Spinner/>
    )
}

export default ShiftSchedule;
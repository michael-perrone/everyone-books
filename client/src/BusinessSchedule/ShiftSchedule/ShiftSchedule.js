import React from 'react';


const ShiftSchedule = props => {
    return (
        <div style={{fontSize: '14px'}}>
          
            
            <p style={{fontSize: '26px', marginTop: '6px'}}>Shift Schedule - {props.shiftDate}</p>
            {props.shifts && props.shifts.length > 0 &&
            <React.Fragment>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                    return <p>{shift.breakStart}-{shift.breakEnd}</p>
                    }
                    else {
                        return <p>None</p>
                    }
                })}
                </div>

            </div>
            </React.Fragment>
            }
            {props.shifts && props.shifts.length === 0 && <p>No shifts Scheduled for this day</p>}
        </div>
    )
}



export default ShiftSchedule;
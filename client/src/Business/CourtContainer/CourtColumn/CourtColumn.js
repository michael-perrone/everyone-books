import React from 'react';
import styles from './CourtColumn.module.css';
import {stringToIntTime} from '../../../feutils/feutils';


function CourtColumn(props) {
    return (
        props.sortedBookings ?
        <div style={{height: props.height}} id={styles.courtColumn}>
            <p style={{position: "absolute", fontSize: "18px", fontWeight: "bold", width: "140px", textAlign: "center", top: "-30px"}}>{props.bct}: {props.bcn}</p>
            {props.sortedBookings.map(sortedBooking => {
                let timeSplit = sortedBooking.time.split("-");
                let timeStartNum = stringToIntTime[timeSplit[0]];
                let timeEndNum = stringToIntTime[timeSplit[1]];
                let openTimeNum = stringToIntTime[props.openTime];
                return (
                    timeEndNum - timeStartNum > 3 ?
                    <div onClick={props.clickBooking(sortedBooking)} className={styles.bookingContainer} style={{position: "absolute", top: `${(timeStartNum - openTimeNum) * 16}px`,
                     height: timeStartNum >= timeEndNum ? "0px" : `${(timeEndNum - timeStartNum) * 16 - 2}px`, width: "147px"}}>
                        <p style={{fontWeight: "bold", padding: "5px"}}>{timeSplit[0]}</p>
                        <p style={{fontWeight: "bold", padding: "5px"}}>{timeSplit[1]}</p>
                    </div>
                    : 
                    <div onClick={props.clickBooking(sortedBooking)} className={styles.bookingContainer} style={{position: "absolute", justifyContent: "center", top: `${(timeStartNum - openTimeNum) * 16}px`,
                     height: timeStartNum >= timeEndNum ? "0px" : `${(timeEndNum - timeStartNum) * 16 - 2}px`, width: "147px"}}>
                        <p style={{fontWeight: "bold"}}>{sortedBooking.time}</p>
                    </div>
                )
            })}
        </div> :
        <React.Fragment></React.Fragment>
    )
}


export default CourtColumn;
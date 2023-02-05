import React from 'react';
import styles from './CourtColumn.module.css';
import {stringToIntTime} from '../../../feutils/feutils';

function CourtColumn(props) {
    return (    
        <div id={styles.bigGuy}>
            {props.minned && <div id={styles.subo} style={{height: `${props.heightNum}px`}}>
                    {props.times.map(time => {
                        return <p style={{position: 'absolute', top: `${(stringToIntTime[time] - stringToIntTime[props.openTime]) * 16}px`}}>{time}</p>
                    })}
            </div>}
        <div style={{height: props.height}} id={styles.courtColumn}>
            <p id={styles.columnus}>{props.bct}: {props.bcn}</p>
            {props.sortedBookings && props.sortedBookings.map(sortedBooking => {
                let timeSplit = sortedBooking.time.split("-");
                let timeStartNum = stringToIntTime[timeSplit[0]];
                let timeEndNum = stringToIntTime[timeSplit[1]];
                let openTimeNum = stringToIntTime[props.openTime];
                return (
                    timeEndNum - timeStartNum > 3 ?
                    <div onClick={props.clickBooking(sortedBooking)} className={styles.bookingContainer} style={{position: "absolute", top: `${(timeStartNum - openTimeNum) * 16}px`,
                     height: timeStartNum >= timeEndNum ? "0px" : `${(timeEndNum - timeStartNum) * 16 - 2}px`, width: !props.minned ? "147px" : "225px"}}>
                        <p style={{fontWeight: "bold", color: "black", padding: "5px"}}>{timeSplit[0]}</p>
                        <p style={{fontWeight: "bold", color: "black", padding: "5px"}}>{timeSplit[1]}</p>
                    </div>
                    : 
                    <div onClick={props.clickBooking(sortedBooking)} className={styles.bookingContainer} style={{position: "absolute", justifyContent: "center", top: `${(timeStartNum - openTimeNum) * 16}px`,
                     height: timeStartNum >= timeEndNum ? "0px" : `${(timeEndNum - timeStartNum) * 16 - 2}px`, width: !props.minned ? "147px" : "225px"}}>
                        <p  style={{fontWeight: "bold", color: 'black', position: 'relative', top: "1.5px"}}>{sortedBooking.time}</p>
                    </div>
                )
            })}
                {props.sortedGroups && props.sortedGroups.map(sortedGroup => {
                let timeSplit = sortedGroup.time.split("-");
                let timeStartNum = stringToIntTime[timeSplit[0]];
                let timeEndNum = stringToIntTime[timeSplit[1]];
                let openTimeNum = stringToIntTime[props.openTime];
                return (
                    timeEndNum - timeStartNum > 3 ?
                    <div onClick={props.clickGroup(sortedGroup)} className={styles.groupContainer} style={{position: "absolute", top: `${(timeStartNum - openTimeNum) * 16}px`,
                     height: timeStartNum >= timeEndNum ? "0px" : `${(timeEndNum - timeStartNum) * 16 - 2}px`, width: !props.minned ? "147px" : "225px"}}>
                        <p style={{fontWeight: "bold", padding: "5px", color: "black"}}>{timeSplit[0]}</p>
                        <p style={{fontWeight: "bold", padding: "5px", color: "black"}}>{timeSplit[1]}</p>
                    </div>
                    : 
                    <div onClick={props.clickGroup(sortedGroup)} className={styles.groupContainer} style={{position: "absolute", justifyContent: "center", top: `${(timeStartNum - openTimeNum) * 16}px`,
                     height: timeStartNum >= timeEndNum ? "0px" : `${(timeEndNum - timeStartNum) * 16 - 2}px`, width: !props.minned ? "147px" : "225px"}}>
                        <p style={{fontWeight: "bold", position: 'relative', top: "1.5px", color: "black"}}>{sortedGroup.time}</p>
                    </div>
                )
            })}

        </div> 
        </div>
    )
}


export default CourtColumn;
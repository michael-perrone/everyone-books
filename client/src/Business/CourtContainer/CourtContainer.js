import React, {useEffect, useState} from 'react';
import styles from './CourtContainer.module.css';
import {connect} from 'react-redux';
import {stringToIntTime, intToStringTime} from '../../feutils/feutils';
import CourtColumn from './CourtColumn/CourtColumn';

function CourtContainer(props) {

    const [heightNum, setHeightNum] = useState(0);
    const [widthNum, setWidthNum] = useState(0);
    const [bcnArray, setBcnArray] = useState([]);
    const [times, setTimes] = useState([]);

    useEffect(function() {
        document.getElementById(styles.mainContainer).scrollTo({
            top: heightNum * 16
         });
    },[heightNum])

    useEffect(function() {
        if (props.openTime && props.closeTime) {
            const newHeightNum = stringToIntTime[props.closeTime] - stringToIntTime[props.openTime];
            setHeightNum(newHeightNum);
            console.log(props.bct)
        }
    },[ props.openTime, props.closeTime])

    useEffect(function() {
        let bcn = Number(props.bcn);
        const array = [];
        let i = 1;
        while (i <= bcn) {
            array.push(i);
            i = i + 1;
        }
        setBcnArray(array);
    },[props.bcn])

    useEffect(function() {  
        setWidthNum(props.bcn * 150.2);
    },[props.bcn])

    useEffect(function() {
        if (props.openTime && props.closeTime) {
            let i = stringToIntTime[props.openTime];
            const timesBeforeTimes = [];
            while (i <= stringToIntTime[props.closeTime]) {
                timesBeforeTimes.push(intToStringTime[i]);
                i = i + 6;
            }
            setTimes(timesBeforeTimes);
        }
    }, [props.closeTime, props.openTime])

    return (
            <div style={{width: `${widthNum}px`}} id={styles.mainContainer}>
                <div style={{transform: "rotate(-180deg)", position: "absolute", right: "60px", top: "78px", width: "80px", height: `${heightNum * 16}px`}}>
                    {times.map(time => {
                        return <p style={{position: "absolute", top: `${(stringToIntTime[time] - stringToIntTime[props.openTime]) * 16}px`}}>{time}</p>
                    })}
                </div>
                <div style={{border: "2px solid black", height:`${heightNum * 16}px`, display: "flex", transform: "rotate(-180deg)"}}>
                    {bcnArray.map((bcn,index) => {
                        return <CourtColumn clickGroup={props.clickGroup} clickBooking={props.clickBooking} sortedGroups={props.sortedGroups[index]} openTime={props.openTime} sortedBookings={props.sortedBookings[index]} key={bcn} bct={props.bct} height={heightNum * 16} bcn={bcn}/>
                    })}
                </div>
            </div>
        

    )
}

const mapStateToProps = state => {
    return {
      admin: state.authReducer.admin,
      adminToken: state.authReducer.adminToken,
      employee: state.authReducer.employee,
      bookAThing: state.booleanReducers.bookAThing,
      user: state.authReducer.user,
      dateChosen: state.dateReducer.dateChosen
    };
  };
  
  export default connect(mapStateToProps)(CourtContainer);
  
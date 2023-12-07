import React, {useEffect, useState} from 'react';
import styles from './TableContainer.module.css';
import {connect} from 'react-redux';
import {stringToIntTime, intToStringTime} from '../../../feutils/feutils';
import TableColumn from './TableColumn/TableColumn';

var numbo;
function TableContainer(props) {
    const [heightNum, setHeightNum] = useState(0);
    const [widthNum, setWidthNum] = useState(0);
    const [bcnArray, setBcnArray] = useState([]);
    const [times, setTimes] = useState([]);
    const [minned, setMinned] = useState(false);

    useEffect(function() {
        if (props.openTime && props.closeTime) {
            const newHeightNum = stringToIntTime[props.closeTime] - stringToIntTime[props.openTime];
            setHeightNum(newHeightNum);
            console.log(props.bct)
        }
    },[ props.openTime, props.closeTime])



    useEffect(function() {
        if (window.innerWidth > 600) {
            setWidthNum(Number(props.tables.length) * 150.2);
        }
        else {
            setWidthNum(window.innerWidth)
            setMinned(true)
        }
    },[props.bcn])

  useEffect(function() {
    setInterval(function() {
        if (window.innerWidth < 600) {
            if (window.innerWidth != widthNum) {
                setWidthNum(window.innerWidth);
                setMinned(true);
            }
        }
        else {
            if (window.innerWidth !== widthNum) {
                setWidthNum(numbo * 150.2);
                setMinned(false);
            }
        }
    }, 4000)
  }, [])



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
                {!minned && <div id={styles.subo} style={{height: `${heightNum * 16}px`}}>
                    {times.map(time => {
                        return <p style={{position: "absolute", top: `${(stringToIntTime[time] - stringToIntTime[props.openTime]) * 16}px`}}>{time}</p>
                    })}
                </div>}
                <div id={styles.courto} style={{ height:`${heightNum * 16}px`, }}>
                    {props.tables.map((table,index) => {
                        return <TableColumn sortedBookings={props.sortedBookings[index]} times={times} table={table} minned={minned} clickGroup={props.clickGroup}  clickBooking={props.clickBooking}  openTime={props.openTime}  key={table} height={heightNum * 16} />
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
  
  export default connect(mapStateToProps)(TableContainer);
  
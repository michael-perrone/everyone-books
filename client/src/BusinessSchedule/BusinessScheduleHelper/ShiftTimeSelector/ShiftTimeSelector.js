import React from 'react';
import styles from '../../../Business/BookingHelpers/AdminBooking/AdminBooking.module.css';
import { CHOOSE_SHIFT_TIME_AMOUNT } from '../../../actions/actions';
import {connect} from 'react-redux';

function ShiftTimeSelector(props) {

    const [timeChosen, setTimeChosen] = React.useState('');

    function selectTime(time) {
        return () => {
            setTimeChosen(time)
            props.chooseShiftTime(time)
        }
    }

    return (
        <div className={styles.bookingHolderContainer}>
        <p style={{ marginBottom: "-8px" }}>Choose Shift Duration</p>
        <div className={styles.bookingHolderSubContainer}>
          {props.times.map(element => {
            return (
              <p
                style={{
                  backgroundColor:
                    timeChosen === element ? "navy" : "",
                    color: timeChosen === element ? "white" : ""
                }}
                onClick={selectTime(element)}
                className={styles.itemPTag}
              >
                {element}
              </p>
            );
          })}
        </div>
      </div>
    )
}

ShiftTimeSelector.defaultProps = {
    times: [
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
        '12 Hours 30 Minutes',
        '13 Hours',
        '13 Hours 30 Minutes',
        '14 Hours',

    ]
}

const mapDispatchToProps = dispatch => {
    return {
        chooseShiftTime: (time) => dispatch({type: CHOOSE_SHIFT_TIME_AMOUNT, payload: time})
    }
}

export default connect(null, mapDispatchToProps)(ShiftTimeSelector);
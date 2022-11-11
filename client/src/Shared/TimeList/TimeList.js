import React from 'react';
import {intToStringTime} from '../../feutils/feutils';
import styles from './TimeList.module.css';

function TimeList(props) {    
    return (
        <select id={styles.timeList} value={props.time} onChange={(event => props.setTime(event.target.value))}>
            {props.times.map(element => {
                return <option key={intToStringTime[element]}>{intToStringTime[element]}</option>
            })}
        </select>
    )
}

export default TimeList;
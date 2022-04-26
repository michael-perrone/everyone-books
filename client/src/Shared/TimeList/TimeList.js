import React from 'react';
import {intToStringTime} from '../../feutils/feutils';

function TimeList(props) {    

    


    return (
        <select value={props.time} onChange={(event => props.setTime(event.target.value))} style={{height: "26px", width: "120px"}}>
            {props.times.map(element => {
                return <option key={intToStringTime[element]}>{intToStringTime[element]}</option>
            })}
        </select>
    )
}

export default TimeList;
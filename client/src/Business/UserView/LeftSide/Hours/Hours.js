import React from 'react';
import styles from './Hours.module.css';

const Hours = props => { 
    return (
        <div id={styles.mTop} style={{width: "300px", display: 'flex', flexDirection:'column', paddingLeft: "45px", fontSize: '18px'}}>
            <div>
            {props.schedule && props.schedule.map((eachDay,index) => {
                let day;
                if (index === 0) {
                    day = "Sun:"
                }
                else if (index === 1) {
                    day = "Mon:"
                }
                else if (index === 2) {
                    day = "Tue:"
                }
                else if (index === 3) {
                    day = "Wed:"
                }
                else if (index === 4) {
                    day = "Thu:"
                }
                else if (index === 5) {
                    day = "Fri:"
                }
                else if (index === 6) {
                    day = "Sat:"
                }
            return <div style={{marginTop: day === "Sun:" ? "6px" : "16px" , fontSize: "18px", fontFamily: "Josefin Sans", display: "flex"}}><p style={{marginRight: '2px', fontWeight: "bold", marginRight: "6px"}}>{day}</p><p>{eachDay.open}-{eachDay.close}</p></div>
            })}
            </div>
        </div>
    )
}

export default Hours;
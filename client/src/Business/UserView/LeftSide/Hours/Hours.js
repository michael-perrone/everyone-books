import React from 'react';

const Hours = props => { 
    return (
        <div style={{display: 'flex', flexDirection:'column', alignItems:'center', marginTop: '40px', fontSize: '18px'}}>
            <div>
            <p style={{textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Business Hours:</p>
            {props.schedule && props.schedule.map((eachDay,index) => {
                let day;
                if (index === 0) {
                    day = "Sun: "
                }
                else if (index === 1) {
                    day = "Mon: "
                }
                else if (index === 2) {
                    day = "Tue: "
                }
                else if (index === 3) {
                    day = "Wed: "
                }
                else if (index === 4) {
                    day = "Thu: "
                }
                else if (index === 5) {
                    day = "Fri: "
                }
                else if (index === 6) {
                    day = "Sat "
                }
            return <div style={{display: 'flex',marginTop: '5px'}}><p>{day}</p><p>{eachDay.open}-{eachDay.close}</p></div>
            })}
            </div>
        </div>
    )
}

export default Hours;
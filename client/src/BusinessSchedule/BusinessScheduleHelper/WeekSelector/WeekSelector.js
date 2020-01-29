import React from 'react';
import styles from './WeekSelector.module.css';
import {CHOOSE_WEEK_SELECTOR} from '../../../actions/actions';
import {connect} from 'react-redux';

const WeekSelector = (props) => {
    const [monthIndex, setMonthIndex] = React.useState(new Date().getMonth());
    const [year, setYear] = React.useState(new Date().getFullYear())
    const [daysOfMonth, setDaysOfMonth] = React.useState(new Date(year, monthIndex + 1, 0).getDate())
    const [sunday, setSunday] = React.useState([])
    const [monday, setMonday] = React.useState([])
    const [tuesday, setTuesday] = React.useState([])
    const [wednesday, setWednesday] = React.useState([])
    const [thursday, setThursday] = React.useState([])
    const [friday, setFriday] = React.useState([])
    const [saturday, setSaturday] = React.useState([])
    const [weekSelected, setWeekSelected] = React.useState([]);

   function selectWeek(num) {
        return () => {
            setWeekSelected(num);
            props.chooseWeek(num);
        }
   }

   function addYear() {
       setDaysOfMonth(new Date(year + 1, monthIndex + 1, 0).getDate())
        setYear((prevYear) => prevYear + 1)
    }
    function subYear() {
        setDaysOfMonth(new Date(year - 1, monthIndex + 1, 0).getDate())
        setYear((prevYear) => prevYear - 1)
    }

    function addMonth() {
        if (monthIndex !== 11) {
            setDaysOfMonth(new Date(year, monthIndex + 2, 0).getDate())
            setMonthIndex((prevMonth) => prevMonth + 1)
        }
        else {
            setDaysOfMonth(new Date(year + 1, 1, 0).getDate())
            setMonthIndex(0)
            setYear((prevYear) => prevYear + 1)
        }
    }
    function subMonth() {
        if (monthIndex !== 0) {
            setDaysOfMonth(new Date(year, monthIndex, 0).getDate())
            setMonthIndex((prevMonth) => prevMonth - 1)
        }
        else {
            setDaysOfMonth(new Date(year - 1, 12, 0).getDate())
            setMonthIndex(11)
            setYear((prevYear) => prevYear - 1)
        }
    }

    React.useEffect(() => {
        let newSunday = [];
        let newMonday = [];
        let newTuesday = [];
        let newWednesday = [];
        let newThursday = [];
        let newFriday = [];
        let newSaturday = [];
        let firstDayInMonth = new Date(props.months[monthIndex] + " 1, " + year).getDay();
        if (firstDayInMonth !== 0) {
        let numberOfDaysInLastMonth = new Date(year, monthIndex, 0).getDate();
        for (let i = numberOfDaysInLastMonth - firstDayInMonth  + 1; i <= numberOfDaysInLastMonth; i++) {
            let dayOfMonth;
            if (monthIndex !== 0) {
                dayOfMonth = new Date(`${props.months[monthIndex - 1]} ${i}, ${year}`).getDay();
            } else {
                dayOfMonth = new Date(`${props.months[11]} ${i}, ${year - 1}`).getDay();
            }
            console.log(i)
            console.log(`${props.months[11]} ${i}, ${year}`)
            console.log(`${props.months[11]} ${i}, ${year - 1}`)
           
            if (dayOfMonth === 0) {
                newSunday.push({day: i, type: 'premonth'})
            }
            else if (dayOfMonth === 1 ) {
                newMonday.push({day: i, type: 'premonth'});
            }
            else if (dayOfMonth === 2 ) {
                newTuesday.push({day: i, type: 'premonth'});
            }
            else if (dayOfMonth === 3 ) {
                newWednesday.push({day: i, type: 'premonth'});
            }
            else if (dayOfMonth === 4 ) {
                newThursday.push({day: i, type: 'premonth'});
            }
             else if (dayOfMonth === 5 ) {
                newFriday.push({day: i, type: 'premonth'});
            }
            else if (dayOfMonth === 6 ) {
                newSaturday.push({day: i, type: 'premonth'});   
        }
    }
}
        for (let z = 1; z <= daysOfMonth; z++) {
            let dayOfWeek = new Date(`${props.months[monthIndex]} ${z}, ${year}`).getDay();
            if (dayOfWeek === 0) {
                newSunday.push({day: z, type: 'actualmonth'})
            }
            else if (dayOfWeek === 1 ) {
                newMonday.push({day: z, type: 'actualmonth'})
            }
            else if (dayOfWeek === 2 ) {
                newTuesday.push({day: z, type: 'actualmonth'})
            }
            else if (dayOfWeek === 3 ) {
                newWednesday.push({day: z, type: 'actualmonth'})
            }
            else if (dayOfWeek === 4 ) {
                newThursday.push({day: z, type: 'actualmonth'})
            }
             else if (dayOfWeek === 5 ) {
                newFriday.push({day: z, type: 'actualmonth'})
            }
            else if (dayOfWeek === 6 ) {
                newSaturday.push({day: z, type: 'actualmonth'})
            }
        }

        let lastDayOfMonth = new Date(`${props.months[monthIndex]} ${daysOfMonth}, ${year}`).getDay();
        if (lastDayOfMonth !== 6) {
            for (let t = 1; t <= 6 - lastDayOfMonth; t++) {
                let dayOfWeek;
                if (monthIndex !== 11) {
                    dayOfWeek = new Date(`${props.months[monthIndex + 1]} ${t}, ${year}`).getDay();
                } else {
                    dayOfWeek = new Date(`${props.months[0]} ${t}, ${year + 1}`).getDay();
                }
               
                if (dayOfWeek === 1) {
                    newMonday.push({day: t, type: 'postmonth'})
                }
                if (dayOfWeek === 2) {
                    newTuesday.push({day: t, type: 'postmonth'})
                }
                if (dayOfWeek === 3) {
                    newWednesday.push({day: t, type: 'postmonth'})
                }
                if (dayOfWeek === 4) {
                    newThursday.push({day: t, type: 'postmonth'})
                }
                if (dayOfWeek === 5) {
                    newFriday.push({day: t, type: 'postmonth'})
                }
                if (dayOfWeek === 6) {
                    newSaturday.push({day: t, type: 'postmonth'})
                }
            }
        }


        setSunday(newSunday)
        setMonday(newMonday)
        setTuesday(newTuesday)
        setWednesday(newWednesday)
        setThursday(newThursday)
        setFriday(newFriday)
        setSaturday(newSaturday)
        
    }, [monthIndex, year, daysOfMonth])

    return (
        <div id={styles.weekSelectorContainer}>
            <div id={styles.calHeader}>
                <div style={{width: '50px', display: 'flex', position: 'relative'}}>
                <i style={{position: 'absolute', top: '2px', right: '60px', cursor: 'pointer', margin: '0px 8px'}} onClick={subMonth} className="fas fa-chevron-left"></i><p>{props.months[monthIndex]}</p><i onClick={addMonth} style={{cursor: 'pointer', left: '64px', top: '2px', margin: '0px 8px', position: 'absolute'}} className="fas fa-chevron-right"></i>
                </div>
                <div style={{display: 'flex', position: 'relative'}}>
                <i style={{right: '30px', top: '1px', position: 'absolute', cursor: 'pointer', margin: '0px 8px'}} onClick={subYear} className="fas fa-chevron-left"></i><p>{year}</p><i onClick={addYear} style={{left: '30px', top: '1px', position: 'absolute', cursor: 'pointer', margin: '0px 8px'}} className="fas fa-chevron-right"></i>
            </div>
        </div>
        <div id={styles.days}>
           <div><p style={{marginBottom: '8px'}}>Sun</p>{sunday.map(element => <p style={{color: element.type === "premonth" || element.type === "postmonth" ? 'rgb(156,156,156)' : 'black', height: element === " " ? "18px" : "" }} className={styles.day}>{element.day}</p>)}</div>
           <div><p style={{marginBottom: '8px'}}>Mon</p>{monday.map(element => <p style={{color: element.type === "premonth" || element.type === "postmonth" ? 'rgb(156,156,156)' : 'black',height: element === " " ? "18px" : "" }} className={styles.day}>{element.day}</p>)}</div>
           <div><p style={{marginBottom: '8px'}}>Tue</p>{tuesday.map(element => <p style={{color: element.type === "premonth" || element.type === "postmonth" ? 'rgb(156,156,156)' : 'black',height: element === " " ? "18px" : "" }} className={styles.day}>{element.day}</p>)}</div>
           <div><p style={{marginBottom: '8px'}}>Wed</p>{wednesday.map(element => <p style={{color: element.type === "premonth" || element.type === "postmonth" ? 'rgb(156,156,156)' : 'black',height: element === " " ? "18px" : "" }} className={styles.day}>{element.day}</p>)}</div>
           <div><p style={{marginBottom: '8px'}}>Thu</p>{thursday.map(element => <p style={{color: element.type === "premonth" || element.type === "postmonth" ? 'rgb(156,156,156)' : 'black',height: element === " " ? "18px" : "" }} className={styles.day}>{element.day}</p>)}</div>
           <div><p style={{marginBottom: '8px'}}>Fri</p>{friday.map(element => <p style={{color: element.type === "premonth" || element.type === "postmonth" ? 'rgb(156,156,156)' : 'black',height: element === " " ? "18px" : "" }} className={styles.day}>{element.day}</p>)}</div>
           <div><p style={{marginBottom: '8px'}}>Sat</p>{saturday.map(element => <p style={{color: element.type === "premonth" || element.type === "postmonth" ? 'rgb(156,156,156)' : 'black',height: element === " " ? "18px" : "" }} className={styles.day}>{element.day}</p>)}</div>
           <div onClick={selectWeek(1)} style={{top: '24px', border: weekSelected === 1 ? '2px solid black' : ""}} className={styles.hoverWeek}></div>
           <div onClick={selectWeek(2)} style={{top: '54px', border: weekSelected === 2 ? '2px solid black' : ""}} className={styles.hoverWeek}></div>
           <div onClick={selectWeek(3)} style={{top: '84px', border: weekSelected === 3 ? '2px solid black' : ""}} className={styles.hoverWeek}></div>
           <div onClick={selectWeek(4)} style={{top: '114px',border: weekSelected === 4 ? '2px solid black' : ""}} className={styles.hoverWeek}></div>
           <div onClick={selectWeek(5)} style={{top: '144px', border: weekSelected === 5 ? '2px solid black' : ""}} className={(daysOfMonth === 28 && new Date(`${props.months[monthIndex]} 1, ${year}`).getDay() === 0) ? styles.hide : styles.hoverWeek}></div>
           <div onClick={selectWeek(6)} style={{top: '174px', border: weekSelected === 6 ? '2px solid black' : ""}}
            className={(daysOfMonth === 30 && new Date(`${props.months[monthIndex]} 1, ${year}`).getDay() === 6) || (daysOfMonth === 31 && new Date(`${props.months[monthIndex]} 1, ${year}`).getDay() === 6) || (daysOfMonth === 31 && new Date(`${props.months[monthIndex]} 1, ${year}`).getDay() === 5) ? 
            styles.hoverWeek : styles.hide}></div>
        </div>
    </div>
    )
}

WeekSelector.defaultProps = {
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
}

const mapDispatchToProps = (dispatch) => {
    return {
        chooseWeek: (num) => () => dispatch({type: CHOOSE_WEEK_SELECTOR, payload: num}) 
    }
}

export default connect(null, mapDispatchToProps)(WeekSelector);
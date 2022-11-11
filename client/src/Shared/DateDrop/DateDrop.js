
import React from 'react';
import styles from './DateDrop.module.css';

function DateDrop(props) {

    const years = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2];

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [monthNum, setMonthNum] = React.useState(new Date().getMonth());
    const [month, setMonth] = React.useState(monthsArray[new Date().getMonth()]);
    const [days, setDays] = React.useState([]);
    const [day, setDay] = React.useState(new Date().getDate());

    const [dateString, setDateString] = React.useState(new Date(year, monthNum, day).toDateString());


    React.useEffect(function() {
        setDateString(new Date(year, monthNum, day).toDateString());
    }, [month, year, day])
    

    function setNewMonth(e) {
        setMonth(e.target.value);
        setMonthNum(monthsArray.indexOf(e.target.value));
    }

    function setNewDay(e) {
        setDay(e.target.value)
    }

    function setNewYear(e) {
        setYear(e.target.value);
    }

    React.useEffect(function() {
        const daysNum = new Date(year, monthNum + 1, 0).getDate();
        const daysArray = [];
        let i = 1;
        while(i <= daysNum) {
            daysArray.push(i);
            i++;
        }
        setDays(daysArray);
    }, [monthNum])

    React.useEffect(function() { 
        props.setDateString(dateString)
    }, [dateString])



    return (
        <div style={{display: "inline"}}>
            <select className={styles.cool} value={month} onChange={setNewMonth}>
                {monthsArray.map(element => <option key={element}>{element}</option>)}
            </select>
            <select className={styles.cool} style={{marginLeft: "8px"}} value={day} onChange={setNewDay}>
                {days.map(element => <option key={element}>{element}</option>)}
            </select>
            <select className={styles.cool} style={{marginLeft: "8px"}} value={year} onChange={setNewYear}>
                {years.map(element => <option key={element}>{element}</option>)}
            </select>
        </div>
    )
}

export default DateDrop;
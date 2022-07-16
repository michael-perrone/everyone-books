import React, {useState} from 'react';
import styles from './Restaurant.module.css';
import Axios from 'axios';
import {connect} from 'react-redux';
import {getNum, getTime, stringToIntTime, getTimes, intToStringTime, estDurationToNum} from '../../feutils/feutils';
import ViewTable from './ViewTable';
import DateDrop from '../../Shared/DateDrop/DateDrop';
import OtherAlert from '../../OtherAlerts/OtherAlerts';

function Restaurant(props) {
    const [tables, setTables] = useState([]);
    const [boxHeight, setBoxHeight] = useState(0);
    const [boxWidth, setBoxWidth] = useState(0);
    const [takenTables, setTakenTables] = useState([]);
    const [showBackDrop, setShowBackDrop] = useState(false);
    const [reservedTables, setReservedTables] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState();
    const [selectedHeight, setSelectedHeight] = React.useState();
    const [selectedWidth, setSelectedWidth] = React.useState();
    const [schedule, setSchedule] = React.useState([]);
    const [tableColor, setTableColor] = React.useState();
    const [businessClosed, setBusinessClosed] = React.useState(false);
    const [times, setTimes] = React.useState([]);
    const [selectedTime, setSelectedTime] = React.useState();
    const [dateString, toSetDateString] = React.useState(new Date().toDateString());
    const [bookedTables, setBookedTables] = React.useState([]);
    const [bookedWithinHour, setBookedWithinHour] = React.useState([]);
    const [soonToBeBooked, setSoonToBeBooked] = React.useState([]);
    const [hoverTable, setHoverTable] = React.useState({});
    const [successMessage, setSuccessMessage] = useState("");

    React.useEffect(function () {
        Axios.get('/api/restaurant', {headers: {'x-auth-token': props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setBoxHeight(response.data.restaurant.boxHeight);
                    setTables(response.data.restaurant.tables);
                    setBoxWidth(response.data.restaurant.boxWidth);
                    setSchedule(response.data.restaurant.schedule);
                }
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    },[]);

    function reloadBookedTables() {
        Axios.post("/api/restaurant/checkIfBooked", {date: dateString, selectedTime}, {headers: {'x-auth-token': props.adminToken}}).then(function(response) {
            if (response.status === 200) {
                setBookedTables(response.data.bookedTables);
                setBookedWithinHour(response.data.bookedWithinHour);
                setSoonToBeBooked(response.data.soonToBeBooked);
                console.log("YOOOOOO");
            }
        }).catch(function(error) {
            console.log(error)
        })
    }

    React.useEffect(function() {
        if (selectedTime) {
            console.log(selectedTime);
            Axios.post("/api/restaurant/checkIfBooked", {date: dateString, selectedTime}, {headers: {'x-auth-token': props.adminToken}}).then(function(response) {
                if (response.status === 200) {
                    setBookedTables(response.data.bookedTables);
                    setBookedWithinHour(response.data.bookedWithinHour);
                    setSoonToBeBooked(response.data.soonToBeBooked);
                }
            }).catch(function(error) {
                console.log(error)
            })
        }
    },[dateString, selectedTime])

    
    // React.useEffect(function() {
    //     if (schedule.length) {
    //         console.log(getTime());
    //         console.log(schedule);
    //         let day = new Date().getDay();
    //         const timeNum = stringToIntTime[getTime()];
    //         console.log("YOOOOO");
    //         setSelectedTime(intToStringTime[timeNum]);
    //         console.log(timeNum);
    //         if (timeNum < stringToIntTime[schedule[day].open] || timeNum > stringToIntTime[schedule[day].close]) {
    //             setBusinessClosed(true);
    //             setTableColor("lightgray");
    //         }
    //         else {
    //             setTableColor('lightgreen');
    //         }
    //         setTimes(getTimes(schedule[day].open, schedule[day].close));
    //     }
    // }, [schedule]);




    // React.useEffect(function () {
    //     Axios.get('/api/restaurant/tableStatus', {headers: {'x-auth-token': props.adminToken}}).then(
    //         response => {
    //             if (response.status === 200) {
    //                 setBoxHeight(response.data.restaurant.boxHeight);
    //                 setTables(response.data.restaurant.tables);
    //                 setBoxWidth(response.data.restaurant.boxWidth);
    //             }
    //         }
    //     ).catch(
    //         error => {
    //             console.log(error)
    //         }
    //     )
    // },[]);



    function checkIfTakenOrReserved2(id) {
        if (takenTables.indexOf(id) !== -1) {
            return 't';
        }
        else if (reservedTables.indexOf(id) !== -1) {
            return 'r';
        }
        else {
            return 'a';
        }
    }


    function clickTable(table) {
        setShowBackDrop(true);
        setSelectedId(table.id)
        setSelectedHeight(table.height);
        setSelectedWidth(table.width);
    }

    function exitTableView() {
        setShowBackDrop(false);
        setSelectedId();
        setSelectedWidth();
        setSelectedHeight();
        reloadBookedTables();
    }

    function toSetSelectedTime(e) {
        setSelectedTime(e.target.value)
    }

    React.useEffect(function() {
        if (schedule.length > 0) {
            const timeNum = stringToIntTime[selectedTime];
            const dateChosen = new Date(dateString);
            console.log(dateChosen);
            const day = dateChosen.getDay();
            console.log(timeNum);
            console.log(stringToIntTime[schedule[day].close])
            console.log(day);
            if (timeNum < stringToIntTime[schedule[day].open] || timeNum > stringToIntTime[schedule[day].close]) {
                setBusinessClosed(true);
                setTableColor("lightgray");
                setSelectedTime(schedule[day].open)
            }
            else {
                setBusinessClosed(false);
                setTableColor('lightgreen');
                setSelectedTime(getTime())
            }
            setTimes(getTimes(schedule[day].open, schedule[day].close));
        }
    }, [dateString, schedule])

    function createRed(time, estDuration) {
        return `rgb(255,0,0,${1 - (stringToIntTime[selectedTime] - stringToIntTime[time]) / estDurationToNum[estDuration] + .08}`;
    }

     function hello() {
        if (schedule.length > 0) {
            const timeNum = stringToIntTime[selectedTime];
            const dateChosen = new Date(dateString);
            console.log(dateChosen);
            const day = dateChosen.getDay();
            console.log(timeNum);
            console.log(stringToIntTime[schedule[day].close])
            console.log(day);
            if (timeNum < stringToIntTime[schedule[day].open] || timeNum > stringToIntTime[schedule[day].close]) {
                setBusinessClosed(true);
                setTableColor("lightgray");
                setSelectedTime(schedule[day].open)
            }
            else {
                setBusinessClosed(false);
                setTableColor('lightgreen');
                setSelectedTime(getTime())
            }
            setTimes(getTimes(schedule[day].open, schedule[day].close));
        }
        Axios.post("/api/restaurant/checkIfBooked", {date: dateString, selectedTime}, {headers: {'x-auth-token': props.adminToken}}).then(function(response) {
            if (response.status === 200) {
                setBookedTables(response.data.bookedTables);
                setBookedWithinHour(response.data.bookedWithinHour);
                setSoonToBeBooked(response.data.soonToBeBooked);
                console.log("YOOOOOO");
            }
        }).catch(function(error) {
            console.log(error)
        })
    }

   

    function booked(id) {
        for (let i = 0; i < bookedTables.length; i++) {
            if (id === bookedTables[i].fakeId) {
                return createRed(bookedTables[i].timeStart, bookedTables[i].estDuration);
            }
        }
        for (let i = 0; i < soonToBeBooked.length; i++) {
            if (id === soonToBeBooked[i].fakeId) {
                return "#ffc383";
            }
        }
        for (let i = 0; i < bookedWithinHour.length; i++) {
            if (id === bookedWithinHour[i].fakeId) {
                return "rgb(255, 234, 119)";
            }
        }
        return tableColor;
    }


    function findHoverInfo(id) {
        for (let i = 0; i < bookedTables.length; i++) {
            if (id === bookedTables[i].fakeId) {
                setHoverTable(bookedTables[i]);
                return;
            }
        }
        for (let i = 0; i < soonToBeBooked.length; i++) {
            if (id === soonToBeBooked[i].fakeId) {
                setHoverTable(soonToBeBooked[i]);
                return;
            }
        }
        for (let i = 0; i < bookedWithinHour.length; i++) {
            if (id === bookedWithinHour[i].fakeId) {
                setHoverTable(bookedWithinHour[i]);
                return;
            }
        }
    }

    function hoverOver(id, check) {
        if (check !== tableColor) {
            findHoverInfo(id);
        }
        else {
            setHoverTable({})
        }
    }
    
    function deleteTableBooking() {
        Axios.post('/api/restaurant/deleteTableBooking', {deletingId: hoverTable._id}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                setSuccessMessage("Table booking succesfully deleted!");
                Axios.post("/api/restaurant/checkIfBooked", {date: dateString, selectedTime}, {headers: {'x-auth-token': props.adminToken}}).then(function(response) {
                    if (response.status === 200) {
                        setBookedTables(response.data.bookedTables);
                        setBookedWithinHour(response.data.bookedWithinHour);
                        setSoonToBeBooked(response.data.soonToBeBooked);
                        console.log("YOOOOOO");
                    }
                }).catch(function(error) {
                    console.log(error)
                })
                setHoverTable({});
            }
        }).catch(error => {
            console.log(error);
        })
    }


    return (
    <div id={styles.container}>
        <div style={{display: "flex", width: boxWidth, justifyContent: "space-around", marginTop: "20px", marginLeft: "30px", alignItems: "center", width: "1000px"}}>
            <div style={{marginTop: "3px", display: "flex"}}>
                <p style={{marginRight: "10px", fontSize: "20px"}}>Date:</p>
                <DateDrop setDateString={(dateString) => toSetDateString(dateString)}/>
                </div>
            <p style={{fontSize: "20px", marginTop: "4px", marginLeft: "-10px"}}>Table Schedule Time: </p>
             <select onChange={toSetSelectedTime} value={selectedTime} style={{fontSize: "16px", height: "30px", border: "none", marginLeft: "-30px", boxShadow: "0px 0px 2px black", width: "100px"}}>
                {times.map(time => {
                    return <option>{time}</option>
                })}
            </select>
            <div style={{width: "365px", boxShadow: "0px 0px 3px black", height: "120px", backgroundColor: "#f9e9f9", position: "relative"}}>
               {hoverTable.timeStart && <div style={{marginLeft: "8px", paddingTop: "4px", height: "116px", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                   <p>Time Start: {hoverTable.timeStart}</p>
                   <p>Est Duration: {hoverTable.estDuration}</p>
                   <p>Customer Name: {hoverTable.customerName}</p>
                   <p>Employee: {hoverTable.employeeName}</p>
                   <p>Num of People: {hoverTable.numOfPeople}</p>
                   <button style={{position: "absolute", border: "none", boxShadow: "0px 0px 2px black", height: "30px", width: "65px", right: 10, top: 10, backgroundColor: "rgb(255, 125, 125)"}} onClick={deleteTableBooking}>Cancel</button>
               </div>} 
               {!hoverTable.timeStart && <p style={{textAlign: "center", marginTop: "45px", fontSize: "18px"}}>Select a booked table for booking information</p>}
            </div>
        </div>
        {businessClosed && <p style={{fontWeight: "bold", fontSize: "26px", marginTop: "20px"}}>Restaurant Closed</p>}
        <div style={{height: boxHeight, width: boxWidth}} id={styles.wholeBox}>
           {tables.map(table => {
               return <div onClick={() => hoverOver(table.id, booked(table.id))} onDoubleClick={() => clickTable(table)} style={{border: "2px solid black", cursor: "pointer", backgroundColor: booked(table.id), height: table.height, width: table.width, position: "absolute", left: table.left, top: table.top, display: "flex", justifyContent: "center", alignItems: "center"}}><p style={{fontSize: "20px", fontWeight: "bold"}}>{getNum(table.width, table.height)}</p>
               </div>     
           })}
           {showBackDrop && <div style={{display: "flex", position: "absolute", top: 0, lef: 0, width: "100%", justifyContent: "center"}}><div id={styles.backDrop}><ViewTable exitTableView={exitTableView} fakeId={selectedId} dateString={dateString} times={times} num={getNum(selectedWidth, selectedHeight)} check={checkIfTakenOrReserved2(selectedId)} hide={() => setShowBackDrop(false)}/></div> </div>}
        </div>
        <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapStateToProps)(Restaurant);
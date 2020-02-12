import React from 'react';
import ShiftCreator from './ShiftCreator/ShiftCreator';
import WeekSelector from './WeekSelector/WeekSelector';
import axios from 'axios';
import styles from './BusinessSchedule.module.css';
import {connect} from 'react-redux';
import ShiftSchedule from './ShiftSchedule/ShiftSchedule';

function BusinessSchedule(props) {
    const [schedule, setSchedule] = React.useState('');
    const [employees, setEmployees] = React.useState('');
    const [shifts, setShifts] = React.useState([])


React.useEffect(() => {
    let businessId;
    if (props.admin) {
        businessId = props.admin.admin.businessId
    }
    else if (props.employee) {
        businessId = props.match.params.businessId
    }
    console.log(businessId)
    axios.post('/api/business/businessschedule', {businessId})
    .then(
        response => {
            if (response.status === 200) {
                setSchedule(response.data.schedule)
                setEmployees(response.data.employees)
            }
        }
    )
}, [])

 React.useEffect(() => {
    axios.post('api/shifts/get',
     {shiftDate: props.shiftDate, businessId: props.admin.admin.businessId})
     .then(response => {
         if (response.status === 204) {
             setShifts([])
         }
         if (response.data.shifts && response.data.shifts.length > 0) {
            setShifts(response.data.shifts)
         }
     }
    )
}, [props.shiftDate]) 

    return (
        <div id={styles.container}>
            <div id={styles.leftHolder}>
                <WeekSelector/>
                <ShiftCreator admin={props.admin.admin} employees={employees}/>
            </div>
            <ShiftSchedule shiftDate={props.shiftDate} shifts={shifts}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shiftDate: state.scheduleReducer.dateChosen,
        admin: state.authReducer.admin
    }
}

export default connect(mapStateToProps)(BusinessSchedule);
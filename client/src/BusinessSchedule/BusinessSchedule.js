import React from 'react';
import ShiftCreator from './ShiftCreator/ShiftCreator';
import WeekSelector from './WeekSelector/WeekSelector';
import axios from 'axios';
import styles from './BusinessSchedule.module.css';
import {connect} from 'react-redux';

function BusinessSchedule(props) {
    const [schedule, setSchedule] = React.useState('');
    const [employees, setEmployees] = React.useState('');


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

    return (
        <div id={styles.container}>
            <WeekSelector/>
            <ShiftCreator admin={props.admin.admin} employees={employees}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.authReducer.admin
    }
}

export default connect(mapStateToProps)(BusinessSchedule);
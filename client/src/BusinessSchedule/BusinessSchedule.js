import React from 'react';
import BusinessScheduleHelper from './BusinessScheduleHelper/BusinessScheduleHelper';
import ScheduleContainer from './ScheduleContainer/ScheduleContainer';
import Axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

function BusinessSchedule(props)  {
    const [schedule, setSchedule] = React.useState('');


    React.useEffect(() => {
        let businessId;
        if (props.admin) {
            businessId = props.admin.admin.businessId
        }
        else if (props.employee) {
            businessId = props.match.params.businessId
        }
        Axios.post('/api/business/schedule', {businessId})
        .then(
            response => {
                if (response.status === 200) {
                    setSchedule(response.data.schedule.schedule)
                }
            }
        )
    }, [])

    return (
        <div>
            <BusinessScheduleHelper/>
            <ScheduleContainer schedule={schedule}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.authReducer.admin,
        employee: state.authReducer.employee
    }
}

export default withRouter(connect(mapStateToProps)(BusinessSchedule));
import React from 'react';
import styles from './EmployeeHome.module.css';
import Schedule from '../Shared/Nav/Schedule/Schedule';
import Axios from 'axios';
import {connect} from 'react-redux';

const EmployeeHome = (props) => {
    const [employeeId, setEmployeeId] = React.useState('');
    const [business, setBusiness] = React.useState('None');
    React.useEffect(() => {
        Axios.get('/api/getEmployee', {headers: {'x-auth-token': props.employeeToken}}).then(
            response => {
                console.log(response)
                setEmployeeId(response.data.employee._id)
                setBusiness(response.data.employee.business)
            }
        )
    }, [])
    return (
        <div id={styles.employeeHome}>

        <p>Your Unique Employee Id: {employeeId}</p>
            {business !== "None" && <Schedule/>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employeeToken: state.authReducer.employeeToken
    }
}

export default connect(mapStateToProps)(EmployeeHome);
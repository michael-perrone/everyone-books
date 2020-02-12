import React from 'react';
import styles from './EmployeeHome.module.css';
import Schedule from '../Shared/Nav/Schedule/Schedule';
import Axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../Spinner/Spinner';

const EmployeeHome = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [employeeId, setEmployeeId] = React.useState('');
    const [business, setBusiness] = React.useState('None');
    React.useEffect(() => {
        Axios.get('/api/getEmployee', {headers: {'x-auth-token': props.employeeToken}}).then(
            response => {
                if (response.status === 200) {
                    setLoading(false)
                }
                setEmployeeId(response.data.employee._id)
                setBusiness(response.data.employee.business)
            }
        )
    }, [])

    return (
        <div id={styles.employeeHome}>
            {loading && <Spinner/>}
            {(business === "None" && loading === false) &&
             <div style={{width: '310px', padding:'8px', paddingTop: '17px', boxShadow: '0px 0px 2px black', height: '270px', marginTop: '20px'}}>
                <p style={{lineHeight: '30px'}}>Thanks for joining Everyone-Books! We are glad to have you with us. If you have an employer, you need to give them your unique ID that we have assigned you. Your unqiue Id is <span style={{fontWeight: 'bold'}}>{employeeId}</span>, your employer can use this Id to invite you to their business. Look for a notification to the top right of your screen to check for and accept your invite!</p>
            </div>}
            {business !== "None" && loading === false && <Schedule/>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employeeToken: state.authReducer.employeeToken
    }
}

export default connect(mapStateToProps)(EmployeeHome);
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';
import styles from './UserView.module.css';
import LeftSide from './LeftSide/LeftSide';
import Core from './Core/Core';

const UserView = (props) => {
    const [business, setBusiness] = React.useState({});
    const [profile, setProfile] = React.useState({});
    const [employees, setEmployees] = React.useState([]);
    const [services, setServices] = React.useState([]);



    React.useEffect(() => {
        Axios.post('/api/business', {businessId: props.match.params.businessId}).then(
            response => {
                if (response.status === 200) {
                    setBusiness(response.data.business)
                    setProfile(response.data.profile)
                    setEmployees(response.data.employees)
                    if (response.data.profile.serviceTypes.length > 0) {
                        Axios.post('/api/getServiceTypes', {serviceTypesArray: response.data.profile.serviceTypes}).then (
                            response => {
                                if (response.status === 200) {
                                setServices(response.data.serviceTypesArray)
                            }
                          }
                       )
                    }
                }
            }
        )
    }, [])


    return (
        <div id={styles.userViewContainer}>
          <LeftSide services={services} schedule={business.schedule} business={business} profile={profile}/>
          <Core business={business} profile={profile} employees={employees}/>
        </div>
    )
}

export default withRouter(UserView);
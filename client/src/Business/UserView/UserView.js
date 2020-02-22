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
            <div style={{position: 'relative'}}>
            <p style={{position: 'absolute', top: '-40px', width: '320px', textAlign: 'center', fontSize: business.businessName && business.businessName.length > 24 ? "18px" : '24px'}}>{business.businessName}</p>
          <LeftSide services={services} schedule={business.schedule} business={business} profile={profile}/>
          </div>
          <div style={{position: 'relative'}}>
          <p style={{position: 'absolute', top: '-40px', width: '320px', textAlign: 'center', fontSize: '24px'}}>Book Online</p>
          <Core business={business} profile={profile} employees={employees}/>
          </div>
        </div>
    )
}

export default withRouter(UserView);
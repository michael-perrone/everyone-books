import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';
import styles from './UserView.module.css';
import LeftSide from './LeftSide/LeftSide';
import Core from './Core/Core';
import OpenGroups from './OpenGroups/OpenGroups';
import UserRestaurant from './UserRestaurant/UserRestaurant';
import Spinner from './../../Spinner/Spinner';

const UserView = (props) => {
    const [business, setBusiness] = React.useState({});
    const [profile, setProfile] = React.useState({});
    const [employees, setEmployees] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [noProfile, setNoProfile] = React.useState(false);



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
                if (response.status === 206) {
                    setBusiness(response.data.business);
                    setNoProfile(true);
                }
            }
        )
    }, [])


    return (
        business.typeOfBusiness ?
        business.typeOfBusiness && business.typeOfBusiness !== "Restaurant" ?
        <div id={styles.userViewContainer}>
            <div style={{position: 'relative'}}>
            <p style={{marginBottom: "8px", width: '320px', textAlign: 'center', fontSize: business.businessName && business.businessName.length > 24 ? "18px" : '24px', fontFamily: "Josefin Sans"}}>{business.businessName}</p>
          <LeftSide services={services} noProfile={noProfile} schedule={business.schedule} business={business} profile={profile}/>
          </div>
          <div style={{position: 'relative'}}>
            <p id={styles.marginTop} style={{marginBottom: "8px", fontSize: "24px", width: '320px', textAlign: 'center', fontFamily: "Josefin Sans"}}>Available Groups/Events</p>
          <OpenGroups business={business}/>
          </div>
          <div id={styles.coreContainer} style={{position: 'relative'}}>
          <p style={{width: '350px', textAlign: 'center', fontSize: '24px', paddingBottom: "8px", fontFamily: "Josefin Sans"}}>Book Online</p>
          <Core business={business} services={services} profile={profile} employees={employees}/>
          </div>
        </div> : 
        <UserRestaurant business={business} profile={profile}/> :
        <Spinner/>
    )
}

export default withRouter(UserView);
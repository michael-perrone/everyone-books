import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';
import styles from './UserView.module.css';
import LeftSide from './LeftSide/LeftSide';

const UserView = (props) => {
    const [business, setBusiness] = React.useState({});
    const [profile, setProfile] = React.useState({});
    const [employees, setEmployees] = React.useState([]);



    React.useEffect(() => {
        Axios.post('/api/business', {businessId: props.match.params.businessId}).then(
            response => {
                if (response.status === 200) {
                    setBusiness(response.data.business)
                    setProfile(response.data.profile)
                    setEmployees(response.data.employees)
                }
            }
        )
    }, [])


    return (
        <div>
          <LeftSide business={business} profile={profile}/>
        </div>
    )
}

export default withRouter(UserView);
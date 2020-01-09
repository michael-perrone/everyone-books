import React from 'react';
import styles from './BusinessSignup.module.css';
import KindOfBusiness from './KindOfBusiness/KindOfBusiness';
import {connect} from 'react-redux';
import AdminSignup from './AdminSignup/AdminSignup';
import PeopleAnimation from './PeopleAnimation/PeopleAnimation';
import BusinessInfoEnter from './BusinessInfoEnter/BusinessInfoEnter';
import BusinessScheduleCreate from './BusinessScheduleCreate/BusinessScheduleCreate'

const BusinessSignup = (props) => {

    return (
    <div id={styles.bSignupContainer}>
        <div id={styles.welcomeContainer}>
        {!props.kindBusinessCompleted && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
        We appreciate your interest in Everyone Books. Let's get you started right away! 
        </p>}
        {props.kindBusinessCompleted && !props.adminInfoComplete && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
        Now we need some information about you so we can create your administrator account. This shouldn't take too long.
        </p>}
        {props.adminInfoComplete && !props.businessInfoComplete && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>We need some more information about your business like the Street Address, City, Zip, and State so customers can find your business! Website is not required.</p>}
            {props.businessInfoComplete && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>Enter the open and close time for each day of the week for your business. These times will help us build your schedule.</p>}
            {(props.kindOfBusiness === "" || props.nameOfBusiness === "" || props.kindBusinessCompleted === false)  && <KindOfBusiness/>}
        {props.kindBusinessCompleted && !props.adminInfoComplete && <AdminSignup/>}
        {props.adminInfoComplete && !props.businessInfoComplete && <BusinessInfoEnter/>}
        {props.businessInfoComplete && <BusinessScheduleCreate/>}
        </div>
        <PeopleAnimation/>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        businessInfoComplete: state.newReducers.businessInfoComplete,
        adminInfoComplete: state.newReducers.adminInfoComplete,
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness,
        kindBusinessCompleted: state.newReducers.kindBusinessCompleted
    }
}

export default connect(mapStateToProps)(BusinessSignup);
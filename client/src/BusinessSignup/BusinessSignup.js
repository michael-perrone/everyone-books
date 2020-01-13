import React from 'react';
import styles from './BusinessSignup.module.css';
import KindOfBusiness from './KindOfBusiness/KindOfBusiness';
import {connect} from 'react-redux';
import AdminSignup from './AdminSignup/AdminSignup';
import PeopleAnimation from './PeopleAnimation/PeopleAnimation';
import BusinessInfoEnter from './BusinessInfoEnter/BusinessInfoEnter';
import BusinessScheduleCreate from './BusinessScheduleCreate/BusinessScheduleCreate'
import BookingColumnsEnter from './BookingColumnsEnter/BookingColumnsEnter';
import AdminDropDown from './AdminDropDown/AdminDropDown';
import FakeNav from './FakeNav/FakeNav'
import BackButton from './BackButton/BackButton';


const BusinessSignup = (props) => {

    return (
    <React.Fragment>
        <FakeNav/>
        <div id={styles.bSignupContainer}> 
            <div id={styles.welcomeContainer}>
            {(props.showAdminDropDown || props.businessScheduleComplete || props.businessInfoComplete || props.adminInfoComplete || props.kindBusinessCompleted) && <BackButton/>}
            {!props.kindBusinessCompleted && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
            We appreciate your interest in Everyone Books. Let's get you started right away! 
            </p>}
            {props.kindBusinessCompleted && !props.adminInfoComplete && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
            Now we need some information about you so we can create your administrator account. This shouldn't take too long.
            </p>}
            {props.adminInfoComplete && !props.businessInfoComplete && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>We need some more information about your business like the Street Address, City, Zip, and State so customers can find your business! Website is not required.</p>}
            {props.businessInfoComplete && !props.businessScheduleComplete && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>Enter the open and close time for each day of the week for your business. These times will help us build your schedule.</p>}
            {props.businessScheduleComplete && !props.showAdminDropDown && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>Okay, we are about done. The last two things are really important! Read the directions below and click on the help button if you have any confusion.</p>}
            {props.showAdminDropDown && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>We're just going to make sure we have all your information correctly, click the back button to go back and edit your information if needed.</p>}
            {(props.kindOfBusiness === "" || props.nameOfBusiness === "" || props.kindBusinessCompleted === false)  && <KindOfBusiness/>}
            {props.kindBusinessCompleted && !props.adminInfoComplete && <AdminSignup/>}
            {props.adminInfoComplete && !props.businessInfoComplete && <BusinessInfoEnter/>}
            {props.businessInfoComplete && !props.businessScheduleComplete && <BusinessScheduleCreate/>}
            {props.businessScheduleComplete && !props.showAdminDropDown && <BookingColumnsEnter/>}
            {props.showAdminDropDown && props.businessInfoComplete && props.businessScheduleComplete && props.adminInfoComplete && props.kindBusinessCompleted &&  <AdminDropDown/>}
            </div>
            <PeopleAnimation/>
        </div>
    </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        businessScheduleComplete: state.newReducers.businessScheduleComplete,
        businessInfoComplete: state.newReducers.businessInfoComplete,
        adminInfoComplete: state.newReducers.adminInfoComplete,
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness,
        kindBusinessCompleted: state.newReducers.kindBusinessCompleted,
        showAdminDropDown: state.newReducers.showDropDown
    }
}

export default connect(mapStateToProps)(BusinessSignup);
import React from 'react';
import styles from './BusinessSignup.module.css';
import KindOfBusiness from './KindOfBusiness/KindOfBusiness';
import {connect} from 'react-redux';
import AdminSignup from './AdminSignup/AdminSignup';
import BusinessInfoEnter from './BusinessInfoEnter/BusinessInfoEnter';
import BusinessScheduleCreate from './BusinessScheduleCreate/BusinessScheduleCreate'
import BookingColumnsEnter from './BookingColumnsEnter/BookingColumnsEnter';
import RestaurantBuilder from './RestaurantBuilder/RestaurantBuilder';
import FakeNav from './FakeNav/FakeNav'
import BackButton from './BackButton/BackButton';


const BusinessSignup = (props) => {
    return (
    <React.Fragment>
        <FakeNav/>
        <div id={styles.bSignupContainer}> 
            <div id={styles.welcomeContainer}>
                <div style={{position: 'relative'}}>
                    {(props.showAdminDropDown || props.businessScheduleComplete || props.businessInfoComplete || props.adminInfoComplete || props.kindBusinessCompleted) && <BackButton marginTop={!!props.showAdminDropDown}/>}
                    {!props.kindBusinessCompleted && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
                    We appreciate your interest in Everyone Books. Let's get you started right away! 
                    </p>}
                    {props.kindBusinessCompleted && !props.adminInfoComplete && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
                    Now we need some information about you so we can create your administrator account.
                    </p>}
                    {props.adminInfoComplete && !props.businessInfoComplete && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>Please provide about your business like the Street Address, City, Zip, and State.</p>}
                    {props.businessInfoComplete && !props.businessScheduleComplete && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>Enter the open/close times for your business. Your Schedule will use these times. </p>}
                    {props.businessScheduleComplete && !props.showAdminDropDown && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>We are about done, read the diretions below to finish up. Click help if any help is needed.</p>}
                    {props.showAdminDropDown && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>We're just going to make sure we have all your information correctly, click the back button to go back and edit your information if needed.</p>}
                </div>
                {(props.kindOfBusiness === "" || props.nameOfBusiness === "" || props.kindBusinessCompleted === false)  && <KindOfBusiness/>}
                {props.kindBusinessCompleted && !props.adminInfoComplete && <AdminSignup/>}
                {props.adminInfoComplete && !props.businessInfoComplete && <BusinessInfoEnter/>}
                {props.businessInfoComplete && !props.businessScheduleComplete && <BusinessScheduleCreate/>}
                {props.businessScheduleComplete && !props.showAdminDropDown && props.kindOfBusiness !== "Restaurant" && <BookingColumnsEnter/>}
            </div>
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
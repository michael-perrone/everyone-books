import React, {useEffect, useState} from 'react';
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
import LogoSpinner from '../Shared/LogoSpinner/LogoSpinner';



const BusinessSignup = (props) => {
    const [progress, setProgress] = useState(0);

    useEffect(function() {
        if (props.kindBusinessCompleted) {
            setProgress(1)
        }
        if (!props.kindBusinessCompleted) {
            setProgress(0)
        }
    }, [props.kindBusinessCompleted])

    useEffect(function() {
        if (props.adminInfoComplete) {
            setProgress(3);
        }
        if (!props.adminInfoComplete && props.kindBusinessCompleted) {
            setProgress(1);
        }
    }, [props.adminInfoComplete])

    useEffect(function() {
        if (props.businessInfoComplete) {
            setProgress(5)
        }
        else if (!props.businessInfoComplete && props.adminInfoComplete) {
            setProgress(3)
        }
    }, [props.businessInfoComplete])

     useEffect(function() {
        if (props.businessScheduleComplete) {
            setProgress(7)
        }
        if (!props.businessScheduleComplete && props.businessInfoComplete) {
            setProgress(5)
        }
    }, [props.businessScheduleComplete])

    useEffect(function() {
        if (props.bookingColumnsComplete) {
            setProgress(8);
        }
    },[props.bookingColumnsComplete])

    return (
    <React.Fragment>
        <FakeNav/> 
        <div id={styles.bSignupContainer}>
        <div>
        <LogoSpinner progress={progress}/>
        </div>
            <div id={styles.welcomeContainer}>
                <div style={{position: 'relative'}}>
                    {(props.showAdminDropDown || props.businessScheduleComplete || props.businessInfoComplete || props.adminInfoComplete || props.kindBusinessCompleted) && <BackButton marginTop={!!props.showAdminDropDown}/>}
                    {!props.kindBusinessCompleted && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid #f9e9f9', paddingBottom: '5px', color: '#f9e9f9'}}>
                    We appreciate your interest in Everyone Books. Let's get you started right away! 
                    </p>}
                    {props.kindBusinessCompleted && !props.adminInfoComplete && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid #f9e9f9', paddingBottom: '5px', color: '#f9e9f9'}}>
                    Now we need some information about you so we can create your administrator account.
                    </p>}
                    {props.adminInfoComplete && !props.businessInfoComplete && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid #f9e9f9', paddingBottom: '5px', color: '#f9e9f9'}}>Please provide about your business like the Street Address, City, Zip, and State.</p>}
                    {props.businessInfoComplete && !props.businessScheduleComplete && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid #f9e9f9', paddingBottom: '5px', color: '#f9e9f9'}}>Enter the open/close times for your business. Your Schedule will use these times. </p>}
                    {props.businessScheduleComplete && !props.showAdminDropDown && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid #f9e9f9', paddingBottom: '5px', color: '#f9e9f9'}}>We are about done, read the diretions below to finish up. Click help if any help is needed.</p>}
                    {props.showAdminDropDown && <p style={{fontSize: '18px', textAlign: 'center', borderBottom: '2px solid #f9e9f9', paddingBottom: '5px', color: '#f9e9f9'}}>We're just going to make sure we have all your information correctly, click the back button to go back and edit your information if needed.</p>}
                </div>
                {(props.kindOfBusiness === "" || props.nameOfBusiness === "" || props.kindBusinessCompleted === false)  && <KindOfBusiness/>}
                {props.kindBusinessCompleted && !props.adminInfoComplete && <AdminSignup/>}
                {props.adminInfoComplete && !props.businessInfoComplete && <BusinessInfoEnter/>}
                {((props.businessInfoComplete && !props.businessScheduleComplete) || (props.kindOfBusiness === "Restaurant" && props.restaurantSendNotHit && props.businessInfoComplete && props.adminInfoComplete)) && <BusinessScheduleCreate/>}
                {props.businessScheduleComplete && !props.showAdminDropDown && props.kindOfBusiness !== "Restaurant" && <BookingColumnsEnter/>}
            </div>
        </div>
    </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        restaurantSendNotHit: state.newReducers.restaurantSendNotHit,
        businessScheduleComplete: state.newReducers.businessScheduleComplete,
        businessInfoComplete: state.newReducers.businessInfoComplete,
        adminInfoComplete: state.newReducers.adminInfoComplete,
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness,
        kindBusinessCompleted: state.newReducers.kindBusinessCompleted,
        showAdminDropDown: state.newReducers.showDropDown,
        bookingColumnsComplete: state.newReducers.bookingColumnsComplete
    }
}

export default connect(mapStateToProps)(BusinessSignup);
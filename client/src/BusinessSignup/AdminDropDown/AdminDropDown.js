import React from 'react';
import styles from '../BusinessSignup.module.css';
import {connect} from 'react-redux';
import axios from 'axios';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import { ADMIN_REGISTER_SUCCESS } from '../../actions/actions';
import {withRouter} from 'react-router-dom';


const AdminDropDown = (props) => {

    function sendAllInfo() {
        console.log(props.nameOfBusiness)
        console.log(props.kindOfBusiness)
        const allInfo = {
           adminInfo: props.adminInfo, businessInfo: props.businessInfo, schedule: props.businessSchedule,
           businessName: props.nameOfBusiness, typeOfBusiness: props.kindOfBusiness, bookingColumnNumber: props.bookingColumnNumber
        }
        console.log(allInfo)
        axios.post('/api/adminSignup', allInfo).then(
            response => {
                if (response.data.token) {
                    props.adminRegister(response.data.token);
                    console.log(props.admin)
                    props.history.push(`/admin/${props.admin.admin.id}`)
                }
            }
        ).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={styles.adminDropDownHide}>
                <p>Type of Business: {props.kindOfBusiness}</p>
                <p>Name of Business: {props.nameOfBusiness}</p>
                <p>Name: {props.adminInfo.firstName} {props.adminInfo.lastName}</p>
                <p>Email: {props.adminInfo.email}</p>
                <p>Street: {props.businessInfo.address}</p>
                <p>City: {props.businessInfo.city}</p>
                <p>State: {props.businessInfo.state}</p>
                <p>Zip Code: {props.businessInfo.zip}</p>
                <p>Phone Number: {props.businessInfo.phoneNumber}</p>
                <p>Website: {props.businessInfo.website}</p>
                <p>Sunday Open/Close: {props.businessSchedule[0].open}-{props.businessSchedule[0].close}</p>
                <p>Monday Open/Close: {props.businessSchedule[1].open}-{props.businessSchedule[1].close}</p>
                <p>Tuesday Open/Close: {props.businessSchedule[2].open}-{props.businessSchedule[2].close}</p>
                <p>Wendesday Open/Close: {props.businessSchedule[3].open}-{props.businessSchedule[3].close}</p>
                <p>Thursday Open/Close: {props.businessSchedule[4].open}-{props.businessSchedule[4].close}</p>
                <p>Friday Open/Close: {props.businessSchedule[5].open}-{props.businessSchedule[5].close}</p>
                <p>Saturday Open/Close: {props.businessSchedule[6].open}-{props.businessSchedule[6].close}</p>
            <SubmitButton onClick={sendAllInfo}>All Good!</SubmitButton>
        </div>
          
    )
}

const mapStateToProps = state => {
    return {
        admin: state.authReducer.admin,
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness,
        adminInfo: state.newReducers.adminInfo,
        businessInfo: state.newReducers.businessInfo,
        businessSchedule: state.newReducers.businessSchedule,
        bookingColumnType: state.newReducers.bookingColumnType,
        bookingColumnNumber: state.newReducers.bookingColumnNumber
    }
}

const mapDispatchToProps = dispatch => {
    return {
        adminRegister: (adminToken) => dispatch({type: ADMIN_REGISTER_SUCCESS, payload: {adminToken}})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminDropDown));
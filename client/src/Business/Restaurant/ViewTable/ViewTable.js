import React, {useEffect, useState} from 'react';
import styles from './ViewTable.module.css';
import Maplist from '../../../Shared/Maplist/Maplist';
import ServiceList from '../../../Shared/ServiceList/ServiceList';
import { createMaplist } from '../../../feutils/feutils';
import x from '../../BookingHelpers/AdminBooking/x.png';
import StatementAppear from '../../../Shared/StatementAppear/StatementAppear';
import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import Axios from 'axios';
import {connect} from 'react-redux';
import {EXIT_NUM} from '../../../actions/actions';


function ViewTable(props) {
    const [time, setTime] = useState(props.booking.time);
    const [cost, setCost] = useState(props.booking.cost)
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [custoName, setCustoName] = useState("");
    const [custoPhone, setCustoPhone] = useState("");
    const [custo, setCusto] = useState({});

    // check this -- make it so that

    function deleteBooking() {
        // Axios.post("/api/iosBooking/delete", {bookingId: props.booking._id}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
        //     if (response.status === 200) {
        //         props.hide();
        //         setSuccessMessage("");
        //         setTimeout(setSuccessMessage("Booking successfully deleted"));
        //         if (props.adminToken) {
        //             props.reload();
        //         }
        //         else {
        //             //props.addExitNum();
        //         }
        //     }
        // }).catch(error => {
        //     console.log(error);
        // })
    }


    function hide() {
        props.hide();
        if (props.employeeToken) {
            props.addExitNum();
            console.log("yoooo");
        }
    }

    function getCustomer() {
        Axios.post('api/restaurant/getCustomer')
    }

    function enterPhone() {
        Axios.post('api/iosBooking/updateCusto', {bookingId: props.booking._id, phone: custoPhone, name: custoName}, {headers: {'x-auth-token': props.adminToken}}).then(
            response => {
                if (response.status === 200) {
                    setCusto(response.data.custo);
                }
            }
        )
    }


    return (
        <div id={styles.viewBookingContainer}>
            <p style={{fontWeight: "bold", fontSize: "18px", position: "absolute", top: 5}}>Table Info</p>
            <img id={styles.x} onClick={hide} style={{position: "absolute", cursor: "pointer"}} src={x}/>
            <div id={styles.leftContainer}>
                <div>
                    <p className={styles.bolder}>Employee Name:</p>
                    <p className={styles.fontFourteen}>{props.booking.employee.fullName}</p>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p className={styles.bolder}>Customer Name:</p>
                   {(props.booking.customer || custo.fullName) ? <p className={styles.fontFourteen}>{props.booking.customer ? props.booking.customer.fullName : custo.fullName}</p> : <input onChange={(e) => setCustoName(e.target.value)} style={{width: "120px", height: "26px", border: "none", border: "1px solid white", fontSize: "12px", paddingLeft: "3px", paddingRight: "3px"}} placeholder='Customer Name'/>}
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p className={styles.bolder}>Customer Phone:</p>
                   {props.booking.customer || custo.phoneNumber ? <p className={styles.fontFourteen}>{props.booking.customer ? props.booking.customer.phoneNumber : custo.phoneNumber}</p> : <input onChange={(e) => setCustoPhone(e.target.value)} style={{width: "120px", height: "26px", border: "none", border: "1px solid white", fontSize: "12px", paddingLeft: "3px", paddingRight: "3px"}} placeholder='Customer Phone'/>}
                  {(!props.booking.customer && !custo.phoneNumber) && <button onClick={enterPhone} style={{backgroundColor: "lightgreen", border: "0.2px solid white", color: "black", paddingTop: "4px", paddingBottom: "4px", width: "80px", marginTop: "16px", fontWeight: "bold", marginLeft: "20px"}}>Enter</button>}
                </div>
                <div>
                    <p className={styles.bolder}>Time of Booking:</p>
                    <p className={styles.fontFourteen}>{props.booking.timeStart}</p>
                </div>
                <div>
                    <p className={styles.bolder}>Date of Booking:</p>
                    <p className={styles.fontFourteen}>{props.booking.date}</p>
                </div>
                 <div>
                    <p className={styles.bolder}>Cost of Booking:</p>
                    <p className={styles.fontFourteen}>{cost}</p>
                </div>
                <button onClick={deleteBooking} style={{backgroundColor: "salmon", color: "black", height: "35px", width: "120px", position: "absolute", bottom: "10px", fontWeight: "bold", boxShadow: "0px 0px 2px #f9e9f9", border: "none"}}>Delete Booking</button>
            </div>
            <div style={{width: "200px"}}>

            </div>
            <OtherAlert showAlert={successMessage !== ""} alertMessage={successMessage} alertType={"success"}/>
             <OtherAlert showAlert={error !== ""} alertMessage={error} alertType={"notgood"}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      adminToken: state.authReducer.adminToken,
      employeeToken: state.authReducer.employeeToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addExitNum: () => dispatch({type: EXIT_NUM})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewTable);
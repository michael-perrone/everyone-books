import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import DateDrop from '../../Shared/DateDrop/DateDrop'
import styles from './PayrollCenter.module.css';
import PayrollSub from './PayrollSub/PayrollSub';
import Spinner from '../../Spinner/Spinner';



function PayrollCenter(props) {

    const [error, setError] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState('');
    const [payrolls, setPayrolls] = React.useState([]);
    const [payrollNumbers, setPayrollNumbers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [didntWork, setDidntWork] = React.useState(false);
    
    React.useEffect(function() {
        if (startDate === endDate && startDate === "") {
            return;
        }
        setLoading(true);
        axios.get('/api/payroll', {headers: {'x-auth-token': props.adminToken}}).then(
            firstResponse => {
                axios.post('/api/payroll/getPayrollInfo', {startDate, endDate}, {headers: {'x-auth-token': props.adminToken}}).then(
                    response => {
                        setPayrollNumbers(response.data.payrollNums);
                        setLoading(false);
                    }
                )
                setPayrolls(firstResponse.data.emPayrolls);
            }
        ).catch(error => {
            if (error.response.status === 406) {
                setError("You have no employees registered at your business.")
                setLoading(false);
            }
            else if (error.response.status === 405) {
                setError("No payroll information has been registered. You can enter this information in the edit business/payroll section.");
                setLoading(false);
            }
            else if (error.response.status === 400) {
                setError("The start date cannot be after the end date.");
                setLoading(false);
            }
            setDidntWork(true);
        })
    }, [startDate, endDate])


    function toSetStartDateString(dateString1) {
         setStartDate(dateString1);
    }

    function toSetEndDateString(dateString1) {
        setEndDate(dateString1)
    }


    return (
        <div id={styles.main}>
          {!didntWork && <div id={styles.top} style={{paddingBottom: "20px", borderBottom: "0.5px solid #f9e9f9"}}>
            <div className={styles.subContainer}>
                <p style={{marginTop: "10px", fontSize: "18px"}}>Start Date:</p>
                <DateDrop setDateString={(dateString) => toSetStartDateString(dateString)}/>
            </div>
           
            <div className={styles.subContainer}>
                <p style={{marginTop: "10px", fontSize: "18px"}}>End Date:</p>
                <DateDrop setDateString={(dateString) => toSetEndDateString(dateString)}/>
            </div>
            </div>}
            {didntWork && <p style={{fontSize: "16px", marginTop: "20px", textAlign: "center"}}>{error}</p>}
            <OtherAlert alertType={"fail"} alertMessage={error} showAlert={error !== ""} />
            <div style={{marginTop: "20px", opacity: loading ? 0.3 : 1}}>
            {payrolls.map((payroll,index) => {
                return <PayrollSub numbers={payrollNumbers && payrollNumbers.length > 0 ? payrollNumbers[index] : {}} key={payroll._id} payrollInfo={payroll}/>
            })}
            </div>
            {loading &&
            <div style={{position: "absolute", top: 100, left: '45%'}}>
                 <Spinner/>
            </div>}
        </div> 
       
    )
}



const mapStateToProps = state => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapStateToProps)(PayrollCenter);
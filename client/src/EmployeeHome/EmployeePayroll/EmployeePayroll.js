import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';
import DateDrop from '../../Shared/DateDrop/DateDrop'
import styles from './EmployeePayroll.module.css';
import Spinner from '../../Spinner/Spinner';
import Container from '../../Shared/Container/Container';


function PayrollCenter(props) {

    const [error, setError] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState('');
    const [payrollInfo, setPayrollInfo] = React.useState([]);
    const [numbers, setPayrollNumbers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [didntWork, setDidntWork] = React.useState(false);
   

    React.useEffect(function() {
        if (startDate === endDate && startDate === "") {
            return;
        }
        setLoading(true);
        axios.post('/api/payroll', {startDate, endDate}, {headers: {'x-auth-token': props.employeeToken}}).then(
            response => {
                setPayrollNumbers(response.data.payrollNums);
                setLoading(false);
                setPayrollInfo(response.data.emPayroll);
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
          {!didntWork && <div id={styles.top} style={{paddingBottom: "20px", borderBottom: "0.5px solid black"}}>
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
            <div style={{fontFamily: "Times New Roman"}} className={styles.payrollSubContainer}>
            <p className={styles.info} style={{fontSize: "22px", marginBottom: "20px"}}>{payrollInfo.employeeName}</p>
             <Container width={"85%"} backgroundColor={"lavenderblush"}>
            <div style={{display: "flex", justifyContent: "space-around"}}>
            <div>
            <p className={styles.info}>Hourly Wage: ${payrollInfo.hourly !== "" ? Number(payrollInfo.hourly).toFixed(2) : 0}</p>
            <p className={styles.info}>Hours Worked: {numbers.hours}</p>
            <p className={styles.info}>Hour Average Per Shift: {(numbers.hours / numbers.shiftsCounter).toFixed(2) !== "NaN" ? (numbers.hours / numbers.shiftsCounter).toFixed(2) : 0}</p>
            <p className={styles.info}>Service Revenue per Hour: ${(Number(numbers.serviceTotal) / numbers.hours).toFixed(2) !== "NaN" ? (Number(numbers.serviceTotal) / numbers.hours).toFixed(2) : 0}</p>
            <p className={styles.info} style={{fontWeight: "bold"}}>Hourly Wage Earnings: ${(numbers.hours * payrollInfo.hourly).toFixed(2)}</p>
            </div>
            <div>
            <p className={styles.info}>Services Performed: {numbers.serviceNumber}</p>
            <p className={styles.info}>Services Performed Per Shift: {(numbers.serviceNumber / numbers.shiftsCounter).toFixed(2) !== "NaN" ? (numbers.serviceNumber / numbers.shiftsCounter).toFixed(2) : 0}</p>
            <p className={styles.info}>Dollars In Services: ${Number(numbers.serviceTotal).toFixed(2)}</p>
            <p className={styles.info}>Salary: ${payrollInfo.salary !== "" ? Number(payrollInfo.salary).toFixed(2) : 0}</p>
            <p className={styles.info} style={{fontWeight: "bold"}}>Salary Earned: {numbers.salary}</p>
            </div>
            <div>
            <p className={styles.info}>Service Comission Rate: {payrollInfo.scp !== "" ? `%${payrollInfo.scp}`: `None`}</p>
            <p className={styles.info}>Service Commission Earned: {numbers.serviceEarned}</p>
            <p className={styles.info}>Product Comission Rate: {payrollInfo.pcp !== "" ? `%${payrollInfo.pcp}`: `None`}</p>
            <p className={styles.info}>Product Commission Earned: {numbers.productEarned}</p>
             {numbers.serviceEarned && numbers.productEarned &&  <p className={styles.info} style={{fontWeight: "bold"}}>Total Earned: ${(Number(numbers.serviceEarned.split("$")[1]) + Number(numbers.productEarned.split("$")[1]) +
             (numbers.hours * payrollInfo.hourly) + Number(numbers.salary.split("$")[1])).toFixed(2)}</p>}
            </div>
            </div>
            </Container>
        </div>
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
        employeeToken: state.authReducer.employeeToken
    }
}

export default connect(mapStateToProps)(PayrollCenter);
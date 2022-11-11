import React from 'react';
import Container from '../../../Shared/Container/Container';
import styles from './PayrollSub.module.css';



function PayrollSub(props) {
    if (props.numbers.serviceEarned) {
        console.log(((Number(props.numbers.serviceEarned.split("$")[1]) + Number(props.numbers.productEarned.split("$")[1]) +
             (props.numbers.hours * props.payrollInfo.hourly) + Number(props.numbers.salary.split("$")[1])).toFixed(2)),  props.numbers.hours);
    }
    return (
        <div style={{fontFamily: "Times New Roman"}} className={styles.payrollSubContainer}>
            <p className={styles.info} style={{fontSize: "22px", marginBottom: "20px"}}>{props.payrollInfo.employeeName}</p>
             <Container width={"85%"} backgroundColor={"lavenderblush"}>
            <div style={{display: "flex", justifyContent: "space-around"}}>
            <div>
            <p className={styles.info}>Hourly Wage: ${props.payrollInfo.hourly !== "" ? Number(props.payrollInfo.hourly).toFixed(2) : 0}</p>
            <p className={styles.info}>Hours Worked: {props.numbers.hours}</p>
            <p className={styles.info}>Hour Average Per Shift: {(props.numbers.hours / props.numbers.shiftsCounter).toFixed(2) !== "NaN" ? (props.numbers.hours / props.numbers.shiftsCounter).toFixed(2) : 0}</p>
            <p className={styles.info}>Service Revenue per Hour: ${(Number(props.numbers.serviceTotal) / props.numbers.hours).toFixed(2) !== "NaN" ? (Number(props.numbers.serviceTotal) / props.numbers.hours).toFixed(2) : 0}</p>
            <p className={styles.info} style={{fontWeight: "bold"}}>Hourly Wage Earnings: ${(props.numbers.hours * props.payrollInfo.hourly).toFixed(2)}</p>
            </div>
            <div>
            <p className={styles.info}>Services Performed: {props.numbers.serviceNumber}</p>
            <p className={styles.info}>Services Performed Per Shift: {(props.numbers.serviceNumber / props.numbers.shiftsCounter).toFixed(2) !== "NaN" ? (props.numbers.serviceNumber / props.numbers.shiftsCounter).toFixed(2) : 0}</p>
            <p className={styles.info}>Dollars In Services: ${Number(props.numbers.serviceTotal).toFixed(2)}</p>
            <p className={styles.info}>Salary: ${props.payrollInfo.salary !== "" ? Number(props.payrollInfo.salary).toFixed(2) : 0}</p>
            <p className={styles.info} style={{fontWeight: "bold"}}>Salary Earned: {props.numbers.salary}</p>
            </div>
            <div>
            <p className={styles.info}>Service Comission Rate: {props.payrollInfo.scp !== "" ? `%${props.payrollInfo.scp}`: `None`}</p>
            <p className={styles.info}>Service Commission Earned: {props.numbers.serviceEarned}</p>
            <p className={styles.info}>Product Comission Rate: {props.payrollInfo.pcp !== "" ? `%${props.payrollInfo.pcp}`: `None`}</p>
            <p className={styles.info}>Product Commission Earned: {props.numbers.productEarned}</p>
             {props.numbers.serviceEarned && props.numbers.productEarned &&  <p className={styles.info} style={{fontWeight: "bold"}}>Total Earned: ${(Number(props.numbers.serviceEarned.split("$")[1]) + Number(props.numbers.productEarned.split("$")[1]) +
             (props.numbers.hours * props.payrollInfo.hourly) + Number(props.numbers.salary.split("$")[1])).toFixed(2)}</p>}
            </div>
            </div>
            </Container>
        </div>
        
    )
}

export default PayrollSub;
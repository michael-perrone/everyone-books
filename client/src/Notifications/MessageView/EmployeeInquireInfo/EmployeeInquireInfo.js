import React from 'react';

function EmployeeInquireInfo(props) {
    return (
        <div style={{marginTop: "30px"}}>
            <p style={{marginTop: "10px"}}>Full Name: {props.fullName}</p>
            <p style={{marginTop: "10px"}}>Phone Number: {props.phoneNumber}</p>
            <p style={{marginTop: "10px"}}>Job Titles: {props.jobTitle}</p>
            <p style={{marginTop: "10px"}}>Preferred Hours: {props.preferredHours}</p>
            <p style={{marginTop: "10px"}}>Currently Working: {props.currentlyWorking}</p>
            <p style={{marginTop: "10px"}}>Preferred Wage: {props.preferredWage}</p>
            <p style={{marginTop: "10px"}}>Urgency of Hiring: {props.urgent}</p>
        </div>
    )
}

export default EmployeeInquireInfo;
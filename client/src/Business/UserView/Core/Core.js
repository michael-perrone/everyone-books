import React from 'react';
import styles from './Core.module.css';
import Axios from 'axios';
import StatementAppear from '../../../Shared/StatementAppear/StatementAppear';

const Core = (props) => {
    const [serviceChosen, setServiceChosen] = React.useState('');
    const [dateChosen, setDateChosen] = React.useState('');
    const [employees, setEmployees] = React.useState([]);
    const [employeeChosen, setEmployeeChosen] = React.useState('');

    React.useEffect(() => {
        setEmployees(props.employees)
    }, [props.employees])

    function getDate(e) {
        let dateArray = e.target.value.split('-');
         setDateChosen(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString())
    }

    React.useEffect(() => {
        if (dateChosen) {
        Axios.post('/api/employees_dates/dates', {date: dateChosen, businessId: props.business._id}).then(
            response => {
                setEmployees(response.data.availableEmployees)
            }
          )
          setEmployeeChosen({})
        }
    }, [dateChosen])

    function setService(service) {
            return () => {
            setServiceChosen(service)
        }
    }

    function setEmployee(employee) {
        return () => {
        setEmployeeChosen(employee)
        }
    }

    return (
            <div id={styles.actualCoreContainer}>
            <div>
             <div style={{display: 'flex'}}>
                <p style={{marginRight: '6px'}}>Select Service:</p>
                <select style={{width: '138px'}}>
                    <option> </option>
                    {props.services.map(service => {
                        return <option onClick={setService(service)}>{service.serviceName}</option>
                    })}
                </select>
             </div>
             <div style={{display: 'flex', marginTop: '26px'}}>
                <p style={{marginRight: '6px'}}>Select Date:</p>
                <input onChange={getDate} type="date" style={{width: '153px'}}/>
             </div>
             <StatementAppear appear={!!dateChosen}>
             <div style={{display: 'flex', marginTop: '26px'}}>
                <p style={{marginRight: '6px'}}>Employee:</p>
                <select style={{width: '162px'}}>
                    <option> </option>
                    {employees && employees.map(employee => {
                        return <option onClick={setEmployee(employee)}>{employee.fullName}</option>
                    })}
                </select>
             </div>
             </StatementAppear>
             </div>
            </div>
    )
}

export default Core;
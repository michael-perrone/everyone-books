import React from 'react';
import styles from './Core.module.css';

const Core = (props) => {
    const [serviceChosen, setServiceChosen] = React.useState('');
    const [dateChosen, setDateChosen] = React.useState('');
    const [employees, setEmployees] = React.useState(props.employees)

    function getDate(e) {
        let dateArray = e.target.value.split('-');
         setDateChosen(new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2]).toDateString())
    }

    

    function setService(service) {
            return () => {
            setServiceChosen(service)
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
             <div style={{display: 'flex', marginTop: '12px'}}>
                <p style={{marginRight: '6px'}}>Select Date:</p>
                <input onChange={getDate} type="date" style={{width: '150px'}}/>
             </div>
             </div>
            </div>
    )
}

export default Core;
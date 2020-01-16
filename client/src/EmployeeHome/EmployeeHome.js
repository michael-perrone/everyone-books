import React from 'react';
import styles from './EmployeeHome.module.css';
import Schedule from '../Shared/Nav/Schedule/Schedule';

const EmployeeHome = () => {
    return (
        <div id={styles.employeeHome}>
            <Schedule/>
        </div>
    )
}

export default EmployeeHome;
import React from 'react';
import WeekSelector from './WeekSelector/WeekSelector';
import styles from './BusinessScheduleHelper.module.css';
import EmployeeSelector from './EmployeeSelector/EmployeeSelector';
import ShiftTimeSelector from './ShiftTimeSelector/ShiftTimeSelector';


const BusinessScheduleHelper = () => {
    return (
        <div id={styles.businessScheduleHelperContainer}>
            <WeekSelector/>
            <EmployeeSelector/>
            <ShiftTimeSelector/>
        </div>
    )
}

export default BusinessScheduleHelper;
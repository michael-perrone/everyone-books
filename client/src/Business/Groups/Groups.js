import React from 'react';
import styles from './Groups.module.css';
import CreateGroup from './CreateGroup/CreateGroup';
import GroupSchedule from './GroupSchedule/GroupSchedule';

function Groups(props) {
    return (
        <div id={styles.main}>
            <CreateGroup/>
            <GroupSchedule/>
        </div>
    )
}

export default Groups;
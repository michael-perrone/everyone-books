import React from 'react';
import styles from './UserRestaurant.module.css';
import OtherLeftSide from '../OtherLeftSide/OtherLeftSide.js'


function UserRestaurant(props) {
    return (
        <div id={styles.urContainer}>
            <OtherLeftSide business={props.business} profile={props.profile} schedule={props.business.schedule}/>
        </div>
    )

}

export default UserRestaurant;
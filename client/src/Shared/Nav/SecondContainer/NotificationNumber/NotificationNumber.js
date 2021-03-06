import React from 'react';
import styles from '../../Nav.module.css';

const NotificationNumber = (props) => {
    return(
        <p style={{fontWeight: 'bold'}} className={props.user ? styles.notiNum : `${styles.notiNum}  ${styles.notiNumI}`}>
           {props.num} 
        </p>
    )
}

export default NotificationNumber;
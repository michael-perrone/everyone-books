import React from 'react';
import styles from './TemporaryStatement.module.css';

const TemporaryStatement = props => {
    return (
        <p style={{marginTop: props.marginTop ? props.marginTop : ""}} className={styles.vanished} id={props.show ? styles.show : ''}>{props.children}</p>
    )
}

export default TemporaryStatement;
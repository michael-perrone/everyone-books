import React from 'react';
import styles from './StatementAppear.module.css';

const StatementAppear = (props) => {
    return (
        <div style={{marginTop: props.marginTop}} className={styles.hide} id={props.appear ? styles.appear: ""}>{props.children}</div>
    )
}

export default StatementAppear;
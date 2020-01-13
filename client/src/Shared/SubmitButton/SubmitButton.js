import React from 'react';
import styles from './SubmitButton.module.css'

const SubmitButton = (props) => {
    return <button id={styles.subButton} style={{marginTop: props.marginTop }} onClick={props.onClick}>{props.children}</button>
}

export default SubmitButton;
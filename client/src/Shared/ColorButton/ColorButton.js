import React from "react";
import { useState  } from "react";
import styles from '../ColorButton/ColorButton.module.css';

function YesNoButton(props) {

    function buttonSelected() {
       props.clicked();
    }
    
    return (
        <button className={styles.colorButton} style={{color: props.selected ? "#f9e9f9" : "", backgroundColor: props.backgroundColor}} onClick={buttonSelected}>{props.children}</button>
    )
    }

export default YesNoButton;
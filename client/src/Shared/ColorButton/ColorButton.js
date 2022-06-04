import React from "react";
import { useState  } from "react";
import styles from '../ColorButton/ColorButton.module.css';

function YesNoButton(props) {
    function buttonSelected() {
       props.clicked();
    }
    
    return (
        <button className={styles.colorButton} style={{backgroundColor: props.backgroundColor, color: props.selected ? "lavenderblush" : ""}} onClick={buttonSelected}>{props.children}</button>
    )
    }

export default YesNoButton;
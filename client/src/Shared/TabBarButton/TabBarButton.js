import React, {useState} from "react";
import styles from './TabBarButton.module.css';

function TabBarButton(props) {

    return(
        <div id={props.selected ? styles.selected : ""} onClick={props.onClick} className={styles.tabButton}  style={{width: props.width}}>
            <img style={{paddingTop: props.padTop, height: "40px"}} src={props.image} alt={" "}/>
            <p className={styles.tabLabel}>{props.label}</p>
        </div>
    )
}

export default TabBarButton;
import React from 'react';
import styles from "./OptionDrop.module.css";

function OptionDrop(props) {

       return (
        <select id={styles.optionDrop}>
            {props.options.map(element => {
                return (
                    <option key={element.id} onClick={props.select(element.id)}>{element.displayName}</option>
                )
            })}
        </select>
    )
}


export default OptionDrop;
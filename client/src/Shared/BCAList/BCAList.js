import React, {useState, useEffect} from 'react';
import styles from './BCAList.module.css';

function BCAList(props) {


    return (
        <div style={{width: props.small ? "220px" : "", maxWidth: props.small ? "220px" : ""}} id={styles.container}>
            {props.bcnList.map((element, index) => {
                if (element !== props.selectedBcn) {
                    return <p key={index} onClick={props.selectBcn(element)} className={`${styles.bcn} ${styles.selectable}`}>{element}</p> 
                }
                else {
                    return <p key={index} style={{backgroundColor: "gray", color: 'lavenderblush'}} className={styles.bcn}>{element}</p>
                }
            })}
        </div>
    )

}

export default BCAList;
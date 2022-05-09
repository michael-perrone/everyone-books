import React, {useState, useEffect} from 'react';
import styles from './BCAList.module.css';

function BCAList(props) {


    return (
        <div id={styles.container}>
            {props.bcnList.map((element, index) => {
                if (element !== props.selectedBcn) {
                    return <p key={index} onClick={props.selectBcn(element)} className={styles.bcn}>{element}</p> 
                }
                else {
                    return <p key={index} style={{backgroundColor: "gray", color: 'lavenderblush'}} className={styles.bcn}>{element}</p>
                }
            })}
        </div>
    )

}

export default BCAList;
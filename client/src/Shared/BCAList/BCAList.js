import React, {useState, useEffect} from 'react';
import styles from './BCAList.module.css';

function BCAList(props) {


    return (
        <div id={styles.container}>
            {props.bcnList.map(element => {
                if (element !== props.selectedBcn) {
                    return <p onClick={props.selectBcn(element)} className={styles.bcn}>{element}</p> 
                }
                else {
                    return <p style={{backgroundColor: "gray", color: 'lavenderblush'}} className={styles.bcn}>{element}</p>
                }
            })}
        </div>
    )

}

export default BCAList;
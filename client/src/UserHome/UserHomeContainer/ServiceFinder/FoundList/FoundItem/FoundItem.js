import React from 'react';
import styles from './FoundItem.module.css';

function FoundList(props) {
    return (
        <div className={styles.container}>
            <p>{props.children}</p>
            <button onClick={props.go(props.children)} className={styles.butto} style={{borderRadius: "50%", height: "30px", position: "relative", top: "-8px", width: "30px", border: "none"}}>
            </button>
        </div>
    )
}


export default FoundList;
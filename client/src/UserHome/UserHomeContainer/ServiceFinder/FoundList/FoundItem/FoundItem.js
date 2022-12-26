import React from 'react';
import styles from './FoundItem.module.css';

function FoundList(props) {
    return (
        <div onClick={props.go(props.id)} className={styles.container}>
            <p style={{paddingBottom: "-20px"}}>{props.children}</p>
            <p>{props.bn}</p>
            <p>${props.cost.toFixed(2)}</p>
        </div>
    )
}


export default FoundList;
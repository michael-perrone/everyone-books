import React from 'react';
import styles from './FoundList.module.css';
import FoundItem from './FoundItem/FoundItem';

function FoundList(props) {
    console.log(props);
    return (
        <div style={{marginTop: "50px"}}>
            {props.found && props.found.map(item => {
                return <FoundItem go={props.go}>{item.serviceName}</FoundItem>
            })}
        </div>
    )
}


export default FoundList;
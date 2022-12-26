import React from 'react';
import styles from './FoundList.module.css';
import FoundItem from './FoundItem/FoundItem';

function FoundList(props) {
    return (
        <div style={{marginTop: "40px"}}>
            {props.found && props.found.map(item => {
                return <FoundItem go={props.go} cost={item.service.cost} bn={item.business.businessName} id={item.business._id}>{item.service.serviceName}</FoundItem>
            })}
        </div>
    )
}


export default FoundList;
import React from 'react';
import styles from './ServicesTab.module.css';

const ServicesTab = props => { 
    return (
        props.services.length ?
        <div id={styles.yooo} style={{display: 'flex', position: "relative", left: "-2px", width: "250px"}}>
         <div>
            {props.services.map(service => {
                return <p style={{fontFamily: "Josefin Sans", fontSize: "20px", marginTop: "8px"}}>{service.serviceName}</p>
            })}
         </div>
         <div>
            {props.services.map(service => {
                return <p style={{fontSize: "20px", marginTop: "8px", marginLeft: "20px", fontWeight: "bold"}}>${service.cost}</p>
            })}
         </div>
        </div>
        :
        <p style={{textAlign: "center", marginTop: "20px"}}>This business has no services.</p>
    )
}

export default ServicesTab;
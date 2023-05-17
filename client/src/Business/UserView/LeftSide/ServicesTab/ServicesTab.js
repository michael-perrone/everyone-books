import React from 'react';
import styles from './ServicesTab.module.css';

const ServicesTab = props => { 
    return (
        props.services.length ?
        <div id={styles.yooo} style={{display: 'flex', position: "relative", left: "-2px", width: "250px", paddingLeft: "25px", paddingTop: "6px", paddingBottom: "10px", borderRadius: "4px", boxShadow: "0px 0px 4px #f9e9f9", backgroundColor: "rgb(24,24,24)", marginBottom: "50px"}}>
         <div>
            {props.services.map(service => {
                return <p style={{fontFamily: "Josefin Sans", fontSize: "18px", marginTop: "8px"}}>{service.serviceName}</p>
            })}
         </div>
         <div>
            {props.services.map(service => {
                return <p style={{fontSize: "18px", marginTop: "8.1px", marginLeft: "20px", fontWeight: "bold"}}>${service.cost}</p>
            })}
         </div>
        </div>
        :
        <p style={{textAlign: "center", marginTop: "20px"}}>This business has no services.</p>
    )
}

export default ServicesTab;
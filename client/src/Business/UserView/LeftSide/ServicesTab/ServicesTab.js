import React from 'react';

const ServicesTab = props => { 
    return (
        props.services.length ?
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
         <div style={{marginTop: '15px'}}>
            <p style={{textDecoration: 'underline', fontWeight: 'bold', marginLeft: "4px" }}>Service Name:</p>
            {props.services.map(service => {
                return <p  style={{marginTop: '5px', marginLeft: "4px"}}>{service.serviceName}</p>
            })}
         </div>
         <div style={{marginTop: '15px'}}>
            <p style={{textDecoration: 'underline', fontWeight: 'bold' }}>Cost:</p>
            {props.services.map(service => {
                return <p style={{marginTop: '5px', textAlign: 'center', position: 'relative', left: '-6px'}}>${service.cost}</p>
            })}
         </div>
        </div>
        :
        <p style={{textAlign: "center", marginTop: "20px"}}>This business has no services.</p>
    )
}

export default ServicesTab;
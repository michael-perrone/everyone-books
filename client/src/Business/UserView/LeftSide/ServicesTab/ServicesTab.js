import React from 'react';

const ServicesTab = props => { 
    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
         <div style={{marginTop: '15px'}}>
            <p style={{textDecoration: 'underline', fontWeight: 'bold' }}>Service Name:</p>
            {props.services.map(service => {
                return <p  style={{marginTop: '5px'}}>{service.serviceName}</p>
            })}
         </div>
         <div style={{marginTop: '15px'}}>
            <p style={{textDecoration: 'underline', fontWeight: 'bold' }}>Service Cost:</p>
            {props.services.map(service => {
                return <p style={{marginTop: '5px', textAlign: 'center', position: 'relative', left: '-4px'}}>${service.cost}</p>
            })}
         </div>
        </div>
    )
}

export default ServicesTab;
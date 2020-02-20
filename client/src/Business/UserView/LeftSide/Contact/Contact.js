import React from 'react';

const Contact = props => { 
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '450px', alignItems: 'center', fontSize: '18px'}}>
            <div style={{position: 'relative', top: '-20px'}}>
                <p style={{textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center', marginBottom: '6px'}}>Address:</p>
                <p>{props.business.address}</p>
                <p>{props.business.city}</p>
                <p>{props.business.state}</p>
                <p>{props.business.zip}</p>
            </div>
            <div style={{position: 'relative', top: '-20px'}}>
                <p style={{textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center', marginBottom: '6px'}}>Phone:</p>
                <p>{props.business.phoneNumber}</p>
            </div>

            <div style={{position: 'relative', top: '-20px'}}>
                <p style={{textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center', marginBottom: '6px'}}>Website:</p>
                <a href={`${props.business.website}`}>{props.business.website}</a>
            </div>
        </div>
    )
}

export default Contact;
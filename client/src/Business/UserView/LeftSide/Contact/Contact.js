import React from 'react';
import styles from './Contact.module.css';

const Contact = props => { 
    return (
        <div id={styles.f} style={{width: "250px",display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: "15px", fontSize: '18px'}}>
            <div style={{position: 'relative', top: '-20px'}}>
                <p style={{marginTop: "12px", fontSize: "18px", fontFamily: "Josefin Sans"}}>{props.business.address}</p>
                <p style={{marginTop: "12px", fontSize: "18px", fontFamily: "Josefin Sans"}}>{props.business.city}</p>
                <p style={{marginTop: "12px", fontSize: "18px", fontFamily: "Josefin Sans"}}>{props.business.state}</p>
                <p style={{marginTop: "12px", fontSize: "18px", fontFamily: "Josefin Sans"}}>{props.business.zip}</p>
            </div>
            <div className={styles.shooter} style={{position: 'relative'}}>        
                <p style={{fontSize: "18px", fontFamily: "Josefin Sans"}}>{props.business.phoneNumber}</p>
            </div>
            <div className={styles.shooter}>
                <p style={{ fontSize: "18px", fontFamily: "Josefin Sans"}}>{props.business.website}</p>
            </div>
        </div>
    )
}

export default Contact;
import React from 'react';
import styles from './LeftSide.module.css';

const LeftSide = (props) => {


    return (
        <div>
            <div className={styles.sideBar}>
            <p>{props.business.businessName}</p>
            <div className={styles.horizontalHolder}>
                <div className={styles.businessStuff}>
                    <p className={styles.basicP}>{props.business.address}</p>
                    <p className={styles.basicP}>{props.business.city}</p>
                    <p className={styles.basicP}>{props.business.state}</p>
                    <p className={styles.basicP} style={{marginBottom: '20px'}}>{props.business.zip}</p>
                    <p className={styles.basicP}>{props.business.phoneNumber}</p>
                    <p className={styles.basicP}>{props.business.website}</p>
                </div>
                <div className={styles.businessStuff}>
                <p style={{textDecoration: 'underline', fontWeight: 'bold', marginBottom: '14px', width: '100%', textAlign: 'center'}}>Services Offered: </p>
                {props.services.map(service => {
                    return <div style={{display: 'flex', justifyContent: 'space-around'}}><p>{service.serviceName}</p><p>${service.cost}</p></div>
                })}
            </div>
            </div>
            <div className={styles.horizontalHolder}>
                {props.profile.bio && 
                <div className={styles.businessStuff}>
                    <p style={{fontFamily: 'auto', lineHeight: '22px'}}>{props.profile.bio}</p>    
                </div>}
                {!props.profile.bio && 
                <div style={{fontFamily: 'auto'}} className={styles.businessStuff}>
                    <p>This business has not created a profile yet.</p>
                </div>
                }
                 <div style={{paddingLeft: '30px'}} className={styles.businessStuff}>
            <p style={{textDecoration: 'underline', fontWeight: 'bold', marginBottom: '14px'}}>Hours Of Operation:</p>
                {props.schedule && props.schedule.map((time, index) => {
                    let dayName;
                    if (index === 0) {
                        dayName = "Sun: "
                    }
                    else if (index === 1) {
                        dayName = "Mon: "
                    }
                    else if (index === 2) {
                        dayName = "Tue: "
                    }
                    else if (index === 3) {
                        dayName = "Wed: "
                    }
                    else if (index === 4) {
                        dayName = "Thu: "
                    }
                    else if (index === 5) {
                        dayName = "Fri: "
                    }
                    else if (index === 6) {
                        dayName = "Sat: "
                    }
                    return (<p className={styles.basicP}>{dayName}{time.open}-{time.close}</p>)
                })}
            </div>
            </div>
            </div>
        </div>
    )
}

export default LeftSide;
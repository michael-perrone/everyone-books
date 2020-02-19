import React from 'react';
import styles from './LeftSide.module.css';

const LeftSide = (props) => {


    return (
        <div>
            <div id={styles.sideBar}>
                <div className={styles.businessStuff}>
                    <p>{props.business.address}</p>
                    <p>{props.business.city}</p>
                    <p>{props.business.state}</p>
                    <p style={{marginBottom: '20px'}}>{props.business.zip}</p>
                    <p>{props.business.phoneNumber}</p>
                    <p>{props.business.website}</p>
                </div>
                {props.profile.bio && 
                <div className={styles.businessStuff}>
                    <p style={{fontFamily: 'auto', fontSize: '16px', lineHeight: '22px'}}>{props.profile.bio}</p>    
                </div>}
                {!props.profile.bio && 
                <div style={{fontFamily: 'auto'}} className={styles.businessStuff}>
                    <p>This business has not created a profile yet.</p>
                </div>
                }
            </div>
        </div>
    )
}

export default LeftSide;
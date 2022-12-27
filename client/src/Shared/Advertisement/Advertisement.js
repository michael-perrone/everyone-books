import React from 'react';
import styles from './Advertisement.module.css';


function Advertisement(props) {
    return (
        <div id={styles.adContainer}>
            <p style={{fontSize: "22px", fontWeight: "bold", textAlign: "center"}}>{props.ad.header}</p>
            <p style={{fontSize: "18px", paddingLeft: "6px", paddingTop: "20px", paddingBottom: "20px"}}>{props.ad.details}</p>
            <p style={{position: "absolute", bottom: "3px"}}>{props.businessName}</p>
        </div>
    )
}

module.exports = Advertisement;
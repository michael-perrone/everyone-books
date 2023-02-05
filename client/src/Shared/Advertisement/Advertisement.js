import React from 'react';
import styles from './Advertisement.module.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


function Advertisement(props) {

    function clicked() {
        axios.post("/api/ads/goToBusiness", {id: props.ad._id}).then(response => {
            if (response.status === 200) {
                props.history.push("/businesses/" + response.data.bId);
            }
        })
    }

    return (
        <div>
        <div style={{cursor: "pointer"}} onClick={clicked} id={styles.adContainer}>
            <p style={{fontSize: "22px", marginTop: "15px", fontWeight: "bold", textAlign: "center", color: 'black'}}>{props.ad.adHeader}</p>
            <p style={{fontSize: "15px", paddingLeft: "6px", paddingLeft: "12px", paddingRight: "12px", color: 'black', paddingTop: "16px", paddingBottom: "20px"}}>{props.ad.adDetails}</p>
            <p style={{position: "absolute", bottom: "3px"}}>{props.businessName}</p>
            <p style={{textAlign: "center", fontFamily: "Josefin Sans", position: 'absolute', bottom: "5px", color: "black"}}>Advertisement Center</p>
        </div>
        </div>
    )
}

export default withRouter(Advertisement);

import React from "react";
import StatementAppear from "../../Shared/StatementAppear/StatementAppear";
import SubmitButton from "../../Shared/SubmitButton/SubmitButton";
import styles from './AdBuilder.module.css';
import axios from 'axios';
import {connect} from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts'


function AdBuilder(props) {
    const [adHeader, setAdHeader] = React.useState("");
    const [adDetails, setAdDetails] = React.useState("");
    const [targetAudience, setTargetAudience] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const [showSavedAds, setShowSavedAds] = React.useState(false);
    const [ads, setAds] = React.useState([]);


    React.useEffect(() => {
        console.log(ads);
        if (ads && ads.length === 0) {
            axios.get('/api/ads', {headers: {'x-auth-token': props.adminToken}}).then(response => {
                if (response.data.ads) {
                    setAds(response.data.ads);
                }
            })
        }
    }, [showSavedAds])

    function toSetShowSavedAds() {
        if (showSavedAds === false) {
            setShowSavedAds(true);
        }
        else {
            setShowSavedAds(false);
        }
    }

    function toSetAdHeader(e) {
        if (e.target.value.length < 54) {
            setAdHeader(e.target.value);
        }
    }

    function toSetAdDetails(e) {
        if (e.target.value.length < 400) {
            setAdDetails(e.target.value);
        }
        
    }

    function toSetTargetAudience(e) {
        setTargetAudience(e.target.value);
    }

    function saveAd() {
        if (targetAudience && adHeader && adDetails) {
            axios.post('/api/ads/create', {adHeader, adDetails, targetAudience}, {headers: {'x-auth-token': props.adminToken}}).then(
                response => {
                    if (response.status === 200) {
                        setSuccess("");
                        setTimeout(() => setSuccess("Ad successfully created"), 200);
                    }
                }
            )
        }
    }


    return (
        <div id={styles.main}>
            <p style={{fontSize: "26px", fontFamily: "Josefin Sans", marginTop: "6px"}}>Advertisement Center</p>
            <div id={styles.mainInside}>
                <div className={styles.halfo}>
                    <p style={{fontSize: "20px", fontWeight: "bold"}}>Build your advertisement</p>
                    <div>
                    <p style={{marginTop: "30px"}}>Step One: Choose Target Audience</p>
                    <select onChange={toSetTargetAudience} style={{height: "24px", width: "250px", marginTop: "10px", paddingLeft: "4px", background: "transparent", border: "1px solid gray"}}>
                        <option> </option>
                        <option>Potential Employees</option>
                        <option>Potential Customers</option>
                    </select>
                    <p style={{marginTop: "50px"}}>Step Two: Enter Advertisement Header</p>
                    <input style={{height: "20px", width: "250px", marginTop: "10px", paddingLeft: "4px"}} placeholder={"Advertisement Header"} onChange={toSetAdHeader}/>
                    <p style={{marginTop: "50px"}}>Step Three: Enter Advertisement Details</p>
                    <textarea onChange={toSetAdDetails} placeholder="Advertisement Details" style={{height: "300px", marginTop: "10px", width: "260px"}}/>
                    </div>
                    <button onClick={saveAd} style={{backgroundColor: "lavenderblush", marginTop: "10px", border: "none", boxShadow: "0px 0px 3px black", height: "30px", fontSize:"18px", width: "80px"}}>Save</button>
                </div>
                <div className={styles.halfo}>
                        <p>{showSavedAds ? "Saved Advertisements" : "Example Advertisement"}</p>
                        {!showSavedAds &&
                        <div style={{marginTop:"3px"}} id={styles.modelAd}>
                            <p style={{marginTop: "4px", fontWeight: "bold", padding: "8px", fontSize: "22px", textAlign: "center"}}>{adHeader}</p>
                            <p style={{marginTop: "5px", fontSize: "18px", padding: "10px"}}>{adDetails}</p>
                        </div>
                        }
                        {showSavedAds && 
                        <div id={styles.savedAdsContainer}>
                            {ads && ads.map(ad => {
                                return <div id={styles.modelAd}>
                                         <p style={{marginTop: "10px", fontWeight: "bold", fontSize: "22px"}}>{ad.adHeader}</p>
                            <p style={{marginTop: "50px"}}>{ad.adDetails}</p>
                                    </div>
                            })}
                        </div>    
                        }
                        <button onClick={toSetShowSavedAds} style={{backgroundColor: "lightgray", marginTop: "30px", border: "none", boxShadow: "0px 0px 3px black", height: "30px", fontSize:"18px", width: "260px"}}>{showSavedAds ? "Show Example Advertisement" : "Show Saved Advertisements"}</button>
                </div>
            </div>
            <OtherAlert alertType={"sucess"} showAlert={success != ""} alertMessage={success}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        adminToken: state.authReducer.adminToken
    }
}

export default connect(mapStateToProps)(AdBuilder);
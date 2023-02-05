
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
    const [error, setError] = React.useState("");
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
        if (e.target.value.length < 45) {
            setAdHeader(e.target.value);
        }
    }

    function toSetAdDetails(e) {
        if (e.target.value.length < 330) {
            setAdDetails(e.target.value);
        }
        
    }

    function toSetTargetAudience(e) {
        setTargetAudience(e.target.value);
    }

    function saveAd() {
        if (!targetAudience) {
            setError("");
            setTimeout(() => setError("Please choose a target audience."))
            return;
        }
        if (!adHeader) {
            setError("");
            setTimeout(() => setError("Please create a header for your ad!"))
            return;
        }
        if (!adDetails) {
            setError("");
            setTimeout(() => setError("Please enter some details about your ad!"))
            return;
        }
        if (targetAudience && adHeader && adDetails) {
            axios.post('/api/ads/create', {adHeader, adDetails, target: targetAudience}, {headers: {'x-auth-token': props.adminToken}}).then(
                response => {
                    if (response.status === 200) {
                        setSuccess("");
                        setTimeout(() => setSuccess("Ad successfully created"), 200);
                        const oldAds = [...ads];
                        const newAd = {adHeader, adDetails};
                        oldAds.push(newAd);
                        setAds(oldAds);
                    }
                }
            )
        }
    }


    return (
        <div id={styles.main}>
            <p style={{fontSize: "26px", fontFamily: "Josefin Sans", marginTop: "12px"}}>Advertisement Center</p>
            <div id={styles.mainInside}>
                <div className={styles.halfo}>
                    <p style={{fontSize: "20px", position: "relative", left: "-23px", fontWeight: "bold"}}>Build your advertisement</p>
                    <div>
                    <p style={{marginTop: "30px"}}>Step One: Choose Target Audience</p>
                    <select onChange={toSetTargetAudience} style={{height: "24px", width: "250px", backgroundColor: "rgb(105,105,105)", marginTop: "10px", paddingLeft: "4px", border: "1.5px solid #f9e9f9"}}>
                        <option> </option>
                        <option>Potential Employees</option>
                        <option>Potential Customers</option>
                    </select>
                    <p style={{marginTop: "30px"}}>Step Two: Enter Advertisement Header</p>
                    <input style={{height: "20px", backgroundColor: "rgb(105,105,105)", width: "250px", paddingLeft: "4px", marginTop: "10px", paddingLeft: "4px"}} placeholder={"Advertisement Header"} onChange={toSetAdHeader}/>
                    <p style={{marginTop: "30px"}}>Step Three: Enter Advertisement Details</p>
                    <textarea onChange={toSetAdDetails} placeholder="Advertisement Details" style={{height: "300px", marginTop: "10px", width: "260px", backgroundColor: "rgb(105,105,105)", padding: "4px"}}/>
                    </div>
                    <button onClick={saveAd} style={{backgroundColor: "rgb(24,24,24)", marginTop: "10px", border: "none", boxShadow: "0px 0px 3px #f9e9f9", height: "30px", fontSize:"18px", width: "80px"}}>Save</button>
                </div>
                <div id={styles.borderr} className={styles.halfo}>
                        <p style={{fontWeight: "bold", fontSize: "18px", marginBottom: "6px"}}>{showSavedAds ? "Saved Advertisements" : "Example Advertisement"}</p>
                        {!showSavedAds &&
                        <div style={{marginTop:"3px", position: "relative"}} id={styles.modelAd}>
                            <p style={{marginTop: "4px", fontWeight: "bold", padding: "8px", fontSize: "22px"}}>{adHeader}</p>
                            <p style={{marginTop: "5px", fontSize: "18px", padding: "10px"}}>{adDetails}</p>
                            <p style={{position: "absolute", bottom: "3px"}}>{props.businessName}</p>
                        </div>
                        }
                        {showSavedAds && 
                        <div id={styles.savedAdsContainer}>
                            {ads && ads.map(ad => {
                                return <div style={{position: "relative",  boxShadow: "0px 0px 4px #f9e9f9"}} id={styles.modelAd}>
                                         <p style={{marginTop: "2px", fontWeight: "bold", fontSize: "22px", padding: "8px"}}>{ad.adHeader}</p>
                                         <p style={{marginTop: "10px", paddingLeft: "6px", paddingTop: "15px", paddingBottom: "15px", paddingRight: "6px"}}>{ad.adDetails}</p>
                                         <p style={{position: "absolute", bottom: "3px"}}>{props.businessName}</p>
                                    </div>
                            })}
                        </div>    
                        }
                        <button onClick={toSetShowSavedAds} style={{backgroundColor: "rgb(24,24,24)", marginTop: "30px", border: "none", boxShadow: "0px 0px 3px #f9e9f9", height: "30px", fontSize:"18px", width: "260px"}}>{showSavedAds ? "Show Example Advertisement" : "Show Saved Advertisements"}</button>
                </div>
            </div>
            <OtherAlert alertType={"success"} showAlert={success != ""} alertMessage={success}/>
            <OtherAlert alertType={"bad"} showAlert={error != ""} alertMessage={error}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        adminToken: state.authReducer.adminToken,
        businessName: state.authReducer.admin.admin.bn
    }
}

export default connect(mapStateToProps)(AdBuilder);
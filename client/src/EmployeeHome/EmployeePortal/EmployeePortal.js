import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import BusinessInPortal from './BusinessInPortal/BusinessInPortal';
import styles from './EmployeePortal.module.css';
import Spinner from '../../Spinner/Spinner';
import {connect} from 'react-redux';
import OtherAlert from '../../OtherAlerts/OtherAlerts';


function EmployeePortal(props) {
    const [businesses, setBusinesses] = useState();
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [jt, setJt] = useState("");
    const [pw, setPw] = useState("");
    const [ph, setPh] = useState("");
    const [cw, setCw] = useState("");
    const [ur, setUr] = useState("");
    const [rjt, setRjt] = useState("");
    const [rpw, setRpw] = useState("");
    const [rph, setRph] = useState("");
    const [rcw, setRcw] = useState("");
    const [rur, setRur] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [currentCity, setCurrentCity] = useState("");
    


    useEffect(function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude; 
            const long = position.coords.longitude;
            console.log(lat, long, position)
            Axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=5z4IX12uixwGDlNJ9qaPHYA4tI3dKgNU&location=${lat},${long}&includeRoadMetadata=false&includeNearestIntersection=false`
            ).then(function(response){
                    const locationInfo = response.data.results[0].locations[0];
                    const zip = locationInfo.postalCode.split("-")[0];
                    const city = locationInfo.adminArea5;
                    setCurrentCity(city);
                    const state = locationInfo.adminArea3;
                    Axios.post('/api/businessList/location/employeeHiring', {zip, city, state}).then(response => {
                        if (response.data.businessesFromZip && response.data.businessesFromZip.length > 0) {
                            setBusinesses(response.data.businessesFromZip);
                        }
                        if (response.data.businessesFromCity && response.data.businessesFromCity.length > 0) {
                            setBusinesses(response.data.businessesFromCity);
                        }
                        setLoading(false);
                    }).catch(error => {
                        setLoading(false);
                        setError("");
                        setTimeout(() => setError("Something went wrong"), 200);
                    })
                }
            )
        });
    }, [])

    useEffect(function() {
        Axios.get("/api/employeeInfo/hi", {headers: {'x-auth-token': props.employeeToken}}).then(response => {
            setRcw(response.data.employee.cw);
            setRjt(response.data.employee.jt);
            setRph(response.data.employee.ph);
            setRpw(response.data.employee.pw);
            setRur(response.data.employee.ur);
            setCw(response.data.employee.cw);
            setJt(response.data.employee.jt);
            setPh(response.data.employee.ph);
            setPw(response.data.employee.pw);
            setUr(response.data.employee.ur);
            console.log(response);
        })
    }, [])

    function search() {
        Axios.post('/api/businessList/location/portal', {zip, state, city}).then(
            response => {
                if (response.data.businesses.length) {
                    setBusinesses(response.data.businesses);
                }
            }
        )
    }

    function sendEmployeeInfo() {
        let data = {};
        if (rcw !== cw) {
            data.cw = cw;
        }
        if (rjt !== jt) {
            data.jt = jt;
        }
        if (rph !== ph) {
            data.ph = ph;
        }
        if (rpw !== pw) {
            data.pw = pw;
        }
        if (rur !== ur) {
            data.ur = ur;
        }
        if (Object.keys(data).length > 0) {
            Axios.post('/api/employeeInfo/hi', data, {headers: {'x-auth-token': props.employeeToken}}).then(
                response => {
                    if (response.status === 200) {
                        setSuccess("");
                        setTimeout(() => setSuccess("Information correctly added"), 300);
                    }
                }
            )
        }
    } 


    return (
        <div>
            <p style={{textAlign: "center", marginTop: "15px", fontWeight: "bold", fontFamily: "Josefin Sans", fontSize: "20px", paddingBottom: "30px"}}>Employee Careers Portal</p>
            <div className={styles.cont}>
                <div id={styles.rightHalf} style={{paddingBottom: "30px"}} className={styles.half}>
                <p style={{fontSize:"18px", fontFamily: "Josefin Sans"}}>Businesses Near {currentCity !== "" ? currentCity : "You"}</p>
                    <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                        <input onChange={(e) => setZip(e.target.value)} value={zip} className={styles.is} placeholder='Zip Code'/>
                        <select style={{width: "212px"}} onChange={(e) => setState(e.target.value)} value={state} className={styles.is}>
                            <option>Choose State</option>
                        <option>AL</option>
              <option>AK</option>
              <option>AZ</option>
              <option>AR</option>
              <option>CA</option>
              <option>CO</option>
              <option>CT</option>
              <option>DE</option>
              <option>FL</option>
              <option>GA</option>
              <option>HI</option>
              <option>ID</option>
              <option>IL</option>
              <option>IN</option>
              <option>IA</option>
              <option>KS</option>
              <option>KY</option>
              <option>LA</option>
              <option>ME</option>
              <option>MD</option>
              <option>MA</option>
              <option>MI</option>
              <option>MN</option>
              <option>MS</option>
              <option>MO</option>
              <option>MT</option>
              <option>NE</option>
              <option>NV</option>
              <option>NH</option>
              <option>NJ</option>
              <option>NM</option>
              <option>NY</option>
              <option>NC</option>
              <option>ND</option>
              <option>OH</option>
              <option>OK</option>
              <option>OR</option>
              <option>PA</option>
              <option>RI</option>
              <option>SC</option>
              <option>SD</option>
              <option>TN</option>
              <option>TX</option>
              <option>UT</option>
              <option>VT</option>
              <option>VA</option>
              <option>WA</option>
              <option>WV</option>
              <option>WI</option>
              <option>WY</option>
                        </select> 
                        <input onChange={(e) => setCity(e.target.value)} value={city} className={styles.is} style={{marginBottom: "30px"}} placeholder='City'/>
                        <SubmitButton onClick={search}>Find Businesses</SubmitButton>
                    </div>
                    {loading && <Spinner/>}
                    {businesses && businesses.map(business => {
                        return <BusinessInPortal business={business}/>
                    })}
                </div>
                <div id={styles.moveIt} className={styles.half}>
                    <p style={{fontSize: "18px", fontFamily: "Josefin Sans"}}>Job title you are searching for:</p>
                    <input value={jt} onChange={(e) => setJt(e.target.value)} style={{width: "250px", marginTop: "6px"}} className={styles.is} placeholder="Ex: Waxer, Tennis Instructor"/>
                    <p style={{fontSize: "18px", marginTop: "40px", fontFamily: "Josefin Sans"}}>What is your preferred wage?</p>
                    <input value={pw} onChange={(e) => setPw(e.target.value)} style={{width: "250px", marginTop: "6px"}} className={styles.is} placeholder="Ex: $40,000 (Salary) or $30.00 (Hourly)"/>
                    <p style={{fontSize: "18px", marginTop: "40px", fontFamily: "Josefin Sans"}}>Preferred number of hours per week:</p>
                    <select value={ph} onChange={(e) => setPh(e.target.value)} style={{width: "250px", marginTop: "6px"}} className={styles.is}>
                    <option>Choose Hours</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                    <option>32</option>
                    <option>33</option>
                    <option>34</option>
                    <option>35</option>
                    <option>36</option>
                    <option>37</option>
                    <option>38</option>
                    <option>39</option>
                    <option>40</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                    <option>44</option>
                    <option>45</option>
                    <option>46</option>
                    <option>47</option>
                    <option>48</option>
                    <option>49</option>
                    <option>50</option>
                    </select>
                    <p style={{fontSize: "18px", marginTop: "40px", fontFamily: "Josefin Sans"}}>Are you currently working?</p>
                    <select value={cw} onChange={(e) => setCw(e.target.value)} style={{width: "250px", marginTop: "6px"}} className={styles.is}>
                        <option>Choose Answer</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <p style={{fontSize: "18px", marginTop: "40px", fontFamily: "Josefin Sans"}}>Are you urgent to be hired?</p>
                    <select value={ur} onChange={(e) => setUr(e.target.value)} style={{width: "250px", marginTop: "6px", marginBottom: "30px"}} className={styles.is}>
                        <option>Choose Answer</option>
                        <option>Urgent</option>
                        <option>Not Sure</option>
                        <option>Not Urgent</option>
                    </select>
                    <SubmitButton onClick={sendEmployeeInfo}>Save Answers</SubmitButton>
                </div>
            </div>
            <OtherAlert alertType={"success"} alertMessage={success} showAlert={success !== ""}/>
            <OtherAlert alertType={"error"} alertMessage={error} showAlert={error !== ""}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employeeToken: state.authReducer.employeeToken
    }
}


export default connect(mapStateToProps)(EmployeePortal);
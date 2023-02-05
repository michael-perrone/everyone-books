import React, {useState, useEffect} from 'react';
import styles from './CreateGroup.module.css';
import Axios from 'axios';
import {connect} from 'react-redux';
import Maplist from '../../../Shared/Maplist/Maplist';
import {createMaplistElement} from '../../../feutils/feutils';
import DateDrop from '../../../Shared/DateDrop/DateDrop'
import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import TimeList from '../../../Shared/TimeList/TimeList';
import {intToStringTime, createMaplist, getTimeRightAway, stringToIntTime} from '../../../feutils/feutils';
import HorizontalList from '../../../Shared/HorizontalList/HorizontalList';
import BCAList from '../../../Shared/BCAList/BCAList';
import YesNoButton from '../../../Shared/ColorButton/ColorButton';
import SubmitButton from '../../../Shared/SubmitButton/SubmitButton';

function CreateGroup(props) {
    const [customersForGroup, setCustomersForGroup] = useState([]);
    const [customerIds, setCustomerIds] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dateString, setDateString] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [times, setTimes] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [bcn, setBcn] = useState();
    const [bct, setBct] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [bcns, setBcns] = useState([]);
    const [selectedBcn, setSelectedBcn] = useState();
    const [groupOpenToPublic, setGroupOpenToPublic] = useState();
    const [groupName, setGroupName] = useState("");
    const [groupLimit, setGroupLimit] = useState("No Limit");
    
    
    function fire() {
        props.createGroup(price, startTime, endTime, props.busienssId, selectedBcn, selectedEmployee._id, dateString, groupName, customerIds, groupOpenToPublic, groupLimit)
    }

    function setGroupOpenToPublicFalse() {
        setGroupOpenToPublic(false)
    }

    function setGroupOpenToPublicTrue() {
        setGroupOpenToPublic(true);
    }

    function toSetSelectedBcn(bcn) {
        return () => {
            setSelectedBcn(bcn)
        }
    }

    useEffect(function() {
        let num = Number(bcn);
        let i = 1;
        const nums = [];
        while (i <= num) {
            nums.push(i);
            i++;
        }
        setBcns(nums);
    }, [bcn])

    function toSetSelectedEmployee(employee) {
        return () => {
            setSelectedEmployee(employee)
        }
    }

    function deselectEmployee() {
        setSelectedEmployee();
    }

    function deselectBcn() {
        setSelectedBcn();
    }

    function toSetStartTime(time) {
        setStartTime(time);
    }

    function toSetEndTime(time) {
        setEndTime(time);
    }

    function toSetDateString(date) {
        setDateString(date)
    }
    
    function searchPhone() {
        Axios.post("api/getCustomers/addNewCustomer", {phoneNumber, date: props.date}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                for (let i = 0; i < customersForGroup.length; i++) {
                    if (customersForGroup[i].id === response.data.user._id) {
                        setError("");
                        setTimeout(() => setError("Customer has already been added."), 200);
                        return;
                    }
                }
                const newCustomersForGroup = [...customersForGroup];
                const newCustomerIds = [...customerIds];
                newCustomersForGroup.push(createMaplistElement(response.data.user, "fullName"));
                newCustomerIds.push(response.data.user._id);
                setCustomersForGroup(newCustomersForGroup);
                setCustomerIds(newCustomerIds);
            }
        }).catch(error => {
            if (error.response.status === 400 || error.response.status === 406) {
                setError("");
                setTimeout(() => setError("Customer not found!"), 200);
            }
        })
    }

    useEffect(function() {
        Axios.get('api/getEmployees/plusBcn', {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                setEmployees(response.data.employees);
                setBcn(response.data.bcn);
                setBct(response.data.bct)
            }
        })
    }, [])

    useEffect(function() {   // check this... see if you can get info without extra calls
        if (dateString !== "") {
          Axios.post("api/business/startEndTime", {date: dateString}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
              if (response.status === 200) {
                 const newTimes = [];
                 let i = response.data.open;
                 let timeRightAway = "";
                 while (i <= response.data.close) {
                    if (intToStringTime[i] === getTimeRightAway()) {
                      timeRightAway = intToStringTime[i];
                    }
                    newTimes.push(i);
                    i++;
                 }
                 timeRightAway === "" ? setStartTime(intToStringTime[response.data.open]) : setStartTime(timeRightAway); 
                 timeRightAway === "" ? setEndTime(intToStringTime[response.data.open]) : setEndTime(timeRightAway);
                 setTimes(newTimes)  
              }
          })
        }
         
      }, [dateString])
  

    function deleteCustomer(id) {
        return () => {
            console.log(id);
            const newCustomers = [...customersForGroup];
            const newNew = newCustomers.filter(e => e.id !== id);
            setCustomersForGroup(newNew);
            const newIds = [...customerIds];
            const newNewIds = newIds.filter(e => e !== id);
            setCustomerIds(newNewIds);
        }
    }

    return (
        <div id={styles.main}>
            <p style={{fontSize: "24px", textAlign: "center"}}>Create Group</p>
            <div style={{display: 'flex', justifyContent: "space-around", flexDirection: "column", alignItems: "center", height: "150px", position: "relative"}}>
                 <input onChange={(e) => setGroupName(e.target.value)} value={groupName} placeholder="Enter Group Name" className={styles.specialI}/>
                 <p style={{position: "absolute", fontSize: "22px", fontWeight: "bold", left: "-12px", top: "60px" }}>$</p>
                 <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Group Price" className={styles.specialI}/>
                 <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter Customer Phone" className={styles.specialI}/>
                 <p onClick={searchPhone} style={{position: "absolute", fontSize: "40px", fontWeight: "bold", right: "-30px", bottom: "9px", cursor: "pointer" }}>+</p>
            </div>
            <div style={{maxHeight: "140px", overflow: "auto", height: "140px"}}>
                <Maplist small={true} delete={deleteCustomer} array={customersForGroup}/>
            </div>
            <div>
            <div style={{display: "flex", marginTop: "14px", alignItems: "center"}}>
                <p style={{marginRight: "10px"}}>Date:</p>
                <DateDrop setDateString={(dateString) => toSetDateString(dateString)}/>
            </div>
            <div style={{display: "flex", marginTop: "30px", alignItems: "center"}}>
                <p style={{ marginTop: "2px", marginRight: "8px"}}>Time:</p>
                <TimeList time={startTime} times={times} setTime={(time) => toSetStartTime(time)}/>
                <p style={{marginLeft: "5px", marginRight: "5px"}}>-</p>
                <TimeList time={endTime} times={times} setTime={(time) => toSetEndTime(time)}/>
            </div>
            <div style={{display: "flex", marginTop: "18px"}}>
                <p style={{marginTop: "9px", marginRight: "10px"}}>Employee: </p>
                <HorizontalList employeeList={true} deselect={deselectEmployee} select={toSetSelectedEmployee} selected={selectedEmployee} list={employees}/>
            </div>
            <div style={{display: "flex", marginTop: "10px"}}>
                <p style={{fontSize: "18px", marginTop: "8px", marginRight: "10px"}}>{bct}: </p>
                <BCAList small={true} deselect={deselectBcn} selectBcn={toSetSelectedBcn} selectedBcn={selectedBcn} bcnList={bcns}/>
            </div>
            <div style={{display: "flex", marginTop: "20px"}}>
                <p style={{marginTop: "5px"}}>Group open to public?</p>
                <YesNoButton selected={groupOpenToPublic} backgroundColor={groupOpenToPublic ? "rgb(100,100,100)" : ""} clicked={setGroupOpenToPublicTrue}>Yes</YesNoButton>
                <YesNoButton selected={groupOpenToPublic === false} backgroundColor={groupOpenToPublic === false ? "rgb(100,100,100)" : ""} clicked={setGroupOpenToPublicFalse}>No</YesNoButton>
            </div>
            <div style={{display: "flex", marginTop: "24px"}}>
                <p style={{marginTop: "2px"}}>Group Limit Number:</p>
                <select onChange={(e) => setGroupLimit(e.target.value)} value={groupLimit} style={{height: "24px", paddingLeft: "6px", width: "90px", marginLeft: "10px", border: "none", boxShadow: "0px 0px 2px #f9e9f9", backgroundColor: "rgb(24,24,24)"}}>
                    <option>No Limit</option>
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
            </div>
            </div>
            <SubmitButton onClick={fire} marginTop={"20px"}>Create Group</SubmitButton>
      
        </div>
    )
}

const mapStateToProps = state => {
    return {
        date: new Date(state.dateReducer.dateChosen),
        adminToken: state.authReducer.adminToken,
        businessId: state.authReducer.admin.admin.businessId
    }
}

export default connect(mapStateToProps)(CreateGroup);
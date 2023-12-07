import React, { useState } from 'react';
import styles from './TableCreator.module.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import OtherAlert from '../../../OtherAlerts/OtherAlerts';
import {connect} from 'react-redux';
import {ADMIN_REGISTER_SUCCESS} from '../../../actions/actions';
import Spinner from '../../../Spinner/Spinner';


function TableCreator(props) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState([]);
    const [tables, setTables] = useState([]);
    const [creatingNewGroup, setCreatingNewGroup] = useState(false);
    const [label, setLabel] = useState("");
    const [hitIndex, setHitIndex] = useState(-1);
    const [capacity, setCapacity] = useState("");
    const [table_num, setTableNum] = useState("");
    const [seatPref, setSeatPref] = useState("");
    const [usli, setusli] = useState(-1);
    const [prefo, setPrefo] = useState("");
    const [finishHit, setFinishHit] = useState(false);
    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");
    const [businessId, setBusinessId] = useState("");
    

        // React.useEffect(function() {
        //     getDocs(collection(db, "groups")).then(
        //         response => {
        //             const groupos = [...groups];
        //             response.forEach(data => {
        //                 groupos.push(data.data());
        //             })
        //             setGroups(groupos);
        //         }
        //     )
        // }, [])


        React.useEffect(function() {
            axios.get('/api/restaurant/checkTables', {headers: {'x-auth-token': localStorage.getItem("adminToken")}}).then(
                response => {
                    if (response.status === 200) {
                        setGroups(response.data.groups);
                        setBusinessId(response.data.businessId);
                    }
                }
            ).catch(error => {
                if (error.response.status !== 401) {
                    setFailure("Sorry, something went wrong!");
                    setTimeout(() => setFailure(""), 6000);
                } 
            })
        }, [])

        React.useEffect(function() {
         if (usli !== -1) {
            console.log(usli)
            if (groups[usli].seatingLocation) {
                setPrefo(groups[usli].seatingLocation);
            }
            else {
                setPrefo("");
            }
         }
        }, [usli]) 

        function setSeatingLocation(index) {
            setFinishHit(true);
            const newGroups = [...groups];
            console.log(index);
            console.log(newGroups[index]);
            newGroups[index].seatingLocation = prefo;
            setGroups(newGroups);
            axios.post('/api/restaurant/seatingLocationSet', {preference: prefo, index}, {headers: {'x-auth-token': localStorage.getItem("adminToken")}})
        }

    function deleteTable(groupIndex, tableIndex) {
        const newGroupos = [...groups];
        const newTablos = newGroupos[groupIndex].tables.filter((e, i) => {
            return i !== tableIndex;
        })
        console.log(newTablos);
        newGroupos[groupIndex].tables = newTablos;
        setGroups(newGroupos);
        axios.post("/api/restaurant/deleteTable", {groupIndex, tableIndex}, {headers: {"x-auth-token": localStorage.getItem("adminToken")}}).then(
            response => {
                if (response.status === 200) {
                    setSuccess("Your table was successfully deleted.")
                    setTimeout(() => setSuccess(""), 6000);
                }
            }
        ).catch(error => {
            setFailure("Sorry, something went wrong!");
            setTimeout(() => setFailure(""), 6000);
        })
        // const groupRef = doc(db, "groups", groupId);
        //     await updateDoc(groupRef, {
        //         tables: newTablos
        //     });
    }

        function toSetCreatingNewGroup() {
            setCreatingNewGroup(true);
        }

       function createNewTable(index) { 
            const tabObj = {capacity, table_num};
            const groupos = [...groups];
            groupos[hitIndex].tables.push(tabObj);
            const newTablos = groupos[hitIndex].tables;
            setGroups(groupos);
            setHitIndex(-1);
            
            axios.post('/api/restaurant/createNewTable', {table: tabObj, index}, {headers: {"x-auth-token": localStorage.getItem("adminToken")}}).then(
                response => {
                    if (response.status === 200) {
                        setSuccess("Your table has been created!");
                        setTimeout(() => setSuccess(""), 6000);
                    }
                }
            ).catch(error => {
                setFailure("Sorry, something went wrong!");
                setTimeout(() => setFailure(""), 6000);
            })

            // const groupRef = doc(db, "groups", groupId);


            // await updateDoc(groupRef, {
            //     tables: newTablos
            // });

        }

       function createNewGroup() {
        const newGroup = {label, tables: [], seatingLocation: ""};
        const groupos = [...groups];             
        groupos.push(newGroup);
            if (localStorage.getItem("adminToken")) {
                axios.post("/api/restaurant/buildGroup", {newGroup}, {headers: {'x-auth-token': localStorage.getItem("adminToken")}}).then(
                    response => {
                        if (response.status === 200) {
                            setGroups(groupos);
                            setSuccess("Your group has been created!");
                            setTimeout(() => setSuccess(""), 6000);
                            
                            setLabel("");
                        }
                    }
                ).catch(
                    error => {
                        setFailure("Sorry, something went wrong!");
                        setTimeout(() => setFailure(""), 6000);
                    }
                )
            }
            else {
                const obj = {
                    address: localStorage.getItem("address"),
                    city: localStorage.getItem("city"),
                    state: localStorage.getItem("state"),
                    schedule: [{open: localStorage.getItem("sundayOpen"), close: localStorage.getItem("sundayClose")}, {open: localStorage.getItem("mondayOpen"), close: localStorage.getItem("mondayClose")}, {open: localStorage.getItem("tuesdayOpen"), close: localStorage.getItem("tuesdayClose")}, {open: localStorage.getItem("wednesdayOpen"), close: localStorage.getItem("wednesdayClose")}, {open: localStorage.getItem("thursdayOpen"), close: localStorage.getItem("thursdayClose")}, {open: localStorage.getItem("fridayOpen"), close: localStorage.getItem("fridayClose")}, {open: localStorage.getItem("saturdayOpen"), close: localStorage.getItem("saturdayClose")}],
                    nameOfBusiness: localStorage.getItem("nameOfBusiness"),
                    website: localStorage.getItem('website'),
                    phoneNumber: localStorage.getItem("phoneNumber"),
                    typeOfBusiness: localStorage.getItem("typeOfBusiness"),
                    password: localStorage.getItem("password"),
                    email: localStorage.getItem("email"),
                    zip: localStorage.getItem('zip'),
                    groupos,
                }
                axios.post("/api/restaurant/startRestaurant", obj).then(
                    response => {
                        if (response.status === 201) {
                            setSuccess("Your restaurant has been successfully created!");
                            localStorage.setItem("adminToken", response.data.token);
                            props.adminRegister(response.data.token);
                            setBusinessId(response.data.businessId);
                            setTimeout(() => setSuccess(""), 6000);
                            setGroups(groupos);
                        }
                    }
                ).catch(error => {
                    setFailure("Sorry, something went wrong!")
                    setTimeout(() => setFailure(""), 6000);
                })
            }
           
            // await setDoc(ref, {...newGroup, id: ref.id});
        }

        function finishedSetup() {
            if (groups.length === 0 ) {
                setFailure("Please add at least one group.");
                setTimeout(() => setFailure(""), 6000);
                return;
            }
            setTimeout(() => props.history.push(`/restaurant/${businessId}`), 2000);
        }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
            <div>
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>Restaurant Table Creator</p>
                <p style={{marginTop: "40px", width: "375px", lineHeight: "22px"}}>Welcome to the Restaurant Builder! Use the table creator to create the layout of the tables at your restaurant. First create a group that is classified by an identifier such as a number or location. Then inside of each group create each individual table by giving each table a number and a capacity. An identifier is not required and you can choose to identify a group by location if that is more suitable.</p>
            </div>
            <div>

           
            <div>
            <p id={styles.createGroupButton} style={{border: "none", cursor: "pointer", width: "220px", fontSize: "18px", height: "32px"}}>Create New Table Group</p>
                <input value={label} onChange={(e) => setLabel(e.target.value)} style={{border: "none", marginTop: "20px", boxShadow: "0px 0px 4px #f9e9f9", backgroundColor: 'black', padding: "4px", fontWeight: "bold", width: "100px"}} placeholder='Identifier'/>
                <button  onClick={createNewGroup} className={styles.buttono} style={{padding: "4px", height: "28px", boxShadow: "0px 0px 4px #f9e9f9", border: 'none', cursor: 'pointer', marginLeft: "15px"}}>Create</button>
            </div>
            <ul style={{marginTop: "15px", display: "flex", flexDirection: "column", height: "80px", justifyContent: "space-around"}}>
                <li>At least one group is required.</li>
                <li>Delete buttons require a double click.</li>
                <li>Hit finished button when layout complete.</li>

            </ul>
            <button onClick={finishedSetup} className={styles.buttono} style={{boxShadow: "0px 0px 4px #f9e9f9", marginLeft: "15px", marginTop: "12px", height: "30px", border: "none", cursor: "pointer", padding: "4px"}}>Finished Table Layout</button>
            </div>
            </div>
            <div style={{ marginTop: "20px", maxWidth: "100%", overflow: "auto", padding: "20px", display: "block ruby"}}>
                <div style={{paddingRight: "70px", display: "flex"}}>
                {groups.map((group, index) => {
                   return <div style={{width: "300px", backgroundColor: "rgb(55,55,55)", marginLeft: "40px", maxHeight: "600px", overflow: "auto", boxShadow: "0px 0px 6px #f9e9f9", paddingTop: "6px", height: "600px", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "20px"}}>
                        <p style={{textAlign: "center", fontWeight: "bold"}}>Table Group: {group.label}</p>
                        <div style={{display: "flex", width: "100%", borderBottom: "1px solid #f9e9f9", paddingBottom: "20px", justifyContent: "space-around", marginTop: "20px", height: "60px"}}>
                        {(!finishHit && usli === index) && <input placeholder='Seating Location' value={prefo} onChange={(e) => setPrefo(e.target.value)} style={{fontSize: '14px', marginTop: "4px", paddingLeft: "6px", backgroundColor: "black", boxShadow: "0px 0px 4px #f9e9f9", height: "30px", width: "200px", border: "none"}}/>}
                        {(!finishHit && usli === index) && 
                        <button className={styles.buttono} style={{boxShadow: "0px 0px 4px black", marginTop: "4px", height: "30px", border: "none", boxShadow: "0px 0px 4px #f9e9f9", cursor: "pointer", width: "60px", padding: "4px"}} onClick={() => setSeatingLocation(index)}>Finish</button> }
                         {(finishHit || usli !== index) && <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                         <button className={styles.buttono} style={{boxShadow: "0px 0px 4px #f9e9f9", marginTop: "4px", height: "30px", border: "none", cursor: "pointer", padding: "4px"}} onClick={() => {setusli(index); setFinishHit(false)}}>{group.seatingLocation ? "Update" : "Choose"} Seating Location</button> 
                        <p style={{fontSize: "14px", marginTop: "20px"}}>Current Seating Location: {group.seatingLocation ? group.seatingLocation : "None"}</p>
                        </div>
                        }
                        </div>
                        {group.tables.map((table,i) => {
                            return <div style={{padding: "6px", paddingBottom: "10px", height: "90px", width: "165px", boxShadow: "0px 0px 4px #f9e9f9", marginTop: "20px", backgroundColor: "rgb(25,25,25)"}}>
                                        <p style={{marginTop: "2px", marginLeft: "26px"}}>Table Number: {table.table_num}</p>
                                        <p style={{marginTop: "6px", marginLeft: "26px"}}>Table Capacity: {table.capacity}</p>
                                        <button className={styles.buttono} style={{marginLeft: "30px", marginTop: "16px", padding: "4px", width: "100px", border: "none", boxShadow: "0px 0px 4px black", color: "black", backgroundColor: "salmon", fontWeight: "bold", cursor: "pointer"}} onDoubleClick={() => deleteTable(index, i, group.id)}>Delete Table</button>
                                </div>
                            })}
                        {hitIndex === index && <p style={{marginTop: "15px"}}>Table Details:</p>}
                        {hitIndex === index && <select onChange={(e) => setTableNum(e.target.value) } style={{padding: "4px", marginTop: "20px", border: "none", width: "130px", boxShadow: "0px 0px 4px #f9e9f9", backgroundColor: "black"}}>
                            <option>Table Number</option>
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
                        </select>}
                        {hitIndex === index && <select onChange={(e) => setCapacity(e.target.value) } style={{padding: "4px", marginTop: "24px", border: "none", boxShadow: "0px 0px 4px #f9e9f9", width: "130px", backgroundColor: "black"}}>
                            <option>Person Capacity</option>
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
                        </select>}
                        
                        {hitIndex !== index && <button className={styles.buttono} style={{padding: "4px", marginTop: "20px", height: "28px", boxShadow: "0px 0px 4px #f9e9f9", marginTop: "20px", border: 'none', cursor: 'pointer'}} onClick={() => setHitIndex(index)}>Create Table</button>}
                        {hitIndex === index && <button className={styles.buttono} style={{padding: "4px", marginTop: "20px", height: "28px", boxShadow: "0px 0px 4px #f9e9f9", border: 'none', cursor: 'pointer'}} onClick={() => createNewTable(index)}>Finish Table</button>}
                    </div>
                })}

            </div>
            <OtherAlert showAlert={success !== ""} alertType={"success"} alertMessage={success}/>
            <OtherAlert showAlert={failure !== ""} alertType={"failure"} alertMessage={failure}/>
            </div>
        </div>
    )
};

let mapStateToProps;    


const mapDispatchToProps = dispatch => {
    return {
        adminRegister: (adminToken) => dispatch({type: ADMIN_REGISTER_SUCCESS, payload: {adminToken}})
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableCreator));
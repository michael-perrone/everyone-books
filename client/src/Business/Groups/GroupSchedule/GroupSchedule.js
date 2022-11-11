import React, {useState, useEffect} from 'react';
import DateDrop from '../../../Shared/DateDrop/DateDrop';
import styles from './GroupSchedule.module.css';
import Axios from 'axios';
import {connect} from 'react-redux';
import SmallList from '../../../Shared/SmallList/SmallList';

function GroupSchedule(props) {
    const [groups, setGroups] = useState([]);
    const [dateString, setDateString] = useState(new Date().toDateString());
    const [bct, setBct] = useState("");


    useEffect(function () {
        Axios.post("api/groups/list", {dateString}, {headers: {'x-auth-token': props.adminToken}}).then(response => {
            if (response.status === 200) {
                setGroups(response.data.groups);
                setBct(response.data.bct);
            }
        })
    }, [dateString])


    

    return (
        <div id={styles.main}>
            <p style={{ width: "380px", textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>Group Schedule</p>
            <div style={{width: "380px", textAlign: "center", marginTop: "20px"}}>
                <DateDrop setDateString={(dateString) => setDateString(dateString)}/>
            </div>
            {groups.length === 0 &&
            <div>
                <p style={{textAlign: "center", marginTop: "10px"}}>There are no groups planned for today.</p>
            </div>
            }
            {groups.length > 0 && 
            <div style={{height: "630px", maxHeight: "630px", overflow: "auto"}}>
            {groups.map(group => {
                console.log(group);
                return <div className={styles.groupHolder}>
                    <div id={styles.fullDiv}>
                    <div className={styles.halfDiv}>
                        <p>Group Name: {group.name}</p>
                        <p>Time: {group.time}</p>
                        <p>Employee: {group.employeeName}</p>
                        <p>{bct}: {group.bcn}</p>
                    </div>
                    <div className={styles.halfDiv}>
                        <p style={{textAlign: "center"}}>Customers: </p>
                        <SmallList list={group.customers} />
                        
                        <p>Group Limit: {group.groupLimitNumber}</p>
                        <p>Open to Public: {group.openToPublic ? "Yes" : "No" }</p>
                    </div>
                    <p></p>
                </div>
                </div>
            })}
            </div>
            }
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

export default connect(mapStateToProps)(GroupSchedule);
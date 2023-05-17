import React, {useState, useEffect} from 'react';
import styles from './OpenGroups.module.css';
import axios from 'axios';
import {connect} from 'react-redux';

function OpenGroups(props) {
    const [groupsToJoin, setGroupsToJoin] = useState([])
    const [groupsAlreadyIn, setGroupsAlreadyIn] = useState([]);

    useEffect(function() {
        if(Object.keys(props.business).length > 0) {
            axios.post("/api/groups/toJoin", {businessId: props.business._id}, {headers: {'x-auth-token': props.userToken}}).then(response => {
                setGroupsToJoin(response.data.groups);
                setGroupsAlreadyIn(response.data.groupsAlreadyIn);
            })
        }
    }, [props.business])

    function join(groupId) {
        axios.post('/api/groups/join', {groupId}, {headers: {'x-auth-token': props.userToken}}).then(response => {
            if (response.status === 200) {
                axios.post("/api/groups/toJoin", {businessId: props.business._id}, {headers: {'x-auth-token': props.userToken}}).then(response => {
                    setGroupsToJoin(response.data.groups);
                    setGroupsAlreadyIn(response.data.groupsAlreadyIn);
                })
            }
        })
    }

    function leave(groupId) {
        axios.post('/api/groups/leave', {groupId}, {headers: {'x-auth-token': props.userToken}}).then(response => {
            if (response.status === 200) {
                axios.post("/api/groups/toJoin", {businessId: props.business._id}, {headers: {'x-auth-token': props.userToken}}).then(response => {
                    setGroupsToJoin(response.data.groups);
                    setGroupsAlreadyIn(response.data.groupsAlreadyIn);
                })
            }
        })
    }

    return (
        <div id={styles.openGroupHolder}>
            {groupsToJoin.map(group => <div style={{width: "320px", position: "relative", marginTop: "10px", height: "120px", display: "flex", justifyContent: "space-around", flexDirection: "column", paddingBottom: "20px", borderBottom: "1px solid #f9e9f9"}}>
                <p>Event Name: {group.type}</p>
                <p>Event Date: {group.date}</p>
                <p>Event Time: {group.time}</p>
                <p>Event Price: {group.price}</p>
                <button onClick={() => join(group._id)} style={{position: "absolute", top: "50px", right: "0px", border: "none", height: "28px", width: "85px", backgroundColor: "rgb(24,24,24)", boxShadow: "0px 0px 2px #f9e9f9"  }}>Join Event</button>
            </div>)}
            {groupsAlreadyIn.map(group => <div style={{width: "320px", position: "relative", marginTop: "10px", height: "120px", display: "flex", justifyContent: "space-around", flexDirection: "column", paddingBottom: "20px", borderBottom: "1px solid #f9e9f9"}}>
                <p>Event Name: {group.type}</p>
                <p>Event Date: {group.date}</p>
                <p>Event Time: {group.time}</p>
                <p>Event Price: {group.price}</p>
                <button onClick={() => leave(group._id)} style={{position: "absolute", color: "black", top: "50px", right: "0px", border: "none", height: "28px", width: "85px", backgroundColor: "salmon", boxShadow: "0px 0px 2px #f9e9f9"  }}>Leave Event</button>
            </div>)}
            {groupsToJoin.length + groupsAlreadyIn.length === 0 && <p style={{padding: "10px", fontFamily: "Josefin Sans"}}>This business has no groups or events that are available to join.</p>}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        userToken: state.authReducer.token
    }
}

export default connect(mapStateToProps)(OpenGroups);
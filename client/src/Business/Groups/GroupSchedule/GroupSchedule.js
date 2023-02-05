import React, {useState, useEffect} from 'react';
import DateDrop from '../../../Shared/DateDrop/DateDrop';
import styles from './GroupSchedule.module.css';
import Axios from 'axios';
import {connect} from 'react-redux';
import SmallList from '../../../Shared/SmallList/SmallList';

function GroupSchedule(props) {
    return (
        <div id={styles.main}>
            <p style={{ width: "360px", textAlign: "center", fontSize: "24px"}}>Group Schedule</p>
            <div style={{width: "360px", textAlign: "center", marginTop: "20px"}}>
                <DateDrop setDateString={(dateString) => props.setDateo(dateString)}/>
            </div>
            {props.groups.length === 0 &&
            <div>
                <p style={{textAlign: "center", marginTop: "10px"}}>There are no groups planned for today.</p>
            </div>
            }
            {props.groups.length > 0 && 
            <div style={{height: "590px", display: "flex", flexDirection: 'column', alignItems: "center", marginTop: "20px", maxHeight: "610px", overflow: "auto"}}>
            {props.groups.map((group, index) => {
                return <div style={{marginTop: index !== 0 ? "10px": ""}} className={styles.groupHolder}>
                    <div id={styles.fullDiv}>
                    <div className={styles.halfDiv}>
                        <p>Group Name:</p>
                        <p style={{fontSize: "14px", marginTop: "4px"}}>{group.name}</p>
                        <p style={{marginTop: "20px"}}>Time:</p>
                        <p style={{fontSize: "14px", marginTop: "4px"}}>{group.time}</p>
                        <p style={{marginTop: "20px"}}>Employee:</p>
                        <p style={{fontSize: "14px", marginTop: "4px"}}>{group.employeeName}</p>
                        <p style={{marginTop: "20px"}}>{props.bct}:</p>
                        <p style={{fontSize: "14px", marginTop: "0px"}}>{group.bcn}</p>
                    </div>
                    <div className={styles.halfDiv}>
                        <p style={{textAlign: "center"}}>Customers:</p>
                        <div style={{marginTop: "7px"}}>
                        <SmallList list={group.customers} />
                        </div>
                        
                        <p style={{marginLeft: "15px"}}>Group Limit:</p>
                        <p style={{fontSize: "14px",marginLeft: "15px", marginTop: "3px"}}>{group.groupLimitNumber}</p>
                        <p style={{marginTop: "20px", marginLeft: "15px"}}>Open to Public: </p>
                        <p style={{marginTop: "3px",fontSize: "14px",marginLeft: "15px"}}>{group.openToPublic ? "Yes" : "No"}</p>
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
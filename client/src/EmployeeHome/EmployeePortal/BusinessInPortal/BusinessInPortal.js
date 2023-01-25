import React, {useState} from 'react';
import styles from '../../../BusinessList/BusinessInList/BusinessInList.module.css';
import styless from './BusinessInPortal.module.css';
import Axios from 'axios';
import {connect} from 'react-redux';

function BusinessInPortal(props) {
  const [inquired, setInquired] = useState(false);

    function inquire(businessId) {
        Axios.post("/api/notifications/inquire", {businessId}, {headers: {'x-auth-token': props.employeeToken}}).then(response => {
          if (response.status === 200) {
            setInquired(true);
          }
        })
    }

    function removeInquiry(businessId) {
      Axios.post("/api/notifications/inquire/remove", {businessId}, {headers: {'x-auth-token': props.employeeToken}}).then(response => {
          if (response.status === 200) {
            setInquired(false);
          }
      })
    }

    function viewBusiness() {
        // dont know what to do for this yet
    }


    return (
    <div id={styless.businessContainer}>
        <p className={styles.businessName}>{props.business.businessName}</p>
          <div className={styless.shortenedSection}>
          <p className={styles.boxHeader}>Location:</p>
          <p className={styles.sectionContent}>{props.business.address}</p>
          <p className={styles.sectionContent}>{props.business.city}</p>
          <p className={styles.sectionContent}>{props.business.state}</p>
          <p style={{width: '91%', paddingBottom: '10px', borderBottom: '1px solid gray'}} className={styles.sectionContent}>{props.business.zip}</p>
          <p style={{marginTop: '8px'}} className={styles.sectionContent}>{props.business.phoneNumber}</p>
          {props.business.website && <p className={styles.sectionContent}>{props.business.website}</p>}
          </div>
          <div className={styless.shortenedSection}>
          <p className={styles.boxHeader}>Hiring Status:</p>
            {!props.des && !props.hi && !props.in && 
            <p style={{padding: "6px"}}>This business is not currently hiring.</p>
            }
           
          </div>
          <div className={styless.buttonContainer}>
            {!inquired && <button onClick={() => inquire(props.business._id)} className={styles.sectionButton}>Inquire</button>}
            {inquired && <button onClick={removeInquiry(props.business._id)} className={styles.sectionButton} id={styles.unfollow}>Remove Inquiry</button>}
          </div>
        </div>
    )
}

const mapStateToProps = state => {
  return {
    employeeToken: state.authReducer.employeeToken
  }
}


export default connect(mapStateToProps)(BusinessInPortal);
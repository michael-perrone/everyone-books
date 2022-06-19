import React from 'react';
import styles from '../BusinessSignup.module.css'
import {withRouter} from 'react-router-dom';


function FakeNav(props){
    
    function goHome() {
        props.history.push('/')
    }

    return (
        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between', width: '100%', height: '52px', backgroundColor: '#f9e9f9', borderBottom: '2px solid black', color: 'black'}}>
            <p onClick={goHome} className={styles.title}>Everyone Books</p>
            <p onClick={goHome} className={styles.home}><i style={{marginLeft: '5px'}} className="fas fa-home"></i></p>
        </div>
    )

}

export default withRouter(FakeNav);
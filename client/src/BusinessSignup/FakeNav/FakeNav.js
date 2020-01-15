import React from 'react';
import styles from '../BusinessSignup.module.css'
import {withRouter} from 'react-router-dom';


const FakeNav = (props) => {
    function goHome() {
        props.history.push('/')
    }

    return (
        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between', width: '100%', height: '52px', backgroundColor: 'gray', borderBottom: '2px solid white', color: 'lavender'}}>
            <p onClick={goHome} className={styles.title}>Everyone Books</p>
            <p onClick={goHome} className={styles.home}><i style={{marginLeft: '5px'}} className="fas fa-home"></i></p>
        </div>
    )

}

export default withRouter(FakeNav);
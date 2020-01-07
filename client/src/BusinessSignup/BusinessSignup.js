import React from 'react';
import styles from './BusinessSignup.module.css';
import KindOfBusiness from './KindOfBusiness/KindOfBusiness';
import {connect} from 'react-redux';

const BusinessSignup = (props) => {
    return (
    <div id={styles.bSignupContainer}>
        <div id={styles.welcomeContainer}>
        <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>We appreciate your interest in Everyone Books. Let's get you started right away! </p>
        {(props.kindOfBusiness === "" || props.nameOfBusiness === "")  && <KindOfBusiness/>}
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness
    }
}

export default connect(mapStateToProps)(BusinessSignup);
import React from 'react';
import styles from './BusinessSignup.module.css';
import KindOfBusiness from './KindOfBusiness/KindOfBusiness';
import {connect} from 'react-redux';
import AdminSignup from './AdminSignup/AdminSignup';
import PeopleAnimation from './PeopleAnimation/PeopleAnimation';

const BusinessSignup = (props) => {

    return (
    <div id={styles.bSignupContainer}>
        <div id={styles.welcomeContainer}>
        {!props.kindBusinessCompleted && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
        We appreciate your interest in Everyone Books. Let's get you started right away! 
        </p>}
        {props.kindBusinessCompleted && <p style={{fontSize: '20px', textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '5px', color: 'black'}}>
        Now we need some information about you so we can create your administrator account. This shouldn't take too long.
        </p>}
        
        {(props.kindOfBusiness === "" || props.nameOfBusiness === "" || props.kindBusinessCompleted === false)  && <KindOfBusiness/>}
        {props.kindBusinessCompleted && <AdminSignup/>}
        </div>
        <PeopleAnimation/>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness,
        kindBusinessCompleted: state.newReducers.kindBusinessCompleted
    }
}

export default connect(mapStateToProps)(BusinessSignup);
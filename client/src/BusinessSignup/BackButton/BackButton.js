import React from 'react';
import styles from '../BusinessSignup.module.css';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import {connect} from 'react-redux';
import {BACK_FUNCTION} from '../../actions/actions';

const BackButton = (props) => {


    return (
        <div id={styles.backButton} style={{marginTop: "14px", marginLeft: "8px"}}>
        <SubmitButton onClick={props.backFunction}><i style={{marginRight: '5px'}} className="far fa-arrow-alt-circle-left"></i>Back</SubmitButton>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        backFunction: () => dispatch({type: BACK_FUNCTION})
    }
}


export default connect(null, mapDispatchToProps)(BackButton);

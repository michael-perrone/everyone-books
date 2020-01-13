import React from 'react';
import {GET_KIND_OF_BUSINESS, GET_NAME_OF_BUSINESS, KIND_BUSINESS_COMPLETED} from '../../actions/actions'
import {connect} from 'react-redux';
import TemporaryStatement from '../../Shared/TemporaryStatement/TemporaryStatement';
import styles from '../BusinessSignup.module.css';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton';
import StatementAppear from '../../Shared/StatementAppear/StatementAppear';



const KindOfBusiness = (props) => {
    const [businessKindEntered, setBusinessKindEntered] = React.useState(false);
    const [nameOfBusiness, setNameOfBusiness] = React.useState('');
    
    function getKindOfBusinessFunction(e) {
        props.getKindOfBusiness(e.target.value);
        setBusinessKindEntered(true);
        setTimeout(() => setBusinessKindEntered(false), 2000)
    }

    function getNameOfBusinessFunction(e) {
        setNameOfBusiness(e.target.value)
    }

    function submitName() {
        props.getNameOfBusiness(nameOfBusiness);
    }

    return (
    <div id={styles.kindOfBusinessDiv}>
        <p>First, select below what business you would like to set up. If you don't see your type of business, please choose other or contact us.</p>
        <select onChange={getKindOfBusinessFunction} id={styles.inputOrSelectKindBusiness}>
            <option> </option>
            <option>Wax Center</option>
            <option>Beauty Center</option>
            <option>Fitness Center</option>
            <option>Medical Office</option>
            <option>Restaurant</option>
            <option>Hair Salon</option>
            <option>Tanning Salon</option>
            <option>Barber Shop</option>
            <option>Tattoo Studio</option>
            <option>Tennis Club</option>
            <option>Other</option>
        </select>
        <TemporaryStatement marginTop={'15px'} show={businessKindEntered && props.kindOfBusiness !== ""}>Cool, a {props.kindOfBusiness}, got it.</TemporaryStatement>
        <StatementAppear appear={props.kindOfBusiness !== ""}>
        <p>Now let's get the name of your business.</p>
        <input onChange={getNameOfBusinessFunction} style={{paddingLeft: "8px", width: '200px'}} id={styles.inputOrSelectKindBusiness} placeholder="Business Name"/>
        <SubmitButton onClick={submitName}>Submit</SubmitButton>
        </StatementAppear>
        <StatementAppear marginTop={'40px'} appear={props.nameOfBusiness !== "" && props.kindOfBusiness !== ""}>
        <p>Great, next we need some information about you. Would you like to continue?</p>
        <SubmitButton marginTop={'30px'} onClick={props.kindBusinessCompleted}>Yes, lets do it!</SubmitButton>
        </StatementAppear>
    </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getNameOfBusiness: (nameBusiness) => dispatch({type: GET_NAME_OF_BUSINESS, payload: nameBusiness }),
        getKindOfBusiness: (kindBusiness) => dispatch({type: GET_KIND_OF_BUSINESS, payload: kindBusiness }),
        kindBusinessCompleted: () => dispatch({type: KIND_BUSINESS_COMPLETED})
    }
}

const mapStateToProps = state => {
    return {
        kindOfBusiness: state.newReducers.kindOfBusiness,
        nameOfBusiness: state.newReducers.nameOfBusiness
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KindOfBusiness);
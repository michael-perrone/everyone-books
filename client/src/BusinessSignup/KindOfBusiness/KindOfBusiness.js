import React from 'react';
import {GET_KIND_OF_BUSINESS, GET_NAME_OF_BUSINESS} from '../../actions/actions'
import {connect} from 'react-redux';
import TemporaryStatement from '../../Shared/TemporaryStatement/TemporaryStatement';
import styles from '../BusinessSignup.module.css';
import SubmitButton from '../../Shared/SubmitButton/SubmitButton'



const KindOfBusiness = (props) => {
    const [businessKindEntered, setBusinessKindEntered] = React.useState(false);
    const [nameOfBusiness, setNameOfBusiness] = React.useState('');
    console.log(props)
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
        <p>First, select below what business you would like to set up. If not found, click "Other".</p>
        <select onChange={getKindOfBusinessFunction} id={styles.inputOrSelectKindBusiness}>
            <option>Skin Care Center</option>
            <option>Fitness Center</option>
            <option>Medical Office</option>
            <option>Dental Office</option>
            <option>Restaurant</option>
            <option>Hair Salon</option>
            <option>Barber Shop</option>
            <option>Tattoo Studio</option>
            <option>Tennis Club</option>
            <option>Other</option>
        </select>
        <TemporaryStatement marginTop={'15px'} show={businessKindEntered}>Cool, a {props.kindOfBusiness}, got it.</TemporaryStatement>
        {props.kindOfBusiness !== "" && !businessKindEntered  && 
        <div id={styles.kindOfBusinessDiv}>
        <p>Now let's get the name of your business.</p>
        <input onChange={getNameOfBusinessFunction} style={{paddingLeft: "8px", width: '200px'}} id={styles.inputOrSelectKindBusiness} placeholder="Business Name"/>
        <SubmitButton onClick={submitName}>Submit</SubmitButton>
        </div>}
    </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getNameOfBusiness: (nameBusiness) => dispatch({type: GET_NAME_OF_BUSINESS, payload: nameBusiness }),
        getKindOfBusiness: (kindBusiness) => dispatch({type: GET_KIND_OF_BUSINESS, payload: kindBusiness })
    }
}

const mapStateToProps = state => {
    return {
        kindOfBusiness: state.newReducers.kindOfBusiness
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KindOfBusiness);
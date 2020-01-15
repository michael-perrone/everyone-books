import React from 'react';
import otherstyles from '../BusinessSignup.module.css';
import img from './d.png'
const PeopleAnimation = (props) => {
    return (
        <div className={otherstyles.peopleContainer}>
            <img style={{height: '400px', width: '400px'}} src={img}/> 
        </div>
    )
}

export default PeopleAnimation;
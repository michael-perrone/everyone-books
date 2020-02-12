import React from 'react';
import otherstyles from '../BusinessSignup.module.css';
import redguy from './redguyimagereal.png';
import styles from './PeopleAnimation.module.css';
import blueguy from './blueguyimagereal.png';   

const PeopleAnimation = (props) => {
const [firstBlueShow, setFirstBlueShow] = React.useState(false);
const [firstRedShow, setFirstRedShow ] = React.useState(false);
const [secondBlueShow, setSecondBlueShow] = React.useState(false);
const [secondRedShow, setSecondRedShow ] = React.useState(false);
const [thirdBlueShow, setThirdBlueShow] = React.useState(false);
const [thirdRedShow, setThirdRedShow ] = React.useState(false);
const [fourthBlueShow, setFourthBlueShow] = React.useState(false);
const [fourthRedShow, setFourthRedShow ] = React.useState(false);
const [fifthBlueShow, setFifthBlueShow] = React.useState(false);
const [fifthRedShow, setFifthRedShow ] = React.useState(false);
const [sixthBlueShow, setSixthBlueShow] = React.useState(false);
const [bye, setBye] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => setFirstBlueShow(true) ,1000);
        setTimeout(() => setFirstRedShow(true), 2500); 
        setTimeout(() => setFirstBlueShow(false), 4000);
        setTimeout(() => setFirstRedShow(false) , 5500);
        setTimeout(() => setSecondBlueShow(true) ,7000);
        setTimeout(() => setSecondRedShow(true), 8500);
        setTimeout(() => setSecondBlueShow(false), 10000);
        setTimeout(() => setSecondRedShow(false) ,11500);
        setTimeout(() => setThirdBlueShow(true) , 13000);
        setTimeout(() => setThirdRedShow(true), 14500);
        setTimeout(() => setThirdBlueShow(false), 16000);
        setTimeout(() => setThirdRedShow(false) ,17500);
        setTimeout(() => setFourthBlueShow(true) ,19000);
        setTimeout(() => setFourthBlueShow(false), 20500);
        setTimeout(() => setFifthBlueShow(true) ,22000);
        setTimeout(() => setFourthRedShow(true), 23500);
        setTimeout(() => setFifthBlueShow(false), 25000);
        setTimeout(() => setFourthRedShow(false) ,26500);
        setTimeout(() => setSixthBlueShow(true), 28000);
        setTimeout(() => setFifthRedShow(true), 29500);  
        setTimeout(() => setBye(true), 32000);
    }, [])

    
    return (
        <div className={otherstyles.peopleContainer}>
            <img style={{position: 'absolute', top: '100px', left: '-10px', zIndex:444}} id={bye ? styles.bye : ""} src={redguy}/> 
            <img style={{position: 'relative', top: '100px'}}  src={blueguy}/> 
            <p id={firstBlueShow ? styles.show : ""} className={styles.blueShow}>Hey did you hear about Everyone Books?</p>
            <p id={firstRedShow ? styles.show : ""} className={styles.redShow}>Nope. What is it?</p>
            <p id={secondBlueShow ? styles.show : ""} className={styles.blueShow}>Only the best website ever!!!</p>
            <p id={secondRedShow ? styles.show : ""} className={styles.redShow}>Really?</p>
            <p id={thirdBlueShow ? styles.show : ""} className={styles.blueShow}>Yes, everyone at my business loves it.</p>
            <p id={thirdRedShow ? styles.show : ""} className={styles.redShow}>How does it work?</p>
            <p id={fourthBlueShow ? styles.show : ""} className={styles.blueShow}>Enter a small amount of info about your business...</p>
            <p id={fifthBlueShow ? styles.show : ""} className={styles.blueShow}>And booking software will be created instantly!</p>
            <p id={fourthRedShow ? styles.show : ""} className={styles.redShow}>WOW, how much is it?</p>
            <p id={sixthBlueShow ? styles.show : ""} className={styles.blueShow}>It's FREE!</p>
            <p id={fifthRedShow ? styles.show : ""} style={{display: bye ? 'none' : ""}} className={styles.redShow}>I gotta go check this out!</p>
        </div>
    )
}

export default PeopleAnimation;
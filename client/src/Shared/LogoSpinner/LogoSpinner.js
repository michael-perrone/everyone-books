import React, { useEffect } from 'react';
import logo from './logo_250.png';
import styles from './LogoSpinner.module.css';

function LogoSpinner(props) {

    const [className, setClassName] = React.useState("");

    useEffect(function() {
        if (props.progress === 1) {
            setClassName(styles.p1)
        }
        else if (props.progress === 3) {
            setClassName(styles.p2)
        }
        else if (props.progress === 5) {
            setClassName(styles.p3)
        }
        else if (props.progress === 7) {
            setClassName(styles.p4)
        }
        else if (props.progress > 7) {
            setClassName(styles.p5)
        }
        else if (props.progress === 0) {
            setClassName("")
        }
    }, [props.progress])

    return (
        <div style={{transform: `rotate(${props.progress * 0}deg)`}} className={styles.rotato} id={styles.logo_container}>
            <div style={{top: "0px", display: props.progress > 0 ? "none" : ""}} className={styles.whiter}></div>
            <div style={{top: "70px", right: "200px", transform: "rotate(-45deg)", display: props.progress > 7 ? "none" : ""}} className={styles.whiter}></div>
            <div style={{top: "150px", right: "210px", transform: "rotate(-90deg)", display: props.progress > 6 ? "none" : ""}} className={styles.whiter}></div>
            <div style={{top: "295px", right: "130px", transform: "rotate(40deg)", display: props.progress > 5 ? "none" : ""}} className={styles.whiter}></div>
            <div style={{top: "298px", right: "80px", transform: "rotate(-8deg)", display: props.progress > 4 ? "none" : ""}} className={styles.whiter}></div>
            <div style={{top: "275px", right: "-20px", transform: "rotate(-50deg)", display: props.progress > 3 ? "none" : ""}} className={styles.whiter}></div>
            <div style={{top: "200px", right: "-90px", transform: "rotate(-89deg)", display: props.progress > 2 ? "none" : ""}} className={styles.whiter}></div>
            <div style={{top: "90px", right: "-86px", transform: "rotate(-124deg)", display: props.progress > 1 ? "none" : ""}} className={styles.whiter}></div>
            <div id={styles.outside_loop}>
                <div id={styles.inside_logo_container}>
                    <img className={className} id={styles.logo} src={logo}/>
                </div>
            </div>
        </div>
    )
  
}


export default LogoSpinner;
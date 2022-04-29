import React from 'react';
import styles from './ServiceList.module.css';

function ServiceList(props) {
    return (
        props.array ?
        <div>
        {props.array.map((element, index) => {
            return (
                
                <div id={styles.mainContainer} key={element["id"]}>
                    {props.selectedServices.indexOf(element["id"]) === -1 &&
                    <div id={styles.subContainer}>
                       <p style={{fontSize: "18px"}}>{element["displayName"]}</p>
                       <button onClick={props.addService(element["id"])} id={styles.button}>
                        +
                       </button>
                    </div>}
                    {props.selectedServices.indexOf(element["id"]) !== -1 &&
                    <div style={{backgroundColor: "gray", color: "lavenderblush"}} id={styles.subContainer}>
                       <p style={{fontSize: "18px"}}>{element["displayName"]}</p>
                       <button style={{right: "12px"}} onClick={props.minusService(element["id"])} id={styles.button}>
                        -
                       </button>
                    </div>}
                </div> 
                
            )
        })}
        </div> : 
        <p style={{fontWeight: "bold", textAlign: "center"}}>{props.none}</p>
    )
}

export default ServiceList;
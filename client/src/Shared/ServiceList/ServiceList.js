import React from 'react';
import styles from './ServiceList.module.css';

function ServiceList(props) {
    return (
        props.array ?
        <div style={{width: props.small ? "218px" : "", height: props.small ? "202px" : "", boxShadow: props.small ? "none" : ""}} id={props.smaller ? styles.otha : styles.otherMainContainer}>
        {props.array.map((element, index) => {
            return (
                    props.selectedServices.indexOf(element["_id"]) === -1 ?
                    <div key={element["_id"] + index} id={!props.small ? styles.subContainer : styles.smallSubContainer}>
                       {!props.prod && <p style={{fontSize: props.small ? "16px" : "18px"}}>{element["serviceName"]}</p>}
                       {props.prod &&  <p style={{fontSize: props.small ? "16px" : "18px"}}>{element["name"]}</p>}
                       <button onClick={props.addService(element)} id={styles.button}>
                        +
                       </button>
                    </div> :
                    props.selectedServices.indexOf(element["_id"]) !== -1 &&
                    <div key={element["_id"] + index} style={{backgroundColor: "gray", color: "lavenderblush"}} id={!props.small ? styles.subContainer : styles.smallSubContainer}>
                        {!props.prod && <p style={{fontSize: props.small ? "16px" : "18px"}}>{element["serviceName"]}</p>}
                       {props.prod &&  <p style={{fontSize: props.small ? "16px" : "18px"}}>{element["name"]}</p>}
                       <button style={{right: "12px"}} onClick={props.minusService(element["_id"])} id={styles.button}>
                        -
                       </button>
                    </div>
            )
        })}
        </div> : 
        <p style={{fontWeight: "bold", textAlign: "center"}}>{props.none}</p>
    )
}

export default ServiceList;
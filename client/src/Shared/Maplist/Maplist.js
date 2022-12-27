import React from 'react';
import styles from './Maplist.module.css';
import trash from './trash.png';

function Maplist(props) {
    return (
        props.array ?
        <div style={{maxHeight: props.small ? "180px": "400px", width: props.small ? "210px" : "", overflow: "auto"}}>
        {props.array.map((element, index) => {
            return (
                <div id={styles.mainContainer} key={element["id"] + index}>
                    <div id={props.small ? styles.otherSubContainer : styles.subContainer}>
                       <p style={{fontSize: props.small ? "16px" : "18px"}}>{element["displayName"]}</p>
                       <button onClick={props.name ? props.delete(element["displayName"]) : props.delete(element["id"])} id={styles.button}>
                       <img style={{height: props.small ? "24px" : ""}} src={trash}/>
                       </button>
                    </div>
                </div>
            )
        })}
        </div> : 
        <p style={{fontWeight: "bold", textAlign: "center"}}>{props.none}</p>
    )
}

export default Maplist;
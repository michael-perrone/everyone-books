import React from 'react';
import styles from './Maplist.module.css';
import trash from './trash.png';

function Maplist(props) {
    return (
        props.array ?
        <div>
        {props.array.map((element, index) => {
            return (
                <div id={styles.mainContainer} key={element["id"]}>
                    <div id={styles.subContainer}>
                       <p style={{fontSize: "18px"}}>{element["displayName"]}</p>
                       <button onClick={props.name ? props.delete(element["displayName"]) : props.delete(element["id"])} id={styles.button}>
                       <img src={trash}/>
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
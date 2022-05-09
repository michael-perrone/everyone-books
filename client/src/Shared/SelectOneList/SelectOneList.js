import React from 'react';
import styles from './SelectOneList.module.css';

function SelectOneList(props) {
    return (
        props.array ?
        <div style={{maxHeight: "270px", overflow: "auto", boxShadow: '0px 0px 2px black', width: "250px"}}>
        {props.array.map((element, index) => {
            return (
                    props.selected !== element["id"] ?
                    <div key={element["_id"]} onClick={() => props.selectOne(element["id"])} id={styles.subContainer}>
                       <p style={{fontSize: "18px"}}>{element["displayName"]}</p>
                    </div>
                      :
                    <div key={element["_id"]} style={{backgroundColor: "gray", color: "lavenderblush"}} onClick={props.unSelectOne} id={styles.subContainer}>
                       <p style={{fontSize: "18px"}}>{element["displayName"]}</p>
                    </div>
                    
             
            )
        })}
        </div> : 
        <p style={{fontWeight: "bold", textAlign: "center"}}>{props.none}</p>
    )
}

export default SelectOneList;
import React from 'react';
import styles from './HorizontalList.module.css';
import {createGridList, createNumList} from '../../feutils/feutils';

function HorizontalList(props) {
    return (
        <div style={{gridTemplateColumns: createGridList(props.list)}} id={styles.mainContainer}>
            {props.list.map((element, index) => {
                return (
                   props.selected && props.selected._id === element._id ?
                    <p onClick={props.deselect} className={styles.selected}>
                        {element.fullName}
                    </p>
                    :
                  <p onClick={props.select(element)} className={styles.unselected}>
                      {element.fullName}
                  </p>  
                )
            })}
        </div>
    )
}

export default HorizontalList;
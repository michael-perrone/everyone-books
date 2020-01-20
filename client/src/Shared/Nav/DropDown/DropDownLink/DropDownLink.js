import React from 'react';
import styles from './DropDownLink.module.css';
import otherstyles from '../../Nav.module.css';

const DropDownLink = (props) => {   
    return (
        <div id={styles.dropDownLink} onClick={props.clickProp}>
           {props.notiNum > 0 && <span style={{right: '20px', padding: '2px 8px 4px 8px',top: '-1px', position: 'relative', fontWeight: 'bold'}} className={otherstyles.notiNum}>{props.notiNum}</span>}
            <p style={{display: 'inline', marginRight: "30px"}}>{props.children}</p>
        </div>
    )
}

export default DropDownLink;
import React from 'react';
import styles from './Core.module.css';

const Core = (props) => {
    return (
        <React.Fragment>
        <div id={styles.coreContainer}>
            <div id={styles.actualCoreContainer}>
                <p style={{textAlign: 'center', paddingTop: '12px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'underline'}}>Book Online</p>
                <select>
                    
                </select>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Core;
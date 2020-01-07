import React from 'react';
import styles from './Spinner.module.css';

function Spinner (props) {
    return (
        <div id={styles.backGround}>
        <div id={styles.ballHolder} style={{position: 'absolute'}}>
        <p id={styles.loadingTag}>Loading...</p>    
        <img
          id={styles.bottomLeftStarter}
          className={styles.tennisBall}
          src="https://img.icons8.com/color/48/000000/tennis-ball.png"
          alt="tennis ball"
        />
        
        <img
          id={styles.topStarter}
          className={styles.tennisBall}
          src="https://img.icons8.com/color/48/000000/tennis-ball.png"
          alt="tennis ball"
        />
        <img
          id={styles.bottomRightStarter}
          className={styles.tennisBall}
          src="https://img.icons8.com/color/48/000000/tennis-ball.png"
          alt="tennis ball"
        />
        </div>   
        </div> 
    )
}


export default Spinner;
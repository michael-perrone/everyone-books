import React from 'react';
import styles from './LeftSide.module.css';
import About from './About/About';
import Contact from './Contact/Contact';
import Hours from './Hours/Hours';
import ServicesTab from './ServicesTab/ServicesTab';

const LeftSide = (props) => {
    const [selected, setSelected] = React.useState('Contact');


    return (
           <div id={styles.tabContainer}>
               <div id={styles.infoContainer}>
                <Contact business={props.business}/>
                <Hours schedule={props.schedule}/>
                <ServicesTab services={props.services}/>
               </div>
           </div>
    )
}

export default LeftSide;
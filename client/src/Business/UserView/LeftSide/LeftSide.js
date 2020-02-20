import React from 'react';
import styles from './LeftSide.module.css';
import About from './About/About';
import Contact from './Contact/Contact';
import Hours from './Hours/Hours';
import ServicesTab from './ServicesTab/ServicesTab';

const LeftSide = (props) => {
    const [selected, setSelected] = React.useState('Contact');
    const [left, setLeft] = React.useState('0px');


    function handleSelected(newSelected) {
        return () => {
            setSelected(newSelected)
        }
    }

    React.useEffect(() => {
        if (selected === "Contact") {
            setLeft('0px')
        }
        else if (selected === "About") {
            setLeft('76px')
        }
        else if (selected === "Services") {
            setLeft('152px')
        }
        else if (selected === "Hours") {
            setLeft('228px')
        }
    }, [selected])

    return (
           <div id={styles.tabContainer}>
               <div id={styles.tabsHolder}> 
                    <p onClick={handleSelected("Contact")} style={{backgroundColor: selected === "Contact" ? "white" : ""}} className={styles.tab}>Contact</p>
                    <p onClick={handleSelected("About")} style={{backgroundColor: selected === "About" ? "white" : ""}} className={styles.tab}>About</p>
                    <p onClick={handleSelected("Services")} style={{backgroundColor: selected === "Services" ? "white" : ""}} className={styles.tab}>Services</p>
                    <p onClick={handleSelected("Hours")} style={{backgroundColor: selected === "Hours" ? "white" : ""}} className={styles.tab}>Hours</p>   
               </div>
               <div id={styles.infoContainer}>
               <div style={{position: 'absolute', zIndex: '100000000000', height: '8px', width: '74px', left: left, top: '-4px', backgroundColor: 'white'}}></div>
               {selected === "Contact" && <Contact business={props.business}/>}
               {selected === "About" && <About bio={props.profile.bio}/>}
               {selected === "Services" && <ServicesTab services={props.services}/>}
               {selected === "Hours" && <Hours schedule={props.schedule}/>}
               </div>
           </div>
    )
}

export default LeftSide;
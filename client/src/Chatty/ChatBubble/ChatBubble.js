import react from "react"; 
import styles from "./ChatBubble.module.css";
function ChatBubble(properties) {
    return (
         <div style={{marginTop: properties.id !== 0 ? "35px" : "17px"}} className={properties.fromBot ? styles.box: styles.userInputBox} id={styles.box}>
            <div className={properties.fromBot ? styles.arrow: styles.userArrow} id ={styles.arrow}/>
        <p style={{color: "black"}}>
            {properties.chat}
        </p>
    </div>
    )

}



export default ChatBubble;
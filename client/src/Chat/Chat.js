import react, {useState} from "react"; 
import styles from './Chat.module.css';
import ChatBubble from './ChatBubble/ChatBubble';

function Chat() {

    const [chatsSent, setChatsSent] = useState([]);
    const [chatText, setChatText] = useState('');

    function addChat(){
        const newArray = [...chatsSent];
        if (chatText === '') {
            return;
        }
        newArray.push(chatText);
        setChatsSent(newArray);
        clearText();
    }

    function clearText() {
        setChatText('');
    }

    function toSetChatText(event) {
        setChatText(event.target.value);
    }


    return (
        <div id={styles.box}>
            {chatsSent.map(function(element,index) {
                return <ChatBubble chat={element} fromUser={true} index ={index}/>
            })}
            <input value={chatText} onChange={toSetChatText} id={styles.chatInput}/>
            <button onClick={addChat} id={styles.sendButton}>Send</button>

        </div>
    )

}

export default Chat; 
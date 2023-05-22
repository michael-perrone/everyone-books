import React, { useState, useEffect } from 'react';
import ChatBubble from '../Chat/ChatBubble/ChatBubble';
import styles from './Chatty.module.css';
import send from './send.png';
//import ChatBubble from './ChatBubble/ChatBubble';

const Chatty = (props) => {
    const intro = "Hello my name is chatty the chat bot I am quite silly and willy but I will do my best to help you today.";
    const defaultResponse = "We're sorry! We aren't sure what you are requesting help with. Please try again."; 
    const bookingResponse = "Would you like to schedule a booking?"
    let counter = 0; 

    const [chatText, setChatText] = useState('');
    const [str, setStr] = useState('');
    const [chats, setChats] = useState([{fromBot: true, id: 0, msg: ''}]);
    const [textFieldText, setTextFieldText] = useState('');
   


    function splitStr(str) {
        return str.split('');
    }

    useEffect(function () {
        makeMagic(0, intro);
    }, [])

    // useEffect(function() { console.log(chats.length)}, [chats.length]);
    
    // useEffect takes in 2 parameters, first is a function that is basically the effect that you want to happen, the second is an array of possible properties or state variables that you need to keep track of to induce this effect

    function makeMagic(id, newStr) {
        let newStringToArray = splitStr(newStr);
        const potatio = setInterval(() => {
            const chatsReplica = [...chats];
           if (chats[id].msg === undefined) {
               chats[id].msg = "";
           }
            chatsReplica[id].msg = chatsReplica[id].msg + newStringToArray[counter];
            setChats(chatsReplica);
            counter++;
            if(counter === intro.length){
                clearInterval(potatio); 
           }
        }
        , 30);
    }

    // function typeOutResponse(msg){
        
    // }


    function addChatFromUser() {
        if (textFieldText === "") {
            return;
        }
        const chatsReplica = [...chats];
        const newChat = {fromBot: false, msg: textFieldText, id: chats.length};
        chatsReplica.push(newChat);
        setChats(chatsReplica);
        setTextFieldText("");
    }   

    useEffect(function() {
        if (!chats[chats.length - 1].fromBot) {
            generateBotResponse();
        }
        else {
            return;
        }
    }, [chats.length]);
    
    function changeTextFieldText(event) {
        setTextFieldText(event.target.value);
    }

    function generateBotResponse(){
        const chatsReplica = [...chats];
        let booking = false;  
        if(chatsReplica[chatsReplica.length - 1].msg.includes("book" || "booking")){
            booking = true; 
        }
        let newChat = {fromBot: true, msg: "", id: chatsReplica.length};
        chatsReplica.push(newChat);
        setChats(chatsReplica); 
        let botMessage = defaultResponse; 
        if(booking === true){
            botMessage = bookingResponse; 
        }
        printOutBotResponse(botMessage, chats.length-1); 
    }

     function printOutBotResponse(botMessage, id,){
        let newStringToArray = splitStr(botMessage);
        const potatio = setInterval(() => {
            const chatsTempArr = [...chats];
           if (chats[id].msg === undefined) {
               chats[id].msg = "";
           }
            chatsTempArr[id].msg = chatsTempArr[id].msg + newStringToArray[counter];
            setChats(chatsTempArr);
            console.log(chats[chats.length-1].msg); 
            console.log(counter); 
            if(counter === botMessage.length){
                clearInterval(potatio); 
           }
           counter++;
        }
        , 30);
    }

    return (
    //     <div id={styles.box}>
    //     {chatsSent.map(function(element,index) {
    //         return <ChatBubble chat={element} fromUser={true} index ={index}/>
    //     })}
    //     <input value={chatText} onChange={toSetChatText} id={styles.chatInput}/>
    //     <button onClick={addChat} id={styles.sendButton}>Send</button>

    // </div>
    
        <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column", position: 'fixed', right: 10, bottom: 0, height: "400px", width: "450px", border: "1.7px solid black", backgroundColor: "lavenderblush", zIndex: 300}}>
            <div style={{height: "300px", overflow: "auto"}}>
                {chats.map(chat => <ChatBubble id={chat.id} fromBot={chat.fromBot} chat={chat.msg}/>)}
            </div>
            <img onClick={addChatFromUser} id={styles.plane} src={send}/>
            <textarea value={textFieldText} onChange={changeTextFieldText} style={{color: "black", height: "100px", resize: 'none', position: 'relative', width: "448px", left: "-1px"}}/>
        </div>
    )
}

export default Chatty;
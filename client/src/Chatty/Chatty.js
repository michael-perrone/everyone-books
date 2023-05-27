import React, { useState, useEffect } from 'react';
import ChatBubble from '../Chat/ChatBubble/ChatBubble';
import styles from './Chatty.module.css';
import send from './send.png';
import { chattyKathy1, gettingConfirmation } from '../feutils/feutils';
//import ChatBubble from './ChatBubble/ChatBubble';

const Chatty = (props) => {
    const intro = "Hello my name is chatty the chat bot I am quite silly and willy but I will do my best to help you today.";
    const defaultResponse = "I am sorry! I am not sure what you are requesting help with. Please try again."; 
    const bookingResponse = "Would you like to schedule a booking?"
    let counter = 0; 
    const [needDate, setNeedDate] = useState(false);
    const [chatText, setChatText] = useState('');
    const [str, setStr] = useState('');
    const [chats, setChats] = useState([{fromBot: true, id: 0, msg: ''}]);
    const [textFieldText, setTextFieldText] = useState('');
    const [needConfirmation, setNeedConfirmation] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [typeOfRequest, setTypeOfRequest] = useState(0);
    const [notFound, setNotFound] = useState(false);

    // Create Booking - 1
    // Delete Booking - 2

    function generateBotResponse(){
        const chatsReplica = [...chats];
        counter = 0;
        if (needConfirmation) {
            let confirmationResponse = gettingConfirmation(chatsReplica[chatsReplica.length - 1].msg);
            console.log(confirmationResponse);
            if (confirmationResponse) {
                if (typeOfRequest === 1) {
                    createBotChat("What date would you like to schedule your booking for?", chatsReplica);
                }
            }
            else {
                console.log("do i run")
                createBotChat("I am sorry! I was not quite able to determine what you are trying to get help with. Please try again.", chatsReplica);
            }
        }
        else {
            let response = chattyKathy1(chatsReplica[chatsReplica.length - 1].msg);
            if (response !== "I couldn't find what you were looking for, would you please try a different command?") {
                if (response === "Would you like to create a booking?") {
                    setNeedConfirmation(true);
                    setTypeOfRequest(1);
                    createBotChat(response, chatsReplica);
                }
            }
            else {
                createBotChat(response, chatsReplica);
            }
        }
    }

    function createBotChat(response, chatsReplica) {
        document.getElementById("yo").scrollTo({
            top: 1000 * 16
         });
        let newChat = {fromBot: true, msg: "", id: chatsReplica.length};
        chatsReplica.push(newChat);
        let newStringToArray = splitStr(response);
        const potatio = setInterval(() => {
        //    if (chatsReplica[chatsReplica.length - 1].msg === undefined) {
        //        chatsReplica[chatsReplica.length - 1].msg = "";
        //    }
            let str = chatsReplica[chatsReplica.length - 1].msg;
            str = str + newStringToArray[counter];
            let newObj = {...chatsReplica[chatsReplica.length - 1], msg: str};
            chatsReplica[chatsReplica.length - 1] = newObj;
            setChats([...chatsReplica]);
            counter++;
            if(counter === response.length){
                clearInterval(potatio); 
           }
        }
        , 50);

    }
   


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
           if (chatsReplica[id].msg === undefined) {
               chatsReplica[id].msg = "";
           }
            chatsReplica[id].msg = chatsReplica[id].msg + newStringToArray[counter];
            setChats(chatsReplica);
            counter++;
            if(counter === intro.length){
                clearInterval(potatio); 
           }
        }
        , );
    }

    // function typeOutResponse(msg){
        
    // }

    function enterPressed(e) {
        if (e.type === "keydown") {
            if (e.keyCode === 13) {
                addChatFromUser();
            }
        }
    }


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
            setTimeout(() => generateBotResponse(), 300);
        }
        else {
            return;
        }
    }, [chats.length]);

    useEffect(function() {
        if (chats.length === 3) {
            console.log(chats[2].msg);
        }
    }, [chats.length])
    
    function changeTextFieldText(event) {
        setTextFieldText(event.target.value);
    }

    function gm() {
        let msg;
        if (chats[chats.length - 1].fromBot === false) {
            msg = chats[chats.length - 1].msg;
            
        }
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
            <div id="yo" style={{height: "300px", overflow: "auto"}}>
                {chats.map(chat => <ChatBubble id={chat.id} fromBot={chat.fromBot} chat={chat.msg}/>)}
            </div>
            <img onClick={addChatFromUser} id={styles.plane} src={send}/>
            <textarea onKeyDown={enterPressed} value={textFieldText} onChange={changeTextFieldText} style={{color: "black", paddingLeft: "5px", paddingTop: "5px", height: "100px", resize: 'none', paddingRight: "40px", position: 'relative', width: "403px", left: "-1px"}}/>
        </div>
    )
}

export default Chatty;
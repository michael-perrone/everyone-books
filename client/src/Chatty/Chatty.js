import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble/ChatBubble';
import styles from './Chatty.module.css';
import send from './send.png';
import axios from 'axios';
import { connect } from 'react-redux';
import { chattyKathy1, findDateBot, gettingConfirmation, bigMagic, getLoc, findTime, findDay, findTimesMagic, extractServices } from '../feutils/botutils';

//import ChatBubble from './ChatBubble/ChatBubble';

const Chatty = (props) => {
    const intro = "Hello my name is Chatters the chatty bot. I can perform and help with many tasks. How can I help?"
    let counter = 0;

    /////// CHAT BOOKINGS CHAT BOOKINGS CHAT BOOKINGS BELOW ////////

    const [bookingState, setBookingState] = useState({loc: "", date: "", employee: "", services: [], time: ""})
    const [needLocation, setNeedLocation] = useState(false);
    const [needDate, setNeedDate] = useState(false);
    const [needEmployee, setNeedEmployee] = useState(false);
    const [needServices, setNeedServices] = useState(false);
    const [needTime, setNeedTime] = useState(false);
    const [needAnswer, setNeedAnswer] = useState(false);

    ///////// CHAT BOOKINGS ABOVE CHAT BOOKINGS ABOVE ///////////


    const [chats, setChats] = useState([{ fromBot: true, id: 0, msg: '' }]);
    const [textFieldText, setTextFieldText] = useState('');
    const [hideChat, setHideChat] = useState(false);

    // Create Booking - 1
    // Delete Booking - 2

    const [rotate, setRotate] = useState(true);

    function hide() {
        if (rotate) {
            setHideChat(true);
            setRotate(false);
        }
        else {
            setHideChat(false);
            setRotate(true);
        }
    }

    function generateBotResponse() {
        const chatsReplica = [...chats];
        const response = bigMagic(chatsReplica[chatsReplica.length - 1].msg, props.services, props.employees, props.name, props.eq);
        if (response.type === "booking") {
        setBookingState({loc: response.loc , date: response.date, employee: response.employee, services: response.services, time: response.time});
            console.log("WIDJQWJD")
            if (!response.loc && props.eq === "n") {
                createBotChat(`Could you clarify what ${props.name} you would like this booking to be located?`, chatsReplica);
                setNeedLocation(true);
                setNeedAnswer(true);
                return;
            }
           if (!response.date) {
                createBotChat(`Could you clarify the date you would like this booking to be on?`, chatsReplica);
                setNeedDate(true);
                setNeedAnswer(true);
                return;
            }
            if (response.time === "error" || !response.time) {
                createBotChat(`Could you clarify what time would you like this booking to be at?`, chatsReplica);
                setNeedTime(true);
                setNeedAnswer(true);
                return;
            }
            if (response.employee.length === 0) {
                createBotChat("What employee would you like to book for this?", chatsReplica);
                setNeedEmployee(true);
                setNeedAnswer(true);;
                return;
            }
            if (response.services.length === 0) {
                createBotChat(`What services would you like to be booked on this booking?`, chatsReplica);
                setNeedServices(true);
                setNeedAnswer(true);
                return;
            }
         
            else {
                createBotChat(`Okay I will go ahead and make this booking!`, chatsReplica);
                return;
            }
        }






        //     if (needNumber) {
        //         createBotChat("What services would you like to create")
        //     }
        //     else if (needDateConfirmation) {
        //         let confirmationResponse = gettingConfirmation(chatsReplica[chatsReplica.length - 1].msg);
        //         if (confirmationResponse) {
        //             createBotChat("How many services would you like your booking to have?", chatsReplica);
        //             setNeedNumber(true);
        //         }
        //     }
        //     else if (needDate) {
        //         const response = findDateBot(chatsReplica[chatsReplica.length - 1]);
        //         console.log(response);
        //         createBotChat(`Did you want to schedule it for ${response}?`, chatsReplica);
        //         setNeedDateConfirmation(true);      
        //     }

        //    else if (needConfirmation) {
        //         let confirmationResponse = gettingConfirmation(chatsReplica[chatsReplica.length - 1].msg);
        //         console.log(confirmationResponse);
        //         if (confirmationResponse) {
        //             if (typeOfRequest === 1) {
        //                 createBotChat("What date would you like to schedule your booking for?", chatsReplica);
        //                 setNeedDate(true);
        //                 setNeedConfirmation(false);
        //             }
        //         }
        //         else {
        //             createBotChat("I am sorry! I was not quite able to determine what you are trying to get help with. Please try again.", chatsReplica);
        //         }
        //     }
        //     else {
        //         let response = chattyKathy1(chatsReplica[chatsReplica.length - 1].msg);
        //         if (response !== "I couldn't find what you were looking for, would you please try a different command?") {
        //             if (response === "Would you like to create a booking?") {
        //                 setNeedConfirmation(true);
        //                 setTypeOfRequest(1);
        //                 createBotChat(response, chatsReplica);
        //             }
        //         }
        //         else {
        //             createBotChat(response, chatsReplica);
        //         }
        //     }
    }

    function createBotChat(response, chatsReplica) {
        let newChat = { fromBot: true, msg: "", id: chatsReplica.length };
        chatsReplica.push(newChat);
        let newStringToArray = splitStr(response);
        const potatio = setInterval(() => {
            let str = chatsReplica[chatsReplica.length - 1].msg;
            str = str + newStringToArray[counter];
            let newObj = { ...chatsReplica[chatsReplica.length - 1], msg: str };
            chatsReplica[chatsReplica.length - 1] = newObj;
            setChats([...chatsReplica]);
            counter++;
            if (counter % 5 === 0 || counter === 0) {
                document.getElementById("yo").scrollTo({
                    top: 100000
                });
            }
            if (counter === response.length) {
                clearInterval(potatio);
            }
        }
            , 20);

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
            if (counter === intro.length) {
                clearInterval(potatio);
            }
        }
            , 20);
    }


    useEffect(function() {
        if (needLocation || needDate || needServices || needTime) {
            getAnswer()
        }
        
    }, [needLocation, needDate, needServices, needTime])

    // function typeOutResponse(msg){

    // }

    function enterPressed(e) {
        if (e.type === "keydown") {
            if (e.keyCode === 13) {
                e.preventDefault();
                addChatFromUser();
            }
        }
    }


    function addChatFromUser() {
        if (textFieldText === "") {
            return;
        }
        const tfta = textFieldText.split(" ");
        for (let i = 0; i < tfta.length; i++) {
            if (tfta[i].length > 21) {
                return;
            }
        }
        const chatsReplica = [...chats];
        const newChat = { fromBot: false, msg: textFieldText, id: chats.length };
        chatsReplica.push(newChat);
        setChats(chatsReplica);
        setTextFieldText("");
        setTimeout(function () {
            document.getElementById("yo").scrollTo({
                top: 100000
            });
        }, 200);
    }

    useEffect(function () {
        if (!chats[chats.length - 1].fromBot) {
            if (!needAnswer) {
                console.log("YOOOO")
                setTimeout(() => generateBotResponse(), 300);
            }
            else {
                console.log("HEYYYYY")
                setTimeout(() => getAnswer(chats[chats.length - 1]), 300);
            }
        }
        else {
            return;
        }
    }, [chats.length]);

    useEffect(function () {
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

    function getAnswer(msg) {
        if (needLocation) {
           let loc = getLoc(msg.msg, props.name);
           if (!loc || loc === "error") {
               answerNotFound(`I still couldn't find what ${props.name} you said, try again with just a number.`);
           }
           else {
              setNeedLocation(false);
              setBookingState({...bookingState, loc})
              answerFound("loc");
              return;
           }
        }
        if (needTime) {
            let time = findTime(msg.msg);
            if (time.error) {
                time = findTimesMagic(msg.msg, "");
                if (time === "error") {
                    answerNotFound("I couldn't find the time that you specified, could you try again with a time?")
                }
                else {
                    answerFound("time")
                    setBookingState({...bookingState, time})
                }
            }
            else {
                answerFound("time");
                setBookingState({...bookingState, time})
            }
        }
        if (needDate) {
            let date = findDay(msg.msg);
            if (date.date) {
                answerFound("date");
                setBookingState({...bookingState, date: date.date})
            }
        }
        if (needServices) {
            let services = extractServices(msg.msg)
            if (services.defServices.length === 1) {
                answerFound("service");
                setBookingState({...bookingState, services: services.defServices});
            }
            else if (services.defServices.length > 1) {
                answerFound("services");
                setBookingState({...bookingState, services: services.defServices});
            }
        }
    }


    function answerFound(problem) {
        const chatsReplica = [...chats];
        if (problem === "loc") {
            createBotChat(`Great, I was able to find the ${props.name} that you specified.`, chatsReplica);
            setNeedLocation(false);
        }
        if (problem === "time") {
            createBotChat("Great, I was able to find the time that you specified.", chatsReplica);
            setNeedTime(false);
        }
        if (problem === "date") {
            createBotChat(`Great, I was able to find the date that you specified.`, chatsReplica);
            setNeedDate(false);
        }
        if (problem === "service") {
            createBotChat(`Great, I was able to find the service that you specified.`, chatsReplica);
            setNeedServices(false);
        }
        if (problem === "services") {
            createBotChat(`Great, I was able to find the service that you specified.`, chatsReplica);
            setNeedServices(false);
        }
    }

    


    function answerNotFound(msg) {
        const chatsReplica = [...chats];
        createBotChat(msg, chatsReplica);
    }




    return (
        //     <div id={styles.box}>
        //     {chatsSent.map(function(element,index) {
        //         return <ChatBubble chat={element} fromUser={true} index ={index}/>
        //     })}
        //     <input value={chatText} onChange={toSetChatText} id={styles.chatInput}/>
        //     <button onClick={addChat} id={styles.sendButton}>Send</button>

        // </div>

        <div className={hideChat ? styles.shrinkWhole : styles.notShrunkWhole} style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", position: 'fixed', right: 10, bottom: 0, width: "450px", border: "1.7px solid black", backgroundColor: "lavenderblush", zIndex: 300 }}>
            <div style={{ color: "black", display: "flex", justifyContent: "space-between", position: "absolute", top: hideChat ? "0px" : "-30px", height: hideChat ? "45px" : "30px", backgroundColor: "rgb(190, 190, 190)", width: "451px", left: '-1.8px', borderLeft: "1.7px solid black", borderBottom: "0.7px solid gray", borderTop: "1.7px solid black", borderRight: "1.7px solid black" }}>
                <p style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Permanent Marker', position: 'relative', top: '-10px', right: "-10px", fontSize: "30px" }}>Chatters</p>
                <p onClick={hide} id={styles.potato} style={{ fontSize: "34px", cursor: 'pointer', marginRight: "8px", marginTop: hideChat ? "2px" : "-4px", transform: !hideChat ? "rotate(180deg)" : "none", fontFamily: "monospace" }}>^</p>
            </div>
            <div id="yo" className={hideChat ? styles.shrink : styles.notShrunkChat} style={{ paddingBottom: "10px", overflow: "auto" }}>
                {chats.map(chat => <ChatBubble id={chat.id} fromBot={chat.fromBot} chat={chat.msg} />)}
            </div>
            <img style={{ opacity: hideChat ? 0 : 100 }} onClick={addChatFromUser} id={styles.plane} src={send} />
            <textarea className={hideChat ? styles.shrink : styles.notShrunkBox} onKeyDown={enterPressed} value={textFieldText} onChange={changeTextFieldText} style={{ color: "white", paddingLeft: "5px", paddingTop: hideChat ? "0px" : "5px", resize: 'none', paddingRight: "40px", position: 'relative', width: "403px" }} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.authReducer.admin
    }
}

export default connect(mapStateToProps)(Chatty);
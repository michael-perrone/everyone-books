import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble/ChatBubble';
import styles from './Chatty.module.css';
import send from './send.png';
import axios from 'axios';
import { connect } from 'react-redux';
import { chattyKathy1, gettingConfirmation, bigMagic, getLoc, findDate, findTime, findDay, findTimesMagic, extractServices, extractEmployees } from '../feutils/botutils';

//import ChatBubble from './ChatBubble/ChatBubble';

const Chatty = (props) => {
    const intro = "Hello my name is Bookie the booking bot. I can create and delete bookings for you. How can I help?"
    let counter = 0;

    /////// CHAT BOOKINGS CHAT BOOKINGS CHAT BOOKINGS BELOW ////////

    const [bookingState, setBookingState] = useState({loc: "", date: "", employee: "", services: [], time: ""})
    const [needLocation, setNeedLocation] = useState(false);
    const [needDate, setNeedDate] = useState(false);
    const [needEmployee, setNeedEmployee] = useState(false);
    const [needServices, setNeedServices] = useState(false);
    const [needTime, setNeedTime] = useState(false);
    const [erroro, setErroro] = useState("");



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
            if (!response.loc && props.eq === "n") {
                setNeedLocation(true);
            }
            else {
                setBookingState({loc: response.loc, ...bookingState})
            }
            if (!response.date) {
                setNeedDate(true);
            }
            else {
                setBookingState({date: response.date, ...bookingState});
            }
            if (response.time === "error" || !response.time) {
                setNeedTime(true);
            }
            else {
                setBookingState({time: response.time, ...bookingState});
            }
            if (response.services.length === 0) {
                console.log("DID I RUN?")
                setNeedServices(true);
            }
            else {
                setBookingState({services: response.services, ...bookingState})
            }
            if (response.employee.length === 0) {
                setNeedEmployee(true);
            }
            else {
                setBookingState({employee: response.employee, ...bookingState});
            }
            if ((response.loc || props.eq === "y") && response.date && response.time && response.time !== "error" && response.employee.length !== 0 && response.services.length > 0) {
                console.log("DJWIDJQIDJWIJDIWJQDJIQWDJQWDJ")
                const chatsReplica = [...chats];
                createBotChat(`Okay I will go ahead and try to make this booking!`, chatsReplica);
                createBooking()
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

    function createBooking() {
        axios.post('/api/iosBooking/createChatBooking', {bookingState: bookingState}, {headers: {"x-auth-token": localStorage.getItem("adminToken")}}).then(response => {
            if (response.status === 200) {
                console.log(response.status)
            }
        }).catch(error => {
            if (error.response.status === 406) {
                console.log("wdoqkwdijewfKWJDKQWJDKQWJDwkjdqwkjdkwqdkqWJDQKJDKQWJD")
                setErroro("It seems the employee you tried to book is not scheduled to be working at this time.")
                setTimeout(function() {
                    setErroro("");
                }, 1000)
            }
        })
    }

    useEffect(function() {
        console.log("hello?")
        console.log(bookingState)
        if ((bookingState.loc || props.eq === "y") && bookingState.date && bookingState.time !== "error" && bookingState.time && bookingState.services.length > 0 && bookingState.employee.length !== 0) {
            console.log("YOOOOO?")
            const chatsReplica = [...chats];
            createBotChat(`Okay I will go ahead and try to make this booking!`, chatsReplica);
            createBooking()
        }
    }, [bookingState])

    useEffect(function() {
        if (erroro !== "") {
            setTimeout(function() {
                const chatsReplica = [...chats];
                createBotChat(erroro, chatsReplica);
            }, 1000)
        }
    }, [erroro])

    function neeedLocation() {
        const chatsReplica = [...chats];
        setTimeout(() => createBotChat(`Could you clarify what ${props.name} you would like this booking to be located?`, chatsReplica), 300);
    }

    function neeedDate() {
        const chatsReplica = [...chats];
        setTimeout(() => createBotChat(`Could you clarify the date you would like this booking to be on?`, chatsReplica),300);
    }

    function neeedTime() {
        const chatsReplica = [...chats];
        setTimeout(() => createBotChat(`Could you clarify what time would you like this booking to be at?`, chatsReplica),300);
    }
    
    function neeedEmployee() {
        const chatsReplica = [...chats];
        setTimeout(() => createBotChat("What employee would you like to book for this?", chatsReplica),300);
    }

    function neeedServices() {
        const chatsReplica = [...chats];
        setTimeout(() => createBotChat(`What services would you like to be booked on this booking?`, chatsReplica),300);
    }


    function createBotChat(response, chatsReplica) {
        let newChat = { fromBot: true, msg: response, id: chatsReplica.length };
        chatsReplica.push(newChat);
        setChats(chatsReplica);
        document.getElementById("yo").scrollTo({
            top: 100000
        });
       // const potatio = setInterval(() => {
        // let str = chatsReplica[chatsReplica.length - 1].msg;
        // str = str + newStringToArray[counter];
        // let newObj = { ...chatsReplica[chatsReplica.length - 1], msg: str };
        // chatsReplica[chatsReplica.length - 1] = newObj;
        // counter++;
        // if (counter % 5 === 0 || counter === 0) {
        
        //     }
        // if (counter === response.length) {
        //     console.log("I SHOULD BE CLEARED")
        //         clearInterval(potatio);
        //     }
        //     setChats([...chatsReplica]);
        // }
        
        // , 20);
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
        console.log("IS THIS NOT ME?")
        if (!needLocation && !needDate && !needEmployee && !needServices && !needTime) {
            generateBotResponse();
    }
        else {
            if (needTime) {
                getAnswer(chats[chats.length - 1], "time");
                return;
            }
            else if (needDate) {
                getAnswer(chats[chats.length - 1], "date");
                return;
            }
            else if (needLocation) {
                getAnswer(chats[chats.length - 1], "location");
                return;
            }
            else if (needServices) {
                getAnswer(chats[chats.length - 1], "services");
                return;
            }
            else if (needEmployee) {
                getAnswer(chats[chats.length - 1], "employee");
                return;
            }
        }
    }
    }, [chats.length]);

    // do each effect individually based off whats needed //


    useEffect(function() {
        console.log(needDate);
        console.log("I AM IMPORTANT");
        console.log(needTime, needLocation, needEmployee, needServices)
        if (needTime) {
            console.log("DO I NEED THE TIME")
            neeedTime();
            return;
        }
        else if (needDate) {
            console.log("DO I NEED THE DATE!!!")
            neeedDate();
            return;
        }
        else if (needLocation) {
            neeedLocation();
            return;
        }
        else if (needServices) {
            neeedServices();
            return;
        }
        else if (needEmployee) {
            neeedEmployee();
            return;
        }
    }, [needLocation, needDate, needTime, needEmployee, needServices])


    function changeTextFieldText(event) {
        setTextFieldText(event.target.value);
    }

    function getAnswer(msg, gettingAnswer) {
        if (gettingAnswer === "location") {
           let loc = getLoc(msg.msg, props.name);
           if (!loc || loc === "error") {
               answerNotFound(`I still couldn't find what ${props.name} you said, try again with just a number.`);
               return;
           }
           else {
              setNeedLocation(false);
              setBookingState({...bookingState, loc})
              answerFound("loc");
              return;
           }
        }
        if (gettingAnswer === "time") {
            let time = findTime(msg.msg);
            if (time.error) {
                time = findTimesMagic(msg.msg, "");
                if (time === "error") {
                    answerNotFound("I couldn't find the time that you specified, could you try again with a time?")
                }
                else {
                    setNeedTime(false);
                    answerFound("time")
                    setBookingState({...bookingState, time})

                }
            }
            else {
                setNeedTime(false);
                answerFound("time");
                setBookingState({...bookingState, time})

            }
        }
        if (gettingAnswer === "date") {
            console.log(msg.msg)
            let date = findDay(msg.msg.split(" "));
            if (date.date) {
                answerFound("date", date.date);
                setBookingState({...bookingState, date: date.date})
                setNeedDate(false);
            }
            else {
                // remember this doesnt work rn
                console.log(findDate(msg.msg))
            }
        }
        if (gettingAnswer === "services") {
            let services = extractServices(msg.msg, props.services)

            if (services.defServices.length === 1) {
                answerFound("service");
                setBookingState({...bookingState, services: services.defServices});
                setNeedServices(false);

            }
            else if (services.defServices.length > 1) {
                answerFound("services");
                setBookingState({...bookingState, services: services.defServices});
                setNeedServices(false);
            }
        }
        if (gettingAnswer === "employee") {
            const employees = extractEmployees(msg.msg.split(" "), props.employees);
            if (employees.defEmployees.length === 1) {
                answerFound("employees");
                setBookingState({...bookingState, employee: employees.defEmployees})
            }
            else if (employees.defEmployees.length > 1) {
                answerNotFound("It seems your answer could be more than one employee. Maybe try again!")
            }
            else {
                answerNotFound("I couldn't find the employee that you specified. Maybe try again!")
            }
        }
    }


    function answerFound(problem, result) {
        const chatsReplica = [...chats];
        if (problem === "loc") {
            createBotChat(`Great, I was able to find the ${props.name} that you specified.`, chatsReplica);
        }
        if (problem === "time") {
            createBotChat("Great, I was able to find the time that you specified.", chatsReplica);
        }
        if (problem === "date") {
            createBotChat(`Great, I was able to find that the date you specified is ${result}.`, chatsReplica);
        }
        if (problem === "service") {
            createBotChat(`Great, I was able to find the service that you specified.`, chatsReplica);
        }
        if (problem === "employees") {
            createBotChat(`Great, I was able to find the employee that you specified.`, chatsReplica);
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
                <p style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Permanent Marker', position: 'relative', top: '-10px', right: "-10px", fontSize: "30px" }}>Bookie</p>
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
import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble/ChatBubble';
import styles from './Chatty.module.css';
import send from './send.png';
import axios from 'axios';
import { connect } from 'react-redux';
import { chattyKathy1, gettingConfirmation, bigMagic, getLoc, findDate, findTime, findDay, findTimesMagic, extractServices, extractEmployees, checkYes, checkNo, extractSpecificArea } from '../feutils/botutils';

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
    const [stillTryingToCreateBooking, setStillTryingToCreateBooking] = useState(false);
    const [createdShift, setCreatedShift] = useState(false);
    

    ///////// CHAT BOOKINGS ABOVE CHAT BOOKINGS ABOVE ///////////

    const [erroro, setErroro] = useState("");
    const [chats, setChats] = useState([{ fromBot: true, id: 0, msg: '' }]);
    const [textFieldText, setTextFieldText] = useState('');
    const [hideChat, setHideChat] = useState(false);
    const [ask, setAsk] = useState("");
    const [rotate, setRotate] = useState(true);

    /// STATE TO DO WITH SHIFTS BELOW

    const [shiftState, setShiftState] = useState({loc: "", employee: "", timeStart: "", timeEnd: "", date: ""});


    /// HIDE THE CHAT
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

    /// CREATING THE SHIFT

    function createShift(loc) { // CHECK WHY U CREATED PARAMETER U BOZO
        axios.post('/api/shifts/create', {timeStart: shiftState.timeStart, bookingColumnNumber: loc, timeEnd: shiftState.timeEnd, shiftDate: bookingState.date ? bookingState.date : shiftState.date, employeeId: bookingState.employee[0] ? bookingState.employee[0] : shiftState.employee}, {headers: {
            'x-auth-token': localStorage.getItem("adminToken")
        }}).then(
            response => {
                if (response.status === 201) {
                    let chatsRep = [...chats];
                    createBotChat("Okay sweet I was able to create this shift. Let me know if theres anything else I can do!", chatsRep);
                }
            }
        ).catch(error => {
            console.log(error);
        })
    }

    /// EDITING THE SHIFT

    function editShift() {
        axios.post('/api/shifts/edit');
    }


    /// GENERATE THE BOT RESPONSE
    function generateBotResponse() {
        const chatsReplica = [...chats];
        const response = bigMagic(chatsReplica[chatsReplica.length - 1].msg, props.services, props.employees, props.name, props.eq);
        console.log(response);
        if (response.type === "booking") {
            let loc, date, employee, time, services;
        //    setBookingState({loc: response.loc , date: response.date, employee: response.employee, services: response.services, time: response.time});
            if (!response.loc && props.eq === "n") {
                setNeedLocation(true);
            }
            else {
                loc = response.loc;
            }
            if (!response.date) {
                setNeedDate(true);
            }
            else {
                date = response.date;
            }
            if (response.time === "error" || !response.time) {
                setNeedTime(true);
            }
            else {
                time = response.time;
            }
            if (response.services.length === 0) {
                console.log("DID I RUN?")
                setNeedServices(true);
            }
            else {
                services = response.services;
            }
            if (response.employee.length === 0) {
                setNeedEmployee(true);
            }
            else {
                employee = response.employee;
            }
            setBookingState({loc, date, employee, time, services});
        }
        else if (response.type === "Hello") {
            console.log("is this not me?")
            const chatsReplica = [...chats];
            createBotChat("Hey there! How can I help you?", chatsReplica)
        }
        else if (response.type === "Shift") {
            if (response.error) {
                const chatsReplica = [...chats];
                createBotChat(response.error, chatsReplica);
                setShiftState({loc: response.loc, employee: response.employee, timeStart: response.timeStart, timeEnd: response.timeEnd, date: response.date})
                if (response.lookFor === "bothTimes") {
                    setAsk("Individual Shift Both Times");
                }
                if (response.lookFor === "secondTime") {
                    setAsk("Individual Shift Second Time");
                }
                return;
            }
            setShiftState({loc: response.loc, employee: response.employee, timeStart: response.timeStart, timeEnd: response.timeEnd, date: response.date})
        }
    }
    

    

    /// useEffect for tracking state for shift

    useEffect(function() {
        if (shiftState.timeStart && shiftState.timeEnd && !shiftState.employee) {
            let chatsRep = [...chats];
            createBotChat(`Could you specify what employee will be working this shift?`, chatsRep);
            setAsk("Shift Employee");
        }
        else if (shiftState.timeStart && shiftState.timeEnd && !shiftState.date) {
            let chatsRep = [...chats];
            createBotChat(`Could you specify what date this shift will be?`, chatsRep);
            setAsk("Shift Date");
        }
        if (shiftState.timeStart && shiftState.timeEnd && !shiftState.loc) {
            let chatsRep = [...chats];
            createBotChat(`Could you specify what ${props.name} you would like to use for this shift?`, chatsRep);
            setAsk("Shift Location");
        }
        
        if (shiftState.loc && shiftState.employee && shiftState.timeStart && shiftState.timeEnd && shiftState.date) {
            createShift(shiftState.loc)
        }
    }, [shiftState])

    


    //// CREATE A BOOKING WITH CHAT
    function createBooking() {
        axios.post('/api/iosBooking/createChatBooking', {bookingState: bookingState}, {headers: {"x-auth-token": localStorage.getItem("adminToken")}}).then(response => {
            if (response.status === 200) {
                const chatsReplica = [...chats];
                createBotChat("I have created this booking and you will now see it in your schedule.",chatsReplica);
                // props.addBookingToSchedule(response.data.newBooking);
                props.loadSchedule();
            }
        }).catch(error => {
            if (error.response.status === 406) {
                if (error.response.error === "SOOB") { // SHIFT OUT OF BOUNDS
                    setErroro("It seems the employee you tried to book has a shift on this day but is not supposed to be working at this time. Would you like me to edit the shift times to fit the booking?")
                    setAsk("Edit Shift");
                }
                else if (error.response.data.error === "NS") { // NO SHIFT
                    setErroro("It seems the employee you tried to book is not scheduled to work on this day. Would you like me to create a shift so that the booking can be created?")
                    setAsk("Shift");
                    setStillTryingToCreateBooking(true);
                }
                setTimeout(function() {
                    setErroro("");
                }, 1000)
            }
        })
    }

    useEffect(function() {
        if (createdShift) {
            if (stillTryingToCreateBooking) {
                setTimeout(function() {
                    createBooking();
                }, 2000);
            }
            setTimeout(function() {
                setCreatedShift(false)
                setStillTryingToCreateBooking(false);
            }, 2000)
        }
    }, [createdShift])

    
    useEffect(function() {
        if ((bookingState.loc || props.eq === "y") && bookingState.date && bookingState.time !== "error" && bookingState.time && bookingState.services  && bookingState.employee) {
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
    if (ask === "Individual Shift Both Times" && !chats[chats.length - 1].fromBot) {
        let firstTime = findTime(chats[chats.length - 1].msg.split(" ")).time;
        if (firstTime) {
            const chatsRep = [...chats];
            setAsk("Individual Shift Second Time");
            createBotChat("Okay I got the start time. Can you tell me what time the shift will end?", chatsRep);
            setShiftState({...shiftState, timeStart: firstTime})
        }
        else {
            let firstTimeMagic = findTimesMagic(chats[chats.length - 1].msg.split(" ")).time;
            if (firstTimeMagic) {
                const chatsRep = [...chats];
                setAsk("Individual Shift Second Time");
                createBotChat("Okay I got the start time. Can you tell me what time the shift will end?", chatsRep)
                setShiftState({...shiftState, timeStart: firstTimeMagic})
            }
        }
        return;
    }
    if (ask === "Individual Shift Second Time" && !chats[chats.length - 1].fromBot) {
        let secondTime = findTime(chats[chats.length - 1].msg.split(" ")).time;
        let chatsRep = [...chats];
        if (secondTime) {
            createBotChat("Okay I was able to identify both times that you would like to create this shift for.", chatsRep)
            setShiftState({...shiftState, timeEnd: secondTime})
        }
        else {
            let secondTimeMagic = findTimesMagic(chats[chats.length - 1].msg.split(" ")).time;
            if (secondTimeMagic) {
                createBotChat("Okay I was able to identify both times that you would like to create this shift for.", chatsRep);
                setShiftState({...shiftState, timeEnd: secondTimeMagic})
            }
        }
        return;
    }

    if (ask === "Shift Date" && !chats[chats.length - 1].fromBot) {
        const chatsRep = [...chats];
        let date = findDate(chats[chats.length - 1].msg.split(" ")).date;
        if (date) {
            createBotChat("Okay I was able to find the date you want this shift to be created on.", chatsRep)
            setShiftState({...shiftState, date});
        }
        else {
            let date = findDay(chats[chats.length - 1].msg.split(" ")).date;
            if (date) {
                createBotChat("Okay I was able to find the date you want this shift to be created on.", chatsRep)
                setShiftState({...shiftState, date});
            }
        }
        return;
    }
    if (ask === "Shift Employee" && !chats[chats.length - 1].fromBot) {
        const chatsRep = [...chats];
        const employee = extractEmployees(chats[chats.length - 1].split(" "), props.employees).defEmployees[0];
        if (employee) {
            setShiftState({...shiftState, employee});
            createBotChat("Okay I was able to find the employee that you mentioned.", chatsRep)
        }
        return;
    }
    if (ask === "Shift Location" && !chats[chats.length - 1].fromBot) {
        let chatsRep = [...chats];
        createBotChat("Okay I got the shift location!", chatsRep);
        let area = extractSpecificArea(chats[chats.length - 1].msg.split(" "));
        if (area) {
            setShiftState({...shiftState, loc: area});
        }
        else {
            let otherArea = extractSpecificArea(chats[chats.length - 1].msg.split(" "));
            if (otherArea) {
                setShiftState({...shiftState, loc: otherArea});
            }
        }
        return;
    }
    if (ask === "Edit Shift" && !chats[chats.length - 1].fromBot) {
        if (checkYes(chats[chats.length - 1].msg)) {
            const chatsRep = [...chats];
            createBotChat("Okay let me try to alter this shift to make this booking work!", chatsRep);
            editShift();
        }
        return;
    }
    else if (ask === "Shift") {
        if (checkYes(chats[chats.length - 1].msg)) {
          const chatsRep = [...chats];
            createBotChat("Okay lets create the shift! What time would you like this shift to start?", chatsRep);
            setAsk("Shift Start Time");
        }
        else if (checkNo(chats[chats.length - 1].msg)) {
            const chatsRep = [...chats];
            createBotChat("Okay! Unfortunately I can't create this booking unless this employee is scheduled to be working.", chatsRep);
        }
        return;
    }
    else if (ask === "Shift Start Time" && chats[chats.length - 1].fromBot === false) {
        let time = findTime(chats[chats.length - 1].msg.split(" ")).time;
        if (time) {
            setShiftState({...shiftState, timeStart: time})
            const chatsRep = [...chats];
            createBotChat("Okay thanks I got the start time, when would you like it to end?", chatsRep);
            setAsk("Shift End Time");
        }
        return;
    }
    else if (ask === "Shift End Time" && chats[chats.length - 1].fromBot === false) {
        let time = findTime(chats[chats.length - 1].msg.split(" ")).time;
        if(time) {
            setShiftState({ ...shiftState, timeEnd: time,})
            const chatsRep = [...chats];
            createBotChat(`Okay thanks I got the end time, can you tell me what ${props.name} to schedule this shift on?`, chatsRep);
            setAsk("Need BCN For Shift");
        }
        return;
    }
    else if (ask === "Need BCN For Shift" && chats[chats.length - 1].fromBot === false) {
        let area = extractSpecificArea(chats[chats.length - 1].msg.split(" "));
        if(area) {
            const chatsRep = [...chats];
            setShiftState({...shiftState, loc: area, });
            createBotChat(`Okay I will try to schedule this employee for a shift from ${shiftState.timeStart}-${shiftState.timeEnd}. I will also try again to create the booking you asked to be created earlier.`, chatsRep);
            createShift(area);
            if (stillTryingToCreateBooking) {
                setCreatedShift(true);
            }
        }
        return;
    }
    /// THE ABOVE ARE BASICALLY CATCHERS TO DETERMINE IF COMPLETING THE SHIFT FOR THE BOOKING TO BE ALLOWED IS DONE
    /// THE WAY IT WORKS IS SINCE IT CREATES A NEW CHAT EVERYTIME ITS GOING TO CHECK IF ALL THE STEPS ARE COMPLETE
    
    if (!chats[chats.length - 1].fromBot) {
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
        if (needTime) {
            neeedTime();
            return;
        }
        else if (needDate) {
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
                let date = findDate(msg.msg);
                if (date.date) {
                    answerFound("date", date.date);
                    setBookingState({...bookingState, date: date.date});
                    setNeedDate(false);
                }
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
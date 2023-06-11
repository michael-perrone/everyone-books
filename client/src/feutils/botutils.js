import axios from 'axios';


const yesArray = ["yes", "sure", "definitely", "absolutely", "ya", "yea", "yah", "yar", "yes mate", "yar mate", "fo sho", "for sure", "yas", "yes please", "duh", "all right", "very well", "alright",
"indeed mate", "indeed", "most certainly", "certainly", "aye", "yep", "yup", "affirmative", "uhuh", "mhm", "uhu", "ok", "okay", "okeyfrickindokey", "okey", "surely", "kk", "kkz",
]




export function gettingConfirmation(msg) {
    console.log(msg);
    for (let i = 0; i < yesArray.length; i++) {
        if (msg.includes(yesArray[i])) {
            return true;
        }
    }
    return false;
}

export function chattyKathy1(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("book") && msg.includes("create")) {
        return "Would you like to create a booking?"
    }
    if (msg.includes("payroll")) {
        return "Would you like to edit your business payroll info?"
    }
    if (msg.includes("add") && msg.includes('employee')) {
        return "Would you like to add an employee to your business' list of employees?"
    }
    if (msg.includes("remove") && msg.includes('employee')) {
        return "Would you like to remove an employee from your business' list of employees?"
    }
    if ((msg.includes('advertisement') || msg.includes('adver')) && (msg.includes("create") || msg.includes) ) {
        return "Would you like to create an advertisement?"
    }
    if (msg.includes('edit') && (msg.includes('advertisement') || msg.includes('adver'))) {
        return "Would you like to edit an advertise"
    }
    else {
        return "I couldn't find what you were looking for, would you please try a different command?";
    }
}

export function findDateBot(date) {
    console.log(date.msg)
    const todaysDate = new Date();
    if (date.msg.includes("today")) {
        return "today, " + todaysDate.toDateString()
    }
}

// find the main goal of the msg (ie create a booking or delete a booking)
// find the subject that goes along with the main goal (ie employee thats being hired or services that are being booked)
// find if there needs to be a date and time
// if theres a date and time find them


const keywords = ["create", "booking", "book", 'add', "make"];

const timeNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "am", "pm"];

const timeHours = ["one", "two", "three", "four", "five", "six", "seven", "eight", 
"nine", "ten", "eleven", "twelve", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const timeMinutes = [ "00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55",  "fifteen", "ten", "ofive", "five", "ohfive", "o-five", "o' five", "o'five", "thirty", "fortyfive", "forty-five",
"twenty", "twenty-five", "thirty-five", "twentyfive", "forty", "fourty",
  "thirtyfive", "fifty", "fiftyfive", "fifty-five"];

const dayWords = ["today", "tomorrow"];

const dateWords = ["january", "february", "march", "april", "june", "july", "august", "september", "october", "november", "december"];

const dateAbrevs = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const minutesToNumDic = {
    "o'clock": "00", 
    "oclock": "00", 
    "ohclock": "00", 
    "ofive": "05",
    "o'5": "05", 
    "ofive": "05",
    "five": "05",
    "ten": 10, 
    "fifteen": 15, 
    "twenty": "20", 
    "twenty-five": 25, 
    "twentyfive": 25, 
    "thirty": "30", 
    "thirtyfive": 35, 
    "thirty five": 35, 
    "thirty-five": 35, 
    "forty": "40", 
    "fourty": "40", 
    "fourty-five": 45,
    "fourty five": 45,
    "fortyfive": 45,
    "forty-five": 45,
    "fifty": "50", 
    "fiftyfive": 55, 
    "fifty-five": 55
}

const timeToNumDic = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, 
    "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12, "fifteen": 15,
    "thirty": 30, "fortyfive": 45, "forty-five": 45, "thirty-five": 35, "thirtyfive": 35,
    "forty": 40, "fourty": 40, "fiftyfive": 55, "fifty-five": 55, "twentyfive": 25,
    "twenty-five": 25
};

function findDay(arr) {
    let holder = -1;
    const probableDayWords = [];
    for (let i = 0; i < arr.length; i++) {
        for (let t = 0; t < dayWords.length; t++) {
            const pushedKeywords = []; 
            holder = -1;
            for (let y = 0; y < arr[i].length; y++) {
                for (let z = holder === -1 ? 0 : holder; z < dayWords[t].length; z++) {
                    if (dayWords[t][z] === arr[i][y]) {
                        pushedKeywords.push(dayWords[t]);
                        holder = z + 1;
                        break;
                    }
                    else {
                        pushedKeywords.push([]);
                    }
                }  
            }
            console.log(pushedKeywords);
            let counter = 0;
            let otherCounter = 0;
            let double = false;
            for (let h = 0; h < pushedKeywords.length; h++) {
                if (pushedKeywords[h] === pushedKeywords[h + 1]) {
                    if (!double) {
                        otherCounter = 2;
                    }
                    else { otherCounter ++}
                }
            }
            for (let h = 0; h < pushedKeywords.length; h++) {
                if (pushedKeywords[h].length !== 0) {
                    counter++;
                }
            }
            if ((arr[i].length > 3 && counter / pushedKeywords.length * 100 > 50 && arr[i].length + 1 >= dayWords[t].length && arr[i].length - 2 <= dayWords[t].length) 
            || (arr[i].length > 3 && otherCounter / pushedKeywords.length * 100 >= 40 && arr[i].length + 1 >= dayWords[t].length && arr[i].length - 2 <= dayWords[t].length)) {
                probableDayWords.push(dayWords[t]);
            }
            else if (arr[i].length === 3 && counter / pushedKeywords.length === 1) {
                probableDayWords.push(dayWords[t]);
            }
        }
    }
    return probableDayWords;
}

export function bigMagic(msg) {
    let mainGoal = "";
    let subjectSupport = "";
    let doesNeedDateTime = 5;
    let dateIfNeeded = "";
    let timeIfNeeded = "";
    const probableWords = [];
    
    // cm stands for correct message
    let cm = msg.split(" ");
    let holder = -1;
    
    for (let i = 0; i < cm.length; i++) {
        for (let t = 0; t < keywords.length; t++) {
            const pushedKeywords = []; 
            holder = -1;
            for (let y = 0; y < cm[i].length; y++) {
                for (let z = holder === -1 ? 0 : holder; z < keywords[t].length; z++) {
                    if (keywords[t][z] === cm[i][y]) {
                        pushedKeywords.push(keywords[t]);
                        holder = z + 1;
                        break;
                    }
                    else {
                        pushedKeywords.push([]);
                    }
                }  
            }
            let counter = 0;
            let otherCounter = 0;
            let double = false;
            for (let h = 0; h < pushedKeywords.length; h++) {
                if (pushedKeywords[h] === pushedKeywords[h + 1]) {
                    if (!double) {
                        otherCounter = 2;
                    }
                    else { otherCounter ++}
                }
            }
            for (let h = 0; h < pushedKeywords.length; h++) {
                if (pushedKeywords[h].length !== 0) {
                    counter++;
                }
            }
            if ((cm[i].length > 3 && counter / pushedKeywords.length * 100 > 50 && cm[i].length + 1 >= keywords[t].length && cm[i].length - 2 <= keywords[t].length) 
            || (cm[i].length > 3 && otherCounter / pushedKeywords.length * 100 >= 40 && cm[i].length + 1 >= keywords[t].length && cm[i].length - 2 <= keywords[t].length)) {
                probableWords.push(keywords[t]);
            }
            else if (cm[i].length === 3 && counter / pushedKeywords.length === 1) {
                probableWords.push(keywords[t]);
            }
        }
    }
    if (createBookingMagic(probableWords)) {
        const dayFound = findDay(cleanMsg(probableWords, msg));
        let df = "";
        if (dayFound.length > 1) {
            for (let i = 0; i < dayFound.length; i++) {
                if (df !== "" || df !== dayFound[i]) {
                    return "Please specify if you want this booking to be today or tomorrow";
                }
                df = dayFound[i];
            }
        }
        else if (dayFound.length === 1) {
            if (dayFound[0] === "today") {
                dateIfNeeded = new Date().toDateString();
            }
            else {
                dateIfNeeded = new Date(`${new Date().getMonth() + 1}, ${new Date().getDate() + 1}, ${new Date().getFullYear()}`).toDateString();
            }
        }

        if (dayFound.length === 0) {
            // okay we still need to find the date
            // findDate();
        }
        let time = findTime(cleanMsg(probableWords, msg));
        if (time === '') {
            time = findTimesMagic(cleanMsg(probableWords, msg));
            if (time === "") {
                return "I understand you'd like to create a booking but wasn't able to identify a time, can you please specify a time for this booking?"
            }
        }
        else {
            if (time) {
                if (dateIfNeeded) {
                    console.log(time, dateIfNeeded);
                }
                return time;
            }
        }
    }
    return "I was unable to determine what you are asking, please try again!";
}


function findTime(arr) {
    let time = "";
    for (let i = 0; i < arr.length; i++) {
        const splitArr = arr[i].split(":");
        if (splitArr.length === 2) {
            if (splitArr[0].length > 2 || !isNumber(splitArr[0] || parseInt(splitArr[0] > 12))) {
                return "This time was not found to be an eligible time.";
            }
            else {
                if (splitArr[1].length !== 2 || !isNumber(splitArr[1])) {
                    if (splitArr[1].length !== 4) {
                        return "This time was not found to be an eligible time.";
                    }
                    else {
                        if(splitArr[1][2].toLowerCase() === "a" || splitArr[1][2].toLowerCase() === "p") {
                            if(splitArr[1][3].toLowerCase() === "m") {
                                if (isNumber(parseInt(splitArr[1][0] + splitArr[1][1])) && parseInt(splitArr[1][0] + splitArr[1][1]) < 60) {
                                    return "You have scheduled this booking to be at " + arr[i];
                                }
                                else {
                                    return "This time was not found to be an eligible time.";
                                }
                            }   
                        }
                    }
                }
                    else {
                        if (!isNumber(parseInt(splitArr[1])) || parseInt(splitArr[1]) > 59) {
                            return "This time was not found to be an eligible time."
                        }
                        else {
                            if (i !== arr.length - 1) {
                                if (arr[i + 1].toLowerCase() === "am" || arr[i + 1].toLowerCase() === "pm") {
                                    return "You have scheduled this booking to be at " + arr[i] + arr[i + 1];
                                }
                                else {
                                    return "Please specify if you want this booking at " + arr[i] + "am" + " or " + arr[i] + "pm";
                                }
                            }
                            else {
                                return "Please specify if you want this booking at " + arr[i] + "am" + " or " + arr[i] + "pm";
                            } 
                        }
                } 
            }
            return "Time not found due to improper use of colon."
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length === 3) {
            console.log("HERE PETER")
           if (isNumber(arr[i])) {
                const newArray = arr[i].split("");
                if (parseInt(newArray[0]) < 13 && parseInt(newArray[1] + newArray[2]) < 60) {
                    if(i === arr.length - 1){
                        time = newArray[0] + ":" + newArray[1] + newArray[2];
                        return "Please specify if you want this booking at " + time + "am" + " or " + time + "pm.";
                    }
                    else {
                        if(arr[i+1].toLowerCase() !== "am" && arr[i+1].toLowerCase() !== "pm"){
                            time = newArray[0] + ":" + newArray[1] + newArray[2];
                            return "Please specify if you want this booking at " + time + "am" + " or " + time + "pm.";
                        }
                        else {
                            time = newArray[0] + ":" + newArray[1] + newArray[2] + arr[i + 1];
                        }
                    } 
                }
            }
        } 
        else if (arr[i].length === 4) {
                if (isNumber(arr[i])) {
                    const newArray = arr[i].split("");
                    if (parseInt(newArray[0] +  newArray[1]) < 13 && parseInt(newArray[2] + newArray[3]) < 60) {
                        if(i === arr.length - 1){
                            time = newArray[0] + newArray[1] + ":" + newArray[2] + newArray[3];
                            return "Please specify if you want this booking at " + time + "am" + " or " + time + "pm.";
                        }
                        else {
                            if(arr[i+1].toLowerCase() !== "am" && arr[i+1].toLowerCase() !== "pm"){
                                time = newArray[0] + newArray[1] + ":" + newArray[2] + newArray[3];
                                return "Please specify if you want this booking at " + time + "am" + " or " + time + "pm.";
                            }
                            else {
                                time = newArray[0] + newArray[1] + ":" + newArray[2] + newArray[3] + arr[i + 1];
                            }
                        } 
                }
            }
        }
        else if (arr[i].length === 5) {
            if (arr[i][3].toLowerCase() === "a" || arr[i][3].toLowerCase() === "p") {
                if (arr[i][4].toLowerCase() === "m") {
                    if (isNumber(arr[i][0] + arr[i][1] + arr[i][2])) {
                        if (parseInt(arr[i][1] + arr[i][2]) < 60) {
                            time = arr[i][0] + ":" + arr[i][1] + arr[i][2] + arr[i][3] + arr[i][4];
                        }
                    }
                }
            }
        }
        else if (arr[i].length === 6){
            if(arr[i][4].toLowerCase() === "a" || arr[i][4].toLowerCase() === "p"){
                if (arr[i][5].toLowerCase() === "m"){
                    if(isNumber(arr[i][0] + arr[i][1] + arr[i][2])+ arr[i][3]){
                        if(parseInt(arr[i][0] + arr[i][1]) < 13 && parseInt(arr[i][2] + arr[i][3]) < 60){
                            time = arr[i][0] + arr[i][1] + ":" + arr[i][2] + arr[i][3] + arr[i][4] + arr[i][5];
                        }
                    }
                }
            }
        }
    }
    return "You have scheduled this booking to be at " + time;
}

function isNumber(num) {
    return parseInt(num).toString() !== "NaN";
}


function littleMagic(probableWords, msg) {
    
}

function createBookingMagic(probableWords) {
    const length = probableWords.length;
    if (probableWords.includes("book") || probableWords.includes("booking")) {
        if (probableWords.includes("create") || probableWords.includes("add")) {
            return true;
        }
    }
}



function findTimesMagic(arr) {
    const time = findHours(arr) + ":" + findMinutes(arr);
    console.log(time);
}


function findMinutes(arr){
    const timeMinutesFound = []; 
    let minutes = ""; 
    for(let i = 0; i < arr.length; i++){
        if(timeMinutes.includes(arr[i])){
            timeMinutesFound.push(arr[i]); 
        }
    }
    console.log(timeMinutesFound);
    if(timeMinutesFound.length > 1){
        if(timeMinutesFound[1] !== "five" && timeMinutesFound[1] !== "5"){
            return "There are too many possible minutes specified in this request."
        }
        else {
            if(parseInt(timeMinutesFound[0]).toString() === "NaN"){
                minutes += minutesToNumDic[timeMinutesFound[0]][0];
            }
            if(parseInt(timeMinutesFound[1]).toString() === "NaN"){
                minutes += minutesToNumDic[timeMinutesFound[1]][1];
            }
        }
    }

    if(timeMinutesFound.length === 1){
        if(parseInt(timeMinutesFound[0]).toString() === "NaN"){
            minutes += minutesToNumDic[timeMinutesFound[0]];
        }
        else{
            minutes += timeMinutesFound[0]; 
        }
    }
    return minutes;

}



function findHours(arr) {
    const timeHoursFound = []; // empty array
    let timeMentioned = ""; // starts as empty string but will be mutated to whatever hour we find
    for (let i = 0; i < arr.length; i++) { // running through the arr we are given
        if (timeHours.includes(arr[i])) {   
            timeHoursFound.push(arr[i]); // ["three"]
        }
    }
    if (timeHoursFound.length > 3) {
        return "There is too many possible hour times this booking could be requested for."
    }
    if (timeHoursFound.length > 1) {
        console.log(timeHoursFound);
        if (timeHoursFound[1] !== "five" && timeHoursFound[1] !== "ten" && timeHoursFound[2] !== "five" && timeHoursFound[2] !== "ten" ) {
            return "There is too many possible hour times this booking could be requested for."
        }
        else {
            if (parseInt(timeHoursFound[0]).toString() === "NaN") {
                timeMentioned += timeToNumDic[timeHoursFound[0]]; // timeToNumDic["seven"] === 7
            }
            else {
                  timeMentioned += timeHoursFound[0];
            }
        }
    }
    if (timeHoursFound.length === 1) {
        if (parseInt(timeHoursFound[0]).toString() === "NaN") {
            timeMentioned += timeToNumDic[timeHoursFound[0]];
        }
        else {
            timeMentioned += timeHoursFound[0];
        }
    }
    if (timeHoursFound.length === 0) {
        console.log("DID NOT FIND AN HOUR"); 
    }
    return timeMentioned;
}




function cleanMsg(probableWords, msg) {
    const msgCleaner = msg.split(" ");
    for (let i = 0; i < probableWords.length; i++) {
        const index = msgCleaner.findIndex(value => {
           return value === probableWords[i];
        })
        if (index !== -1) {
            msgCleaner.splice(index, 1);
        }
    }
    return msgCleaner;
}




const yesArray = ["yes", "sure", "definitely", "absolutely", "ya", "yea", "yah", "yar", "yes mate", "yar mate", "fo sho", "for sure", "yas", "yes please", "duh", "all right", "very well", "alright",
    "indeed mate", "indeed", "most certainly", "certainly", "aye", "yep", "yup", "affirmative", "uhuh", "mhm", "uhu", "ok", "okay", "okeyfrickindokey", "okey", "surely", "kk", "kkz",
]

const helloArray = ["hey", "hi", "sup", "whatsup", "hello", "heyo", "suppo", "howdy", "yoo", "yo", "yoo"];

const noArray = ["no", "nope", "nah", "i dont think so", "definitely not", "no thanks", "dont", "do not", "don't", "absolutely not", "naw"]

const couldBeBct = {
    "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, "13": 13, "14": 14, "15": 15, "16": 16, "17": 17, "18": 18, "19": 19, "20":20, "21":21, "22": 22, "23": 23, "24": 24, "25": 25, "26": 26, "27": 27, "28": 28, "29": 29, "30": 30, "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7",
    "eight": "8", "nine": "9", "ten": "10", "eleven": "11", "twelve": "12", "thirteen": 13, "fourteen": 14, "fifteen": "15", "sixteen": "16", "seventeen": "17", "eighteen": "18", "nineteen": "19", "twenty": "20", "twentyone": "21", "twentytwo": "22", "twentythree": "23", "twentyfour": "24", "twentyfive": "25", "twentysix": "26", "twentyseven": "27", "twentyeight": "28", "twentynine": "29", "thirty": "30"
}; 

const timeNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "am", "pm"];

const timeHours = ["one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const timeMinutes = ["00", "o clock", "oclock", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "fifteen", "ten", "ofive", "five", "ohfive", "o-five", "o' five", "o'five", "thirty", "fortyfive", "forty-five",
    "twenty", "twenty-five", "thirty-five", "twentyfive", "forty", "fourty",
    "thirtyfive", "fifty", "fiftyfive", "fifty-five"];

const dayWords = ["today", "tomorrow", 'tonight'];

const extendedDayWords = ['morning', 'night'];

const dateWords = ["january", "february", "march", "april", "june", "july", "august", "september", "october", "november", "december"];

const dateAbrevs = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const months = {
    "jan": 1, "january": 1, "feb": 2, "february": 2, "march": 3, "mar": 3, "apr": 4, "april": 4, "may": 5,
    "jun": 6, "june": 6, "july": 7, "jul": 7, "aug": 8, "august": 8, "sep": 9, "september": 9, "oct": 10, "october": 10, "nov": 11, "november": 11, "dec": 12, "december": 12
};



const keywords = ["create", "booking", "book", 'add', "make", "shift"];

///// EXTRACT THE AREA

export function getLoc(msg, bct) {
    let loc;
    let arr = msg.split(" ");
    if (arr.length === 1 && parseInt(arr[0]).toString() !== "NaN") {
        loc = arr[0];
    }
    else {
        loc = extractArea(arr, bct).loc;
    }
    if (!loc) {
        return "error"
    }
    else {
        return loc;
    }
}


function extractArea(arr, bct) {
    bct = bct.toLowerCase();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === bct) {
            if (couldBeBct[arr[i + 1]]) {
                let loc = `${arr[i]} ${arr[i + 1]}`
                arr.splice(i, 2);
                return { 
                    loc,
                    arr
                }
            }
        }
    }
    
    return {
        arr
    }
}


export function extractSpecificArea(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (couldBeBct[arr[i]]) {
            return couldBeBct[arr[i]];
        }
    }
}

//// EXTRACT AREA ABOVE




export function extractServices(arr, services) {
    if (typeof(arr) === "string") {
        arr = arr.split(" ");
    }
    let holder = -1;
    const defServices = [];
    const probableServices = [];
    const servicesArray = [];
    for (let i = 0; i < services.length; i++) {
        const indArray = [];
        const arry = services[i].serviceName.split(" ");
        for (let a = 0; a < arry.length; a++) {
            indArray.push(arry[a].toLowerCase());
        }
        indArray.push(services[i]._id);
        servicesArray.push(indArray);
    }
    for (let i = 0; i < arr.length; i++) {
        probableServices.push([]);
        for (let t = 0; t < servicesArray.length; t++) {
            for (let a = 0; a < servicesArray[t].length - 1; a++) {
                const pushedServices = [];
                holder = -1;
                if (arr[i] !== undefined) {
                    for (let y = 0; y < arr[i].length; y++) {
                        for (let z = holder === -1 ? 0 : holder; z < servicesArray[t][a].length; z++) {
                            if (servicesArray[t][a][z] === arr[i][y]) {
                                pushedServices.push(servicesArray[t][a]);
                                holder = z + 1;
                                break;
                            }
                            else {
                                pushedServices.push([]);
                            }
                        }
                    }
                    let counter = 0;
                    let otherCounter = 0;
                    let double = false;
                    for (let h = 0; h < pushedServices.length; h++) {
                        if (pushedServices[h] === pushedServices[h + 1]) {
                            if (!double) {
                                otherCounter = 2;
                            }
                            else { otherCounter++ }
                        }
                    }
                    for (let h = 0; h < pushedServices.length; h++) {
                        if (pushedServices[h].length !== 0) {
                            counter++;
                        }
                    }
                    if ((arr[i].length > 3 && counter / pushedServices.length * 100 > 50 && arr[i].length + 1 >= servicesArray[t][a].length && arr[i].length - 2 <= servicesArray[t][a].length)
                        || (arr[i].length > 3 && otherCounter / pushedServices.length * 100 >= 40 && arr[i].length + 1 >= servicesArray[t][a].length && arr[i].length - 2 <= servicesArray[t][a].length)) {
                        probableServices[i].push(servicesArray[t][a]);
                        arr.splice(i, 1);
                    }
                    else if (counter / pushedServices.length === 1) {
                        probableServices[i].push(servicesArray[t][a]);
                        arr.splice(i, 1);
                    }
                }
            }
        }
    }
    for (let i = 0; i < probableServices.length; i++) {
        for (let z = 0; z < servicesArray.length; z++) {
            let matches = true;
            for (let t = 0; t < servicesArray[z].length - 1; t++) {
                if (servicesArray[z][t] !== probableServices[i][t]) {
                    matches = false;
                }
            }
            if (matches) {
                defServices.push(servicesArray[z][servicesArray[z].length - 1]);
            }
        }
    }

    return {
        defServices,
        arr
    }
}

// function extractCustomer(arr) {
//     const splitty = arr.split(' ');
//     if (splitty.length > 6) {
//         if ()
//     }
// }

export function extractEmployees(arr, employees) {
    const defEmployees = [];
    const employeesArray = [];
    for (let i = 0; i < employees.length; i++) {
        let name = employees[i].fullName.split(" ");
        employeesArray.push([name, employees[i]._id]);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let t = 0; t < employeesArray.length; t++) {
          if (arr[i].toLowerCase() === employeesArray[t][0][0].toLowerCase()) {
              if(arr[i + 1].toLowerCase() === employeesArray[t][0][1].toLowerCase()) {
                 defEmployees.push(employeesArray[t][1]);
              }
           }
        }
    }
    return {defEmployees, arr};
}



export function gettingConfirmation(msg) {
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
    if ((msg.includes('advertisement') || msg.includes('adver')) && (msg.includes("create") || msg.includes)) {
        return "Would you like to create an advertisement?"
    }
    if (msg.includes('edit') && (msg.includes('advertisement') || msg.includes('adver'))) {
        return "Would you like to edit an advertisement?"
    }
    else {
        return "I couldn't find what you were looking for, would you please try a different command?";
    }
}



// find the main goal of the msg (ie create a booking or delete a booking)
// find the subject that goes along with the main goal (ie employee thats being hired or services that are being booked)
// find if there needs to be a date and time
// if theres a date and time find them







const minutesToNumDic = {
    "o'clock": "00",
    "oclock": "00",
    "ohclock": "00",
    "ofive": "05",
    "o'5": "05",
    "ofive": "05",
    "five": "05",
    "ten": "10",
    "fifteen": "15",
    "twenty": "20",
    "twenty-five": "25",
    "twentyfive": "25",
    "thirty": "30",
    "thirtyfive": "35",
    "thirty-five": "35",
    "forty": "40",
    "fourty": "40",
    "fourty-five": "45",
    "fortyfive": "45",
    "forty-five": "45",
    "fifty": "50",
    "fiftyfive": "55",
    "fifty-five": "55"
}

const timeToNumDic = {
    "oclock" : "00", "ohclock": "00", "clock": "00", "o'clock": "00",
    "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7",
    "eight": "8", "nine": "9", "ten": "10", "eleven": "11", "twelve": "12", "fifteen": "15",
    "thirty": "30", "fortyfive": "45", "forty-five": "45", "thirty-five": "35", "thirtyfive": "35",
    "forty": "40", "fourty": "40", "fifty": "50", "fiftyfive": "55", "fifty-five": "55", "twentyfive": "25",
    "twenty-five": "25"
};

const rawTimes = {"12am": "12:00 AM", "1am": "1:00 AM", "2am": "2:00 AM", "3am": "3:00 AM", "4am": "4:00 AM", "5am": "5:00 AM", "6am": "6:00 AM", "7am": "7:00 AM", "8am": "8:00 AM", "9am": "9:00 AM", "10am": "10:00 AM", "11am": "11:00 AM", "12pm": "12:00 PM", "1pm": "1:00 PM", "2pm": "2:00 PM", "3pm": "3:00 PM", "4pm": "4:00 PM", "5pm": "5:00 PM", "6pm": "6:00 PM", "7pm": "7:00 pM", "8pm": "8:00 PM", "9pm": "9:00 PM", "10pm": "10:00 PM", "11pm": "11:00 PM", "12pm": "12:00 PM", }

export function findDay(arr) {
    if (typeof(arr) === "string") {
        arr = arr.split(" ");
    }
    let apComing = "";
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
            let counter = 0;
            let otherCounter = 0;
            let double = false;
            for (let h = 0; h < pushedKeywords.length; h++) {
                if (pushedKeywords[h] === pushedKeywords[h + 1]) {
                    if (!double) {
                        otherCounter = 2;
                    }
                    else { otherCounter++ }
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
                arr.splice(i, 1);
                break;
            }
            else if (arr[i].length === 3 && counter / pushedKeywords.length === 1) {
                probableDayWords.push(dayWords[t]);
                arr.splice(i, 1);
                break;
            }
        }
    }
    let dayError = false;
    let df = "";
    let date = "";
    if (probableDayWords.length > 1) {
        for (let i = 0; i < probableDayWords.length; i++) {
            if (df !== "" && df !== probableDayWords[i]) {
                dayError = "Today and Tomorrow?"
                break;
            }
            df = probableDayWords[i];
            if (probableDayWords[0] === "today" || probableDayWords[0] === "tonight") {
                date = new Date().toDateString();
                if (probableDayWords[0] === "tonight") {
                    apComing = " PM";
                }
            }
            else {
                date = new Date(`${new Date().getMonth() + 1}, ${new Date().getDate() + 1}, ${new Date().getFullYear()}`).toDateString();
            }
        }
    }
    else if (probableDayWords.length === 1) {
        if (probableDayWords[0] === "today" || probableDayWords === "tonight") {
            date = new Date().toDateString();
            if (probableDayWords[0] === "tonight") {
                apComing = " PM";
            }
        }
        else {
            date = new Date(`${new Date().getMonth() + 1}, ${new Date().getDate() + 1}, ${new Date().getFullYear()}`).toDateString();
        }
    }
    const arry = [];
    
    for (let i = 0 ; i < extendedDayWords.length; i++) {
        if (arr.includes(extendedDayWords[i])) {
            arry.push(extendedDayWords[i]);
        }
    }
    if (arry.length > 2) {
        dayError = "Many Morning or Night?";
    }
    else if (arry.length === 2) {
        if (arry[0] === arry[1]) {
            if (arry[0] === "morning") {
                apComing = " AM";
            }
            else {
                apComing = " PM";
            }
        }
        else {
            dayError = "Morning and Night?";
        }
    }
    else if (arry.length === 1) {
        if (arry[0] === "morning") {
            apComing = " AM";
        }
        else {
            apComing = " PM";
        }
    }
    return {
        date, arr, dayError, apComing
    }
}

/// MAIN FUNCTION

export function bigMagic(msg, services, employees, bct) {
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
                    else { otherCounter++ }
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
    if (probableWords.length === 0) {
        for (let i = 0; i < helloArray.length; i++) {
            for (let t = 0; t < cm.length; t++) {
                if (helloArray[i].toLowerCase() === cm[t].toLowerCase()) {
                    return {
                        type: "Hello"
                    };
                }
            }
        }
    }
    else if (createBookingMagic(probableWords, services, cm)) {
        // let customer = "";
        let date = "";
        
        const serviceResults = extractServices(cleanMsg(probableWords, msg), services);
        const employeeResults = extractEmployees(serviceResults.arr, employees);
        const dayFound = findDay(employeeResults.arr);
        if (dayFound.date) {
            date = dayFound;
        }
        else {
            date = findDate(cleanMsg(probableWords, msg));  
        }
        let time = "";
        time = findTime(date.arr);
        if (time.error) {
            time = findTimesMagic(date.arr, date.apComing);
        }
        else {
            time = time.time
        }
        const area = extractArea(cleanMsg(probableWords, msg), bct);

        return {
            type: "booking",
            loc: area.loc,
            date: date.date,
            employee: employeeResults.defEmployees,
            services: serviceResults.defServices,
            time
        }
    }
    else if (createShiftMagic(probableWords, cm)) {
        const firstTime = findTime(cm);
        if (firstTime.error) {
            const employeeResults = extractEmployees(cm, employees);
            const dayFound = findDay(employeeResults.arr);
            let date = "";
            if (dayFound.date) {
                date = dayFound;
            }
            else {
                date = findDate(cleanMsg(probableWords, msg));  
            }
            const area = extractArea(cleanMsg(probableWords, msg), bct);
            return {
                employee: employeeResults.defEmployees[0],
                date: date.date,
                loc: area.loc,
                type: "Shift",
                error: "I was not able to find any times for the shift you are trying to create. Can you give me a start time for this shift?",
                lookFor: "bothTimes",
            }
        }
        const secondTime = findTime(cm); 
        if (secondTime.error) {
            const employeeResults = extractEmployees(cm, employees);
            const dayFound = findDay(employeeResults.arr);
            let date = "";
            if (dayFound.date) {
                date = dayFound;
            }
            else {
                date = findDate(cleanMsg(probableWords, msg));  
            }
            const area = extractArea(cleanMsg(probableWords, msg), bct);
            return {
                type: "Shift",
                employee: employeeResults.defEmployees[0],
                date: date.date,
                loc: area.loc,
                timeStart: firstTime.time,
                error: "I was only able to find one time in your request. This shift will start at " + firstTime.time + ". What time would you like it to end?",
                lookFor: "secondTime"
            }
        }
        const employeeResults = extractEmployees(cm, employees);
        const dayFound = findDay(employeeResults.arr);
        let date = "";
        if (dayFound.date) {
            date = dayFound;
        }
        else {
            date = findDate(cleanMsg(probableWords, msg));  
        }
        const area = extractArea(cleanMsg(probableWords, msg), bct);
        return {
            type: "Shift",
            employee: employeeResults.defEmployees[0],
            date: date.date,
            loc: area.loc,
            timeStart: firstTime.time,
            timeEnd: secondTime.time
        }
    }
    else {
        console.log("DIDNDNTN WORK?")
    }
    // else if (!bookingMagic) {}

    return {
        type: "didntUnderstandError",
        msg: "I was unable to determine what you are saying, please try again!"
    };
}


// function determinePM() {

// }


export function findDate(arr) {
    let month  = "";
    let day = "";
    let date = "";
    if (typeof(arr) === "string") {
        arr = arr.split(" ");
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("/")) {
            const splitter = arr[i].split("/");
            if (splitter.length > 3) {
                continue;
            }
            else if (splitter.length === 3) {
                if (isNumber(splitter[0]) && isNumber(splitter[1]) && isNumber(splitter[2])) {
                    if (parseInt(splitter[0]) > 12 && parseInt(splitter[1] < 13)) {
                        date = new Date(`${splitter[1]}, ${splitter[0]}, ${splitter[2]}`).toDateString()
                    }
                    else {
                        date = new Date(`${splitter[0]}, ${splitter[1]}, ${splitter[2]}`).toDateString();
                    }
                }
            }
            else if (splitter.length === 2) {
                if (isNumber(splitter[0]) && isNumber(splitter[1])) {
                    if (parseInt(splitter[0]) < 13 && parseInt(splitter[1]) < 32) {
                        date = new Date(`${splitter[0]}, ${splitter[1]}, ${new Date().getFullYear()}`).toDateString()
                    }
                }
            }
        }
        if (arr[i].includes("-")) {
            const splitter = arr[i].split("-");
            if (splitter.length > 3) {
                continue;
            }
            else if (splitter.length === 3) {
                if (isNumber(splitter[0]) && isNumber(splitter[1]) && isNumber(splitter[2])) {
                    if (parseInt(splitter[0]) > 12 && parseInt(splitter[1] < 13)) {
                        date = new Date(`${splitter[1]}, ${splitter[0]}, ${splitter[2]}`);
                    }
                    else {
                        date = new Date(`${splitter[0]}, ${splitter[1]}, ${splitter[2]}`).toDateString();
                    }
                }
            }
            else if (splitter.length === 2) {
                if (isNumber(splitter[0]) && isNumber(splitter[1])) {
                    if (parseInt(splitter[0]) < 13 && parseInt(splitter[1]) < 32) {
                        date = new Date(`${splitter[0]}, ${splitter[1]}, ${new Date().getFullYear()}`).toDateString()
                    }
                }
            }
        }
    }
    const probableWords = [];
    if (date === "" || date.toString() === "Invalid Date") {
        for (let i = 0; i < arr.length; i++) {
            if (dateAbrevs.includes(arr[i])) {
                probableWords.push(arr[i]);
            }
        }
        if (probableWords.length === 0) {
            let holder = -1;
            for (let i = 0; i < arr.length; i++) {
                for (let t = 0; t < dateWords.length; t++) {
                    const pushedKeywords = [];
                    holder = -1;
                    for (let y = 0; y < arr[i].length; y++) {
                        for (let z = holder === -1 ? 0 : holder; z < dateWords[t].length; z++) {
                            if (dateWords[t][z] === arr[i][y]) {
                                pushedKeywords.push(dateWords[t]);
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
                            else { otherCounter++ }
                        }
                    }
                    for (let h = 0; h < pushedKeywords.length; h++) {
                        if (pushedKeywords[h].length !== 0) {
                            counter++;
                        }
                    }
                    if ((arr[i].length > 3 && counter / pushedKeywords.length * 100 >= 50 && arr[i].length + 1 >= dateWords[t].length && arr[i].length - 2 <= dateWords[t].length)
                        || (arr[i].length > 3 && otherCounter / pushedKeywords.length * 100 >= 40 && arr[i].length + 1 >= dateWords[t].length && arr[i].length - 2 <= dateWords[t].length)) {
                        probableWords.push(dateWords[t]);
                        arr.splice(i, 1)
                    }
                    else if (arr[i].length === 3 && counter / pushedKeywords.length === 1) {
                        probableWords.push(dateWords[t]);
                        arr.splice(i, 1);
                    }
                }
            }
            if (probableWords.length > 1) {
                // FOUND MORE THAN ONE MONTH
            }
            else if (probableWords.length === 1) {
                // success
                month = probableWords[0];
                let found = false;
                for (let i = 0; i < arr.length; i++) {
                    const splitto = arr[i].split("");
                    if (splitto.length === 3) {
                        if (arr[i] === "2nd" || arr[i] === "3rd" || arr[i] === "1st") {
                            day = `${arr[i]}`;
                            found = true;
                        }
                        else if (splitto[1] === "t" && splitto[2] === "h") {
                            if (isNumber(splitto[0])) {
                                day = `${arr[i]}`;
                                found = true;
                            }
                        }
                    }
                    else if (splitto.length === 4) {
                        if (arr[i] === "22nd" || arr[i] === "23rd" || arr[i] === "21st") {
                            day = `${arr[i]}`;
                            found = true;
                        }
                        else if (splitto[2] === "t" && splitto[3] === "h") {
                            if (isNumber(splitto[0] + splitto[1]) && parseInt(splitto[0] + splitto[1]) < 32) {
                                day += `${arr[i]}`;
                                found = true;
                                arr.splice(i, 1);
                            }
                        }
                    }
                }
                if (!found) {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].length === 2) {
                            if (isNumber(arr[i]) && parseInt(arr[i]) < 32) {
                                day = `${arr[i]}`;
                                arr.splice(i, 1)
                            }
                        }
                    }
                }
            }
        }
        else if (probableWords.length === 1) {
            // success
            month = probableWords[0];
            let found = false;
            for (let i = 0; i < arr.length; i++) {
                const splitto = arr[i].split("");
                if (splitto.length === 3) {
                    if (arr[i] === "2nd" || arr[i] === "3rd" || arr[i] === "1st") {
                        day = `${arr[i]}`;
                        found = true;
                    }
                    else if (splitto[1] === "t" && splitto[2] === "h") {
                        if (isNumber(splitto[0])) {
                            day = `${arr[i]}`;
                            found = true;
                        }
                    }
                }
                else if (splitto.length === 4) {
                    if (arr[i] === "22nd" || arr[i] === "23rd" || arr[i] === "21st") {
                        day = `${arr[i]}`;
                        found = true;
                    }
                    else if (splitto[2] === "t" && splitto[3] === "h") {
                        if (isNumber(splitto[0] + splitto[1]) && parseInt(splitto[0] + splitto[1]) < 32) {
                            day = `${arr[i]}`;
                            found = true;
                        }
                    }
                }
            }
            if (!found) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].length === 2) {
                        if (isNumber(arr[i]) && parseInt(arr[i]) < 32) {
                            day = `${arr[i]}`;
                        }
                    }
                }
            }
        }
    }
    if (date === "") {
        if (month !== "" && day !== "") {
            if (isNumber(day)) {
                month = months[month]
                date = new Date(2023, month - 1, parseInt(day)).toDateString();
            }
            else {
                let ds = day.split("");
                if (ds.length === 3) {
                    day = ds[0];
                }
                else {
                    day = ds[0] + ds[1];
                }
            }
        }
    }
    return {
        date,
        arr
    }
}

function transformArray(arr, index) {
    arr.splice(index, 1);
    const newArr = arr;
    return newArr;
}


export function findTime(arr) {
    if (typeof(arr) === "string") {
        arr = arr.split(" ")
    }
    for (let i = 0; i < arr.length; i++) {  
        if (rawTimes[arr[i]]) {
            const time = rawTimes[arr[i]];
            const newArr = transformArray(arr, i);
            return {
                type: "timeSuccess",
                time,
                newArr
            }
        }
    }
    let time = "";
    for (let i = 0; i < arr.length; i++) {
        const splitArr = arr[i].split(":"); // ID WANNA SPLICE ARRAY FROM THIS INDEX
        if (splitArr.length === 2) {
            if (splitArr[0].length > 2 || !isNumber(splitArr[0]) || parseInt(splitArr[0] > 12)) {
                return {
                    error: "timeEligibilityError",
                    msg: "This time was not found to be an eligible time."
                }
            }
            else {
                if (splitArr[1].length !== 2 || !isNumber(splitArr[1])) {
                    if (splitArr[1].length !== 4 && splitArr[1].length !== 5) {
                        return {
                            error: "timeEligibilityError",
                            msg: "This time was not found to be an eligible time."
                        }
                    }
                    else {
                        if (splitArr[1][2].toLowerCase() === "a" || splitArr[1][2].toLowerCase() === "p") {
                            if (splitArr[1][3].toLowerCase() === "m") {
                                if (isNumber(parseInt(splitArr[1][0] + splitArr[1][1])) && parseInt(splitArr[1][0] + splitArr[1][1]) < 60) {
                                    const newArr = transformArray(arr, i);
                                    return {
                                        type: "timeSuccess",
                                        time: splitArr[0].toString() + ":" + splitArr[1][0] + splitArr[1][1] + " " + splitArr[1][2].toUpperCase() + splitArr[1][3].toUpperCase(),
                                        newArr
                                    }
                                }
                                else {
                                    return {
                                        type: "timeEligibilityError",
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (!isNumber(parseInt(splitArr[1])) || parseInt(splitArr[1]) > 59) {
                        return {
                            error: "timeEligibilityError",
                        }
                    }
                    else {
                        if (i !== arr.length - 1) {
                            if (arr[i + 1].toLowerCase() === "am" || arr[i + 1].toLowerCase() === "pm") {
                                const newArr = transformArray(arr, i);
                                return {
                                    success: "timeSuccess",
                                    time: arr[i] + " " + arr[i + 1].toUpperCase(),
                                    newArr
                                }
                            }
                            else {
                                if (new Date().getHours() > parseInt(splitArr[0])) {
                                    const newArr = transformArray(arr, i);
                                    return {
                                        success: "timeSuccess",
                                        time: arr[i] + " PM",
                                        newArr
                                    }
                                }
                                else {
                                    return {
                                        error: "ampmError",
                                        time: + arr[i]
                                    }
                                }
                            }
                        }
                        else {
                            if (new Date().getHours() > parseInt(splitArr[0])) {
                                const newArr = transformArray(arr, i);
                                return {
                                    time: arr[i] + " PM",
                                    type: "timeSuccess",
                                    newArr
                                }

                            }
                            else {
                                return {
                                    error: "ampmError",
                                }
                            }
                        }
                    }
                }
            }
            return {
                error: "colonError",
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length === 3) {
            if (isNumber(arr[i])) {
                const newArray = arr[i].split("");
                if (parseInt(newArray[0]) < 13 && parseInt(newArray[1] + newArray[2]) < 60) {
                    if (i === arr.length - 1) {
                        time = newArray[0] + ":" + newArray[1] + newArray[2];
                        if (parseInt(newArray[0]) < new Date().getHours()) {
                            const newArr = transformArray(arr, i);
                            return {
                                time: time + " PM",
                                type: "bookingTimeSuccess",
                                newArr
                            }
                        }
                        return {
                            time: time,
                            type: "ampmError",
                        }
                    }
                    else {
                        if (arr[i + 1].toLowerCase() !== "am" && arr[i + 1].toLowerCase() !== "pm") {
                            time = newArray[0] + ":" + newArray[1] + newArray[2];
                            if (parseInt(newArray[0]) < new Date().getHours()) {
                                const newArr = transformArray(arr, i);
                                return {
                                  time: time + " PM",
                                  newArr
                                }
                            }
                            return {
                                msg: time,
                                error: "ampmError",
                            }
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
                if (parseInt(newArray[0] + newArray[1]) < 13 && parseInt(newArray[2] + newArray[3]) < 60) {
                    if (i === arr.length - 1) {
                        time = newArray[0] + newArray[1] + ":" + newArray[2] + newArray[3];
                        if (parseInt(newArray[0] + newArray[0]) < new Date().getHours()) {
                            const newArr = transformArray(arr, i);
                            return {
                             time: time + " PM",
                             newArr
                            }
                        }
                        return {
                            time: time,
                            error: "ampmError"
                        }
                    }
                    else {
                        if (arr[i + 1].toLowerCase() !== "am" && arr[i + 1].toLowerCase() !== "pm") {
                            time = newArray[0] + newArray[1] + ":" + newArray[2] + newArray[3];
                            if (parseInt(newArray[0] + newArray[0]) < new Date().getHours()) {
                                const newArr = transformArray(arr, i);
                                return {
                                    time: time + " PM",
                                    newArr
                                } 
                            }
                            return {
                                time: time,
                                error: "ampmError"
                            }
                        }
                        else {
                            const newArr = transformArray(arr, i);
                            time = newArray[0] + newArray[1] + ":" + newArray[2] + newArray[3] + arr[i + 1];
                            return {
                                success: "gotToEndWithTime",
                                time,
                                newArr
                            }
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
                            console.log(arr.length)
                            time = arr[i][0] + ":" + arr[i][1] + arr[i][2] + " " + arr[i][3].toUpperCase() + arr[i][4].toUpperCase()
                            const newArr = transformArray(arr, i);
                            console.log(newArr)
                            return {
                                success: "gotToEndWithTime",
                                time,
                                newArr
                            }
                        }
                    }
                }
            }
        }
        else if (arr[i].length === 6) {
            if (arr[i][4].toLowerCase() === "a" || arr[i][4].toLowerCase() === "p") {
                if (arr[i][5].toLowerCase() === "m") {
                    if (isNumber(arr[i][0] + arr[i][1] + arr[i][2]) + arr[i][3]) {
                        if (parseInt(arr[i][0] + arr[i][1]) < 13 && parseInt(arr[i][2] + arr[i][3]) < 60) {
                            time = arr[i][0] + arr[i][1] + ":" + arr[i][2] + arr[i][3] +  " " + arr[i][4].toUpperCase() + arr[i][5].toUpperCase()
                            const newArr = transformArray(arr, i);
                            return {
                                success: "gotToEndWithTime",
                                time,
                                newArr
                            }
                        }
                    }
                }
            }
        }
    }
    if (time === "") {
        return {
            error: "gotToEndNoTime"
        }
    }
    else {
        
     
    }
}

function isNumber(num) {
    return parseInt(num).toString() !== "NaN";
}


function littleMagic(probableWords, msg) {

}

function createBookingMagic(probableWords, services, arr) {
    const length = probableWords.length;
    if (probableWords.includes("shift")) {
        return false;
    }
    else if (probableWords.includes("book") || probableWords.includes("booking")) { // WOULD NOT WORK IF WE TYPED DELETE BOOKING
        if (probableWords.length === 1) {
            return true;
        }
        if ((probableWords.includes("create") || probableWords.includes("add") || probableWords.includes("make"))) {
            return true;
        }
    }
    else if (probableWords.includes("create") || probableWords.includes("add") || probableWords.includes("make")) {
        let num = 0;
        for (let i = 0; i < services.length; i++) {
            let splitter = services[i].serviceName.split(" ");
            for (let t = 0; t < splitter.length; t++) {
                if (arr.includes(splitter[t].toLowerCase())) {
                    num++;
                    if (num > 1) {
                        return true;
                    }
                }
            }
        }
    }
}

function createShiftMagic(probableWords, arr) {
    if (probableWords.includes("shift") && (probableWords.includes("create") || probableWords.includes("add") || probableWords.includes("make") || probableWords.includes("schedule"))) {
        return true;
    }
    else {
        return false;
    }
}



export function findTimesMagic(arr, apComing) {
    if (typeof(arr) === "string") {
        arr = arr.split(" ");
    }
    let ap = "";
    let hour = "";
    let minutes = "";
    const possibleHours = [];
    const possibleMinutes = [];
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        if (timeHours.includes(arr[i])) {
            possibleHours.push(arr[i]);
        }
    }
 
    if (possibleHours.length === 1) {
        hour = possibleHours[0];
        if (parseInt(hour).toString() === "NaN") {
            hour = timeToNumDic[hour];
        }
        else {
            // dont need to do anything ig
        }
        const index = arr.findIndex(function(e) {
            return e === possibleHours[0];
        })
            if (index !== -1) {
                arr.splice(index, 1);
            }
    }
    else if (possibleHours.length === 2) {
            hour = possibleHours[0];
            if (parseInt(hour).toString() === "NaN") {
                hour = timeToNumDic[hour];
            }
            else {
                // dont need to do anything ig
            }
            const index = arr.findIndex(function(e) {
                return e === possibleHours[0];
            })
            if (index !== -1) {
                arr.splice(index, 1);
            }
    }
    else if (possibleHours.length === 3) {
        if (possibleHours[2] === "five" || possibleHours[2] === "5") {
            hour = possibleHours[0];
            if (parseInt(hour).toString() === "NaN") {
                hour = timeToNumDic[hour];
            }
            else {
                // dont need to do anything ig
            }
            const index = arr.findIndex(function(e) {
                return e === possibleHours[0];
            })
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (timeMinutes.includes(arr[i])) {
            possibleMinutes.push(arr[i]);
        }
    }
    if (possibleMinutes.length === 1) {
        if (parseInt(minutes).toString() === "NaN") {
            minutes = timeToNumDic[possibleMinutes[0]];
        }
        else {
            minutes = possibleMinutes[0];
        }
    }
    else if (possibleMinutes.length === 2) {
        if (possibleMinutes[1] === "5" || possibleMinutes[1] === "five") {
            if (parseInt(minutes).toString() === "NaN") {
                minutes = timeToNumDic[possibleMinutes[0] + possibleMinutes[1]];
            }
            else {
                minutes = possibleMinutes[0] + possibleMinutes[1];
            }
        }
    }
    if (apComing === "") {
        if (arr.includes("AM") || arr.includes("am") || arr.includes("Am") || arr.includes("morning")) {
            ap = " AM";
        }
        if (arr.includes("PM") || arr.includes("pm") || arr.includes("Pm") || arr.includes("night")) {
            ap = " PM";
        }
        if (ap === "") {
            ap = " PM";
        }
    }
    else {
        ap = apComing;
    }
    if (hour && minutes) {
        return {time: hour + ":" + minutes + ap, newArr: arr}
    } 
    else {
        return "error";
    }
   
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
    for (let i = 0; i < msgCleaner.length; i++) {
        if (msgCleaner[i] === "it" || msgCleaner[i] === "to" || msgCleaner[i] === "a" || msgCleaner[i] === "i" || msgCleaner[i] === "for") {
            msgCleaner.splice(i, 1);
        }
    }
    const newThing = msgCleaner.filter(word => {
        return word !== "it" && word !== "to" && word !== "a" && word !== "i" && word !== "for"
    })
    return newThing;
}


export function checkYes(msg) {
    let cmsg = msg.toLowerCase();
    if (yesArray.includes(cmsg)) {
        return true;
    }
    else {
        return false;
    }
}

export function checkNo(msg) {
    let cmsg = msg.toLowerCase();
    if (yesArray.includes(cmsg)) {
        return true;
    }
    else {
        return false;
    }
}



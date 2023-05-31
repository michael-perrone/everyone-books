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
// 

export function bigMagic(msg) {
    let mainGoal = "";
    let subjectSupport = "";
    let doesNeedDateTime = 5;
    let dateIfNeeded = "";
    let timeIfNeeded = "";
    // cm stands for correct message
    let cm = msg.split(" ");
}




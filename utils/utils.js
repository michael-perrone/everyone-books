const stringToIntTime = {
    "12:00 AM": 0, "12:15 AM": 1, "12:30 AM": 2, "12:45 AM": 3, "1:00 AM": 4, "1:15 AM": 5, "1:30 AM": 6,
    "1:45 AM": 7, "2:00 AM": 8, "2:15 AM": 9, "2:30 AM": 10, "2:45 AM": 11, "3:00 AM": 12, "3:15 AM": 13, "3:30 AM": 14, "3:45 AM": 15,
    "4:00 AM": 16, "4:15 AM": 17, "4:30 AM": 18, "4:45 AM": 19, "5:00 AM": 20, "5:15 AM": 21, "5:30 AM": 22, "5:45 AM": 23,
    "6:00 AM": 24, "6:15 AM": 25, "6:30 AM": 26, "6:45 AM": 27, "7:00 AM": 28, "7:15 AM": 29, "7:30 AM": 30, "7:45 AM": 31, "8:00 AM": 32,
    "8:15 AM": 33, "8:30 AM": 34, "8:45 AM": 35, "9:00 AM": 36, "9:15 AM": 37, "9:30 AM": 38, "9:45 AM": 39, "10:00 AM": 40, "10:15 AM": 41,
    "10:30 AM": 42, "10:45 AM": 43, "11:00 AM": 44, "11:15 AM": 45, "11:30 AM": 46, "11:45 AM": 47, "12:00 PM": 48, "12:15 PM": 49,
    "12:30 PM": 50, "12:45 PM": 51, "1:00 PM": 52, "1:15 PM": 53, "1:30 PM": 54, "1:45 PM": 55, "2:00 PM": 56, "2:15 PM": 57, "2:30 PM": 58,
    "2:45 PM": 59, "3:00 PM": 60, "3:15 PM": 61, "3:30 PM": 62, "3:45 PM": 63, "4:00 PM": 64, "4:15 PM": 65, "4:30 PM": 66, "4:45 PM": 67,
    "5:00 PM": 68, "5:15 PM": 69, "5:30 PM": 70, "5:45 PM": 71, "6:00 PM": 72, "6:15 PM": 73, "6:30 PM": 74, "6:45 PM": 75, "7:00 PM": 76,
    "7:15 PM": 77, "7:30 PM": 78, "7:45 PM": 79, "8:00 PM": 80, "8:15 PM": 81, "8:30 PM": 82, "8:45 PM": 83, "9:00 PM": 84, "9:15 PM": 85,
    "9:30 PM": 86, "9:45 PM": 87, "10:00 PM": 88, "10:15 PM": 89, "10:30 PM": 90, "10:45 PM": 91, "11:00 PM": 92, "11:15 PM": 93,
    "11:30 PM": 94, "11:45 PM": 95
}

const date = new Date();
const notificationDate = cutDay(`${date.toDateString()}, ${-convertTime(date.getHours(), date.getMinutes())}`);

const intToStringTime = {
    0: "12:00 AM", 1: "12:15 AM", 2: "12:30 AM", 3: "12:45 AM", 4: "1:00 AM", 5: "1:15 AM", 6: "1:30 AM", 7: "1:45 AM", 8: "2:00 AM", 9: "2:15 AM",
    10: "2:30 AM", 11: "2:45 AM", 12: "3:00 AM", 13: "3:15 AM", 14: "3:30 AM", 15: "3:45 AM", 16: "4:00 AM", 17: "4:15 AM", 18: "4:30 AM", 19: "4:45 AM",
    20: "5:00 AM", 21: "5:15 AM", 22: "5:30 AM", 23: "5:45 AM", 24: "6:00 AM", 25: "6:15 AM", 26: "6:30 AM", 27: "6:45 AM", 28: "7:00 AM", 29: "7:15 AM",
    30: "7:30 AM", 31: "7:45 AM", 32: "8:00 AM", 33: "8:15 AM", 34: "8:30 AM", 35: "8:45 AM", 36: "9:00 AM", 37: "9:15 AM", 38: "9:30 AM", 39: "9:45 AM",
    40: "10:00 AM", 41: "10:15 AM", 42: "10:30 AM", 43: "10:45 AM", 44: "11:00 AM", 45: "11:15 AM", 46: "11:30 AM", 47: "11:45 AM", 48: "12:00 PM",
    49: "12:15 PM", 50: "12:30 PM", 51: "12:45 PM", 52: "1:00 PM", 53: "1:15 PM", 54: "1:30 PM", 55: "1:45 PM", 56: "2:00 PM", 57: "2:15 PM",
    58: "2:30 PM", 59: "2:45 PM", 60: "3:00 PM", 61: "3:15 PM", 62: "3:30 PM", 63: "3:45 PM", 64: "4:00 PM", 65: "4:15 PM", 66: "4:30 PM",
    67: "4:45 PM", 68: "5:00 PM", 69: "5:15 PM", 70: "5:30 PM", 71: "5:45 PM", 72: "6:00 PM", 73: "6:15 PM", 74: "6:30 PM", 75: "6:45 PM",
    76: "7:00 PM", 77: "7:15 PM", 78: "7:30 PM", 79: "7:45 PM", 80: "8:00 PM", 81: "8:15 PM", 82: "8:30 PM", 83: "8:45 PM", 84: "9:00 PM",
    85: "9:15 PM", 86: "9:30 PM", 87: "9:45 PM", 88: "10:00 PM", 89: "10:15 PM", 90: "10:30 PM", 91: "10:45 PM", 92: "11:00 PM", 93: "11:15 PM",
    94: "11:30 PM", 95: "11:45 PM"
}

const timeDurationStringToInt = {
    "15 Minutes": 1, "30 Minutes": 2, "45 Minutes": 3, "1 Hour": 4, "1 Hour 15 Minutes": 5, "1 Hour 30 Minutes": 6, "1 Hour 45 Minutes": 7, "2 Hours": 8, "2 Hours 15 Minutes": 9, "2 Hours 30 Minutes": 10, "2 Hours 45 Minutes": 11, "3 Hours": 12
}

const timeDurationIntToString = {
    1: "15 Minutes", 2: "30 Minutes", 3: "45 Minutes", 4: "1 Hour", 5: "1 Hour 15 Minutes", 6: "1 Hour 30 Minutes", 7: "1 Hour 45 Minutes", 8: "2 Hours", 9: "2 Hours 15 Minutes", 10: "2 Hours 30 Minutes", 11: "2 Hours 45 Minutes", 12: "3 Hours"
}

const fixTime = {
    "12:00 AM": "0:00", "12:15 AM": "0:15", "12:30 AM": "0:30", "12:45 AM": "0:45", "1:00 AM": "1:00", "1:15 AM": "1:15", "1:30 AM": "1:30", "1:45 AM": "1:45",
    "2:00 AM": "2:00", "2:15 AM": "2:15", "2:30 AM": "2:30", "2:45 AM": "2:45", "3:00 AM": "3:00", "3:15 AM": "3:15", "3:30 AM": "3:30", "3:45 AM": "3:45",
    "4:00 AM": "4:00", "4:15 AM": "4:15", "4:30 AM": "4:30", "4:45 AM": "4:45", "5:00 AM": "5:00", "5:15 AM": "5:15", "5:30 AM": "5:30", "5:45 AM": "5:45",
    "6:00 AM": "6:00", "6:15 AM": "6:15", "6:30 AM": "6:30", "6:45 AM": "6:45", "7:00 AM": "7:00", "7:15 AM": "7:15", "7:30 AM": "7:30", "7:45 AM": "7:45",
    "8:00 AM": "8:00", "8:15 AM": "8:15", "8:30 AM": "8:30", "8:45 AM": "8:45", "9:00 AM": "9:00", "9:15 AM": "9:15", "9:30 AM": "9:30", "9:45 AM": "9:45",
    "10:00 AM": "10:00", "10:15 AM": "10:15", "10:30 AM": "10:30", "10: 45 AM": "10:45", "11: 00 AM": "11:00", "11:15 AM": "11:15", "11:30 AM": "11:30",
    "11: 45 AM": "11: 45", "12:00 PM": "12:00", "12:15 PM": "12:15", "12:30 PM": "12:30", "12:45 PM": "12:45", "1:00 PM": "13:00", "1:15 PM": "13:15",
    "1:30 PM": "13:30", "1:45 PM": "13:45", "2:00 PM": "14:00", "2:15 PM": "14:15", "2:30 PM": "14:30", "2:45 PM": "14:45", "3:00 PM": "15:00", "3:15 PM": "15:15",
    "3:30 PM": "15:30", "3:45 PM": "15:45", "4:00 PM": "16:00", "4:15 PM": "16:15", "4:30 PM": "16:30", "4:45 PM": "16:45", "5:00 PM": "17:00", "5:15 PM": "17:15",
    "5:30 PM": "17:30", "5:45 PM": "17:45", "6:00 PM": "18:00", "6:15 PM": "18:15", "6:30 PM": "18:30", "6:45 PM": "18:45", "7:00 PM": "19:00", "7:15 PM": "19:15",
    "7:30 PM": "19:30", "7:45 PM": "19:45", "8:00 PM": "20:00", "8:15 PM": "20:15", "8:30 PM": "20:30", "8:45 PM": "20:45", "9:00 PM": "21:00", "9:15 PM": "21:15",
    "9:30 PM": "21:30", "9:45 PM": "21:45", "10:00 PM": "22:00", "10:15 PM": "22:15", "10:30 PM": "22:30", "10:45 PM": "22:45", "11:00 PM": "23:00",
    "11:15 PM": "23:15", "11:30 PM": "23:30", "11:45 PM": "23:45"
}


function convertShiftTimes(numberTime) {
    let num = null;
    if (numberTime === "12:00 AM") {
        num = 0;
    } else if (numberTime === "12:30 AM") {
        num = 1;
    } else if (numberTime === "1:00 AM") {
        num = 2;
    } else if (numberTime === "1:30 AM") {
        num = 3;
    } else if (numberTime === "2:00 AM") {
        num = 4;
    } else if (numberTime === "2:30 AM") {
        num = 5;
    } else if (numberTime === "3:00 AM") {
        num = 6;
    } else if (numberTime === "3:30 AM") {
        num = 7;
    } else if (numberTime === "4:00 AM") {
        num = 8;
    } else if (numberTime === "4:30 AM") {
        num = 9;
    } else if (numberTime === "5:00 AM") {
        num = 10;
    } else if (numberTime === "5:30 AM") {
        num = 11;
    } else if (numberTime === "6:00 AM") {
        num = 12;
    } else if (numberTime === "6:30 AM") {
        num = 13;
    } else if (numberTime === "7:00 AM") {
        num = 14;
    } else if (numberTime === "7:30 AM") {
        num = 15;
    } else if (numberTime === "8:00 AM") {
        num = 16;
    } else if (numberTime === "8:30 AM") {
        num = 17;
    } else if (numberTime === "9:00 AM") {
        num = 18;
    } else if (numberTime === "9:30 AM") {
        num = 19;
    } else if (numberTime === "10:00 AM") {
        num = 20;
    } else if (numberTime === "10:30 AM") {
        num = 21;
    } else if (numberTime === "11:00 AM") {
        num = 22;
    } else if (numberTime === "11:30 AM") {
        num = 23;
    } else if (numberTime === "12:00 PM") {
        num = 24;
    } else if (numberTime === "12:30 PM") {
        num = 25;
    } else if (numberTime === "1:00 PM") {
        num = 26;
    } else if (numberTime === "1:30 PM") {
        num = 27;
    } else if (numberTime === "2:00 PM") {
        num = 28;
    } else if (numberTime === "2:30 PM") {
        num = 29;
    } else if (numberTime === "3:00 PM") {
        num = 30;
    } else if (numberTime === "3:30 PM") {
        num = 31;
    } else if (numberTime === "4:00 PM") {
        num = 32;
    } else if (numberTime === "4:30 PM") {
        num = 33;
    } else if (numberTime === "5:00 PM") {
        num = 34;
    } else if (numberTime === "5:30 PM") {
        num = 35;
    } else if (numberTime === "6:00 PM") {
        num = 36;
    } else if (numberTime === "6:30 PM") {
        num = 37;
    } else if (numberTime === "7:00 PM") {
        num = 38;
    } else if (numberTime === "7:30 PM") {
        num = 39;
    } else if (numberTime === "8:00 PM") {
        num = 40;
    } else if (numberTime === "8:30 PM") {
        num = 41;
    } else if (numberTime === "9:00 PM") {
        num = 42;
    } else if (numberTime === "9:30 PM") {
        num = 43;
    } else if (numberTime === "10:00 PM") {
        num = 44;
    } else if (numberTime === "10:30 PM") {
        num = 45;
    } else if (numberTime === "11:00 PM") {
        num = 46;
    } else if (numberTime === "11:30 PM") {
        num = 47;
    }
    return num;
}

function shiftCalcTime(num) {
    let time;
    if (num === 0) {
        time = "12:00 AM";
    }
    else if (num === 1) {
        time = "12:30 AM"
    }
    else if (num === 2) {
        time = "1:00 AM"
    }
    else if (num === 3) {
        time = "1:30 AM"
    }
    else if (num === 4) {
        time = "2:00 AM"
    }
    else if (num === 5) {
        time = "2:30 AM"
    }
    else if (num === 6) {
        time = "3:00 AM"
    }
    else if (num === 7) {
        time = "3:30 AM"
    }
    else if (num === 8) {
        time = "4:00 AM"
    }
    else if (num === 9) {
        time = "4:30 AM"
    }
    else if (num === 10) {
        time = "5:00 AM"
    }
    else if (num === 11) {
        time = "5:30 AM"
    }
    else if (num === 12) {
        time = "6:00 AM"
    }
    else if (num === 13) {
        time = "6:30 AM"
    }
    else if (num === 14) {
        time = "7:00 AM"
    }
    else if (num === 15) {
        time = "7:30 AM"
    }
    else if (num === 16) {
        time = "8:00 AM"
    }
    else if (num === 17) {
        time = "8:30 AM"
    }
    else if (num === 18) {
        time = "9:00 AM"
    }
    else if (num === 19) {
        time = "9:30 AM"
    }
    else if (num === 20) {
        time = "10:00 AM"
    }
    else if (num === 21) {
        time = "10:30 AM"
    }
    else if (num === 22) {
        time = "11:00 AM"
    }
    else if (num === 23) {
        time = "11:30 AM"
    }
    if (num === 24) {
        time = "12:00 PM";
    }
    else if (num === 25) {
        time = "12:30 PM"
    }
    else if (num === 26) {
        time = "1:00 PM"
    }
    else if (num === 27) {
        time = "1:30 PM"
    }
    else if (num === 28) {
        time = "2:00 PM"
    }
    else if (num === 29) {
        time = "2:30 PM"
    }
    else if (num === 30) {
        time = "3:00 PM"
    }
    else if (num === 31) {
        time = "3:30 PM"
    }
    else if (num === 32) {
        time = "4:00 PM"
    }
    else if (num === 33) {
        time = "4:30 PM"
    }
    else if (num === 34) {
        time = "5:00 PM"
    }
    else if (num === 35) {
        time = "5:30 PM"
    }
    else if (num === 36) {
        time = "6:00 PM"
    }
    else if (num === 37) {
        time = "6:30 PM"
    }
    else if (num === 38) {
        time = "7:00 PM"
    }
    else if (num === 39) {
        time = "7:30 PM"
    }
    else if (num === 40) {
        time = "8:00 PM"
    }
    else if (num === 41) {
        time = "8:30 PM"
    }
    else if (num === 42) {
        time = "9:00 PM"
    }
    else if (num === 43) {
        time = "9:30 PM"
    }
    else if (num === 44) {
        time = "10:00 PM"
    }
    else if (num === 45) {
        time = "10:30 PM"
    }
    else if (num === 46) {
        time = "11:00 PM"
    }
    else if (num === 47) {
        time = "11:30 PM"
    }
    else if (num === 48) {
        time = "12:00 AM"
    }
    else if (num === 49) {
        time = "12:30 AM"
    }
    else if (num === 50) {
        time = "1:00 AM"
    }
    else if (num === 51) {
        time = "1:30 AM"
    }
    else if (num === 52) {
        time = "2:00 AM"
    }
    else if (num === 53) {
        time = "2:30 AM"
    }
    else if (num === 54) {
        time = "3:00 AM"
    }
    else if (num === 55) {
        time = "3:30 AM"
    }
    else if (num === 56) {
        time = "4:00 AM"
    }
    else if (num === 57) {
        time = "4:30 AM"
    }
    else if (num === 58) {
        time = "5:00 AM"
    }
    else if (num === 59) {
        time = "5:30 AM"
    }
    else if (num === 60) {
        time = "6:00 AM"
    }
    else if (num === 61) {
        time = "6:30 AM"
    }
    else if (num === 62) {
        time = "7:00 AM"
    }
    else if (num === 63) {
        time = "7:30 AM"
    }
    else if (num === 64) {
        time = "8:00 AM"
    }
    else if (num === 65) {
        time = "8:30 AM"
    }
    else if (num === 66) {
        time = "9:00 AM"
    }
    else if (num === 67) {
        time = "9:30 AM"
    }
    else if (num === 68) {
        time = "10:00 AM"
    }
    else if (num === 69) {
        time = "10:30 AM"
    }
    else if (num === 70) {
        time = "11:00 AM"
    }
    else if (num === 71) {
        time = "11:30 AM"
    }
    return time
}

function convertTime(hour, minute) {
    hour = hour.toString();
    minute = minute.toString();
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    let time = "";
    if (hour === "0") {
        time = `12:${minute} AM`
    }
    else if (hour === "1") {
        time = `1:${minute} AM`
    }
    else if (hour === "2") {
        time = `2:${minute} AM`
    }
    else if (hour === "3") {
        time = `3:${minute} AM`
    }
    else if (hour === "4") {
        time = `4:${minute} AM`
    }
    else if (hour === "4") {
        time = `4:${minute} AM`
    }
    else if (hour === "5") {
        time = `5:${minute} AM`
    }
    else if (hour === "6") {
        time = `6:${minute} AM`
    }
    else if (hour === "7") {
        time = `7:${minute} AM`
    }
    else if (hour === "8") {
        time = `8:${minute} AM`
    }
    else if (hour === "9") {
        time = `9:${minute} AM`
    }
    else if (hour === "10") {
        time = `10:${minute} AM`
    }
    else if (hour === "11") {
        time = `11:${minute} AM`
    }
    else if (hour === "12") {
        time = `12:${minute} PM`
    }
    else if (hour === "13") {
        time = `1:${minute} PM`
    }
    else if (hour === "14") {
        time = `2:${minute} PM`
    }
    else if (hour === "15") {
        time = `3:${minute} PM`
    }
    else if (hour === "16") {
        time = `4:${minute} PM`
    }
    else if (hour === "17") {
        time = `5:${minute} PM`
    }
    else if (hour === "18") {
        time = `6:${minute} PM`
    }
    else if (hour === "19") {
        time = `7:${minute} PM`
    }
    else if (hour === "20") {
        time = `8:${minute} PM`
    }
    else if (hour === "21") {
        time = `9:${minute} PM`
    }
    else if (hour === "22") {
        time = `10:${minute} PM`
    }
    else if (hour === "23") {
        time = `11:${minute} PM`
    }
    console.log(time)
    return time;
}

function getStringDateTime(time, day) {
    let date = new Date(`${day}, ${time}`);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let timeString = convertTime(hour, minute);
    let dateString = date.toDateString();
    return {
        date,
        dateString,
        timeString
    }
}

function cutDay(date) {
    let dateArray = date.split(" ");
    return dateArray[1] + " " + dateArray[2] + " " + dateArray[3] + " " + dateArray[4] + " " + dateArray[5]
}

module.exports = {
    stringToIntTime,
    intToStringTime,
    timeDurationStringToInt,
    convertTime,
    cutDay,
    fixTime,
    getStringDateTime,
    notificationDate
}

export const stringToIntTime = {
    "12:00 AM": 0, "12:05 AM": 1, "12:10 AM": 2, "12:15 AM": 3, "12:20 AM": 4, "12:25 AM": 5, "12:30 AM": 6,
    "12:35 AM": 7, "12:40 AM": 8, "12:45 AM": 9, "12:50 AM": 10, "12:55 AM": 11, "1:00 AM": 12, "1:05 AM": 13, "1:10 AM": 14,
    "1:15 AM": 15, "1:20 AM": 16, "1:25 AM": 17, "1:30 AM": 18, "1:35 AM": 19, "1:40 AM": 20, "1:45 AM": 21, "1:50 AM": 22,
    "1:55 AM": 23, "2:00 AM": 24, "2:05 AM": 25, "2:10 AM": 26, "2:15 AM": 27, "2:20 AM": 28, "2:25 AM": 29, "2:30 AM": 30,
    "2:35 AM": 31, "2:40 AM": 32, "2:45 AM": 33, "2:50 AM": 34, "2:55 AM": 35, "3:00 AM": 36, "3:05 AM": 37, "3:10 AM": 38,
    "3:15 AM": 39, "3:20 AM": 40, "3:25 AM": 41, "3:30 AM": 42, "3:35 AM": 43, "3:40 AM": 44, "3:45 AM": 45, "3:50 AM": 46,
    "3:55 AM": 47, "4:00 AM": 48, "4:05 AM": 49, "4:10 AM": 50, "4:15 AM": 51, "4:20 AM": 52, "4:25 AM": 53, "4:30 AM": 54
    , "4:35 AM": 55, "4:40 AM": 56, "4:45 AM": 57, "4:50 AM": 58, "4:55 AM": 59, "5:00 AM": 60, "5:05 AM": 61, "5:10 AM": 62,
    "5:15 AM": 63, "5:20 AM": 64, "5:25 AM": 65, "5:30 AM": 66, "5:35 AM": 67, "5:40 AM": 68, "5:45 AM": 69, "5:50 AM": 70,
    "5:55 AM": 71, "6:00 AM": 72, "6:05 AM": 73, "6:10 AM": 74, "6:15 AM": 75, "6:20 AM": 76, "6:25 AM": 77, "6:30 AM": 78,
    "6:35 AM": 79, "6:40 AM": 80, "6:45 AM": 81, "6:50 AM": 82, "6:55 AM": 83, "7:00 AM": 84, "7:05 AM": 85, "7:10 AM": 86,
    "7:15 AM": 87, "7:20 AM": 88, "7:25 AM": 89, "7:30 AM": 90, "7:35 AM": 91, "7:40 AM": 92, "7:45 AM": 93, "7:50 AM": 94,
    "7:55 AM": 95, "8:00 AM": 96, "8:05 AM": 97, "8:10 AM": 98, "8:15 AM": 99, "8:20 AM": 100, "8:25 AM": 101, "8:30 AM": 102,
    "8:35 AM": 103, "8:40 AM": 104, "8:45 AM": 105, "8:50 AM": 106, "8:55 AM": 107, "9:00 AM": 108, "9:05 AM": 109,
    "9:10 AM": 110, "9:15 AM": 111, "9:20 AM": 112, "9:25 AM": 113, "9:30 AM": 114, "9:35 AM": 115, "9:40 AM": 116,
    "9:45 AM": 117, "9:50 AM": 118, "9:55 AM": 119, "10:00 AM": 120, "10:05 AM": 121, "10:10 AM": 122, "10:15 AM": 123,
    "10:20 AM": 124, "10:25 AM": 125, "10:30 AM": 126, "10:35 AM": 127, "10:40 AM": 128, "10:45 AM": 129, "10:50 AM": 130,
    "10:55 AM": 131, "11:00 AM": 132, "11:05 AM": 133, "11:10 AM": 134, "11:15 AM": 135, "11:20 AM": 136, "11:25 AM": 137,
    "11:30 AM": 138, "11:35 AM": 139, "11:40 AM": 140, "11:45 AM": 141, "11:50 AM": 142, "11:55 AM": 143, "12:00 PM": 144,
    "12:05 PM": 145, "12:10 PM": 146, "12:15 PM": 147, "12:20 PM": 148, "12:25 PM": 149, "12:30 PM": 150, "12:35 PM": 151,
    "12:40 PM": 152, "12:45 PM": 153, "12:50 PM": 154, "12:55 PM": 155, "1:00 PM": 156, "1:05 PM": 157, "1:10 PM": 158, "1:15 PM": 159, "1:20 PM": 160, "1:25 PM": 161,
    "1:30 PM": 162, "1:35 PM": 163, "1:40 PM": 164, "1:45 PM": 165, "1:50 PM": 166, "1:55 PM": 167, "2:00 PM": 168, "2:05 PM": 169,
    "2:10 PM": 170, "2:15 PM": 171, "2:20 PM": 172, "2:25 PM": 173, "2:30 PM": 174, "2:35 PM": 175, "2:40 PM": 176, "2:45 PM": 177,
    "2:50 PM": 178, "2:55 PM": 179, "3:00 PM": 180, "3:05 PM": 181, "3:10 PM": 182, "3:15 PM": 183, "3:20 PM": 184, "3:25 PM": 185,
    "3:30 PM": 186, "3:35 PM": 187, "3:40 PM": 188, "3:45 PM": 189, "3:50 PM": 190, "3:55 PM": 191, "4:00 PM": 192, "4:05 PM": 193,
    "4:10 PM": 194, "4:15 PM": 195, "4:20 PM": 196, "4:25 PM": 197, "4:30 PM": 198, "4:35 PM": 199, "4:40 PM": 200, "4:45 PM": 201,
    "4:50 PM": 202, "4:55 PM": 203, "5:00 PM": 204, "5:05 PM": 205, "5:10 PM": 206, "5:15 PM": 207, "5:20 PM": 208, "5:25 PM": 209,
    "5:30 PM": 210, "5:35 PM": 211, "5:40 PM": 212, "5:45 PM": 213, "5:50 PM": 214, "5:55 PM": 215, "6:00 PM": 216, "6:05 PM": 217,
    "6:10 PM": 218, "6:15 PM": 219, "6:20 PM": 220, "6:25 PM": 221, "6:30 PM": 222, "6:35 PM": 223, "6:40 PM": 224, "6:45 PM": 225,
    "6:50 PM": 226, "6:55 PM": 227, "7:00 PM": 228, "7:05 PM": 229, "7:10 PM": 230, "7:15 PM": 231, "7:20 PM": 232, "7:25 PM": 233,
    "7:30 PM": 234, "7:35 PM": 235, "7:40 PM": 236, "7:45 PM": 237, "7:50 PM": 238, "7:55 PM": 239, "8:00 PM": 240, "8:05 PM": 241,
    "8:10 PM": 242, "8:15 PM": 243, "8:20 PM": 244, "8:25 PM": 245, "8:30 PM": 246, "8:35 PM": 247, "8:40 PM": 248, "8:45 PM": 249,
    "8:50 PM": 250, "8:55 PM": 251, "9:00 PM": 252, "9:05 PM": 253, "9:10 PM": 254, "9:15 PM": 255, "9:20 PM": 256, "9:25 PM": 257,
    "9:30 PM": 258, "9:35 PM": 259, "9:40 PM": 260, "9:45 PM": 261, "9:50 PM": 262, "9:55 PM": 263, "10:00 PM": 264, "10:05 PM": 265,
    "10:10 PM": 266, "10:15 PM": 267, "10:20 PM": 268, "10:25 PM": 269, "10:30 PM": 270, "10:35 PM": 271, "10:40 PM": 272, "10:45 PM": 273,
    "10:50 PM": 274, "10:55 PM": 275, "11:00 PM": 276, "11:05 PM": 277, "11:10 PM": 278, "11:15 PM": 279, "11:20 PM": 280, "11:25 PM": 281,
    "11:30 PM": 282, "11:35 PM": 283, "11:40 PM": 284, "11:45 PM": 285, "11:50 PM": 286, "11:55 PM": 287
}







// possible ideas for chat


export function getTimes(open, close) {
    let times = []; // [4:30 AM, 4:35 AM]
    let start = stringToIntTime[open]; // opens at 4:30 AM 54
    let end = stringToIntTime[close]; // closes at 8:00 PM 240 [100]
    while (start <= end) { // 54 240 55 
        times.push(intToStringTime[start]);
        start++;
    }
    console.log(times);
    return times;
}


export function getDateInFormat(date = null) {
    if (date) {
        const dete = new Date(date);
        let day = dete.getDate();
        const year = dete.getFullYear();
        let month = (dete.getMonth() + 1).toString();
        if (month.length === 1) {
          month = "0" + month;
        }
        if (day.toString().length === 1) {
            day = "0" + day;
        }
        const dateString = `${year}-${month}-${day}`;
        console.log(dateString)
        return dateString;
    }
    const dete = new Date();
    let day = dete.getDate();
    const year = dete.getFullYear();
    let month = (dete.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.toString().length === 1) {
        day = "0" + day;
    }
    const dateString = `${year}-${month}-${day}`;
    console.log(dateString)
    return dateString;
  }


  
const date = new Date();
const notificationDate = cutDay(`${date.toDateString()}, ${-convertTime(date.getHours(), date.getMinutes())}`);

export function getTimeRightAway() {
    let ampm = "";
    let hour = new Date().getHours();
    console.log(hour, "IM THE HOUR");
    if (hour > 12) {
        hour = hour - 12;
        ampm = "PM";
    }
    else {
        ampm = "AM";
    }
    let minutesArray = new Date().getMinutes().toString().split("");
    if (minutesArray.length === 2) {
        if (minutesArray[0] === "5" && minutesArray[1] > 5) {
            hour = hour + 1;
            minutesArray[0] = 0;
            minutesArray[1] = 0;
        }
        else if (minutesArray[1] > 5) {
            minutesArray[1] = "0"
            minutesArray[0] = (Number(minutesArray[0]) + 1).toString();
         } 
         else {
            minutesArray[1] = "5";
         }
    }
    else {
        if (minutesArray[0] > 5) {
            minutesArray[0] = "1"
            minutesArray[1] = "0" 
         } 
         else if (minutesArray > 0 && minutesArray < 6) {
            minutesArray[0] = "05";
         }
         else {
             minutesArray[0] = "00";
         }
    }
    let minutes = minutesArray.join("");
    if (hour === "0" || hour === 0) {
        hour = 12;
    }
    return `${hour}:${minutes} ${ampm}`

}

export const estDurationToNum = {"30 Minutes": 6, "40 Minutes": 8, "45 Minutes": 9, "50 Minutes": 10, "55 Minutes": 11, "1 Hour": 12, "1 Hour 15 Minutes": 15, "1 Hour 30 Minutes": 18, "2 Hours": 24 }

export const intToStringTime = {
    0: "12:00 AM", 1: "12:05 AM", 2: "12:10 AM", 3: "12:15 AM", 4: "12:20 AM", 5: "12:25 AM", 6: "12:30 AM", 7: "12:35 AM", 
    8: "12:40 AM", 9: "12:45 AM", 10: "12:50 AM", 11: "12:55 AM", 12: "1:00 AM", 13: "1:05 AM", 14: "1:10 AM", 15: "1:15 AM",
     16: "1:20 AM", 17: "1:25 AM", 18: "1:30 AM", 19: "1:35 AM", 20: "1:40 AM", 21: "1:45 AM", 22: "1:50 AM", 23: "1:55 AM",
      24: "2:00 AM", 25: "2:05 AM", 26: "2:10 AM", 27: "2:15 AM", 28: "2:20 AM", 29: "2:25 AM", 30: "2:30 AM", 31: "2:35 AM",
       32: "2:40 AM", 33: "2:45 AM", 34: "2:50 AM", 35: "2:55 AM", 36: "3:00 AM", 37: "3:05 AM", 38: "3:10 AM", 39: "3:15 AM",
        40: "3:20 AM", 41: "3:25 AM", 42: "3:30 AM", 43: "3:35 AM",
    44: "3:40 AM", 45: "3:45 AM", 46: "3:50 AM", 47: "3:55 AM", 48: "4:00 AM", 49: "4:05 AM", 50: "4:10 AM", 51: "4:15 AM",
    52: "4:20 AM", 53: "4:25 AM", 54: "4:30 AM", 55: "4:35 AM", 56: "4:40 AM", 57: "4:45 AM", 58: "4:50 AM", 59: "4:55 AM",
    60: "5:00 AM", 61: "5:05 AM", 62: "5:10 AM", 63: "5:15 AM", 64: "5:20 AM", 65: "5:25 AM", 66: "5:30 AM", 67: "5:35 AM",
    68: "5:40 AM", 69: "5:45 AM", 70: "5:50 AM", 71: "5:55 AM", 72: "6:00 AM", 73: "6:05 AM", 74: "6:10 AM", 75: "6:15 AM",
    76: "6:20 AM", 77: "6:25 AM", 78: "6:30 AM", 79: "6:35 AM", 80: "6:40 AM", 81: "6:45 AM", 82: "6:50 AM", 83: "6:55 AM",
    84: "7:00 AM", 85: "7:05 AM", 86: "7:10 AM", 87: "7:15 AM", 88: "7:20 AM", 89: "7:25 AM", 90: "7:30 AM", 91: "7:35 AM",
    92: "7:40 AM", 93: "7:45 AM", 94: "7:50 AM", 95: "7:55 AM", 96: "8:00 AM", 97: "8:05 AM", 98: "8:10 AM", 99: "8:15 AM", 
    100: "8:20 AM", 101: "8:25 AM", 102: "8:30 AM", 103: "8:35 AM", 104: "8:40 AM", 105: "8:45 AM", 106: "8:50 AM", 107: "8:55 AM",
     108: "9:00 AM", 109: "9:05 AM", 110: "9:10 AM", 111: "9:15 AM", 112: "9:20 AM", 113: "9:25 AM", 114: "9:30 AM", 115: "9:35 AM",
      116: "9:40 AM", 117: "9:45 AM", 118: "9:50 AM", 119: "9:55 AM", 120: "10:00 AM", 121: "10:05 AM", 122: "10:10 AM", 123: "10:15 AM",
       124: "10:20 AM", 125: "10:25 AM", 126: "10:30 AM", 127: "10:35 AM",
    128: "10:40 AM", 129: "10:45 AM", 130: "10:50 AM", 131: "10:55 AM", 132: "11:00 AM", 133: "11:05 AM", 134: "11:10 AM", 135: "11:15 AM",
     136: "11:20 AM", 137: "11:25 AM", 138: "11:30 AM", 139: "11:35 AM", 140: "11:40 AM", 141: "11:45 AM", 142: "11:50 AM", 143: "11:55 AM",
      144: "12:00 PM", 145: "12:05 PM", 146: "12:10 PM", 147: "12:15 PM", 148: "12:20 PM", 149: "12:25 PM", 150: "12:30 PM", 151: "12:35 PM", 
      152: "12:40 PM", 153: "12:45 PM", 154: "12:50 PM", 155: "12:55 PM", 156: "1:00 PM", 157: "1:05 PM", 158: "1:10 PM", 159: "1:15 PM", 160: 
      "1:20 PM", 161: "1:25 PM", 162: "1:30 PM", 163: "1:35 PM", 164: "1:40 PM", 165: "1:45 PM", 166: "1:50 PM", 167: "1:55 PM", 168: "2:00 PM",
       169: "2:05 PM", 170: "2:10 PM", 171: "2:15 PM", 172: "2:20 PM", 173: "2:25 PM", 174: "2:30 PM", 175: "2:35 PM", 176: "2:40 PM", 177: "2:45 PM",
        178: "2:50 PM", 179: "2:55 PM", 180: "3:00 PM", 181: "3:05 PM", 182: "3:10 PM", 183: "3:15 PM", 184: "3:20 PM", 185: "3:25 PM", 186: "3:30 PM",
        187: "3:35 PM", 188: "3:40 PM", 189: "3:45 PM", 190: "3:50 PM", 191: "3:55 PM", 192: "4:00 PM", 193: "4:05 PM", 194: "4:10 PM", 195: "4:15 PM",
         196: "4:20 PM", 197: "4:25 PM", 198: "4:30 PM", 199: "4:35 PM", 200: "4:40 PM", 201: "4:45 PM", 202: "4:50 PM", 203: "4:55 PM", 204: "5:00 PM",
          205: "5:05 PM", 206: "5:10 PM", 207: "5:15 PM", 208: "5:20 PM", 209: "5:25 PM", 210: "5:30 PM", 211: "5:35 PM", 212: "5:40 PM", 213: "5:45 PM",
           214: "5:50 PM", 215: "5:55 PM", 216: "6:00 PM", 217: "6:05 PM", 218: "6:10 PM", 219: "6:15 PM", 220: "6:20 PM", 221: "6:25 PM", 222: "6:30 PM",
            223: "6:35 PM", 224: "6:40 PM", 225: "6:45 PM", 226: "6:50 PM", 227: "6:55 PM", 228: "7:00 PM", 229: "7:05 PM", 230: "7:10 PM", 231: "7:15 PM",
             232: "7:20 PM", 233: "7:25 PM", 234: "7:30 PM", 235: "7:35 PM", 236: "7:40 PM", 237: "7:45 PM", 238: "7:50 PM", 239: "7:55 PM", 240: "8:00 PM", 241: "8:05 PM", 242: "8:10 PM", 243: "8:15 PM", 244: "8:20 PM", 245: "8:25 PM", 246: "8:30 PM", 247: "8:35 PM", 248: "8:40 PM", 249: "8:45 PM", 250: "8:50 PM", 251: "8:55 PM", 252: "9:00 PM", 253: "9:05 PM", 254: "9:10 PM", 255: "9:15 PM", 256: "9:20 PM", 257: "9:25 PM", 258: "9:30 PM", 259: "9:35 PM", 260: "9:40 PM", 261: "9:45 PM", 262: "9:50 PM", 263: "9:55 PM", 264: "10:00 PM", 265: "10:05 PM", 266: "10:10 PM", 267: "10:15 PM", 268: "10:20 PM", 269: "10:25 PM", 270: "10:30 PM", 271: "10:35 PM", 272: "10:40 PM", 273: "10:45 PM", 274: "10:50 PM", 275: "10:55 PM", 276: "11:00 PM",
    277: "11:05 PM", 278: "11:10 PM", 279: "11:15 PM", 280: "11:20 PM", 281: "11:25 PM", 282: "11:30 PM", 283: "11:35 PM", 284: "11:40 PM", 285: "11:45 PM", 286: "11:50 PM", 287: "11:55 PM"
}

export const timeDurationStringToInt = {
    "5 Minutes": 1, "10 Minutes": 2, "15 Minutes": 3, "20 Minutes": 4, "25 Minutes": 5, "30 Minutes": 6, "35 Minutes": 7, "40 Minutes": 8, "45 Minutes": 9, "50 Minutes": 10, "55 Minutes": 11, "1 Hour": 12, "1 Hour 15 Minutes": 15, "1 Hour 30 Minutes": 18, "1 Hour 45 Minutes": 21, "2 Hours": 24 }

export const timeDurationIntToString = {
    1: "5 Minutes", 2: "10 Minutes", 3: "15 Minutes", 4: "20 Minutes", 5: "25 Minutes", 6: "30 Minutes", 7: "35 Minutes", 8: "40 Minutes", 9: "45 Minutes", 10: "50 Minutes", 11: "55 Minutes", 12: "1 Hour", 15: "1 Hour 15 Minutes", 18: "1 Hour 30 Minutes", 21: "1 Hour 45 Minutes", 24: "2 Hours" 
}

export const fixTime = {
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

export function removeDollarSign(cost) {
    let costIntoArray = cost.split("");
    let newArray = costIntoArray.filter(e => e !== "$");
    return parseFloat(newArray.join(""));
}

export function addDollarSign(cost) {
    return `$${cost}`;
}

export function getTime() {
    const date = new Date();
    let time = "";
    let hour = "";
    let minute = date.getMinutes();
    let raiseHour = false;
    let dontRaise;
    if (minute === 0 || minute === "00") {
       dontRaise = true;
    }
    while (minute % 5 !== 0) {
        minute++;
    }
    if (minute === 60) {
        minute = "00";
    }
    if (minute === 0 || minute === "00") {
        minute = "00";
        raiseHour = true;
    }
    if (minute === 5) {
        minute = "05";
    }
    let ampm = "";
    console.log(date.getHours());
    if (date.getHours() === "0") {
        hour = 12;
        ampm = "AM";
    }
    else if (date.getHours() === 1) {
        hour = 1;
        ampm = "AM";
    }
    else if (date.getHours() === 2) {
        hour = 2;
        ampm = "AM";
    }
    else if (date.getHours() === 3) {
        hour = 3;
        ampm = "AM";
    }
    else if (date.getHours() === 4) {
        hour = 4;
        ampm = "AM";
    }
    else if (date.getHours() === 5) {
        hour = 5;
        ampm = "AM";
    }
    else if (date.getHours() === 6) {
        hour = 6;
        ampm = "AM";
    }
    else if (date.getHours() === 7) {
        hour = 7;
        ampm = "AM";
    }
    else if (date.getHours() === 8) {
        hour = 8;
        ampm = "AM";
    }
    else if (date.getHours() === 9) {
        hour = 9;
        ampm = "AM";
    }
    else if (date.getHours() === 10) {
        hour = 10;
        ampm = "AM";
    }
    else if (date.getHours() === 11) {
        hour = 11;
        ampm = "AM";
    }
    else if (date.getHours() === 12) {
        hour = 12;
        ampm = "PM";
    }
    else if (date.getHours() === 13) {
        hour = 1;
        ampm = "PM";
    }
    else if (date.getHours() === 14) {
        hour = 2;
        ampm = "PM";
    }
    else if (date.getHours() === 15) {
        hour = 3;
        ampm = "PM";
    }
    else if (date.getHours() === 16) {
        hour = 4;
        ampm = "PM";
    }
    else if (date.getHours() === 17) {
        hour = 5;
        ampm = "PM";
    }
    else if (date.getHours() === 18) {
        hour = 6;
        ampm = "PM";
    }
    else if (date.getHours() === 19) {
        hour = 7;
        ampm = "PM";
    }
    else if (date.getHours() === 20) {
        hour = 8;
        ampm = "PM";
    }
    else if (date.getHours() === 21) {
        hour = 9;
        ampm = "PM";
    }
    else if (date.getHours() === 22) {
        hour = 10;
        ampm = "PM";
    }
    else if (date.getHours() === 23) {
        hour = 11;
        ampm = "PM";
    }
    if (hour !== 12 && !dontRaise && raiseHour) {
        hour++;
    }
    if (hour === 12 && !dontRaise && raiseHour) {
        hour = 1;
    }
    if (hour === 11 && raiseHour && !dontRaise && ampm === "PM") {
        ampm = "AM";
    }
    if (hour === 11 && raiseHour && !dontRaise && ampm === "AM") {
        ampm = "PM";
    }
    time = `${hour}:${minute} ${ampm}`
    return time;
}

export function getTs(open, close) {
    const times = [];
    let current = stringToIntTime[getTime()];
    if (current > stringToIntTime[open] && current < stringToIntTime[close]) {
        for (let i = current; i < stringToIntTime[close]; i++ ) {
            times.push(i);
        }
    }
    else {
        for (let i = stringToIntTime[open]; i < stringToIntTime[close]; i++) {
            times.push(i);
        }
    }
    return times;
}




export function convertShiftTimes(numberTime) {
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

export function shiftCalcTime(num) {
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

export function getNum(width, height) {
    if (width === 50 || height === 50) {
        return 2;
    }
    else if (width === 65 || height === 65) {
        return 4;
    }
    else if (width === 80 || height === 80) {
        return 6;
    }
    else if (width === 95 || height === 95) {
        return 8;
    }
    else if (width === 110 || height === 110) {
        return 10;
    }
    else if (width === 125 || height === 125) {
        return 12;
    }
    else if (width === 140 || height === 140) {
        return 14;
    }
    else if (width === 155 || height === 155) {
        return 16;
    }
    else if (width === 170 || height === 170) {
        return 18;
    }
    else if (width === 185 || height === 185) {
        return 20;
    }
}



export function convertTime(hour, minute) {
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
    return time;
}

export function getStringDateTime(time, day) {
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

export function getBookingTimesAsInt(time) {
    let start = time.split("-")[0];
    let end = time.split("-")[1];
    return {start, end}
}

export function getNumsFromTimes(time) {
    let start = stringToIntTime[getBookingTimesAsInt(time).start];
    const end = stringToIntTime[getBookingTimesAsInt(time).end];
    
    let nums = [];
    while (start < end) {
        nums.push(start);
        start++;
    }
    return nums;
}


export const timesArray = ["30 Minutes", "40 Minutes", "45 Minutes", "50 Minutes", "55 Minutes", "1 Hour", "1 Hour 15 Minutes", "1 Hour 30 Minutes", "1 Hour 45 Minutes", "2 Hours" ]

export function cutDay(date) {
    let dateArray = date.split(" ");
    return dateArray[1] + " " + dateArray[2] + " " + dateArray[3] + " " + dateArray[4] + " " + dateArray[5]
}

export function milisToDays(milis) {
    return milis / 1000 / 60 / 60 / 24;
}

export function daysToMilis(days) {
    return days * 24 * 60 * 60 * 1000;
}

export function convertNumToStringDollars(num) {
    num = Math.round((num + Number.EPSILON) * 100) / 100
    let numString = num.toString();
    let numArray = numString.split(".");
    if (numArray.length > 1) {
        if (numArray[1].length === 2) {
            return `$${num}`
        }
        else if (numArray[1].length === 1) {
            return `$${num}0`
        }
    }
    else if (numArray.length === 1) {
        return `$${num}.00`
    }
}

export function removeComma(num) {
    return Number(num.toString().split("").filter(e => e !== ",").join(""));
}

export function removeAndRound(num) {
    // let numArray = num.toString().split("");
    // let index = numArray.findIndex(e => e === ".");
    // let lastNum;
    // let answer = numArray.filter((e, i) => {
    //     if (i === index + 2) {
    //        if (numArray[i + 1] > 4) {
    //            console.log(e);
    //            e = Number(e) + 1;
    //            e = e.toString();
    //            lastNum = e;
    //            console.log(lastNum)
    //        }
    //     }
    //     return i <= index + 2;
    // })

    // if (answer[answer.length - 1] !== lastNum && lastNum !== undefined) {
    //     answer[answer.length - 1] = lastNum;
    // }
    // return Number(answer.join(""));
    num = Math.round((num + Number.EPSILON) * 100) / 100;
    let numArray = num.toString().split(".");
    console.log(numArray)
    if (numArray.length > 1) {
        if (numArray[1].length === 1) {
            numArray[1] = numArray[1] + "0";
        }
    }
    else {
        numArray.push("00")
    }
    num = numArray.join(".");
    return num;
}

export function createNumList(list) {
    let str = "";
    let i = 0;
    while (i < list.length) {
        if (i === list.length - 1) {
            str += "20px"
        }
        else {
            str += `$20px `;
        }
        i++;
        
    }
    return str;
}

export function createGridList(list) {
    let str = "";
    let i = 0;
    while (i < list.length) {
        if (i === list.length - 1) {
            str += `${list[i].fullName.length * 10}px`;
        }
        else {
            str += `${list[i].fullName.length * 10}px `;
        }
        i++;
        
    }
    return str;
}

export function createGridList2(list) {
    let str = "";
    let i = 0;
    if (list) {
        while (i < list.length) {
            if (i === list.length - 1) {
                const num = 30 - list[i].length;
                str += `${list[i].length * num}px`;
            }
            else {
                const num = 30 - list[i].length;
                str += `${list[i].length * num}px `;
            }
            i++;
            
        }
    }
    return str;
}

    export function createMaplist(arrayOfObjects, displayedName) {
        if (arrayOfObjects.length > 0) {
        const newArray = [];
        for (let i = 0; i < arrayOfObjects.length; i++) {
            let obj = {"displayName": arrayOfObjects[i][displayedName], id: arrayOfObjects[i]["_id"]};
            newArray.push(obj);
        }
        return newArray;
        }
    }
    
    export function createMaplistElement(object, displayName) {
        return {"displayName": object[displayName], id: object["_id"]}
    }



    export function badTimes(time1, time2) {
        console.log("DO I NOT WORK")
    if (stringToIntTime[time1] >= stringToIntTime[time2]) {
        console.log("huh")
       return true;
    }
    else {
        return false;
    }
}




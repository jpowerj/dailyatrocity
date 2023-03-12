import dayjs from "dayjs";

export const monthAbbrMap: {[key:number]: string} = {
    1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr',
    5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug',
    9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec',
}
export const getMonthAbbr = (monthNum: number) => {
    return monthAbbrMap[monthNum];
}
// Put the thing down, flip it, reverse it
const monthNumEntries = Object.entries(monthAbbrMap).map(
    (elts) => {
        return [elts[1], parseInt(elts[0])];
    }
);
export const monthNumMap = Object.fromEntries(monthNumEntries);
export const getMonthNum = (monthAbbr: string) => {
    return monthNumMap[monthAbbr];
}
export const daysInMonth: {[key:string]: number} = {
    'Jan': 31, 'Feb': 29, 'Mar': 31, 'Apr': 30,
    'May': 31, 'Jun': 30, 'Jul': 31, 'Aug': 31,
    'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31,
}
export const allMonthAbbrs = Object.keys(daysInMonth);
export const getDaysInMonth = (monthStr: string) => {
    return daysInMonth[monthStr];
}

// Formatting
export const getTitleStr = (monthAbbr: string, day: number) => {
    return getFullMonth(monthAbbr) + ' ' + String(day);
}

export const constructDate = (monthAbbr: string, day: number) => {
    // Construct dayJs object
    const monthNum = getMonthNum(monthAbbr) - 1;
    const dateObj = dayjs(new Date(2023, monthNum, day));
    return dateObj;
}

export const fullMonthMap: {[key:string]: string} = {
    'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
    'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
    'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December',
}
export const getFullMonth = (monthAbbr: string) => {
    return fullMonthMap[monthAbbr];
}

export const getNextDay = (curMonthAbbr: string, curDay: number) => {
    const dateObj = constructDate(curMonthAbbr, curDay);
    //console.log("start: " + dateObj.toString());
    const nextObj = dateObj.add(1, 'day');
    //console.log("nextObj: " + nextObj.toString());
    const nextObjMonth = nextObj.format('MMM');
    const nextObjDay = nextObj.get('D');
    return {
        nextDayLabel: getTitleStr(nextObjMonth, nextObjDay),
        nextDayLink: nextObjMonth + "/" + nextObjDay,
    }
}

export const getPrevDay = (curMonthAbbr: string, curDay: number) => {
    const dateObj = constructDate(curMonthAbbr, curDay);
    const prevObj = dateObj.subtract(1, 'day');
    const prevObjMonth = prevObj.format('MMM');
    const prevObjDay = prevObj.get('D');
    return {
        prevDayLabel: getTitleStr(prevObjMonth, prevObjDay),
        prevDayLink: prevObjMonth + "/" + prevObjDay,
    }
}
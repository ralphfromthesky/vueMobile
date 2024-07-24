export function DateToStr(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    const strDate = Y + M + D + h + m + s;
    return strDate;
}

import { getDatetoday, lastMonth, getdatYesturday, thisWeek, thisMonth, lastWeek, getToday, getYesterday, getBefore } from "./dateRanges.js";

export const initialDate =
{
    startDate: getDatetoday()[0],
    endDate: getDatetoday()[1],
    customDate: false,
    actionType: "1"
};

export const initialMonth =
{
    startDate: thisMonth()[0],
    endDate: thisMonth()[1],
    customDate: false,
    actionType: "5"
};

export const initialWeek =
{
    startDate: thisWeek()[0],
    endDate: thisWeek()[1],
    customDate: false,
    actionType: "3"
};

export const initialPromoOverViewDate =
{
    startDate: getToday()[0],
    customDate: false,
};

export function dateReducer(state, action) {
    switch (action.type) {
        case "1":
            return { ...state, startDate: getDatetoday()[0], endDate: getDatetoday()[1] };
        case "2":
            return { ...state, startDate: getdatYesturday()[0], endDate: getdatYesturday()[1] };
        case "3":
            return { ...state, startDate: thisWeek()[0], endDate: thisWeek()[1] };
        case "4":
            return { ...state, startDate: lastWeek()[0], endDate: lastWeek()[1] };
        case "5":
            return { ...state, startDate: thisMonth()[0], endDate: thisMonth()[1] };
        case "6":
            return { ...state, startDate: lastMonth()[0], endDate: lastMonth()[1] };
        case "7":
            return { ...state, customDate: true };
        case "8":
            return { ...state, customDate: false };
        case "9":
            return { ...state, startDate: action.dates.startD, endDate: action.dates.endD, customDate: false };
        case "10":
            return { ...state, startDate: getToday()[0] };
        case "11":
            return { ...state, startDate: getYesterday()[0] };
        case "12":
            return { ...state, startDate: getBefore()[0] };
        default:
            return state;
    }
}

// export const lastMonths = {}
// export const lastWeeks = {}
// export const yesterday = {}


export const lastMonths = {
    startDate: lastMonth()[0], 
    endDate: lastMonth()[1],
    customDate: false,
    actionType: "3"
}

export const lastWeeks =  {
    startDate: lastWeek()[0], 
    endDate: lastWeek()[1],
    customDate: false,
    actionType: "3"
}

export const yesterday =  {
    startDate: getYesterday()[0],
    endDate: getYesterday()[1],
    customDate: false,
    actionType: "1"
}




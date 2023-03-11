import Airtable from 'airtable';
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});
var atBase = Airtable.base('appB65E88uyv4LfKp');
var eventTableName = 'Events';

import { getMonthAbbr } from '../../daGlobals';

export async function getEventsDay(month: number, day: number) {
    // Construct date string
    const dateStr = getMonthAbbr(month) + "_" + String(day);
    const dateFormula = "{date} = '" + dateStr + "'";
    //console.log("dateFormula: " + dateFormula);
    let results = await atBase(eventTableName).select({
        //fields: chronFields,
        //sort: [{ field: "entry_id", direction: "asc" }],
        filterByFormula: dateFormula,
    }).all();
    let resultsFields = results.map((x: any) => x.fields);
    //console.log(resultsFields);
    return resultsFields;
}

export async function getNumEventsDay(month: number, day: number) {
    // Construct date string
    const dateStr = getMonthAbbr(month) + "_" + String(day);
    const dateFormula = "{date} = '" + dateStr + "'";
    //console.log("dateFormula: " + dateFormula);
    let results = await atBase(eventTableName).select({
        fields: ['id'],
        //sort: [{ field: "entry_id", direction: "asc" }],
        filterByFormula: dateFormula,
    }).all();
    let resultsFields = results.map((x: any) => x.fields);
    //console.log(resultsFields);
    return resultsFields.length;
}

export async function getEventsOne(month: number, day: number, dayIndex: number) {
    // Construct date string
    const dateStr = getMonthAbbr(month) + "_" + String(day);
    const dateFormula = `AND({date} = '${dateStr}', {day_index}=${dayIndex})`;
    //console.log("dateFormula: " + dateFormula);
    let results = await atBase(eventTableName).select({
        //fields: chronFields,
        //sort: [{ field: "entry_id", direction: "asc" }],
        filterByFormula: dateFormula,
    }).all();
    let resultsFields = results.map((x: any) => x.fields);
    // Should only be ONE result!
    let uniqueResult = resultsFields[0];
    //console.log(resultsFields);
    return uniqueResult;
}

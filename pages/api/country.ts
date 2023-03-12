import _ from 'lodash';
import Airtable from 'airtable';
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});
var atBase = Airtable.base('appB65E88uyv4LfKp');
var eventTableName = 'Countries';

export async function getEventsPerCountry() {
    // Construct date string
    //console.log("dateFormula: " + dateFormula);
    let results = await atBase(eventTableName).select({
        //fields: chronFields,
        sort: [{ field: "num_events", direction: "desc" }],
    }).all();
    let resultsFields = results.map((x: any) => x.fields);
    // Sum to get totals
    const total = _.sumBy(resultsFields, 'num_events');
    return {
        countryData: resultsFields,
        numCountriesTotal: resultsFields.length,
        numEventsTotal: total,
    }
}

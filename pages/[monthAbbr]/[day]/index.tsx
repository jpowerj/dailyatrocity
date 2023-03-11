import DayDisplay from '@/components/DayDisplay';
import dayjs from 'dayjs';
import { getMonthNum, getTitleStr, constructDate, allMonthAbbrs, getDaysInMonth } from '@/daGlobals';
import Head from 'next/head';
import { getEventsDay } from '@/pages/api/event';
import _ from 'lodash';
import { remark } from 'remark';
import html from 'remark-html';

export const getStaticProps = async (context: any) => {
    const monthParam = context.params.monthAbbr;
    const dayParam = context.params.day;
    const monthNum = getMonthNum(monthParam);
    const dayNum = parseInt(dayParam);
    const eventData = await getEventsDay(monthNum, dayNum);
    const descHtml: any[] = [];
    // Use remark to convert markdown into HTML string
    for (let i = 0; i < eventData.length; i++) {
        const curEvent = eventData[i];
        const curDescRaw = curEvent.description;
        const curDescProcessed = await remark()
            .use(html)
            .process(curEvent.description);
        const curDescHtml = curDescProcessed.toString();
        descHtml.push(curDescHtml);
    }
    return {
        props: {
            monthAbbr: monthParam,
            day: dayParam,
            eventData: eventData,
            descHtml: descHtml,
        }
    }
}

export const getStaticPaths = async () => {
    let allPages: any[] = [];
    for (let i = 0; i < allMonthAbbrs.length; i++) {
        const curMonthAbbr = allMonthAbbrs[i];
        const daysInMonth = getDaysInMonth(curMonthAbbr);
        const monthDays = _.range(1,daysInMonth)
        const monthPages = monthDays.map((item: number) => {
            return {
                params: {
                    monthAbbr: curMonthAbbr,
                    day: String(item),
                },
            }
        });
        allPages.push(...monthPages);
    }
    console.log(allPages);
    const returnObj = {
        paths: allPages,
        fallback: false, // can also be true or 'blocking'
    };
    //console.log("[entryId].tsx, returnObj:");
    //console.log(JSON.stringify(returnObj));
    return returnObj;
}

const DayPage = ({ monthAbbr, day, eventData, descHtml }: { monthAbbr: string, day: number, eventData: any, descHtml: any }) => {
    return (
        <div className="container">
            <Head>
                <title>DailyAtrocity.US | {getTitleStr(monthAbbr, day)}</title>
            </Head>
            <DayDisplay monthAbbr={monthAbbr} day={day} isToday={false} eventData={eventData} descHtml={descHtml} />
        </div>
    );
}

export default DayPage;
import dayjs from 'dayjs';
import { getEventsDay } from './api/event';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import moveBombing from '../public/move_bombing.jpg'
import DayDisplay from '@/components/DayDisplay';
import { getMonthAbbr } from '@/daGlobals';
import { remark } from 'remark';
const inter = Inter({ subsets: ['latin'] });
import html from 'remark-html';

export const getStaticProps = async (context: any) => {
    const date = useDate();
    const monthNum = parseInt(date.format('M'));
    const monthAbbr = getMonthAbbr(monthNum);
    const day = parseInt(date.format('D'));
    const eventData = await getEventsDay(monthNum, day);
    const descHtml: any[] = [];
    // Use remark to convert markdown into HTML string
    for (let i = 0; i < eventData.length; i++) {
        const curEvent = eventData[i];
        const curDescProcessed = await remark()
            .use(html)
            .process(curEvent.description);
        const curDescHtml = curDescProcessed.toString();
        descHtml.push(curDescHtml);
    }
    return {
        props: {
            monthAbbr: monthAbbr,
            day: day,
            eventData: eventData,
            descHtml: descHtml,
        }
    }
}

const useDate = () => {
    return dayjs()
}

const HomePage = ({monthAbbr, day, eventData, descHtml}: {monthAbbr: string, day: number, eventData: any, descHtml: any}) => {
    const date = useDate();
    return (
        <div className="container">
            <Head>
                <title>DailyAtrocity.US</title>
            </Head>
            <main>
                <DayDisplay monthAbbr={monthAbbr} day={day} isToday={true} eventData={eventData} descHtml={descHtml} />
            </main>
        </div>
    );
}

export default HomePage;

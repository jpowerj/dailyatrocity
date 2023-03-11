import { allMonthAbbrs, getDaysInMonth, getFullMonth, getMonthNum } from "@/daGlobals";
import { getEventsDay, getEventsOne, getNumEventsDay } from "@/pages/api/event";
import Head from "next/head";
import { remark } from "remark";
import html from 'remark-html';
import _ from 'lodash';
import EventDescription from "@/components/EventDescription";
import ColorTitle from '@/components/ColorTitle';
import { Card, Group, ScrollArea, Text } from "@mantine/core";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";

export const getStaticProps = async (context: any) => {
    const monthParam = context.params.monthAbbr;
    const dayParam = context.params.day;
    const dayIndexParam = context.params.dayIndex;
    const dayIndexNum = parseInt(dayIndexParam);
    const monthNum = getMonthNum(monthParam);
    const dayNum = parseInt(dayParam);
    const curEventData = await getEventsOne(monthNum, dayNum, dayIndexParam);
    const curDescProcessed = await remark()
            .use(html)
            .process(curEventData.description);
    const curDescHtml = curDescProcessed.toString();
    return {
        props: {
            monthAbbr: monthParam,
            day: dayParam,
            dayIndex: dayIndexParam,
            curEventData: curEventData,
            curDescHtml: curDescHtml,
        }
    }
}

const getDayPages = (curMonthAbbr: string, curDayNum: number) => {
    // Find how many events on this day
    const numEventsDay = getNumEventsDay(getMonthNum(curMonthAbbr), curDayNum);
    const dayEventIds = _.range(1, numEventsDay);
    const dayEventPages = dayEventIds.map((curEventId: number) => {
        return {
            params: {
                monthAbbr: curMonthAbbr,
                day: String(curDayNum),
                dayIndex: String(curEventId),
            }
        }
    });
    return dayEventPages;
}

export const getStaticPaths = async () => {
    let allPages: any[] = [];
    for (let i = 0; i < allMonthAbbrs.length; i++) {
        const curMonthAbbr = allMonthAbbrs[i];
        const daysInMonth = getDaysInMonth(curMonthAbbr);
        const monthDays = _.range(1, daysInMonth).map((item: number) => item + 1);
        let allMonthPages: any[] = [];
        for (let j = 0; j < monthDays.length; j++) {
            const curDayNum = monthDays[j];
            const dayPages = getDayPages(curMonthAbbr, curDayNum);
            allMonthPages.push(...dayPages);
        }
        allPages.push(...allMonthPages);
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

const EventDetailsPage = ({ monthAbbr, day, dayIndex, curEventData, curDescHtml }: {monthAbbr: string, day: number, dayIndex: number, curEventData: any, curDescHtml: any}) => {
    const constructHref = (dayIndex: number) => {
        return "/" + monthAbbr + "/" + String(day) + "/" + String(dayIndex);
    }
    return (
        <div className="container">
            <Head>
                <title>DailyAtrocity.US | Event Details</title>
            </Head>
            <main>
                <h1 className="title">
                    <Link href="/"><ColorTitle /></Link>
                </h1>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <Card withBorder radius="lg" shadow="sm" style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position="apart" style={{ width: '100%' }}>
                                <Text size="lg" weight={600}>{getFullMonth(monthAbbr)}&nbsp;{day}, {curEventData.year}: {curEventData.header}</Text>
                                <Text size="xl">{curEventData.place_icon}</Text>
                            </Group>
                        </Card.Section>
                        <Card.Section withBorder px="xs" py="xs" style={{ paddingTop: '2px', paddingBottom: '5px', flexGrow: 1 }}>
                            <ScrollArea h={300} style={{ width: '100%' }}>
                                <EventDescription descHtml={curDescHtml} />
                            </ScrollArea>
                        </Card.Section>
                        <Card.Section withBorder inheritPadding py="xs">
                            <b>Source</b>: {curEventData.source1_author}, <i><a href={curEventData.source1_link} target="_blank" rel="noopener noreferrer">{curEventData.source1_name}</a></i>, {curEventData.source1_info}
                        </Card.Section>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default EventDetailsPage;
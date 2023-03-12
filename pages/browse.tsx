import dayjs from 'dayjs';
import { getEventsDay } from './api/event';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import React, { useState } from 'react';
import { ActionIcon, Button, Card, Grid, Group, rem, SimpleGrid, Text, Title } from '@mantine/core';
import useFitText from 'use-fit-text';
import Link from 'next/link';
import { ExternalLink } from 'tabler-icons-react';
import { DatePicker } from '@mantine/dates';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import multiMonthPlugin from '@fullcalendar/multimonth'
import HeaderComponent from '@/components/Header';
import { useRouter } from 'next/router';
import { getMonthAbbr } from '@/daGlobals';
import ColorTitle from '@/components/ColorTitle';

export const getStaticProps = async (context: any) => {
    const date = dayjs();
    const eventData = await getEventsDay(parseInt(date.format('M')), parseInt(date.format('D')));
    return {
        props: {
            eventData: eventData
        }
    }
}

export default function HomePage({ eventData }) {
    const router = useRouter();
    return (
        <div className="browse-container">
            <div className="title-container">
            <Title style={{ paddingBottom: '12px' }}>
                <Link href="/" style={{ textDecoration: 'none' }}><ColorTitle size="h1" order={1} /></Link>
            </Title>
            </div>
            <div className="cal-container">
            <FullCalendar
                plugins={[multiMonthPlugin, interactionPlugin]}
                initialView="multiMonthYear"
                headerToolbar={false}
                contentHeight="auto"
                selectable={true}
                dateClick={function(info) {
                    console.log('Clicked on: ' + info.dateStr);
                    // change the day's background color just for fun
                    //info.dayEl.style.backgroundColor = 'red';
                    const dateStrElts = info.dateStr.split("-"); //y,m,d
                    const dateStrMonthNum = parseInt(dateStrElts[1]);
                    const dateStrMonthStr = getMonthAbbr(dateStrMonthNum);
                    const dateStrDay = parseInt(dateStrElts[2]);
                    const dateStrParsed = dateStrMonthStr + "/" + dateStrDay;
                    router.push(dateStrParsed);
                }}
                eventMouseEnter={function(info) {
                    console.log("mouseenter");
                }}
                multiMonthMinWidth={300}
            />
            </div>
        </div>
    );
}

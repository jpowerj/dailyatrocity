import React from 'react';
import { ActionIcon, Button, Card, Grid, Group, Paper, rem, ScrollArea, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { ExternalLink } from 'tabler-icons-react';
import { getFullMonth, getNextDay, getPrevDay } from '@/daGlobals';
import ColorTitle from './ColorTitle';
import { remark } from 'remark';
import html from 'remark-html';
import EventDescription from './EventDescription';
import { useRouter } from 'next/router';
import LinkButton from './LinkButton';
import { ChartBar } from 'tabler-icons-react';
import { InfoCircle } from 'tabler-icons-react';
import { ArrowNarrowLeft } from 'tabler-icons-react';
import Header from './Header';

const DayDisplay = ({ eventData, monthAbbr, day, isToday, descHtml }: { eventData: any, monthAbbr: string, day: number, isToday: boolean, descHtml: any }) => {
    //console.log("[DayDisplay] " + monthAbbr);
    // Figure out the col spans for base cases
    const numEvents = eventData.length;
    const eventSpan = numEvents < 3 ? 6 : 4;
    const router = useRouter();
    const constructHref = (dayIndex: number) => {
        return "/" + monthAbbr + "/" + String(day) + "/" + String(dayIndex);
    }
    const { prevDayLabel, prevDayLink } = getPrevDay(monthAbbr, day);
    const { nextDayLabel, nextDayLink } = getNextDay(monthAbbr, day);
    const genWikiLink = (linkUrl: string) => {
        return (
            <span><b>Read More: </b><a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkUrl}</a></span>
        );
    };
    const genSourceLink = (author:string, sourceName: string, sourceInfo: string, linkUrl: string) => {
        return (
            <span><b>Source: </b>{(author !== undefined) && `${author}, `}<i><a href={linkUrl} target="_blank" rel="noopener noreferrer">{sourceName}</a></i>{(sourceInfo !== undefined && `, ${sourceInfo}`)}</span>
        )
    }
    return (
        <div className="day-container">
            <Header isToday={isToday} />
            <Paper className="day-nav" pl="sm" pr="sm" pb="md">
                <div style={{ float: 'left', width: '33.33%', textAlign: 'left', alignSelf: 'flex-end' }}>
                    <Link href={`../${prevDayLink}`}>&larr; {prevDayLabel}</Link>
                </div>
                <div style={{ fontSize: '1.5rem', width: '33.33%', textAlign: 'center', alignSelf: 'flex-end' }}>
                    On{isToday ? " this day, " : " "}{getFullMonth(monthAbbr)}&nbsp;{String(day)}...
                </div>
                <div style={{ float: 'right', width: '33.33%', textAlign: 'right', alignSelf: 'flex-end' }}>
                    <Link href={`../${nextDayLink}`}>{nextDayLabel} &rarr;</Link>
                </div>
            </Paper>

            <Grid className="event-grid" justify="center" align="stretch" gutter={5} style={{ paddingBottom: '12px', width: '100%', margin: 'auto' }} grow>
                {eventData.map((curEvent: any, eventIndex: number) => {
                    const curDescHtml = descHtml[eventIndex];
                    return (
                        <Grid.Col span={eventSpan} className="event-details" key={curEvent.id} style={{ minHeight: rem(80), width: '100%' }}>
                            <Card withBorder radius="lg" shadow="sm" style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Group position="apart" style={{ width: '100%' }} noWrap>
                                        <Text size="lg" weight={600}>{curEvent.year}: {curEvent.header}</Text>
                                        <Group className="loc-icons" spacing={3}>
                                        {curEvent.hasOwnProperty("place_icon") && curEvent.where.map((curLoc: any, locIndex: number) => (
                                            <Tooltip label={"Location: " + curEvent.where_names[locIndex]} withArrow key={locIndex}>
                                                <Text size="xl" className="loc-icon">{curEvent.place_icon[locIndex]}</Text>
                                            </Tooltip>
                                        ))}
                                        </Group>
                                    </Group>
                                </Card.Section>
                                <Card.Section withBorder px="xs" py="xs" style={{ paddingTop: '2px', paddingBottom: '5px', flexGrow: 1 }}>
                                    <ScrollArea.Autosize mih="25vh" mah="30vh" style={{ width: '100%' }}>
                                        <EventDescription descHtml={curDescHtml} />
                                    </ScrollArea.Autosize>
                                </Card.Section>
                                <Card.Section withBorder inheritPadding py="xs">
                                    {curEvent.source1_type === "Wikipedia"
                                    ? genWikiLink(curEvent.source1_link) : genSourceLink(curEvent.source1_author, curEvent.source1_name, curEvent.source1_info, curEvent.source1_link)}
                                </Card.Section>
                                {curEvent.hasOwnProperty("source2_type") &&
                                    <Card.Section withBorder inheritPadding py="xs">
                                        {curEvent.source2_type === "Wikipedia" ?
                                            genWikiLink(curEvent.source2_link) : genSourceLink(curEvent.source2_author, curEvent.source2_name, curEvent.source2_info, curEvent.source2_link)}
                                    </Card.Section>
                                }
                                <Card.Section withBorder inheritPadding py="xs">
                                    <LinkButton
                                        isDisabled={false}
                                        href={constructHref(curEvent.day_index)}
                                        buttonOnClick={(event: any) => {
                                            console.log("button");
                                        }}
                                    >
                                        <Text>More Details</Text>
                                    </LinkButton>
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                    );
                })}
            </Grid>
            <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
                <Link href="/browse"><Text size="xl">Browse other dates...</Text></Link>
            </div>
        </div>
    );
}

export default DayDisplay;

{/* <Button
                                      style={{ width: '100%' }}
                                      rightIcon={<ExternalLink size="1.125rem" />}
                                      onClick={(event: any) => {
                                        console.log("Button clicked, current page = " + currentPage);
                                        if (typeof window !== 'undefined') {
                                            console.log("Setting localStorage: " + pageVar + " = " + currentPage);
                                            window.localStorage.setItem(pageVar, currentPage);
                                            if (selectedFilter !== null && filterVar !== null) {
                                                console.log("Setting localStorage: filterVar (" + filterVar + ") = " + selectedFilter);
                                                window.localStorage.setItem(filterVar, selectedFilter);
                                            }
                                            return true;
                                        }
                                    }}
                                    > */}
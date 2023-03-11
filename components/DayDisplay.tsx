import React from 'react';
import { ActionIcon, Button, Card, Grid, Group, rem, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import Link from 'next/link';
import { ExternalLink } from 'tabler-icons-react';
import { getFullMonth } from '@/daGlobals';
import ColorTitle from './ColorTitle';
import { remark } from 'remark';
import html from 'remark-html';
import EventDescription from './EventDescription';
import { useRouter } from 'next/router';
import LinkButton from './LinkButton';

const DayDisplay = ({ eventData, monthAbbr, day, isToday, descHtml }: { eventData: any, monthAbbr: string, day: number, isToday: boolean, descHtml: any }) => {
    console.log("[DayDisplay] " + monthAbbr);
    // Figure out the col spans for base cases
    const numEvents = eventData.length;
    const eventSpan = numEvents < 3 ? 6 : 4;
    const router = useRouter();
    const constructHref = (dayIndex: number) => {
        return "/" + monthAbbr + "/" + String(day) + "/" + String(dayIndex);
    }
    return (
        <main>
            <h1 className="title">
                {isToday
                 ? <ColorTitle />
                 : <Link href="/"><ColorTitle /></Link>
                }
            </h1>

            <p style={{ fontSize: '1.5rem', textAlign: 'center', paddingBottom: '12px' }}>
                On{isToday ? " this day, " : " "}{getFullMonth(monthAbbr)}&nbsp;{String(day)}...
            </p>

            <Grid className="event-grid" justify="center" align="stretch" style={{ paddingBottom: '12px' }}>
                {eventData.map((curEvent: any, eventIndex: number) => {
                    const curDescHtml = descHtml[eventIndex];
                    return (
                        <Grid.Col span={eventSpan} className="event-details" key={curEvent.id} style={{ minHeight: rem(80) }}>
                            <Card withBorder radius="lg" shadow="sm" style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Group position="apart" style={{ width: '100%' }}>
                                        <Text size="lg" weight={600}>{curEvent.year}: {curEvent.header}</Text>
                                        <Text size="xl">{curEvent.place_icon}</Text>
                                    </Group>
                                </Card.Section>
                                <Card.Section withBorder px="xs" py="xs" style={{ paddingTop: '2px', paddingBottom: '5px', flexGrow: 1 }}>
                                    <ScrollArea h={300} style={{ width: '100%' }}>
                                        <EventDescription descHtml={curDescHtml} />
                                    </ScrollArea>
                                </Card.Section>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <b>Source</b>: {curEvent.source1_author}, <i><a href={curEvent.source1_link} target="_blank" rel="noopener noreferrer">{curEvent.source1_name}</a></i>, {curEvent.source1_info}
                                </Card.Section>
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
            <div style={{ textAlign: 'center' }}>
                <Link href="/browse"><Text size="xl">Browse other dates...</Text></Link>
            </div>
        </main>
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
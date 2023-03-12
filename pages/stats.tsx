import CountryTable from "@/components/CountryTable";
import Header from "@/components/Header";
import YearGraph from "@/components/YearGraph";
import { Card, Grid, Group, rem, ScrollArea, Table, Text } from "@mantine/core";
import Head from "next/head";
import { getEventsPerCountry } from "./api/country";
import { getEventsPerDecade } from "./api/event";


export const getStaticProps = async (context: any) => {
    const { countryData, numCountriesTotal, numEventsTotal } = await getEventsPerCountry();
    const yearData = await getEventsPerDecade();
    return {
        props: {
            countryData: countryData,
            numEventsTotal: numEventsTotal,
            numCountriesTotal: numCountriesTotal,
            yearData: yearData,
        }
    }
}

const StatsPage = ({ countryData, numEventsTotal, numCountriesTotal, yearData }: { countryData: any, numEventsTotal: number, numCountriesTotal: number, yearData: any }) => {
    return (
        <div className="container">
            <Head>
                <title>DailyAtrocity.US | Statistics</title>
            </Head>
            <main>
                <div className="day-container">
                    <Header isToday={false} />
                    <Grid className="event-grid" justify="center" align="stretch" gutter={5} style={{ paddingBottom: '12px', width: '100%', margin: 'auto' }} grow>
                        <Grid.Col span={4} className="event-details" key="country" style={{ minHeight: rem(80), width: '100%' }}>
                            <Card withBorder radius="lg" shadow="sm" style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Text size="lg" weight={600}>Atrocities by Country</Text>
                                </Card.Section>
                                <Card.Section withBorder px="xs" py="xs" style={{ paddingTop: '2px', paddingBottom: '5px', flexGrow: 1 }}>
                                    <ScrollArea.Autosize mih="25vh" mah="50vh" style={{ width: '100%' }}>
                                        <CountryTable data={countryData} />
                                    </ScrollArea.Autosize>
                                </Card.Section>
                                <Card.Section withBorder inheritPadding py="xs" pr="xl">
                                    <b>Total: {numCountriesTotal} Countries</b>
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={4} className="event-details" key="country" style={{ minHeight: rem(80), width: '100%' }}>
                            <Card withBorder radius="lg" shadow="sm" style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Text size="lg" weight={600}>Atrocities by Decade</Text>
                                </Card.Section>
                                <Card.Section withBorder px="xs" py="xs" style={{ paddingTop: '2px', paddingBottom: '5px', flexGrow: 1 }}>
                                    <YearGraph yearData={yearData} />
                                </Card.Section>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <b>Total: {numEventsTotal} Atrocities</b>
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </div>
            </main>
        </div>
    )
}

export default StatsPage;
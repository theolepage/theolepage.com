import React, { useState, useEffect } from "react"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    ResponsiveContainer,
    Legend
} from 'recharts'

import Page from "../components/page"
import Section from "../components/section"


const API_ENDPOINT = "https://lab.theolepage.com/phd_thesis_progress/"
const START_DATE = "2025-01-01"
const END_DATE = "2025-09-01"
const PAGE_COUNT_OBJECTIVE = 150


const dateFormatterMonth = date => {
    return new Date(date).toLocaleString('en-GB', { month: 'short' })
}

const dateFormatterDayMonthYear = date => {
    const day = String(new Date(date).getDate()).padStart(2, '0')
    const month = new Date(date).toLocaleString('en-GB', { month: 'long' })
    const year = new Date(date).getFullYear()
    return `${day} ${month} ${year}`
}

const generateMonthTicks = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const ticks = []

    while (start <= end) {
        ticks.push(new Date(start).getTime())
        start.setMonth(start.getMonth() + 1)
    }
    return ticks
}

const generateDataWithObjective = (dataMap) => {
    const startDate = new Date(START_DATE)
    const endDate = new Date(END_DATE)

    const startTime = startDate.getTime();

    const totalDaysInYear = (endDate - startTime) / (1000 * 60 * 60 * 24); // Total days from Jan 1 to Sep 1

    const m = PAGE_COUNT_OBJECTIVE / totalDaysInYear; // Slope of the line

    const data = [];
    let lastCount = 0;

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0]
        const timestamp = d.getTime()

        let count = dataMap[dateString]?.page_count ?? null
        let estimation = null

        // If count is missing but before the last recorded date, use the last known count
        if (count === null) {
            if (timestamp < Math.max(...Array.from(Object.keys(dataMap)).map(date => new Date(date).getTime()))) {
                count = lastCount
            } else {
                // estimation = 50
            }
        }

        if (count !== null) {
            lastCount = count
        }

        const objective = m * ((timestamp - startTime) / (1000 * 60 * 60 * 24))

        data.push({
            date: timestamp,
            Current: count,
            Estimation: estimation,
            Objective: objective,
        })
    }

    return data;
}

const PhdThesisPage = () => {
    const monthTicks = generateMonthTicks(START_DATE, END_DATE)

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(API_ENDPOINT)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(generateDataWithObjective(jsonData))
            })
            .catch((error) => console.error("Error fetching data:", error))
    }, []) 

    return (
        <Page title="Ph.D. Thesis">
            <Section title="Ph.D. Thesis — Progress">

                {data.length > 0 ? (
                    <ResponsiveContainer height={550}>
                        <LineChart
                            margin={{
                                top: 25,
                                right: 0,
                                left: -25,
                                bottom: 25,
                            }}
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <Line
                                type="monotone"
                                dataKey="Current"
                                stroke="#5d95fc"
                                strokeWidth={2}
                                dot={false}
                            />

                            {/* <Line
                                type="monotone"
                                dataKey="Estimation"
                                stroke="#92b6f7"
                                strokeWidth={2}
                                dot={false}
                                strokeDasharray="5 5"
                            /> */}

                            <Line
                                type="monotone"
                                dataKey="Objective"
                                stroke="#fc9090"
                                strokeWidth={2}
                                dot={false}
                                // strokeDasharray="5 5"
                            />

                            <Legend />

                            <XAxis
                                dataKey={'date'}
                                domain={[monthTicks[0], monthTicks[monthTicks.length - 1]]}
                                scale="time"
                                type="number"
                                tickFormatter={dateFormatterMonth}
                                padding={{ left: 10, right: 10 }}
                                ticks={monthTicks}
                            >
                                {/* <Label value="2025" position="center" dy={30} /> */}
                            </XAxis>

                            <YAxis
                                domain={[0, 150]}
                                padding={{ top: 10, bottom: 10 }}
                                tickFormatter={(value) => Math.round(value)}
                                tickCount={8}
                            >
                                {/* <Label value="Number of pages" angle={-90} position="center" dx={-25} /> */}
                            </YAxis>

                            <Tooltip
                                labelFormatter={dateFormatterDayMonthYear}
                                itemStyle={{'margin': 0}}
                                formatter={(value, name) => [`${Math.round(value)} pages`, name]}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div>Unable to retrieve page number history...</div>
                )}

            </Section>
        </Page>
    )
}

export default PhdThesisPage
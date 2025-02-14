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
    ReferenceLine
} from 'recharts'

import Page from "../components/page"
import Section from "../components/section"

const API_ENDPOINT = "https://lab.theolepage.com/phd_thesis_progress/"

const dateFormatterMonth = date => {
    return new Date(date).toLocaleString('en-GB', { month: 'short' })
}

const dateFormatterDayMonth = date => {
    const day = String(new Date(date).getDate()).padStart(2, '0') // Ensure day is two digits
    const month = dateFormatterMonth(date)
    return `${day} ${month}`
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

const PhdThesisPage = () => {
    const monthTicks = generateMonthTicks("2025-01-01", "2025-12-31")

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(API_ENDPOINT)
            .then((response) => response.json())
            .then((jsonData) => {
                const formattedData = Object.entries(jsonData).map(([key, value]) => ({
                    date: new Date(key),
                    count: value.page_count,
                }))
                setData(formattedData)
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
                                left: 0,
                                bottom: 25,
                            }}
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#5d95fc"
                                strokeWidth={2}
                                dot={false}
                            />

                            <XAxis
                                dataKey={'date'}
                                domain={[monthTicks[0], monthTicks[monthTicks.length - 1]]}
                                scale="time"
                                type="number"
                                tickFormatter={dateFormatterMonth}
                                padding={{ left: 10, right: 10 }}
                                ticks={monthTicks}
                            >
                                <Label value="2025" position="center" dy={30} />
                            </XAxis>

                            <YAxis  domain={[0, 150]} tickCount={8}>
                                <Label value="Number of pages" angle={-90} position="center" dx={-25} />
                            </YAxis>

                            <ReferenceLine y={120} label="Objective" stroke="#fc9090" />

                            <Tooltip
                                labelFormatter={dateFormatterDayMonth}
                                formatter={(value, name) => [value, 'Number of pages']}
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
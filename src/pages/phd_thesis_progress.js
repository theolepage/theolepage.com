import React, { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label
} from "recharts";

import Page from "../components/page";
import Section from "../components/section";

const API_ENDPOINT = "https://lab.theolepage.com/phd_thesis_progress/";
const START_DATE = "2025-01-01";
const END_DATE = "2026-01-01";
const PAGE_COUNT_OBJECTIVE = 250;

const dateFormatterMonth = (date) => {
  return new Date(date).toLocaleString("en-GB", { month: "short" });
};

const dateFormatterDayMonthYear = (date) => {
  const day = String(new Date(date).getDate()).padStart(2, "0");
  const month = new Date(date).toLocaleString("en-GB", { month: "long" });
  const year = new Date(date).getFullYear();
  return `${day} ${month} ${year}`;
};

const generateMonthTicks = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const ticks = [];

  while (start <= end) {
    ticks.push(new Date(start).getTime());
    start.setMonth(start.getMonth() + 1);
  }
  return ticks;
};

const generateData = (data) => {
  const startDate = new Date(START_DATE);
  const endDate = new Date(END_DATE);

  const res = [];
  let lastCount = 0;

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let key = date.getFullYear() + "-" +
                   String(date.getMonth() + 1).padStart(2, "0") + "-" +
                   String(date.getDate()).padStart(2, "0");

    let count = data[key]?.page_count ?? null;

    if (count === null && date < new Date(Object.keys(data).at(-1))) {
      count = lastCount;
    }

    if (count !== null) {
      lastCount = count;
    }

    res.push({
      date: new Date(date),
      Current: count,
    });
  }

  return { res };
};

const PhdThesisPage = () => {
  const monthTicks = generateMonthTicks(START_DATE, END_DATE);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((jsonData) => {
        const { res } = generateData(jsonData);
        setData(res);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Page title="Ph.D. Thesis">
      <Section title="Ph.D. Thesis">
        {data.length > 0 && (
          <div>
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
                  strokeWidth={1.75}
                  dot={false}
                />

                {/* <ReferenceLine
                  y={200}
                  stroke="#fd6d6dff"
                  strokeDasharray="10 10"
                  strokeWidth={1.25}
                >
                  <Label
                    fill="#ff5555ff"
                    fontSize={14}
                    dy={-16}
                  >
                      200 pages 🎉
                  </Label>
                </ReferenceLine> */}

                {/* <Legend /> */}

                <XAxis
                  dataKey={"date"}
                  domain={[monthTicks[0], monthTicks[monthTicks.length - 1]]}
                  scale="time"
                  type="number"
                  tickFormatter={dateFormatterMonth}
                  padding={{ left: 10, right: 10 }}
                  ticks={monthTicks}
                  stroke="#aaaaaaff"
                >
                </XAxis>

                <YAxis
                  domain={[0, PAGE_COUNT_OBJECTIVE + 50]}
                  padding={{ top: 10, bottom: 10 }}
                  tickFormatter={(value) => Math.round(value)}
                  tickCount={(PAGE_COUNT_OBJECTIVE + 50) / 50 + 1}
                  stroke="#aaaaaaff"
                >
                </YAxis>

                <Tooltip
                  labelFormatter={dateFormatterDayMonthYear}
                  itemStyle={{ margin: 0 }}
                  formatter={(value, name) => [
                    `${Math.round(value)} pages`,
                    null,
                  ]}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Section>
    </Page>
  );
};

export default PhdThesisPage;

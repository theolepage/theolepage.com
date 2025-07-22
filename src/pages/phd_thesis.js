import React, { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Page from "../components/page";
import Section from "../components/section";

const API_ENDPOINT = "https://lab.theolepage.com/phd_thesis_progress/";
const START_DATE = "2025-01-01";
const END_DATE = "2025-11-01";
const PAGE_COUNT_OBJECTIVE = 200;

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

const linearRegression = (data) => {
  if (data.length === 0) return { m: 0, b: 0 };

  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.x, 0);
  const sumY = data.reduce((sum, point) => sum + point.y, 0);
  const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumX2 = data.reduce((sum, point) => sum + point.x * point.x, 0);

  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return { m: 0, b: sumY / n }; // Prevent division by zero

  const m = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY - m * sumX) / n;

  return { m, b };
};

const generateData = (data) => {
  const startDate = new Date(START_DATE);
  const endDate = new Date(END_DATE);

  const objective_alpha =
    PAGE_COUNT_OBJECTIVE /
    ((endDate - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const res = [];
  let lastCount = 0;
  let regressionData = [];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let count = data[date.toISOString().split("T")[0]]?.page_count ?? null;

    if (count === null && date < new Date(Object.keys(data).at(-1))) {
      count = lastCount;
    }

    if (count !== null) {
      lastCount = count;
    }

    if (date <= new Date()) {
      regressionData.push({
        x: (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        y: count,
      });
    }

    const objective =
      (objective_alpha * (date.getTime() - startDate.getTime())) /
      (1000 * 60 * 60 * 24);

    res.push({
      date: new Date(date),
      Current: count,
      Objective: objective,
    });
  }

  const { m, b } = linearRegression(regressionData);

  const ETA = new Date(startDate);
  ETA.setDate(startDate.getDate() + Math.round((PAGE_COUNT_OBJECTIVE - b) / m));

  res.forEach((entry) => {
    const daysElapsed =
      (entry.date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    entry.Estimation = Math.min(
      Math.max(0, m * daysElapsed + b),
      PAGE_COUNT_OBJECTIVE
    );
  });

  return { res, ETA };
};

const PhdThesisPage = () => {
  const monthTicks = generateMonthTicks(START_DATE, END_DATE);

  const [data, setData] = useState([]);
  const [ETA, setETA] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((jsonData) => {
        const { res, ETA } = generateData(jsonData);
        setData(res);
        setETA(ETA);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Page title="Ph.D. Thesis">
      <Section title="Ph.D. Thesis">
        {data.length > 0 && (
          <div>
            <p>
              <b>Number of pages:</b>{" "}
              {data.findLast((item) => item.Current !== null).Current} /{" "}
              {PAGE_COUNT_OBJECTIVE} (~
              {Math.round(
                (data.findLast((item) => item.Current !== null).Current /
                  PAGE_COUNT_OBJECTIVE) *
                  100
              )}
              %)
              <br />
              <b>Estimated end date:</b> {dateFormatterDayMonthYear(ETA)}
            </p>
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

                <Line
                  type="monotone"
                  dataKey="Estimation"
                  stroke="#acc5f2"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />

                <Line
                  type="monotone"
                  dataKey="Objective"
                  stroke="#fc9090"
                  strokeWidth={2}
                  dot={false}
                />

                <Legend />

                <XAxis
                  dataKey={"date"}
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
                  itemStyle={{ margin: 0 }}
                  formatter={(value, name) => [
                    `${Math.round(value)} pages`,
                    name,
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

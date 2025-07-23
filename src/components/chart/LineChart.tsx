"use client"
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({ chartData }: any) {
    return (
        <div className="chart-container h-48 md:h-72 lg:h-96">
            <Line
                data={chartData}
                height={"100%"}
                width={"100%"}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Sales Line Chart",
                        },
                        legend: {
                            display: false,
                        },
                    },
                }}
            />
        </div>
    );
}

export default LineChart;

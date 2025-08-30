import React, { useMemo, useState } from "react";
import equityData from "../data/equity_curve.json";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

// Interface for the data points
interface EquityPoint {
    date: string;
    focused: number;
    nifty50: number;
    drawdown: number;
}

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
};

// Define the SVG as a React component
const RefreshIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="currentColor"
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
);

export default function EquityCurve() {
    const data = equityData as EquityPoint[];
    const [from, setFrom] = useState<string>(data[0]?.date || "");
    const [to, setTo] = useState<string>(data[data.length - 1]?.date || "");

    const filtered = useMemo(() => {
        if (data.length === 0) return [];
        const f = from ? new Date(from).getTime() : -Infinity;
        const t = to ? new Date(to).getTime() : Infinity;
        return data.filter(d => {
            const ts = new Date(d.date).getTime();
            return ts >= f && ts <= t;
        });
    }, [data, from, to]);

    const reset = () => {
        if (data.length > 0) {
            setFrom(data[0].date);
            setTo(data[data.length - 1].date);
        }
    };

    if (data.length === 0) {
        return <div className="p-4 text-center text-gray-500">No data available.</div>;
    }

    return (
        <div className="equity-curve-container">
            <div className="equity-curve-header">
                <div className="equity-curve-info">
                    <h2 className="equity-curve-title">Equity curve</h2>
                    <div className="equity-curve-subtitle">
                        <span>Live since {data[0]?.date || ''}</span>
                        <button
                            onClick={reset}
                            title="Reset dates"
                            className="reset-button"
                        >
                            <RefreshIcon /> Reset
                        </button>
                    </div>
                </div>
                <div className="date-controls">
                    <div className="date-input-group">
                        <label>From date</label>
                        <input
                            type="date"
                            className="date-input"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>
                    <div className="date-input-group">
                        <label>To date</label>
                        <input
                            type="date"
                            className="date-input"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: 360 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filtered} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            minTickGap={60}
                            tickFormatter={formatDate}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                           axisLine={false}
                           tickLine={false}
                        />
                        <Tooltip />
                        <Line type="monotone" dataKey="focused" stroke="#2563eb" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="nifty50" stroke="#10b981" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{ height: 140 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filtered} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} horizontal={true} />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            ticks={[0, -20, -40]}
                            label={{ value: 'Drawdown %', angle: -90, position: 'insideLeft', dx: -25, fill: '#6b7280' }}
                        />
                        <Tooltip />
                        <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="#fecaca" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

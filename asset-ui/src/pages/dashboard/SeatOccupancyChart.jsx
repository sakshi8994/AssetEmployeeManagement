import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SeatOccupancyChart({ data }) {
  const chartData = [
    { name: "Occupied", value: data.occupiedSeats },
    { name: "Free", value: data.freeSeats },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}

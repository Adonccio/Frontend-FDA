import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function BarConsumoCidade({ data }) {
    if (!data || data.length === 0) return <p>Nenhum dado disponível</p>;

    const chartData = data.map(item => ({
        cidade: item.cidade,
        volume: Number(item.total_volume.toFixed(2))
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid />
                <XAxis dataKey="cidade" />
                <YAxis />
                <Tooltip
                    formatter={(value: number) =>
                        `${value} L`
                    }
                />
                <Bar dataKey="volume" fill="#1a3361" />
            </BarChart>
        </ResponsiveContainer>
    );
}

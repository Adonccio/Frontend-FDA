import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function BarChartPreco({ data }) {
    if (!data || data.length === 0) return <p>Nenhum dado disponível</p>;

    const chartData = data.map(item => ({
        tipo: item.tipo_combustivel,
        preco: Number(item.preco_medio.toFixed(2))
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="preco" fill="#1a3361" />
            </BarChart>
        </ResponsiveContainer>
    );
}

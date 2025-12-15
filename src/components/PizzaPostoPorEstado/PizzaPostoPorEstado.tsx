import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

export default function PizzaPostosEstado({ data }) {
    if (!data || data.length === 0) return <p>Nenhum dado disponível</p>;

    const chartData = data.map(item => ({
        name: item.estado,
        value: item.quantidade_postos
    }));

    // Paleta de cores (uma cor por segmento)
    const COLORS = [
        "#1a3361", "#3b5998", "#6b8cc4",
        "#8faadc", "#b3c7f0", "#253b6e"
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => `${entry.name} (${entry.value})`}
                >
                    {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

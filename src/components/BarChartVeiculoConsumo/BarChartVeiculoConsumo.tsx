import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

interface VeiculoConsumo {
    tipo_veiculo: string;
    total_volume: number;
}

interface Props {
    data: VeiculoConsumo[];
}

export default function BarChartVeiculoConsumo({ data }: Props) {
    if (!data || data.length === 0) {
        return <p>Nenhum dado disponível</p>;
    }

    // Monta os dados do gráfico
    const chartData = data.map(item => ({
        tipo: item.tipo_veiculo,
        volume: Number(item.total_volume),
    }));

    // Calcula o máximo com base nos dados recebidos
    const maxVolume = Math.max(...chartData.map(d => d.volume));
    // Adiciona uma folguinha no topo (por exemplo, +10% ou +5 unidades)
    const yMax = Math.ceil(maxVolume * 1.1); // ou: Math.ceil(maxVolume + 5)

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

                <XAxis
                    dataKey="tipo"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                />

                <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, yMax]} // <-- agora totalmente baseado nos dados
                />

                <Tooltip
                    formatter={(v: number) => [`${v.toFixed(2)} L`, "Consumo"]}
                    labelStyle={{ fontWeight: "bold" }}
                />

                <Legend />

                <Bar
                    dataKey="volume"
                    fill="#1a3361"
                    radius={[6, 6, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}


import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface BarConsumoMesProps {
    data: any[];
    isMediaPrecoMes?: boolean; // opcional se quiser
}

const mesesLabels = {
    1: "Jan",
    2: "Fev",
    3: "Mar",
    4: "Abr",
    5: "Mai",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Set",
    10: "Out",
    11: "Nov",
    12: "Dez"
};

export default function BarConsumoMes({ data, isMediaPrecoMes }: BarConsumoMesProps) {
    if (!data || data.length === 0) return <p>Nenhum dado disponível</p>;

    const chartData = data.map(item => ({
        mes: mesesLabels[item.mes] ?? item.mes,     // converte 1 → Jan
        valor: isMediaPrecoMes ? item.preco_medio : item.total_volume
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
                <CartesianGrid />

                <XAxis
                    dataKey="mes"
                    padding={{ left: 20, right: 20 }}
                />

                <YAxis domain={[
                    0,
                    (dataMax: number) => Math.ceil(dataMax * 1.1)
                ]} />

                <Tooltip />
                <Bar dataKey="valor" fill="#1a3361" />
            </BarChart>
        </ResponsiveContainer>

    );
}

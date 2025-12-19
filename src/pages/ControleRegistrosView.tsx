import { useEffect, useState } from "react";
import PaginatedTable from "../components/PaginatedTable/PaginatedTable";
import { ControleRegistros } from "../api";
import type { Header } from "../components/PaginatedTable/PaginatedTable";

interface Registro {
    historico_id: number;
    tp_registro: string;
    status_registro: string;
    data_atualizacao: string;
}

export default function ControleRegistrosView() {
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const tipos = ["Motorista", "Posto", "Veículo", "Venda"];


    // carregar registros
    async function loadRegistros() {
        try {
            setLoading(true);
            const data = await ControleRegistros.listAll();
            setRegistros(data);
        } catch (e) {
            setError("Erro ao carregar registros do histórico.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRegistros();
    }, []);

    if (loading) return <p>Carregando registros...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    const headers: Header[] = [
        { key: "historico_id", label: "ID" },
        { key: "tp_registro", label: "Tipo de Registro" },
        { key: "status_registro", label: "Status" },
        {
            key: "data_atualizacao",
            label: "Atualizado em",
            render: (v) => new Date(v).toLocaleString(),
        },
    ];

    return (
        <div className="table-container d-flex flex-column align-items-center">


            <PaginatedTable
                headers={headers}
                data={registros}
                searchType="select"
                selectOptions={tipos}
                onSearch={async (term) =>
                    ControleRegistros.findByTipo(term)
                }
                searchPlaceholder="Filtrar por tipo..."
            />
        </div>
    );
}

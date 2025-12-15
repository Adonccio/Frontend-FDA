import { useEffect, useState } from "react";
import { Veiculos } from "../api";
import PaginatedTable from "../components/PaginatedTable/PaginatedTable";
import Modal from "../components/Modal/Modal";
import AddButton from "../components/AddButton/AddButton";
import VeiculosForm from "../components/VeiculosForm/VeiculosForm";

interface Veiculo {
    id: number;
    placa: string;
    tipo: string;
    data_atualizacao: string;
}

export default function VeiculosView() {

    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    async function loadVeiculos() {
        const data = await Veiculos.listAll();
        setVeiculos(data);
        setLoading(false);
    }

    useEffect(() => {
        loadVeiculos();
    }, []);

    async function handleCreate({ placa, tipo }: { placa: string; tipo: string }) {
        await Veiculos.create({ placa, tipo });
        await loadVeiculos();
    }

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="table-container d-flex flex-column align-items-center">

            <AddButton
                label="Cadastrar Veículo"
                onOpen={() => setModalOpen(true)}
            />

            <Modal
                title="Novo Veículo"
                isOpen={modalOpen}
                width={"400px"}
                onClose={() => setModalOpen(false)}
            >
                <div className="modal-content m-3">
                    <VeiculosForm
                        onSubmit={handleCreate}
                        onSuccessClose={() => setModalOpen(false)}
                    />
                </div>
            </Modal>

            <PaginatedTable
                headers={[
                    { key: "id", label: "ID" },
                    { key: "placa", label: "Placa" },
                    { key: "tipo", label: "Tipo" },
                    {
                        key: "data_atualizacao",
                        label: "Atualizado",
                        render: v => new Date(v).toLocaleString()
                    }
                ]}
                data={veiculos}
                inputLimit={7}
                onSearch={async (term) => Veiculos.findByPlaca(term)}
                searchPlaceholder="Buscar por Placa..."
            />
        </div>
    );
}

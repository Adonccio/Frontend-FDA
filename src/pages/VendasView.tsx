import { useState, useEffect } from "react";
import PaginatedTable from "../components/PaginatedTable/PaginatedTable";
import AddButton from "../components/AddButton/AddButton";
import Modal from "../components/Modal/Modal";
import VendasForm from "../components/VendasForm/VendasForm";
import { Vendas } from "../api";

export default function VendasView() {
    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    async function loadVendas() {
        const data = await Vendas.listAll();
        setVendas(data);
        setLoading(false);
    }

    useEffect(() => {
        loadVendas();
    }, []);

    async function handleCreate(vendaData) {
        await Vendas.create(vendaData);
        await loadVendas();
    }

    if (loading) return <p>Carregando vendas...</p>;

    return (
        <div className="table-container d-flex flex-column align-items-center">

            <AddButton
                label="Registrar Venda"
                onOpen={() => setModalOpen(true)}
            />

            <Modal
                title="Nova Venda"
                isOpen={modalOpen}
                width={"500px"}
                onClose={() => setModalOpen(false)}
            >
                <div className="modal-content m-3">
                    <VendasForm
                        onSubmit={handleCreate}
                        onSuccessClose={() => setModalOpen(false)}
                    />
                </div>
            </Modal>

            <PaginatedTable
                headers={[
                    { key: "id", label: "ID" },
                    { key: "data_coleta", label: "Data", render: v => new Date(v).toLocaleString() },
                    { key: "tipo_combustivel", label: "Combustível" },
                    { key: "preco", label: "Preço", render: v => `R$ ${v.toFixed(2)}` },
                    { key: "volume_vendido", label: "Litros", render: v => `${v} L` },
                    { key: "posto_nome", label: "Posto" },
                    { key: "cidade", label: "Cidade" },
                    { key: "estado", label: "Estado" },
                    { key: "placa_veiculo", label: "Placa Veículo" },
                    { key: "tipo_veiculo", label: "Tipo Veículo" },
                    { key: "motorista_nome", label: "Motorista" },
                ]}
                data={vendas}
                searchType={undefined}
            />
        </div>
    );
}

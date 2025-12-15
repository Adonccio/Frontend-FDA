import { useEffect, useState } from "react";
import { MotoristaAPI } from "../api";
import { formatCPF } from "../utils/format";
import PaginatedTable from "../components/PaginatedTable/PaginatedTable";
import Modal from "../components/Modal/Modal";
import MotoristasForm from "../components/MotoristasForm/MotoristasForm";
import AddButton from "../components/AddButton/AddButton";

export default function MotoristasView() {
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    async function loadMotoristas() {
        const data = await MotoristaAPI.listAll();
        setMotoristas(data);
        setLoading(false);
    }

    useEffect(() => {
        loadMotoristas();
    }, []);

    async function handleCreate({ nome, cpf }) {
        await MotoristaAPI.create({ nome, cpf });
        await loadMotoristas();
    }

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="table-container d-flex flex-column align-items-center">

            <AddButton
                label="Cadastrar Motorista"
                onOpen={() => setModalOpen(true)}
            />
            <Modal
                title="Novo Motorista"
                isOpen={modalOpen}
                width={"430px"}
                onClose={() => setModalOpen(false)}
            >
                <div className="modal-content m-3">
                    <MotoristasForm
                        onSubmit={handleCreate}
                        onSuccessClose={() => setModalOpen(false)}
                    />
                </div>
            </Modal>

            <PaginatedTable
                headers={[
                    { key: "id", label: "ID" },
                    { key: "nome", label: "Nome" },
                    { key: "cpf", label: "CPF", render: v => formatCPF(v) },
                    {
                        key: "data_atualizacao",
                        label: "Atualizado",
                        render: v => new Date(v).toLocaleString()
                    }
                ]}
                data={motoristas}
                inputLimit={11}
                onSearch={async (term) => MotoristaAPI.findByCpf(term)}
                searchPlaceholder="Buscar por CPF..."
            />
        </div>
    );
}

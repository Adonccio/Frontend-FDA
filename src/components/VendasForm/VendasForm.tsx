import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface VendasFormProps {
    onSubmit: (data: any) => Promise<void>;
    onSuccessClose: () => void;
}

export default function VendasForm({ onSubmit, onSuccessClose }: VendasFormProps) {
    const [dataColeta, setDataColeta] = useState("");
    const [tipoCombustivel, setTipoCombustivel] = useState("");
    const [preco, setPreco] = useState("");
    const [volume, setVolume] = useState("");

    const [postoId, setPostoId] = useState("");
    const [motoristaId, setMotoristaId] = useState("");
    const [veiculoId, setVeiculoId] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);

    const combustiveis = [
        "Gasolina",
        "Etanol",
        "Diesel",
        "Diesel S10",
        "GNV",
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!postoId || !motoristaId || !veiculoId) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await onSubmit({
                posto_id: Number(postoId),
                motorista_id: Number(motoristaId),
                veiculo_id: Number(veiculoId),
                data_coleta: dataColeta,
                tipo_combustivel: tipoCombustivel,
                preco: Number(preco),
                volume_vendido: Number(volume),
            });

            setSuccess("Venda registrada!");

            setTimeout(() => {
                setSuccess("");
                onSuccessClose();
            }, 1200);
        } catch {
            setError("Erro ao registrar venda.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center m-auto w-75">

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="w-75">
                <label className="form-label">Data da Coleta</label>

                <DatePicker
                    selected={dataColeta}
                    onChange={setDataColeta}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className="form-control"
                    onKeyDown={(e) => e.preventDefault()}
                />
            </div>

            <div className="w-75 mt-2">
                <label className="form-label">Tipo de Combustível</label>
                <select
                    className="form-select"
                    value={tipoCombustivel}
                    onChange={(e) => setTipoCombustivel(e.target.value)}
                    required
                >
                    <option value="">Selecione...</option>

                    {combustiveis.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-75 mt-2">
                <label className="form-label">Preço</label>
                <input
                    type="number"
                    className="form-control"
                    value={preco}
                    step="0.01"
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
            </div>

            <div className="w-75 mt-2">
                <label className="form-label">Litros Vendidos</label>
                <input
                    type="number"
                    className="form-control"
                    value={volume}
                    step="0.01"
                    onChange={(e) => setVolume(e.target.value)}
                    required
                />
            </div>

            <div className="w-75 mt-2">
                <label className="form-label">ID do Posto</label>
                <input
                    type="number"
                    className="form-control"
                    value={postoId}
                    onChange={(e) => setPostoId(e.target.value)}
                    required
                />
            </div>

            <div className="w-75 mt-2">
                <label className="form-label">ID do Motorista</label>
                <input
                    type="number"
                    className="form-control"
                    value={motoristaId}
                    onChange={(e) => setMotoristaId(e.target.value)}
                    required
                />
            </div>

            <div className="w-75 mt-2 mb-3">
                <label className="form-label">ID do Veículo</label>
                <input
                    type="number"
                    className="form-control"
                    value={veiculoId}
                    onChange={(e) => setVeiculoId(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary w-50" disabled={saving}>
                {saving ? "Salvando..." : "Registrar"}
            </button>
        </form>
    );
}

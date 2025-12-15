import { useState } from "react";

interface VeiculosFormProps {
    onSubmit: (data: { placa: string; tipo: string }) => Promise<void>;
    onSuccessClose?: () => void;
}

export default function VeiculosForm({ onSubmit, onSuccessClose }: VeiculosFormProps) {

    const [placa, setPlaca] = useState("");
    const [tipo, setTipo] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const tiposVeiculos = [
        "Carreta",
        "Caminhão Leve",
        "Moto",
        "Carro",
        "Ônibus"
    ];

    function formatPlaca(value: string) {
        return value.replace(/[^A-Za-z0-9]/g, "").slice(0, 7).toUpperCase();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!placa || !tipo) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await onSubmit({
                placa,
                tipo,
            });

            setSuccess("Veículo registrado!");

            setTimeout(() => {
                setSuccess("");
                onSuccessClose();
            }, 1200);
        } catch {
            setError("Erro ao registrar veículo.");
        } finally {
            setSaving(false);
        }
    }
    return (
        <form className="d-flex flex-column align-items-center w-100" onSubmit={handleSubmit}>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex flex-column align-items-center mb-3 ">
                <label className="form-label fw-bold">Placa</label>
                <input
                    type="text"
                    className="form-control"
                    value={placa}
                    onChange={(e) => setPlaca(formatPlaca(e.target.value))}
                    maxLength={7}
                    required
                />
            </div>

            <div className="d-flex flex-column align-items-center mb-3 w-50">
                <label className="form-label fw-bold">Tipo de Veículo</label>
                <select
                    className="form-select"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                >
                    <option value="">Selecione...</option>

                    {tiposVeiculos.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            {/* BOTÃO */}
            <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary px-4">
                    Cadastrar
                </button>
            </div>

        </form>
    );
}

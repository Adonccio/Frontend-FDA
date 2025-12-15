import { useState } from "react";

interface MotoristaFormProps {
    onSubmit: (data: { nome: string; cpf: string }) => Promise<void>;
    onSuccessClose: () => void;
}

export default function MotoristasForm({ onSubmit, onSuccessClose }: MotoristaFormProps) {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!nome || !cpf) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await onSubmit({ nome, cpf });

            setSuccess("Motorista cadastrado com sucesso!");

            setTimeout(() => {
                setSuccess("");
                setNome("");
                setCpf("");
                onSuccessClose();
            }, 1200);

        } catch (err) {
            setError(
                err?.response?.data?.detail || "Erro ao cadastrar posto.")
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}  className="d-flex flex-column align-items-center w-100">
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="m-auto">
                <label className="form-label fw-bold">Nome Completo</label>
                <input
                    type="text"
                    className="form-control w-100"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">CPF</label>
                <input
                    type="text"
                    className="form-control w-100"
                    value={cpf}
                    maxLength={11}
                    onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary w-25" disabled={saving}>
                {saving ? "Salvando..." : "Cadastrar"}
            </button>
        </form>
    );
}

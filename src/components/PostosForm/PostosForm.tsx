import { useState } from "react";
import { useEstadosCidades } from "../useEstadosCidades/useEstadosCidades";

interface PostoFormProps {
    onSubmit: (data: { nome: string; cnpj: string; estado: string; cidade: string }) => Promise<void>;
    loading?: boolean;
    onSuccessClose: () => void;
}

export default function PostoForm({
                                      onSubmit,
                                      onSuccessClose,
                                  }: PostoFormProps) {

    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const {
        estados,
        cidades,
        fetchCidades,
        loadingEstados,
        loadingCidades,
    } = useEstadosCidades ();

    function formatCnpjInput(value: string) {
        return value.replace(/\D/g, "").slice(0, 14);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!nome || !cnpj || !estado || !cidade) {
            setError("Preencha todos os campos");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await onSubmit({ nome, cnpj, estado, cidade });

            setSuccess("Posto cadastrado com sucesso!");


            setTimeout(() => {
                setSuccess("");
                setNome("");
                setCnpj("");
                setEstado("");
                setCidade("");
                onSuccessClose();
            }, 1200);

        } catch (err: any) {
            setError(
                err?.response?.data?.detail || "Erro ao cadastrar posto."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <form className="d-flex flex-column align-items-center w-100" onSubmit={handleSubmit}>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}


            <div className="d-flex gap-3 mb-3">

                <div className="flex-grow-1">
                    <label className="form-label fw-bold">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="flex-grow-1">
                    <label className="form-label fw-bold">CNPJ</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cnpj}
                        onChange={(e) => setCnpj(formatCnpjInput(e.target.value))}
                        required
                    />

                    {cnpj && cnpj.length < 14 && (
                        <small className="text-danger">CNPJ deve conter 14 dígitos.</small>
                    )}
                </div>

            </div>

            <div className="d-flex gap-3 mb-3">
                <div className="flex-grow-1">
                    <label className="form-label fw-bold">Estado</label>
                    <select
                        className="form-select primary"
                        value={estado}
                        onChange={(e) => {
                            const uf = e.target.value;
                            setEstado(uf);
                            setCidade("");
                            fetchCidades(uf);
                        }}
                        required
                    >
                        <option value="">
                            {loadingEstados ? "Carregando estados..." : "Selecione o estado"}
                        </option>

                        {estados.map((estado) => (
                            <option key={estado.id} value={estado.sigla}>
                                {estado.nome} ({estado.sigla})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-grow-1">
                    <label className="form-label fw-bold">Cidade</label>
                    <select
                        className="form-select"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        disabled={!estado || loadingCidades}
                        required
                    >
                        <option value="">
                            {loadingCidades
                                ? "Carregando cidades..."
                                : "Selecione a cidade"}
                        </option>

                        {cidades.map((cidade) => (
                            <option key={cidade.id} value={cidade.nome}>
                                {cidade.nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="d-flex justify-content-center my-3">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={saving || cnpj.length !== 14}
                >
                    {saving ? "Salvando..." : "Cadastrar"}
                </button>
            </div>

        </form>
    );
}

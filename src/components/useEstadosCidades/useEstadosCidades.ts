import { useEffect, useState } from "react";
import axios from "axios";

interface Estado {
    id: number;
    sigla: string;
    nome: string;
}

interface Municipio {
    id: number;
    nome: string;
}

export function useEstadosCidades() {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Municipio[]>([]);
    const [loadingEstados, setLoadingEstados] = useState(false);
    const [loadingCidades, setLoadingCidades] = useState(false);

    useEffect(() => {
        async function fetchEstados() {
            try {
                setLoadingEstados(true);

                const { data } = await axios.get<Estado[]>(
                    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
                );

                setEstados(
                    data.sort((a, b) => a.nome.localeCompare(b.nome))
                );
            } catch (error) {
                console.error("Erro ao carregar estados:", error);
            } finally {
                setLoadingEstados(false);
            }
        }

        fetchEstados();
    }, []);

    async function fetchCidades(uf: string) {
        if (!uf) return;

        try {
            setLoadingCidades(true);

            const { data } = await axios.get<Municipio[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
            );

            setCidades(
                data.sort((a, b) => a.nome.localeCompare(b.nome))
            );
        } catch (error) {
            console.error("Erro ao carregar cidades:", error);
        } finally {
            setLoadingCidades(false);
        }
    }

    return {
        estados,
        cidades,
        fetchCidades,
        loadingEstados,
        loadingCidades,
    };
}

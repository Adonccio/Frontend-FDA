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

export function EstadosCidades() {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Municipio[]>([]);
    const [loadingEstados, setLoadingEstados] = useState(false);
    const [loadingCidades, setLoadingCidades] = useState(false);

    useEffect(() => {
        async function fetchEstados() {
            setLoadingEstados(true);
            const { data } = await axios.get<Estado[]>(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            );

            const ordenados = data.sort((a, b) =>
                a.nome.localeCompare(b.nome)
            );

            setEstados(ordenados);
            setLoadingEstados(false);
        }

        fetchEstados();
    }, []);

    async function fetchCidades(uf: string) {
        if (!uf) return;

        setLoadingCidades(true);

        const { data } = await axios.get<Municipio[]>(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
        );

        const ordenadas = data.sort((a, b) =>
            a.nome.localeCompare(b.nome)
        );

        setCidades(ordenadas);
        setLoadingCidades(false);
    }

    return {
        estados,
        cidades,
        fetchCidades,
        loadingEstados,
        loadingCidades,
    };
}

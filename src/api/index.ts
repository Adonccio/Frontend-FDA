import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const DashboardAPI = {
    getAveragePrices: async() => {
        const res = await api.get(`/dashboard/precos-medios`);
        return res.data;
    },

    getVehicleConsumption: async() => {
        const res = await api.get(`/dashboard/consumo-veiculo`);
        return res.data;
    },

    getConsumoPorMes: async() => {
        const res = await api.get(`/dashboard/consumo-mes`);
        return res.data;
    },

    getConsumoPorCidade: async() => {
        const res = await api.get(`/dashboard/consumo-cidade`);
        return res.data;
    },

    getPostosPorEstado:async() => {
        const res = await api.get(`/dashboard/quantidade-estado`);
        return res.data;
    },

    getMediaPrecoPorMes:async() => {
        const res = await api.get(`/dashboard/media-preco-mes`);
        return res.data;
    }
};


export const MotoristaAPI = {
    listAll: async () => {
        const res = await api.get("/motoristas/");
        return res.data;
    },

    create: async (motorista: { nome: string; cpf: string }) => {
        const res = await api.post("/motoristas/", motorista);
        return res.data;
    },

    findByCpf: async ( cpf: string ) => {
        const res = await api.get("/motoristas/", { params: { cpf } });
        return res.data;
    }
};



export const PostoAPI = {
    listAll: async () => {
        const res = await api.get("/postos/");
        return res.data;
    },

    create: async (posto: { nome: string; cnpj: string, estado: string, cidade: string }) => {
        const res = await api.post("/postos/", posto);
        return res.data;
    },

    findByCnpj: async (cnpj: string) => {
        const res = await api.get("/postos/", {params: {cnpj}});
        return res.data
    },
};


export const Veiculos = {
    listAll: async () => {
        const res = await api.get("/veiculos/");
        return res.data;
    },

    create: async (veiculo: { placa: string; tipo: string }) => {
        const res = await api.post("/veiculos/", veiculo);
        return res.data;
    },

    findByPlaca: async (placa: string) => {
        const res = await api.get("/veiculos/", {params: {placa}});
        return res.data
    },

};


export const Vendas = {
    listAll: async () => {
        const res = await api.get("/vendas/");
        return res.data;
    },

    create: async (vendaData) => {
        const res = await api.post("/vendas/", vendaData);
        return res.data;
    },
};



export const ControleRegistros = {
    listAll: async () => {
        const res = await api.get("/registro-historico/");
        return res.data;
    },

    findByTipo: async (tp_registro: string) => {
        const res = await api.get("/registro-historico/", {params: { tipo: tp_registro }});
        return res.data
    },

    findByStatus: async (status_registro: string) => {
        const res = await api.get("/registro-historico/", {params: {status_registro} });
        return res.data
    },
};



export const HealthAPI = {
    health: async () => {
        const res = await api.get("/");
        return res.data;
    }
};

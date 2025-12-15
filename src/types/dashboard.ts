// src/types/dashboard.ts

export interface PrecoMedioCombustivel {
    tipo_combustivel: string;
    preco_medio: number;
}

export interface ConsumoPorTipoVeiculo {
    tipo_veiculo: string;
    total_volume: number;
}

export interface ConsumoPorMes {
    mes: number;
    total_volume: number;
}

export interface ConsumoPorCidade {
    cidade: string;
    total_volume: number;
}

export interface PostoPorEstado {
    estado: string;
    quantidada_postos: number;
}

export interface VendaResponse {
    id: number;
    data_coleta: string;
    tipo_combustivel: string;
    preco: number;
    volume_vendido: number;
    posto_nome: string;
    cidade: string;
    estado: string;
    placa_veiculo: string;
    tipo_veiculo: string;
    motorista_nome: string;
}

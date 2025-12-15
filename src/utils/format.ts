export function formatCPF(cpf: string): string {
    if (!cpf) return "";

    const digits = cpf.replace(/\D/g, "").padStart(11, "0");
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(cnpj: string): string {
    if (!cnpj) return "";

    const digits = cnpj.replace(/\D/g, "").padStart(14, "0");

    return digits.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
}
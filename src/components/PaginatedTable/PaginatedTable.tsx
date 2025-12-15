import React, {useState, useMemo, useEffect, JSX} from "react";
import "./PaginatedTable.css";

export interface Header {
    key: string;
    label: string;
    render?: (value: any, row: any) => JSX.Element | string;
}

interface PaginatedTableProps {
    headers: Header[];
    data: any[];
    defaultPageSize?: number;

    onSearch?: (term: string) => Promise<any[]>;
    searchPlaceholder?: string;
    inputLimit?: number;

    searchType?: "input" | "select";
    selectOptions?: string[];
}

export default function PaginatedTable({
                                           headers,
                                           data,
                                           defaultPageSize = 10,
                                           onSearch,
                                           searchPlaceholder = "Buscar...",
                                           inputLimit = 50,
                                           searchType = "input",
                                           selectOptions = [],
                                       }: PaginatedTableProps) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");

    // NOVO: estado para o valor selecionado no dropdown
    const [selectValue, setSelectValue] = useState<string>("todos");

    const [filteredData, setFilteredData] = useState<any[]>(data);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const currentPageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page, pageSize]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (!onSearch) return;
        if (searchTerm === "") return;

        const fetch = async () => {
            const result = await onSearch(searchTerm);
            setFilteredData(result);
            setPage(1);
        };

        fetch();
    }, [searchTerm, onSearch]);

    return (
        <div className="w-100">
            {/* =============== BUSCA: INPUT =============== */}
            {onSearch && searchType === "input" && (
                <div className="search-container d-flex justify-content-center mb-4 gap-2">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder={searchPlaceholder}
                        value={inputValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= inputLimit) {
                                setInputValue(value);
                            }

                            if (value.length === 0) {
                                setSearchTerm("");
                                setFilteredData(data);
                                setPage(1);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputValue.length > 0) {
                                setSearchTerm(inputValue);
                            }
                        }}
                    />

                    <button
                        className="btn btn-primary"
                        disabled={inputValue.length === 0}
                        onClick={() => setSearchTerm(inputValue)}
                    >
                        Buscar
                    </button>
                </div>
            )}

            {/* =============== BUSCA: SELECT + BOTÃO =============== */}
            {onSearch && searchType === "select" && (
                <div className="search-container d-flex justify-content-center mb-4 gap-2">
                    <select
                        className="form-select w-auto"
                        value={selectValue}
                        onChange={(e) => {
                            setSelectValue(e.target.value);
                        }}
                    >
                        <option value="todos">Todos</option>
                        {selectOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>

                    <button
                        className="btn btn-primary"
                        onClick={async () => {
                            if (!onSearch) return;

                            // Se "Todos" → limpa filtro e volta dados originais
                            if (selectValue === "todos") {
                                setSearchTerm("");
                                setFilteredData(data);
                                setPage(1);
                                return;
                            }

                            // dispara busca usando o valor selecionado
                            setSearchTerm(selectValue);
                        }}
                    >
                        Buscar
                    </button>
                </div>
            )}

            {/* TABELA */}
            <table className="table-modern w-100">
                <thead>
                <tr>
                    {headers.map((h) => (
                        <th key={h.key}>{h.label}</th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {currentPageData.map((row, idx) => (
                    <tr key={idx}>
                        {headers.map((h) => {
                            const value = row[h.key];
                            return (
                                <td
                                    key={h.key}
                                    data-label={h.label}
                                >
                                    {(() => {
                                        // Se o usuário definiu render, respeita
                                        if (h.render) return h.render(value, row);

                                        // Se a coluna é "status_registro", aplica cor automática
                                        if (h.key === "status_registro") {
                                            const isSuccess = value?.toLowerCase() === "sucesso";
                                            const isError = value?.toLowerCase() === "erro";

                                            const style: React.CSSProperties = {
                                                padding: "4px 10px",
                                                borderRadius: "6px",
                                                fontWeight: "bold",
                                                display: "inline-block",
                                                width: "30%",
                                                textAlign: "center",
                                                backgroundColor: isSuccess ? "#c8f7c5" : isError ? "#f7c5c5" : "#eee",
                                                color: isSuccess ? "#145a32" : isError ? "#7b241c" : "#333",
                                                border: `1px solid ${
                                                    isSuccess ? "#27ae60" : isError ? "#c0392b" : "#bbb"
                                                }`,
                                            };

                                            return <span style={style}>{value}</span>;
                                        }

                                        // default
                                        return value;
                                    })()}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* PAGINAÇÃO */}
            <div className="pagination-container">
                <button
                    className="btn btn-dark"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                <span>
                    Página <strong>{page}</strong> de <strong>{totalPages}</strong>
                </span>

                <button
                    className="btn btn-primary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Próxima
                </button>

                <div className="d-flex align-items-center mt-3 mb-3">
                    <label className="me-2 fw-bold">Quantidade: </label>

                    <select
                        className="form-select select-pagesize"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        {[5, 10, 20, 50, 100].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

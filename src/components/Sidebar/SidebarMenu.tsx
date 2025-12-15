import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SidebarMenu.css";
import { Link, useLocation } from "react-router-dom";
import { CarIcon } from "../../assets/icons/CarIcon";
import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { FuelPumpIcon } from "../../assets/icons/FuelPumpIcon";
import { PersonIcon } from "../../assets/icons/PersonIcon";
import { DatabaseIcon } from "../../assets/icons/DatabaseIcon";
import { CoinIcon } from "../../assets/icons/CoinIcon";

export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const location = useLocation();
    const currentPage = location.pathname;

    const handleMenuClick = () => {
        setCollapsed(true);
    };

    const isActive = (path: string) =>
        currentPage === path ? "active-sidebar-item" : "";

    return (
        <div className={`sidebar text-light ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header p-3">
                <button
                    className="btn btn-outline-light w-100"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    ☰
                </button>
            </div>

            <ul className="nav flex-column">

                <li className="nav-item">
                    <Link
                        className={`nav-link d-flex align-items-center ${isActive("/")}`}
                        to={"/"}
                        onClick={handleMenuClick}
                        title="Análise"
                    >
                        <AnalyticsIcon />
                        <span className="sidebar-text">Análise</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={`nav-link d-flex align-items-center ${isActive("/motoristas")}`}
                        to={"/motoristas"}
                        onClick={handleMenuClick}
                        title="Motoristas"
                    >
                        <PersonIcon />
                        <span className="sidebar-text">Motoristas</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={`nav-link d-flex align-items-center ${isActive("/postos")}`}
                        to={"/postos"}
                        onClick={handleMenuClick}
                        title="Postos"
                    >
                        <FuelPumpIcon />
                        <span className="sidebar-text">Postos</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={`nav-link d-flex align-items-center ${isActive("/veiculos")}`}
                        to={"/veiculos"}
                        onClick={handleMenuClick}
                        title="Veículos"
                    >
                        <CarIcon />
                        <span className="sidebar-text">Veículos</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={`nav-link d-flex align-items-center ${isActive("/vendas")}`}
                        to={"/vendas"}
                        onClick={handleMenuClick}
                        title="Registro e Listagem de Vendas"
                    >
                        <CoinIcon />
                        <span className="sidebar-text">Vendas</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={`nav-link d-flex align-items-center ${isActive("/controle-registros")}`}
                        to={"/controle-registros"}
                        onClick={handleMenuClick}
                        title="Controle de Registros"
                    >
                        <DatabaseIcon />
                        <span className="sidebar-text">Controle de Registros</span>
                    </Link>
                </li>

            </ul>
        </div>
    );
};

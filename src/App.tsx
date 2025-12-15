import DashboardPage from "./pages/Dashboard";
import { Sidebar } from "./components/Sidebar/SidebarMenu";
import { Routes, Route } from "react-router-dom";
import MotoristasView from "./pages/MotoristasView";
import PostosView from "./pages/PostosView";
import VeiculosView from "./pages/VeiculosView";
import ControleRegistrosView from "./pages/ControleRegistrosView";
import VendasView from "./pages/VendasView";

export default function App() {
    return (
        <div className="app-layout d-flex">
            <Sidebar />

            <div className="flex-grow-1 p-4">
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/motoristas" element={<MotoristasView />} />
                    <Route path="/postos" element={<PostosView />} />
                    <Route path="/veiculos" element={<VeiculosView />} />
                    <Route path="/controle-registros" element={<ControleRegistrosView />} />
                    <Route path="/vendas" element={<VendasView />} />
                </Routes>
            </div>
        </div>
    );
}
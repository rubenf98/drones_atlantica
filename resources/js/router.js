import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

//public pages
import Homepage from "./components/pages/Homepage";
import DashboardHomepage from "./components/pages/dashboard/homepage/Homepage";
import Layout from "./components/pages/dashboard/Layout";
import Login from "./components/pages/Login";
import Drone from "./components/pages/dashboard/drone/Drone";
import FlightReport from "./components/pages/dashboard/flightReport/FlightReport";
import CrashReport from "./components/pages/dashboard/crashReport/CrashReport";
import DroneForm from "./components/pages/dashboard/drone/DroneForm";
import FlightReportForm from "./components/pages/dashboard/flightReport/FlightReportForm";
import CrashReportForm from "./components/pages/dashboard/crashReport/CrashReportForm";
import Members from "./components/pages/dashboard/Members";
import OperatorForm from "./components/pages/dashboard/operator/OperatorForm";
import ManufacturerForm from "./components/pages/dashboard/manufacturer/ManufacturerForm";
import UserForm from "./components/pages/dashboard/users/UserForm";

export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>

            <Routes>
                <Route exact path="/painel/users/create" element={<Layout><UserForm /></Layout>} />
                <Route exact path="/painel/fabricantes/create" element={<Layout><ManufacturerForm /></Layout>} />
                <Route exact path="/painel/operador/create" element={<Layout><OperatorForm /></Layout>} />
                <Route exact path="/painel/drones/create" element={<Layout><DroneForm /></Layout>} />
                <Route exact path="/painel/relatorios/create" element={<Layout><FlightReportForm /></Layout>} />
                <Route exact path="/painel/acidentes/create" element={<Layout><CrashReportForm /></Layout>} />

                <Route exact path="/painel/acidentes" element={<Layout><CrashReport /></Layout>} />
                <Route exact path="/painel/relatorios" element={<Layout><FlightReport /></Layout>} />
                <Route exact path="/painel/drones" element={<Layout><Drone /></Layout>} />
                <Route exact path="/painel/membros" element={<Layout><Members /></Layout>} />
                <Route exact path="/painel/" element={<Layout><DashboardHomepage /></Layout>} />

                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Login />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Router;

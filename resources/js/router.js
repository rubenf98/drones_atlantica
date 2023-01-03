import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

//public pages
import Homepage from "./components/pages/Homepage";
import DashboardHomepage from "./components/pages/dashboard/homepage/Homepage";
import Layout from "./components/pages/dashboard/Layout";
import Login from "./components/pages/Login";
import Drone from "./components/pages/dashboard/drone/Drone";

export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>

            <Routes>
                <Route exact path="/painel/drones" element={<Layout><Drone /></Layout>} />
                <Route exact path="/painel/" element={<Layout><DashboardHomepage /></Layout>} />
                <Route exact path="/login" element={<Layout><Login /></Layout>} />
                <Route exact path="/" element={<Homepage />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Router;

import React from 'react'
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.nav`
    flex: 1;
    color: white;

    ul {
        list-style-type: none;
    }

    li {
        margin: 15px 0px;
    }

    a {
        color: white;
        opacity: .6;
        text-decoration: none;
        display: flex;
        font-size: 18px;

        img {
            width: 20px;
            height: auto;
            margin-right: 8px;
            filter: invert(1);
        }
    }
    
    .active {
        opacity: 1;
    }
`;

function Navbar() {
    return (
        <Container>
            <ul>
                <li>
                    <NavLink to="/painel/">
                        <img src="/images/icons/dashboard.svg" />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/painel/drones">
                        <img src="/images/icons/drone.svg" />
                        Drones
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/painel/relatorios" >
                        <img src="/images/icons/report.svg" />
                        Relatórios de voo
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/painel/acidentes" >
                        <img src="/images/icons/crash.svg" />
                        Registos de acidentes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/painel/membros" >
                        <img src="/images/icons/user.svg" />
                        Membros
                    </NavLink>
                </li>
            </ul>
        </Container>
    )
}

export default Navbar
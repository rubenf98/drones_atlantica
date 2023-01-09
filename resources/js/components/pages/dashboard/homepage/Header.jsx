import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';

const Container = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: clamp(20px, 4vw, 28px);
    }

    .button-container {
        justify-content: space-between;
        align-items: center;
        display: flex;
        gap: 20px;
    }

`;

function Header() {
    return (
        <Container>
            <div>
                <h2>Bem vindo de volta!</h2>

            </div>
            <div className='button-container'>
                <Link to="/painel/drones/create"><SecundaryButton>Adicionar drone</SecundaryButton></Link>
                <Link to="/painel/relatorios/create"><PrimaryButton>Adicionar relatório</PrimaryButton></Link>
            </div>
        </Container>
    )
}

export default Header
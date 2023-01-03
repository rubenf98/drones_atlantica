import React from 'react'
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
                <SecundaryButton>Adicionar drone</SecundaryButton>
                <PrimaryButton>Adicionar relatório</PrimaryButton>
            </div>
        </Container>
    )
}

export default Header
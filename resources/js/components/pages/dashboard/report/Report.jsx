import React from 'react'
import styled from "styled-components";
import { PrimaryButton } from '../../../globalStyles';
import GraphContainer from './GraphContainer'
import TableContainer from './TableContainer';

const Title = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: clamp(20px, 4vw, 28px);
    }

`;

function Report() {
    return (
        <div>
            <Title>
                <h2>Histórico de voos</h2>
                <PrimaryButton>Adicionar relatório</PrimaryButton>
            </Title>

            <GraphContainer />

            <TableContainer />
        </div>
    )
}

export default Report
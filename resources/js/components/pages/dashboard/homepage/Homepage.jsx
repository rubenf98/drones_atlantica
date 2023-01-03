import React from 'react'
import DroneList from './DroneList'
import Header from './Header'
import Statistics from './Statistics';
import TableContainer from './TableContainer';
import styled from "styled-components";

const FlexContainer = styled.section`
    display: flex;
    gap: 100px;
`;


function Homepage() {
    return (
        <div>
            <Header />
            <DroneList />
            <FlexContainer>
                <Statistics />
                <TableContainer />
            </FlexContainer>
        </div>
    )
}

export default Homepage
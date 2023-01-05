import React from 'react'
import styled from "styled-components";
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'

const Container = styled.section`
    margin: 50px 0px 100px 0px;
`;


function GraphContainer() {
    return (
        <Container>
            <LineChart data={{ "2021-05-13": 2, "2021-05-14": 5 }} />
        </Container>
    )
}

export default GraphContainer
import React from 'react'
import styled from "styled-components";
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { connect } from 'react-redux';

const Container = styled.section`
    margin: 50px 0px 100px 0px;
`;


function ReportFlightGraphContainer({ data, loading }) {
    return (
        <Container>
            <LineChart data={data} />
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        loading: state.flightReport.loadingGraph,
        data: state.flightReport.dataGraph,
    };
};

export default connect(mapStateToProps, null)(ReportFlightGraphContainer);
import React from 'react'
import styled from "styled-components";
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { connect } from 'react-redux';

const Container = styled.section`
    margin: 50px 0px 100px 0px;
`;


function CrashReportGraphContainer({ data, loading }) {
    return (
        <Container>
            <LineChart data={data} />
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        loading: state.crashReport.loadingGraph,
        data: state.crashReport.dataGraph,
    };
};

export default connect(mapStateToProps, null)(CrashReportGraphContainer);
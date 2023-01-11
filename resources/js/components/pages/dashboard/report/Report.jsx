import React, { useEffect } from 'react'
import styled from "styled-components";
import { PrimaryButton } from '../../../globalStyles';
import ReportFlightGraphContainer from './ReportFlightGraphContainer'
import ReportFlightTableContainer from './ReportFlightTableContainer';
import { fetchFlightReportGraph, fetchFlightReports } from '../../../../redux/flightReport/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReportFlightMapContainer from './ReportFlightMapContainer';

const Title = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: clamp(20px, 4vw, 28px);
    }

`;

function Report({ fetchFlightReports, fetchFlightReportGraph }) {

    useEffect(() => {
        fetchFlightReports();
        fetchFlightReportGraph();
    }, [])

    return (
        <div>
            <Title>
                <h2>Histórico de voos</h2>
                <Link to="/painel/relatorios/create"><PrimaryButton>Adicionar relatório</PrimaryButton></Link>

            </Title>

            <ReportFlightGraphContainer />

            <ReportFlightTableContainer />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFlightReports: (data) => dispatch(fetchFlightReports(data)),
        fetchFlightReportGraph: (data) => dispatch(fetchFlightReportGraph(data)),
    };
};
export default connect(null, mapDispatchToProps)(Report)
import React, { useEffect } from 'react'
import styled from "styled-components";
import { PrimaryButton } from '../../../globalStyles';
import FlightReportGraphContainer from './FlightReportGraphContainer'
import FlightReportTableContainer from './FlightReportTableContainer';
import { fetchFlightReportGraph, fetchFlightReports } from '../../../../redux/flightReport/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Title = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: clamp(20px, 4vw, 28px);
    }

`;

function FlightReport({ fetchFlightReports, fetchFlightReportGraph }) {

    useEffect(() => {
        fetchFlightReports();
        fetchFlightReportGraph();
    }, [])

    const handlePageChange = (paginate) => {
        fetchFlightReports({ page: paginate.current });
    }

    return (
        <div>
            <Title>
                <h2>Histórico de voos</h2>
                <Link to="/painel/relatorios/create"><PrimaryButton>Adicionar relatório</PrimaryButton></Link>

            </Title>

            <FlightReportGraphContainer />

            <FlightReportTableContainer handlePageChange={handlePageChange} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFlightReports: (data) => dispatch(fetchFlightReports(data)),
        fetchFlightReportGraph: (data) => dispatch(fetchFlightReportGraph(data)),
    };
};
export default connect(null, mapDispatchToProps)(FlightReport)
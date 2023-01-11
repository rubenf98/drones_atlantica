import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { PrimaryButton } from '../../../globalStyles';
import CrashReportGraphContainer from './CrashReportGraphContainer'
import CrashReportTableContainer from './CrashReportTableContainer';
import { fetchCrashReportGraph, fetchCrashReports } from '../../../../redux/crashReport/actions';

const Title = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: clamp(20px, 4vw, 28px);
    }

`;

function CrashReport({ fetchCrashReports, fetchCrashReportGraph }) {

    useEffect(() => {
        fetchCrashReports();
        fetchCrashReportGraph();
    }, [])

    const handlePageChange = (paginate) => {
        fetchCrashReports({ page: paginate.current });
    }

    return (
        <div>
            <Title>
                <h2>Histórico de acidentes</h2>
                <Link to="/painel/acidentes/create"><PrimaryButton>Registar acidente</PrimaryButton></Link>
            </Title>

            <CrashReportGraphContainer />

            <CrashReportTableContainer handlePageChange={handlePageChange} />
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchCrashReports: (filters) => dispatch(fetchCrashReports(filters)),
        fetchCrashReportGraph: (filters) => dispatch(fetchCrashReportGraph(filters)),
    };
};
export default connect(null, mapDispatchToProps)(CrashReport)
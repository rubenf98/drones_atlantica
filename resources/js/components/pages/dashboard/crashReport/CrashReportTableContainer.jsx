import React from 'react'
import { connect } from 'react-redux';
import styled from "styled-components";
import TableContainer from '../../../common/TableContainer';

const Container = styled.section`
    flex: 1;

    h2 {
        margin-top: 0px;
    }
`;

const columns = [
    {
        title: 'Data',
        dataIndex: 'date',
    },
    {
        title: 'Relatório',
        dataIndex: 'flight_report',
        render: (record) => record.serial_number,
    },
    {
        title: 'Drone',
        dataIndex: 'flight_report',
        render: (record) => record.drone?.project?.name + " # " + record.drone?.serial_number,
    },
    {
        title: 'Danos',
        dataIndex: 'damage',
    },
    {
        title: '',
        dataIndex: '',
        render: (text, row) => <a>ver detalhes</a>,
    },
];

function CrashReportTableContainer({ data, loading, meta, handlePageChange }) {
    return (
        <Container>
            <h2>Últimos relatórios</h2>
            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.crashReport.loading,
        data: state.crashReport.data,
        meta: state.crashReport.meta,
    };
};

export default connect(mapStateToProps, null)(CrashReportTableContainer);
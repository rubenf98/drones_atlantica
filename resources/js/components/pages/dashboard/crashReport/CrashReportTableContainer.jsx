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



function CrashReportTableContainer({ data, loading, meta, handleRowClick, handlePageChange }) {

    const columns = [
        {
            title: 'Relatório',
            dataIndex: 'flightReport',
            render: (record) => record?.serial_number,
        },
        {
            title: 'Data',
            dataIndex: 'date',
        },

        {
            title: 'Drone',
            dataIndex: 'flightReport',
            render: (record) => record?.drone?.project?.name + " # " + record?.drone?.serial_number,
        },
        {
            title: 'Danos',
            dataIndex: 'damage',
        },
        {
            title: '',
            dataIndex: '',
            render: (text, row) => <a onClick={() => handleRowClick(row.id)}>ver detalhes</a>,
        },
    ];
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
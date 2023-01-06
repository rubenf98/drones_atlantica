import { Table } from 'antd';
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
        title: 'Nº de registo',
        dataIndex: 'serial_number',
    },
    {
        title: 'Drone Type',
        dataIndex: 'drone_type',
        render: (record) => record.name
    },
    {
        title: 'Proprietário',
        dataIndex: 'manufacturer',
        render: (record) => record.name
    },
    {
        title: 'Relatórios de voo',
        dataIndex: 'n_flight_reports',
    },
    {
        title: 'Ocorrências de acidentes',
        dataIndex: 'n_crash_reports',
    },
    {
        title: '',
        dataIndex: '',
        render: (text, row) => <a>ver detalhes</a>,
    },
];

function DroneTableContainer({ data, loading, meta }) {
    return (
        <Container>
            <h2>Últimos relatórios</h2>
            <TableContainer data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.drone.loading,
        data: state.drone.data,
        meta: state.drone.meta,
    };
};

export default connect(mapStateToProps, null)(DroneTableContainer);
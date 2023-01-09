import { Row, Table } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import TableContainer from '../../../common/TableContainer';
import { SecundaryButton } from '../../../globalStyles';

const Container = styled.section`
    flex: 1;

    h2 {
        margin-top: 0px;
    }
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50px;
`;

const columns = [
    {
        title: '',
        dataIndex: 'image',
        render: (record) => <Avatar src={"/images/drones/" + record} />
    },
    {
        title: 'Nº de registo',
        dataIndex: 'serial_number',
    },
    {
        title: 'Tipologia',
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
            <Row type="flex" justify="space-between" align="middle">
                <h2>Últimos relatórios</h2>
                <Link to="/painel/drones/create"><SecundaryButton>Adicionar drone</SecundaryButton></Link>
            </Row>
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
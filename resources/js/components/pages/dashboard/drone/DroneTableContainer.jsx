import { Col, Input, Row, Table } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import TableContainer from '../../../common/TableContainer';
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';

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
const Status = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: ${props => props.color};
`;



function DroneTableContainer({ data, loading, meta, handleRowClick, handlePageChange }) {

    const columns = [
        {
            title: '',
            dataIndex: 'image',
            render: (record) => <Avatar src={record} />
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
            title: 'Status',
            dataIndex: 'active',
            render: (status) => <Status color={status ? "green" : "red"} />
        },
        {
            title: '',
            dataIndex: '',
            render: (text, row) => <a onClick={() => handleRowClick(row.id)}>ver detalhes</a>,
        },
    ];

    return (
        <Container>

            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
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
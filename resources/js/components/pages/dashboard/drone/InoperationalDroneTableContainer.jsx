import { Col, Input, Row, Table } from 'antd';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import TableContainer from '../../../common/TableContainer';
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';
import { fetchInoperationalDrones } from '../../../../redux/drone/actions';

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



function InoperationalDroneTableContainer(props) {
    const { data, loading } = props;
    useEffect(() => {
        props.fetchInoperationalDrones();
    }, [])

    const columns = [
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
            render: (text, row) => <a onClick={() => props.handleRowClick(row.id)}>ver detalhes</a>,
        },
    ];

    return (
        <Container>

            <TableContainer data={data} loading={loading} columns={columns} />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInoperationalDrones: (filters) => dispatch(fetchInoperationalDrones(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.drone.loading,
        data: state.drone.inoperationalData,
        meta: state.drone.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InoperationalDroneTableContainer);
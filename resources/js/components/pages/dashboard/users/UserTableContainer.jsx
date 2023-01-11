import { Row, Table } from 'antd';
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

const columns = [
    {
        title: '',
        dataIndex: 'image',
        render: (record) => <Avatar src={"/images/drones/" + record} />
    },
    {
        title: '#',
        dataIndex: 'id',
    },
    {
        title: 'Nome',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Cargo',
        dataIndex: 'role',
    },
    {
        title: '',
        dataIndex: '',
        render: (text, row) => <a>apagar</a>,
    },
];

function UserTableContainer({ data, loading, meta, handlePageChange }) {
    return (
        <Container>
            <Row style={{ marginBottom: "30px" }} type="flex" justify="space-between" align="middle">
                <h2>Utilizadores</h2>
                <Link to="/painel/drones/create"><PrimaryButton>Adicionar utilizador</PrimaryButton></Link>
            </Row>
            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        data: state.user.data,
        meta: state.user.meta,
    };
};

export default connect(mapStateToProps, null)(UserTableContainer);
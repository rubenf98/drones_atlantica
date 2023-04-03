import { Popconfirm, Row, Table } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { deleteUser, setCurrentUser } from '../../../../redux/user/actions';
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

const OperationContainer = styled.div`
    display: flex;
    gap: 10px;
`;



function UserTableContainer({ data, loading, meta, handlePageChange, setCurrentUser, deleteUser }) {
    let navigate = useNavigate();

    const columns = [
        {
            title: '',
            dataIndex: 'image',
            render: (record) => <Avatar src={record} />
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
            render: (text, row) => <OperationContainer>
                <a onClick={() => handleEditClick(row)}>editar</a>
                <Popconfirm
                    title="Apagar utilizador"
                    description="Tem a certeza que pretende apagar este utilziador permanentemente?"
                    onConfirm={() => deleteUser(row.id)}
                    okText="Sim"
                    cancelText="Não"
                >
                    <a >apagar</a>
                </Popconfirm>
            </OperationContainer>,
        },
    ];

    const handleEditClick = (row) => {
        setCurrentUser(row)
        navigate("/painel/users/create?edit")
    }

    return (
        <Container>
            <Row style={{ marginBottom: "30px" }} type="flex" justify="space-between" align="middle">
                <h2>Utilizadores</h2>
                <Link to="/painel/users/create"><PrimaryButton>Adicionar utilizador</PrimaryButton></Link>
            </Row>
            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (filters) => dispatch(setCurrentUser(filters)),
        deleteUser: (id) => dispatch(deleteUser(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        data: state.user.data,
        meta: state.user.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTableContainer);
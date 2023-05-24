import { Col, Input, Popconfirm, Row, Table } from 'antd';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import styled from "styled-components";
import TableContainer from '../../../common/TableContainer';
import { fetchInoperationalOperators, deleteOperator, setCurrentOperator } from '../../../../redux/operator/actions';

const Container = styled.section`
    flex: 1;

    h2 {
        margin-top: 0px;
    }
`;

const OperationContainer = styled.div`
    display: flex;
    gap: 10px;
`;

function InoperationalOperatorTableContainer(props) {
    const { data, loading } = props;
    useEffect(() => {
        props.fetchInoperationalOperators();
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            render: (record, row) => (row.title ? row.title : "") + " " + record,
        },
        {
            title: 'País',
            dataIndex: 'country',
        },
        {
            title: 'Localidade',
            dataIndex: 'locality',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Número de telefone',
            dataIndex: 'phone',
        },
        {
            title: '',
            dataIndex: '',
            render: (text, row) => <OperationContainer>
                <a onClick={() => handleEditClick(row)}>editar</a>
            </OperationContainer>,
        },
    ];

    const handleEditClick = (row) => {
        props.setCurrentOperator(row)
        navigate("/painel/operador/create?edit")
    }

    return (
        <Container>
            <Row style={{ marginBottom: "30px" }} type="flex" justify="space-between" align="middle">
                <h3>Reserva</h3>
            </Row>
            <TableContainer data={data} loading={loading} columns={columns} />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentOperator: (filters) => dispatch(setCurrentOperator(filters)),
        deleteOperator: (id) => dispatch(deleteOperator(id)),
        fetchInoperationalOperators: (filters) => dispatch(fetchInoperationalOperators(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.operator.loading,
        data: state.operator.inoperationalData,
        meta: state.operator.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InoperationalOperatorTableContainer);
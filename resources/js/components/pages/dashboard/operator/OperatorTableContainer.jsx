import { Row, Table } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import TableContainer from '../../../common/TableContainer';
import { PrimaryButton } from '../../../globalStyles';

const Container = styled.section`
    flex: 1;

    h2 {
        margin-top: 0px;
    }
`;

const columns = [
    {
        title: '#',
        dataIndex: 'id',
    },
    {
        title: 'Operador',
        dataIndex: 'name',
        render: (record, row) => (row.title ? row.title : "") + " " + record,
    },
    {
        title: 'País',
        dataIndex: 'country',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: '',
        dataIndex: '',
        render: (text, row) => <a>apagar</a>,
    },
];

function OperatorTableContainer({ data, loading, meta, handlePageChange }) {
    return (
        <Container>
            <Row style={{ marginBottom: "30px" }} type="flex" justify="space-between" align="middle">
                <h2>Operadores</h2>
                <Link to="/painel/operador/create"><PrimaryButton>Adicionar operador</PrimaryButton></Link>
            </Row>
            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.operator.loading,
        data: state.operator.data,
        meta: state.operator.meta,
    };
};

export default connect(mapStateToProps, null)(OperatorTableContainer);
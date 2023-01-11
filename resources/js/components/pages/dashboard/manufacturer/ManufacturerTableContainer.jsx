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

const columns = [
    {
        title: '#',
        dataIndex: 'id',
    },
    {
        title: 'Fabricante',
        dataIndex: 'name',
    },
    {
        title: 'País',
        dataIndex: 'country',
    },
    {
        title: 'Morada',
        dataIndex: 'address',
    },
    {
        title: '',
        dataIndex: '',
        render: (text, row) => <a>apagar</a>,
    },
];

function ManufacturerTableContainer({ data, loading, meta, handlePageChange }) {
    return (
        <Container>
            <Row style={{ marginBottom: "30px" }} type="flex" justify="space-between" align="middle">
                <h2>Fabricantes</h2>
                <Link to="/painel/fabricante/create"><PrimaryButton>Adicionar operador</PrimaryButton></Link>
            </Row>
            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.manufacturer.loading,
        data: state.manufacturer.data,
        meta: state.manufacturer.meta,
    };
};

export default connect(mapStateToProps, null)(ManufacturerTableContainer);
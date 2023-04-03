import { Row, Popconfirm } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { deleteManufacturer, setCurrentManufacturer } from '../../../../redux/manufacturer/actions';
import TableContainer from '../../../common/TableContainer';
import { PrimaryButton } from '../../../globalStyles';

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

function ManufacturerTableContainer({ data, loading, meta, handlePageChange, deleteManufacturer, setCurrentManufacturer }) {
    let navigate = useNavigate();

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
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
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
            title: 'Morada',
            dataIndex: 'address',
        },
        {
            title: '',
            dataIndex: '',
            render: (text, row) => <OperationContainer>
                <a onClick={() => handleEditClick(row)}>editar</a>
                <Popconfirm
                    title="Apagar fabricante"
                    description="Tem a certeza que pretende apagar este fabricante permanentemente?"
                    onConfirm={() => deleteManufacturer(row.id)}
                    okText="Sim"
                    cancelText="Não"
                >
                    <a >apagar</a>
                </Popconfirm>
            </OperationContainer>,
        },
    ];

    const handleEditClick = (row) => {
        setCurrentManufacturer(row)
        navigate("/painel/fabricantes/create?edit")
    }

    return (
        <Container>
            <Row style={{ marginBottom: "30px" }} type="flex" justify="space-between" align="middle">
                <h2>Fabricantes</h2>
                <Link to="/painel/fabricantes/create"><PrimaryButton>Adicionar fabricante</PrimaryButton></Link>
            </Row>
            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentManufacturer: (filters) => dispatch(setCurrentManufacturer(filters)),
        deleteManufacturer: (id) => dispatch(deleteManufacturer(id)),
    };
};


const mapStateToProps = (state) => {
    return {
        loading: state.manufacturer.loading,
        data: state.manufacturer.data,
        meta: state.manufacturer.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerTableContainer);
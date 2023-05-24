import { Popconfirm, Row} from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { deleteOperator, setCurrentOperator } from '../../../../redux/operator/actions';
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




function OperatorTableContainer({ data, loading, meta, handlePageChange, deleteOperator, setCurrentOperator }) {
    let navigate = useNavigate();

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
                <Popconfirm
                    title="Apagar operador"
                    description="Tem a certeza que pretende apagar este operador permanentemente?"
                    onConfirm={() => deleteOperator(row.id)}
                    okText="Sim"
                    cancelText="Não"
                >
                    <a >apagar</a>
                </Popconfirm>
            </OperationContainer>,
        },
    ];

    const handleEditClick = (row) => {
        setCurrentOperator(row)
        navigate("/painel/operador/create?edit")
    }

    return (
        <Container>
            <Row style={{ marginBottom: "10px" }} type="flex" justify="space-between" align="middle">
                <h2>Operadores</h2>
                <Link to="/painel/operador/create"><PrimaryButton>Adicionar operador</PrimaryButton></Link>
            </Row>
            <TableContainer handlePageChange={handlePageChange} data={data} loading={loading} meta={meta} columns={columns} />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentOperator: (filters) => dispatch(setCurrentOperator(filters)),
        deleteOperator: (id) => dispatch(deleteOperator(id)),
    };
};


const mapStateToProps = (state) => {
    return {
        loading: state.operator.loading,
        data: state.operator.data,
        meta: state.operator.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperatorTableContainer);
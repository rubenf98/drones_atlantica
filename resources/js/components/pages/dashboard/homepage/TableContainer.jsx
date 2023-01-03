import { Table } from 'antd';
import React from 'react'
import styled from "styled-components";

const Container = styled.section`
    flex: 1;

    h2 {
        margin-top: 0px;
    }
`;

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Nº de registo',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Data',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Drone',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Localização',
        dataIndex: 'address',
        key: 'address',
    },
];

function TableContainer() {
    return (
        <Container>
            <h2>Últimos relatórios</h2>
            <Table dataSource={dataSource} columns={columns} />
        </Container>
    )
}

export default TableContainer
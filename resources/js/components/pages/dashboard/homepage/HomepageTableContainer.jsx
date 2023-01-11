import { Table } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import styled from "styled-components";
import TableContainer from '../../../common/TableContainer';

const Container = styled.section`
    flex: 1;

    h2 {
        margin-top: 0px;
    }
`;

const Status = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: ${props => props.crash ? "red" : "green"};
`;


const columns = [
    {
        title: 'Nº de registo',
        dataIndex: 'serial_number',
    },
    {
        title: 'Data',
        dataIndex: 'date',
    },
    {
        title: 'Drone',
        dataIndex: 'drone',
        render: (record) => record.project.name + " # " + record.serial_number,
    },
    {
        title: 'Localização',
        dataIndex: 'start_localization',
        render: (record) => record.district + ", " + record.conceil + ", " + record.place,
    },
    {
        title: 'Acidente',
        dataIndex: 'crashReport',
        render: (record) => <Status crash={record} />,
    },
];


function HomepageTableContainer({ data, loading }) {
    return (
        <Container>
            <h2>Últimos relatórios</h2>
            <TableContainer data={data} loading={loading} columns={columns} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.flightReport.loading,
        data: state.flightReport.data,
    };
};

export default connect(mapStateToProps, null)(HomepageTableContainer);
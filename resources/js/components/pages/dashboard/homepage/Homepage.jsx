import React, { useEffect } from 'react'
import DroneList from './DroneList'
import Header from './Header'
import Statistics from './Statistics';
import TableContainer from './TableContainer';
import styled from "styled-components";
import { connect } from 'react-redux';
import { fetchProjects } from '../../../../redux/project/actions';

const FlexContainer = styled.section`
    display: flex;
    gap: 100px;
`;


function Homepage({ fetchProjects }) {

    useEffect(() => {
        fetchProjects();
    }, [])

    return (
        <div>
            <Header />
            <DroneList />
            <FlexContainer>
                <Statistics />
                <TableContainer />
            </FlexContainer>
        </div>
    )
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
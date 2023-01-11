import React, { useEffect } from 'react'
import DroneList from './DroneList'
import Header from './Header'
import Statistics from './Statistics';
import HomepageTableContainer from './HomepageTableContainer';
import styled from "styled-components";
import { connect } from 'react-redux';
import { fetchProjects } from '../../../../redux/project/actions';
import { fetchFlightReports } from '../../../../redux/flightReport/actions';

const FlexContainer = styled.section`
    display: flex;
    gap: 100px;
`;


function Homepage({ fetchProjects, fetchFlightReports }) {

    useEffect(() => {
        fetchProjects();
        fetchFlightReports();
    }, [])

    return (
        <div>
            <Header />
            <DroneList />
            <FlexContainer>
                <Statistics />
                <HomepageTableContainer />
            </FlexContainer>
        </div>
    )
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        fetchFlightReports: () => dispatch(fetchFlightReports()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
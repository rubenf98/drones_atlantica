import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';

const Container = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    gap: 50px;
    margin: 100px auto;
`;

const Drone = styled(Link)`
    width: 33%;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    
    .background {
        width: 100%;
        height: 60%;
        bottom: 0;
        left: 0px;
        z-index: -1;
        position: absolute;
        background-color: ${({ theme }) => theme.primary};
        opacity: .2;
        transition: opacity .3s ease;
    }

    img  {
        width: 80%;
        margin: auto;
        display: block;
        height:  auto;
        margin-bottom: 30px;
    }

    h3 {
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        transition: color .3s ease;
        color: black;
        
    }

    &:hover {
        .background {
            opacity: .9;
        }

        h3 {
            color: white;
        }
    }

`;

function DroneList({ loading, data }) {

    return (
        <Container>
            {data.map((project) => (
                <Drone to={"/painel/drones?project=" + project.id} key={project.id}>
                    <div className='background' />
                    <img src={project.image} alt={project.name} />
                    <h3>{project.name}</h3>
                </Drone>
            ))}
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        loading: state.project.loading,
        data: state.project.data,
    };
};

export default connect(mapStateToProps, null)(DroneList);
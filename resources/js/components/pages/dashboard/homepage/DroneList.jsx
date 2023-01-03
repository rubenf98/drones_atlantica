import React from 'react'
import styled from "styled-components";
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';

const Container = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
    margin: 100px auto;
`;

const Drone = styled.div`
    width: 33%;
    position: relative;
    cursor: pointer;

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

function DroneList() {
    const drones = [
        { name: "Alpha", img: "/images/drones/alpha.png" },
        { name: "Alpha", img: "/images/drones/alpha.png" },
        { name: "Alpha", img: "/images/drones/alpha.png" },
        { name: "Alpha", img: "/images/drones/alpha.png" },
    ];

    return (
        <Container>
            {drones.map((drone) => (
                <Drone>
                    <div className='background' />
                    <img src={drone.img} alt={drone.name} />
                    <h3>{drone.name}</h3>
                </Drone>
            ))}
        </Container>
    )
}

export default DroneList
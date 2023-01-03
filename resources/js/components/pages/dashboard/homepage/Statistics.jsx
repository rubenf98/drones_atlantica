import React from 'react'
import styled from "styled-components";

const Container = styled.section`
//
`;

const Statistic = styled.div`
    display: flex;
    margin: 0px 0px 30px 0px;
    gap: 20px;
    align-items: center;
    background-color: #f4f4f4;
    padding: 20px 30px;
    box-sizing: border-box;

    img {
        height: auto;
        width: 60px; 
    }

    .container {
        flex: 1;
        

        .value {
            font-size: 50px;
            font-weight: 900;
            line-height: 94%;
            margin: 0px;
        }

        .description {
            font-size: 18px;
            opacity: .7;
            margin: 0px;
        }
    }
`;

function Statistics() {
    return (
        <Container>
            <Statistic>
                <img src="/images/icons/report_stat.svg" alt="" />
                <div className='container'>
                    <div className='value'>12</div>
                    <div className='description'>Relatórios de voo</div>
                </div>
            </Statistic>
            <Statistic>
                <img src="/images/icons/crash_stat.svg" alt="" />
                <div className='container'>
                    <div className='value'>01</div>
                    <div className='description'>Registo de acidentes</div>
                </div>
            </Statistic>

        </Container>
    )
}

export default Statistics
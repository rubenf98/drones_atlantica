import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
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

function Statistics({ data }) {
    const [values, setValues] = useState([0, 0]);
    useEffect(() => {
        if (data.length) {
            var reportCounter = 0, crashCounter = 0;
            data.map((project) => {
                reportCounter += project.n_flight_reports;
                crashCounter += project.n_crash_reports;
            });

            setValues([reportCounter, crashCounter]);
        }

    }, [data])

    return (
        <Container>
            <Statistic>
                <img src="/images/icons/report_stat.svg" alt="" />
                <div className='container'>
                    <div className='value'>{values[0]}</div>
                    <div className='description'>Relatórios de voo</div>
                </div>
            </Statistic>
            <Statistic>
                <img src="/images/icons/crash_stat.svg" alt="" />
                <div className='container'>
                    <div className='value'>{values[1]}</div>
                    <div className='description'>Registo de acidentes</div>
                </div>
            </Statistic>

        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.project.data,
    };
};

export default connect(mapStateToProps, null)(Statistics);
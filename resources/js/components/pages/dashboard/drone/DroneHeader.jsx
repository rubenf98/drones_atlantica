import React, { useRef, useEffect, useState } from 'react'
import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';


const DroneContainer = styled.section`
    display: flex;
    align-items: center;
    gap: 200px;
    flex-wrap: wrap;
    margin: 50px auto;
`;

const DroneImage = styled.img`
    flex: 1;
    max-height: 50vh;
    object-fit: contain;
`;

const Statistic = styled.div`
    display: flex;
    margin: 0px 0px 10px 0px;
    gap: 20px;
    align-items: center;
    padding: 20px 30px;
    box-sizing: border-box;

    img {
        height: auto;
        width: 50px !important; 
    }

    .container {
        text-align: left;

        .value {
            font-size: 42px;
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

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h1 {
        font-size: clamp(22px, 6vw, 36px);
    }

    .controls-container {
        button {
            cursor: pointer;
            padding: 10px 20px;
            box-sizing: border-box;
            border: 0px;
            background-color: #f2f2f2;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,.2);

            img {
                width: 15px !important;
            }
        }

        .next {
            margin-left: 20px;
        }
    }
`;

function DroneHeader({ data, setCurrentSlide, currentSlide, currentId,
    setCurrentId }) {
    const carousel = useRef();

    const handleNext = () => {
        var nextValue = currentSlide < data.length - 1 ? currentSlide + 1 : 0;

        setCurrentId(nextValue + 1);
        setCurrentSlide(nextValue);
    }

    const handlePrevious = () => {
        var nextValue = currentSlide > 0 ? currentSlide - 1 : data.length - 1;

        setCurrentId(nextValue + 1);
        setCurrentSlide(nextValue);
    }

    return (
        <div>
            {data.length ?
                <Carousel selectedItem={currentSlide} infiniteLoop ref={carousel} showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} swipeable={false}  >
                    {data.map((project) => (
                        <>
                            <TitleContainer>
                                <h1>{project.name}</h1>
                                <div className='controls-container'>
                                    <button onClick={handlePrevious} className='previous'> <img src="/images/icons/previous.svg" alt="" /></button>
                                    <button onClick={handleNext} className='next'> <img src="/images/icons/next.svg" alt="" /></button>
                                </div>
                            </TitleContainer>

                            <DroneContainer>
                                <DroneImage src={project.full_image} />
                                <div>
                                    <Statistic>
                                        <img src="/images/icons/report_stat.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_flight_reports}</div>
                                            <div className='description'>Relatórios de voo</div>
                                        </div>
                                    </Statistic>
                                    <Statistic>
                                        <img src="/images/icons/crash_stat.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_crash_reports}</div>
                                            <div className='description'>Ocorrências de acidentes</div>
                                        </div>
                                    </Statistic>    
                                    <Statistic>
                                        <img src="/images/icons/crash_stat.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_drones}</div>
                                            <div className='description'>Séries produzidas</div>
                                        </div>
                                    </Statistic>
                                </div>
                            </DroneContainer>
                        </>
                    ))}


                </Carousel>
                : <></>}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        loading: state.project.loading,
        data: state.project.data,
    };
};

export default connect(mapStateToProps, null)(DroneHeader);
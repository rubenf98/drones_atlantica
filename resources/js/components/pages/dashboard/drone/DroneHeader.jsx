import React, { useRef } from 'react'
import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';
import { Col, Row } from 'antd';



const DroneImage = styled.img`
    width: 100%;
    max-height: 300px;
    object-fit: contain;
`;

const StatisticContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const Statistic = styled.div`
    display: flex;
    margin: 0px;
    gap: 20px;
    align-items: center;
    padding: 20px 30px;
    box-sizing: border-box;

    img {
        height: auto;
        width: 65px !important; 
    }

    .container {
        text-align: left;

        .value {
            font-size: 32px;
            font-weight: 900;
            line-height: 94%;
            margin: 0px;
        }

        .description {
            font-size: 16px;
            opacity: .8;
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
        font-size: clamp(20px, 6vw, 32px);
        font-weight: 500;
        margin: 10px;
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
                width: 12px !important;
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
        <div style={{ marginBottom: "50px" }}>
            {data.length ?
                <Carousel selectedItem={currentSlide} infiniteLoop ref={carousel} showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} swipeable={false}  >
                    {data.map((project) => (
                        <Row type="flex" gutter={32}>
                            <Col span={12}>
                                <TitleContainer>
                                    <h1>Projeto {project.name}</h1>
                                    <div className='controls-container'>
                                        <button onClick={handlePrevious} className='previous'> <img src="/images/icons/previous.svg" alt="" /></button>
                                        <button onClick={handleNext} className='next'> <img src="/images/icons/next.svg" alt="" /></button>
                                    </div>
                                </TitleContainer>

                                <DroneImage src={project.full_image} />
                            </Col>
                            <Col span={6}>
                                <StatisticContainer>
                                    <Statistic>
                                        <img src="/images/icons/flights.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_flight_reports}</div>
                                            <div className='description'>Relatórios de voo</div>
                                        </div>
                                    </Statistic>
                                    <Statistic>
                                        <img src="/images/icons/crashes.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_crash_reports}</div>
                                            <div className='description'>Ocorrências de acidentes</div>
                                        </div>
                                    </Statistic>
                                    <Statistic>
                                        <img src="/images/icons/series.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_drones}</div>
                                            <div className='description'>Séries produzidas</div>
                                        </div>
                                    </Statistic>
                                </StatisticContainer>
                            </Col>
                            <Col span={6}>
                                <StatisticContainer>
                                    <Statistic>
                                        <img src="/images/icons/manufacturers.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_manufacturers}</div>
                                            <div className='description'>Fabricantes</div>
                                        </div>
                                    </Statistic>
                                    <Statistic>
                                        <img src="/images/icons/flight_time.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_flight_hours}</div>
                                            <div className='description'>Horas de voo</div>
                                        </div>
                                    </Statistic>
                                    <Statistic>
                                        <img src="/images/icons/status.svg" alt="" />
                                        <div className='container'>
                                            <div className='value'>{project.n_active}</div>
                                            <div className='description'>Drones ativos</div>
                                        </div>
                                    </Statistic>
                                </StatisticContainer>
                            </Col>
                        </Row>
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
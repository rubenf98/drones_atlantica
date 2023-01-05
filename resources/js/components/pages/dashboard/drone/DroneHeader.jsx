import React, { useRef } from 'react'
import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";


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
    object-fit: cover;
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
        width: 60px !important; 
    }

    .container {
        text-align: left;

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

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: clamp(22px, 6vw, 36px);
    }

    .controls-container {
        display: flex;
        gap: 20px;

        button {
            cursor: pointer;
            padding: 10px 20px;
            box-sizing: border-box;
            border: 0px;
            background-color: #f2f2f2;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,.2);

            img {
                width: 15px;
            }
        }
    }
`;

const drones = [
    { name: "Alpha", img: "/images/drones/alpha.png" },
    { name: "Alpha", img: "/images/drones/alpha.png" },
    { name: "Alpha", img: "/images/drones/alpha.png" },
    { name: "Alpha", img: "/images/drones/alpha.png" },
];

function DroneHeader() {
    const carousel = useRef();


    const handleNext = () => {
        carousel.current.increment();
    }

    const handlePrevious = () => {
        carousel.current.decrement();
    }

    return (
        <div>
            <TitleContainer>
                <h1>Alpha Interior</h1>
                <div className='controls-container'>
                    <button onClick={handlePrevious} className='previous'> <img src="/images/icons/previous.svg" alt="" /></button>
                    <button onClick={handleNext} className='next'> <img src="/images/icons/next.svg" alt="" /></button>
                </div>
            </TitleContainer>
            <Carousel infiniteLoop ref={carousel} showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} swipeable={false}  >
                {drones.map((drone) => (
                    <DroneContainer>
                        <DroneImage src="/images/drones/bravo.png" />
                        <div>
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
                            <Statistic>
                                <img src="/images/icons/crash_stat.svg" alt="" />
                                <div className='container'>
                                    <div className='value'>01</div>
                                    <div className='description'>Registo de acidentes</div>
                                </div>
                            </Statistic>
                        </div>
                    </DroneContainer>
                ))}


            </Carousel>
        </div>
    )
}

export default DroneHeader
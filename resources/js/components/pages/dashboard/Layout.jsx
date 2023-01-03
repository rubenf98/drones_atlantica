import React from "react";
import styled from "styled-components";
import ScrollToTop from "../../common/ScrollToTop"
import ThemeContainer from "../../ThemeContainer";
import Navbar from "./Navbar";

const Container = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
`;

const Separator = styled.div`
    height: 90%;
    width: 1px;
    background-color: #000;
    opacity: .3;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
`;

const Sidemenu = styled.section`
    min-width: 250px;
    min-height: 100vh;
    padding: 40px 60px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;

    h1 {
        color: rgba(0,0,0,.5);
        font-weight: 700; 
        font-size: 36px; 
        opacity: .8;
        text-align: center;

        span {
            color:  rgba(0,0,0,1);
        }
    }

`;

const Profile = styled.div`
    margin: 50px 0px 50px 0px;

    img {
        width: 140px;
        height: 140px;
        border-radius: 140px;
        margin: auto;
        display: block;
    }

    h2 {
        font-size: 24px;
        text-align: center;
        margin: 30px 0px 0px 0px;
    }

    p {
        font-size: 18px;
        opacity: .7;
        text-align: center;
        margin-top: 5px;
    }

`;

const Logout = styled.div`
    color: black;
    opacity: .6;
    text-decoration: none;
    display: flex;
    font-size: 18px;
    padding-left: 40px;
    cursor: pointer;

    img {
        width: 20px;
        height: auto;
        margin-right: 8px;
    }
`;

const Content = styled.section`
    flex: 1;
    min-height: 100vh;
    padding: 57px 100px;
    box-sizing: border-box;
`;


function Layout({ children }) {
    return (
        <ThemeContainer>
            <ScrollToTop>
                <Container>
                    <Sidemenu>
                        <Separator />
                        <h1>Drones <span>Atlântica</span></h1>

                        <Profile>
                            <img src="/images/users/profile.png" alt="" />
                            <h2>Victor Azevedo</h2>
                            <p>victor.azevedo@arditi.pt</p>
                        </Profile>

                        <Navbar />

                        <Logout >
                            <img src="/images/icons/exit.svg" />
                            Sair
                        </Logout>
                    </Sidemenu>
                    <Content>
                        {children}
                    </Content>
                </Container>
            </ScrollToTop>
        </ThemeContainer>
    )
}

export default Layout

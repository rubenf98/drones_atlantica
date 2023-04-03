import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PrivateRoute from "../../common/PrivateRoute";
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
    min-width: 350px;
    height: 100vh;
    padding: 40px 50px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #1c1c1c;
    position: sticky;
    top: 0;
    left: 0;

    h1 {
        color: rgba(255,255,255,.5);
        font-weight: 700; 
        font-size: 36px; 
        opacity: .8;
        text-align: center;

        span {
            color:  rgba(255,255,255,1);
        }
    }

`;

const Profile = styled.div`
    margin: 50px 0px 50px 0px;
    color: white;

    img {
        width: 150px;
        height: 150px;
        border-radius: 150px;
        margin: auto;
        display: block;
        object-fit: cover;
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
    color: white;
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
        filter: invert(1);
    }
`;

const Content = styled.section`
    padding: 60px 100px;
    box-sizing: border-box;
    flex: 1;
    min-height: 100vh;  
    max-width: calc(100vw - 350px);
`;


function Layout({ children, loading, currentUser }) {
    return (
        <ThemeContainer>

            <ScrollToTop>
                <PrivateRoute>
                    <Container>
                        <Sidemenu>
                            <Separator />
                            <h1>Drones <span>Atlântica</span></h1>

                            <Profile>
                                <img src={currentUser.image} alt={currentUser.name} />
                                <h2>{currentUser.name}</h2>
                                <p>{currentUser.email}</p>
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
                </PrivateRoute>
            </ScrollToTop>
        </ThemeContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        currentUser: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, null)(Layout);

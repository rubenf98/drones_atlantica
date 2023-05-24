import { Breadcrumb } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const Back = styled.div`
    display: flex;
    gap: 3px;
    font-size: 16px;
    align-items: center;
    text-decoration: underline;
    cursor: pointer;

    img {
        width: 15px;
    }
`;


function BreadcrumbContainer({ links, currentPage }) {
    const navigate = useNavigate();
    return (
        <Container>
            <Back onClick={() => navigate(-1)}>
                <img src="/icon/back.svg" alt="" />
                <p>VOLTAR</p>
            </Back>
            <Breadcrumb>
                {links.map((link, index) => (
                    <Breadcrumb.Item key={index}><Link to={link.to}>{link.name}</Link> </Breadcrumb.Item>
                ))}
                <Breadcrumb.Item>{currentPage}</Breadcrumb.Item>

            </Breadcrumb>
        </Container>
    )
}

export default BreadcrumbContainer
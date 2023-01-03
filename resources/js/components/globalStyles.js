import { createGlobalStyle } from "styled-components"
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.background} !important;
        color: ${({ theme }) => theme.text} !important;
    }  
`

const CustomButton = styled.button`
    padding: 10px 18px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
`;


export const PrimaryButton = styled(CustomButton)`
    background-color:  ${({ theme }) => theme.primary};
    color: white;
    border: 1px solid ${({ theme }) => theme.primary};
`;

export const SecundaryButton = styled(CustomButton)`
    background-color: white;
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
`;

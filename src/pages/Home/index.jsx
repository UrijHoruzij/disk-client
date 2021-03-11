import React from 'react'
import styled from "styled-components"
import bg from "./bg.jpg"
import { Sidebar, Content } from "../../modules"

const ContainerBg = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(${bg});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ContainerGrid = styled.div`
    display: grid;
    margin: 24px;
    grid-template-rows: 1fr;
    grid-template-columns: 320px 1fr;
    width: 100%;
    height: 100%;
    grid-template-areas:
        "sidebar content"; 
    background: ${props => props.theme.colors.colorBg};
    @media screen and (max-width: 751px){
        grid-template-columns: 1fr;
        grid-template-areas: 
        "sidebar"
        "content";
        margin: 0;
    }
`

const Home = () => {
    return (
        <ContainerBg>
            <ContainerGrid>
                <Content/>
                <Sidebar/>
            </ContainerGrid>
        </ContainerBg>
    )
}

export default Home
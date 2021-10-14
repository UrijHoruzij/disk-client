import React from 'react'
import styled from "styled-components"
import {Typography,Button,Image} from "ui-nature"
import img from "./img.jpg";
import {AUTH_CLIENT_URL, DISK_CLIENT_URL} from "../../config"

const ContainerGrid = styled.div`
    display: grid;
    margin: auto;
    padding: 0 16px;
    grid-template-rows: 60px 1fr;
    grid-template-columns: 30% 70%;
    max-width: 1170px;
    width: 100%;
    height: 100%;
    grid-template-areas:
        "header header"
        "content image";
    align-items: center;
    @media screen and (max-width: 767px){
        grid-template-columns: 1fr;
        grid-template-areas: 
        "header"
        "content"
        "image";    
    }
    @media screen and (max-width: 575px){
        max-width: 100%;
        align-items: flex-start;
    }
`
const Header = styled.div`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 575px){
        display: none;
    }
`
const Content = styled.div`
    grid-area: content;
`
const ContentImage = styled.div`
    grid-area: image;
    justify-content: center; 
`
const TypographyHeading = styled(Typography)`
    margin-bottom: 32px;
    font-size: 28px;
    line-height: 32px;
    color: ${props => props.theme.colorAccent}
`
const Text = styled(Typography)`
    margin-bottom: 24px;
    font-size: 18px;
    line-height: 22px;
`
const ButtonWrapper = styled(Button)`
    height: 44px;
    max-width: 320px;
`
const LinkWrapper = styled.a`
    text-decoration: none;
    outline: none;
    display: inline-block;
`
const LinkWrapperButtonHeader = styled(LinkWrapper)`
    margin-left: 16px;
`
const LinkWrapperButton = styled(LinkWrapper)`
    width: 100%;
    @media screen and (max-width: 767px){
        display: flex;
        justify-content: center;
    }  
`

const urlAuth = `${AUTH_CLIENT_URL}/?redirectURL=${DISK_CLIENT_URL}`;
const Main = () => {
    return (
        <ContainerGrid>
            <Header>
                <Typography type="h1">
                    Хранилище
                </Typography>
                <Buttons>
                    <LinkWrapperButtonHeader href={urlAuth}>
                        <Button type="primary">
                            Войти
                        </Button>
                    </LinkWrapperButtonHeader>
                </Buttons>
            </Header>
            <Content>
                <TypographyHeading type="h2">
                    Бесплатное хранилище для ваших файлов
                </TypographyHeading>
                <Text type="text">
                    Соберите воедино свои
                    документы, фотографии, видео,
                    файлы — и работайте так, 
                    как вам удобно
                </Text>
                <LinkWrapperButton href={urlAuth}>
                    <ButtonWrapper fullWidth type="primary">
                        Начать
                    </ButtonWrapper>
                </LinkWrapperButton>
            </Content>
            <ContentImage>
                <Image src={img}></Image>
            </ContentImage>
        </ContainerGrid>
    )
}

export default Main
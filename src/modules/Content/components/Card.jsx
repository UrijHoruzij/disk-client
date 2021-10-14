import React from 'react'
import styled, { css } from 'styled-components'
import { Typography, IconButton} from 'ui-nature'
import directoryImage from './directory.svg'
import fileImage from './file.svg'

const CardContainer = styled.div`
    width: 100%;
    max-width: 368px;
    height: 112px;
    position: relative;
    z-index: 10;
    ${props => props.type === "directory" ? 
        css`cursor: pointer` : null
    }
    @media screen and (max-width: 751px){
        max-width: 352px;
    }
`
const CardIcon = styled.div`
    position: relative;
    width: 96px;
    height: 96px;
    ${props => props.type === "directory" ?
        css`
            background-image: url(${directoryImage});
            background-repeat: no-repeat;
        ` :
        css`
            background-image: url(${fileImage});
            background-repeat: no-repeat;
        `
    }
`
const TypeFile = styled.div`
    margin: 0;
    position: absolute;
    bottom: 8px;
    left: 8px;
    font-family: ${props => props.theme.fontFamily};
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.theme.colors.colorAccent};
`
const CardSurface = styled.div`
    position: absolute;
    top: 28px;
    left: 48px;
    width: 100%;
    max-width: 288px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.theme.colors.colorBg};
    ${props => props.theme.shadow.popup}
    ${props => props.type === "directory" ? css`
        cursor: pointer;
    ` : null}
    @media screen and (max-width: 383px){
        max-width: 236px;
    }
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-right: 8px;
`
const IconButtonWrapper = styled(IconButton)`
    margin-left: 8px;
`
const IconButtonRemove = styled(IconButtonWrapper)`
    background-color: ${props => props.theme.colors.colorError};
    &:hover{
        background-color: ${props => props.theme.colors.colorError};
    }
`
const TypographyName = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 8px;
`
const changeContent = (type, file) => {
    switch (type) {
        case "directory":
            return <CardIcon type={type}/>
        case "file":
            return (<CardIcon type={type}>
                <TypeFile>{file.type}</TypeFile>
            </CardIcon>)
        default:
            return (<CardIcon type={type}>
                <TypeFile>{file.type}</TypeFile>
            </CardIcon>)
    }
}

const Card = props => {
    const {
        type,
        file,
        openDirHandler,
        shareClickHandler,
        downloadClickHandler,
        showPopupLink,
        showPopupRemove
    } = props;

    return (
        <CardContainer type={type} onClick={(e) => type==="directory" ? openDirHandler(e, file) : null}>
            { changeContent(type, file) }
            <CardSurface type={type}>
                <TypographyName>{file.name}</TypographyName>
                <Buttons>
                    {type!=="directory" ? (
                        <>
                            <IconButtonWrapper onClick={
                                () => {file.accessLink
                                    ? showPopupLink(file)
                                    : shareClickHandler(file)}
                            } {
                                ...file.accessLink
                                    ? {icon: "basket"}
                                    : {icon:"share"}
                                } type="outline-primary"/>
                            <IconButtonWrapper onClick={() => downloadClickHandler(file)} icon="download" type="primary"/>
                        </>
                    ) : null}
                    <IconButtonRemove onClick={() => type==="directory" ? null : showPopupRemove(file)} icon="close"/>
                </Buttons>
            </CardSurface>
        </CardContainer>
    )
}

export default Card

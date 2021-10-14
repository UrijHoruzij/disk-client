import React, {useState} from 'react'
import styled from 'styled-components'
import {Frame, IconButton, Input, Empty} from 'ui-nature'
import { FixedSizeGrid as Grid } from 'react-window';
import { connect } from "react-redux";
import store from "../../../redux/store";
import { fileActions } from "../../../redux/actions";
import Card from './Card';
import Popup from "./Popup";
import PopupRemove from './PopupRemove';
import {DISK_URL} from "../../../config";
import Typography from 'ui-nature/dist/Typography';

const Container = styled.div`
    grid-area: content;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    margin-right: 16px;
    z-index: 0;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    margin-top: 16px;
`
const IconButtonBack = styled(IconButton)`
    margin-right: 16px;
`
const FrameContainer = styled(Grid)`
    outline: none;
`
const GridContainer = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    margin-top: 24px;
    z-index: 10;
`
const DropArea = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border: 2px dashed ${props => props.theme.colors.colorAccent};
`
const EmptyContainer = styled(Empty)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

const Content = props => {
    const {
        dirStack,
        files,
        currentDir,
        user,
    } = props;

    const [search, setSearch] = useState('')
    const [link, setLink] = useState('')
    const [idFile, setIdFile] = useState('')
    const [visiblePopupLink, setVisiblePopupLink] = useState(false)
    const [dragEnter, setDragEnter] = useState(false)
    const [visiblePopupRemove, setVisiblePopupRemove] = useState(false);
    const [fileRemove, setFileRemove] = useState();
    
    const dragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    const dragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        store.dispatch(fileActions.uploadFile(files, currentDir, user))
        setDragEnter(false)
    }
    const showPopupRemove = (file) => {
        setFileRemove(file)
        setVisiblePopupRemove(true);
    }
    const hidePopupRemove = () => {
        setVisiblePopupRemove(false);
    }
    const showPopupLink = (file) => {
        let url = DISK_URL+"/file/"
        setIdFile(file._id)
        setLink(url + file.accessLink)
        setVisiblePopupLink(true)
    }
    const hidePopupLink = () => {
        setVisiblePopupLink(false)
    }
    const linkHandler = (event) => {
        setLink(event.target.value)
    }
    const removeHandler = (idFile) => {
        store.dispatch(fileActions.removeShareLink(idFile))
        setIdFile('')
        setLink('')
        setVisiblePopupLink(false)
    }
    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        store.dispatch(fileActions.setCurrentDir(backDirId))
    }
    const openDirHandler = (e, file) => {
        let button = e.target.closest('button');
        if(button){
            showPopupRemove(file)
        }else{
            store.dispatch(fileActions.setPushToStack(currentDir))
            store.dispatch(fileActions.setCurrentDir(file._id))
        }
    }
    const shareClickHandler = (file) => {
        store.dispatch(fileActions.setShareLink(file,showPopupLink))
    }
    const downloadClickHandler = (file) => {
        store.dispatch(fileActions.downloadFile(file))
    }
    const deleteClickHandler = (file) => {
        hidePopupRemove();
        store.dispatch(fileActions.deleteFile(file));
    } 
    const searchHandler = (event) => {
        setSearch(event.target.value)
        store.dispatch(fileActions.searchFiles(event.target.value))
    }
    const changeTypeContent = (file) => {
        if(file !== undefined){
            if(file.type === 'dir' ){
                return <Card showPopupRemove={showPopupRemove} openDirHandler={openDirHandler} file={file} type="directory"/>
            }
            return <Card showPopupRemove={showPopupRemove} showPopupLink={showPopupLink} shareClickHandler={shareClickHandler} downloadClickHandler={downloadClickHandler} file={file} type="file"/>
        }
    }
    
    let styleWrapper = {
        "width": "100%",
        "overflowX": "hidden",
    }
    let columnWidth = 352;
    let countColumn;
    let rowCount;
    let widthContainer;
    if(document.documentElement.clientWidth >= 752){
        widthContainer = (document.documentElement.clientWidth - 400)
    }else{
        styleWrapper = {
            "overflowX": "hidden",
        }
        widthContainer = (document.documentElement.clientWidth - 32)
        if(document.documentElement.clientWidth <= 383){
            columnWidth = 288
        }  
    }
    countColumn = Math.floor(widthContainer / columnWidth)
    rowCount = Math.ceil(files.length / countColumn)
    const renderCell = ({ columnIndex, rowIndex, style, data }) => (
        <div style={style}>
            {changeTypeContent(data[(rowIndex*countColumn)+columnIndex])}
        </div>
    );
    return ( 
        <Container>
            <Header>
                <IconButtonBack size="24" type="link" icon="arrow-left-2" onClick={() => backClickHandler()}/>
                <Input placeholder="Поиск..." value={search} onChange={searchHandler} visibleTitle={false} />
            </Header>
            <GridContainer onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                {!dragEnter ?
                    files ? (
                        <Frame as={FrameContainer}
                            style={styleWrapper}
                            itemData={files}
                            columnWidth={columnWidth}
                            columnCount={countColumn}
                            height={document.documentElement.clientHeight - 72}
                            rowHeight={112}
                            rowCount={rowCount}
                            width={widthContainer}
                        >
                            {renderCell}
                        </Frame>
                    ) : (
                        <EmptyContainer description="Файлы не найдены"/>
                    )
                : (
                    <DropArea onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                        <Typography type="text">
                            Перетащите файлы сюда
                        </Typography>
                    </DropArea>
                )}   
            </GridContainer>
            <Popup 
                visiblePopupLink={visiblePopupLink}
                hidePopupLink={hidePopupLink}
                link={link}
                linkHandler={linkHandler}
                removeHandler={removeHandler}
                idFile={idFile}
            />
            <PopupRemove 
                visiblePopupRemove={visiblePopupRemove}
                hidePopupRemove={hidePopupRemove}
                deleteHandler={deleteClickHandler}
                fileRemove={fileRemove}
            />
        </Container>
    )
}

export default connect(({file,user}) => ({
  dirStack: file.dirStack,
  files: file.files,
  currentDir: file.currentDir,
  user: user,
  loader: file.loader
}), fileActions)(Content)

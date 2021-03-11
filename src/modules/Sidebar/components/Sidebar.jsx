import React,{useEffect,useState} from "react";
import styled from "styled-components"
import { Sidebar, Typography, Menu, Avatar, ProgressBar, Button, Frame} from "ui-nature"
import store from "../../../redux/store";
import { userActions, fileActions } from "../../../redux/actions";
import { connect } from "react-redux";
import sizeFormat from "../../../utils/sizeFormat"
import UploadFile from "./UploadFile"
import Popup from "./Popup"

const SidebarWrapper = styled(Sidebar)`
  position: relative;
  align-items: flex-start;
  grid-area: sidebar;
  @media screen and (max-width: 751px){
    width: 100%;
    max-width: 751px;
    max-height: 100%;
  }
`
const SidebarContent = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`
const User = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 24px;
  left: 16px;
  @media screen and (max-width: 751px){
    position: relative;
  }
`
const UserInfo = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`
const ButtonUpload = styled(Button)`
  margin-top: 24px;
  height: 44px;
`
const ButtonCreate = styled(Button)`
  margin-top: 16px;
  height: 44px;
`
const MenuWrapper = styled(Menu)`
  margin-top: 24px;
`
const UseDisk = styled.div`
  margin-top: 36px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ProgressDisk = styled(ProgressBar)`
  width: 100%;
`
const UseTextDisk = styled(Typography)`
  margin-top: 12px;
`
const FrameWrapper = styled(Frame)`
  margin-bottom: 44px;
`

const SidebarContainer = props => {
  const {
    currentDir,
    user,
    filesUpload,
  } = props;
  const [sort, setSort] = useState('file')
  const [dirName, setDirName] = useState('')
  const [usedDisk, setUsedDisk] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if(user.id){
      store.dispatch(fileActions.getFiles(currentDir, sort))
      const onePercent = user.diskSpace / 100;
      const percent = user.usedSpace / onePercent;
      setUsedDisk(percent.toFixed(1))
    }
  }, [currentDir, sort, user, setUsedDisk]);

  const fileUploadHandler = (event) => {
    let files = [...event.target.files]
    store.dispatch(fileActions.uploadFile(files, currentDir, user))
  }
  const removeUploadFile = (fileId,stop) => {
    store.dispatch(fileActions.removeUploadFile(fileId,stop))
  }

  const showPopupHandler = () => {
    setVisible(true)
  } 
  const hidePopupHandler = () => {
    setVisible(false)
  }
  const dirNameHandler = (event) => {
    setDirName(event.target.value)
  }
  const createHandler = () => {
    if(dirName !== ''){
      store.dispatch(fileActions.createDir(currentDir, dirName))
      setDirName('')
      setVisible(false)
    }
  }

  const menu = [
    {
      id: 1,
      name: "Файлы",
      icon: "file",
      onClick: () => setSort('file'),
    },
    {
      id: 2,
      name: "Последние",
      icon: "last-time",
      onClick: () => setSort('last'),
    },
    {
      id: 3,
      name: "Фотографии",
      icon: "photo",
      onClick: () => setSort('photo'),
    },
    {
      id: 4,
      name: "Видео",
      icon: "video",
      onClick: () => setSort('video'),
    },
  ]
  const logout = async (props) => {
    const data = await store.dispatch(userActions.logout())
    const {isAuth} = data;
    if (isAuth === true) {
        props.history.push('/');
    }
  }

  return (
    <SidebarWrapper color="#ebeaea">
      <SidebarContent>
        <Typography type="h1">
          Хранилище
        </Typography>
        <Typography type="text">
            Соберите воедино свои <br/>
            документы, фотографии, видео,<br/>
            файлы — и работайте так, <br/>
            как вам удобно.
        </Typography>
        <ButtonUpload overlay={
          <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file"/>
        } fullWidth type="primary">
            Загрузить файл
        </ButtonUpload>
        <ButtonCreate onClick={showPopupHandler} fullWidth type="outline-primary">
            Создать папку
        </ButtonCreate>
      </SidebarContent>
      <MenuWrapper menu={menu} activItem={1} />
      <SidebarContent>
        <UseDisk>
          <ProgressDisk percent={usedDisk}/>
          {user.usedSpace >= 0 && user.diskSpace ? (
            <UseTextDisk type="text">
              Использовано {sizeFormat(user.usedSpace)} из {sizeFormat(user.diskSpace)}
            </UseTextDisk>
          ) : null}
        </UseDisk>
        <Typography type="h3">
            Загрузки
        </Typography>
        <FrameWrapper>
          {filesUpload.map(file =>
              <UploadFile key={file.id} file={file} removeUploadFile={removeUploadFile} />
          )}
        </FrameWrapper>
      </SidebarContent>
      <User>
          {user.id ? 
          <Avatar 
            user={user.id}
            fullname={user.name + " " + user.lastname}
            isOnline={user.isAuth}
            size="small"
          /> : null}
        <UserInfo>
          <Typography margin type="h3">
              {user.name} {user.lastname}
          </Typography>
          <Button onClick={logout} type="link-primary">
              Выйти
          </Button>
        </UserInfo>
      </User>
      <Popup 
        visible={visible}
        hidePopupHandler={hidePopupHandler}
        dirName={dirName}
        dirNameHandler={dirNameHandler}
        createHandler={createHandler}
      />
    </SidebarWrapper>
  )
}

export default connect(({file, user}) => ({
  currentDir: file.currentDir,
  user: user,
  filesUpload: file.filesUpload,
}), fileActions)(SidebarContainer)                    
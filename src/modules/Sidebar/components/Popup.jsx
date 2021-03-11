import React from 'react'
import styled from 'styled-components'
import {Popup, Input, Button} from 'ui-nature'

const PopupContainer = styled(Popup)`
    min-width: 320px;
`
const PopupWrapper = props => {
    const {
        visible,
        hidePopupHandler,
        dirName,
        dirNameHandler,
        createHandler
    } = props;
    return (
        <PopupContainer title="Создать новую папку" visible={visible} type="popup-close" onClose={hidePopupHandler}>
          <Input placeholder="Введите название папки..." value={dirName} onChange={dirNameHandler}></Input>
          <Button type="primary" onClick={createHandler}>Создать</Button>
        </PopupContainer>
    )
}

export default PopupWrapper

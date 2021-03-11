import React from 'react'
import styled from 'styled-components'
import {Popup, Input, Button} from 'ui-nature'

const PopupContainer = styled(Popup)`
    min-width: 320px;
`
const ButtonRemove = styled(Button)`
    background-color: ${props => props.theme.colors.colorError};
    &:hover{
        background-color: ${props => props.theme.colors.colorError};
    }
`
const PopupWrapper = props => {
    const {
        visiblePopupLink,
        hidePopupLink,
        link,
        linkHandler,
        removeHandler,
        idFile
    } = props;

    return (
        <PopupContainer title="Доступ по ссылке" visible={visiblePopupLink} type="popup-close" onClose={hidePopupLink}>
          <Input readonly value={link} onChange={linkHandler}></Input>
          <ButtonRemove type="primary" onClick={() => removeHandler(idFile)}>Удалить</ButtonRemove>
        </PopupContainer>
    )
}

export default PopupWrapper

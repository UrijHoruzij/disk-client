import React from 'react'
import styled from 'styled-components'
import {Popup, Button} from 'ui-nature'

const PopupContainer = styled(Popup)`
    min-width: 320px;
`
const ContainerButtons = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`
const ButtonRemove = styled(Button)`
    background-color: ${props => props.theme.colors.colorError};
    &:hover{
        background-color: ${props => props.theme.colors.colorError};
    }
`
const ButtonСlose = styled(Button)``

const PopupWrapper = props => {
    const {
        visiblePopupRemove,
        hidePopupRemove,
        deleteHandler,
        fileRemove
    } = props;

    return (
        <PopupContainer title="Удалить?" visible={visiblePopupRemove} type="popup-close" onClose={hidePopupRemove}>
            <ContainerButtons>
                <ButtonRemove type="primary" onClick={() => deleteHandler(fileRemove)}>Удалить</ButtonRemove>
                <ButtonСlose type="outline" onClick={() => hidePopupRemove()}>Отмена</ButtonСlose>
            </ContainerButtons>  
        </PopupContainer>
    )
}

export default PopupWrapper

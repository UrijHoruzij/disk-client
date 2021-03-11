import React from 'react'
import styled from 'styled-components'
import {Typography, ProgressBar, IconButton} from 'ui-nature'

const Container = styled.div`
    margin-top: 16px;
    height: 34px;
    width: 100%;
    display: flex;
    align-items: center;
    /* align-items: flex-end; */
    justify-content: center;
`
const SubContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
`
const NameUpload = styled(Typography)`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`
const ProgressUpload = styled(ProgressBar)`
    margin-top: 4px;
    width: 100%;
    margin-bottom: 6px;
`
const RemoveButton = styled(IconButton)`
    margin-left: 16px;
`
const UploadFile = props => {
    const { file, removeUploadFile } = props;
    return (
        <Container>
            <SubContainer>
                <NameUpload margin type="text">
                    {file.name}
                </NameUpload>
                <ProgressUpload type={file.error ? 'error' : 'success'} percent={file.progress}/>
            </SubContainer>
            <RemoveButton type="link" icon="close" onClick={() => removeUploadFile(file.id,file.stop)}/>
        </Container>
    )
}

export default UploadFile

import { fileApi } from "../../core/api";
import {userActions} from './';
import {DISK_URL} from "../../config";
import {slicer, support} from 'slicer-file'
import {core} from '../../core'
const Actions = {
    setAddUploadFile: (file) => ({
        type: "FILE:ADD_UPLOAD_FILE",
        payload: file,
    }),
    setRemoveUploadFile: (fileId) => ({
        type: "FILE:REMOVE_UPLOAD_FILE",
        payload: fileId,
    }),
    setChangeUploadFile: (data) => ({
        type: "FILE:CHANGE_UPLOAD_FILE",
        payload: data,
    }),
    setFiles: (files) => ({
        type: 'FILE:SET_FILES', 
        payload: files
    }),
    setPushToStack: (dir) => ({
        type: 'FILE:PUSH_TO_STACK', 
        payload: dir
    }),
    setCurrentDir: (dir) => ({
        type: 'FILE:SET_CURRENT_DIR', 
        payload: dir
    }),
    setAddFile: (file) => ({
        type: 'FILE:ADD_FILE', 
        payload: file
    }),
    setDeleteFileAction: (dirId) => ({
        type: 'FILE:DELETE_FILE', 
        payload: dirId
    }),
    showLoader: () => ({
        type: 'FILE:SHOW_LOADER'
    }),
    hideLoader: () => ({
        type: 'FILE:HIDE_LOADER'
    }),
    setShareLinkAction: (file) => ({
        type: 'FILE:SET_SHARE_LINK',
        payload: file
    }),
    removeShareLinkAction: (file) => ({
        type: 'FILE:REMOVE_SHARE_LINK',
        payload: file
    }),
    getFiles: (dirId, sort) => async (dispatch) =>{
        try {
            dispatch(Actions.showLoader())
            const data = await fileApi.getFiles(dirId, sort);
            dispatch(Actions.setFiles(data))
            dispatch(Actions.hideLoader())
        } catch (error) {
            console.error(error);
        } 
    },
    createDir: (dirId, name) => async (dispatch) =>{
        try {
            const data = await fileApi.createDir(dirId, name)
            dispatch(Actions.setAddFile(data))
        } catch (error) {
            console.error(error);
        }
    },
    removeUploadFile: (fileId,stopObj) => async (dispatch) => {
        stopObj.stop = true;
        dispatch(Actions.setRemoveUploadFile(fileId))
    },
    uploadFile: (files, dirId, user) => async (dispatch) => {
        let stopArray = []
        files.forEach((file, index) => {
            stopArray[index] = {}
            const uploadFile = {name: file.name, progress: 0, id: index, stop: stopArray[index]};
            dispatch(Actions.setAddUploadFile(uploadFile));
        })
        const delay = async (file, form, callback, index) => {
            await slicer(DISK_URL, {}, file, 1024*1024, form, callback, stopArray[index]);
        }
        for (let index = 0; index<files.length; index++) {
            if(support()){
                const callback = (uploadFile) => {
                    const upload = {
                        id: index,
                        progress: uploadFile.progress,
                        name: uploadFile.name,
                        error: uploadFile.error ? true : false,
                        stop: stopArray[index]
                    }
                    dispatch(Actions.setChangeUploadFile(upload))
                    if(uploadFile.progress === 100){
                        dispatch(Actions.setRemoveUploadFile(index))
                        if(uploadFile.data){
                            dispatch(Actions.setAddFile(uploadFile.data.data))
                        }
                        dispatch(userActions.getMe(core.GetAuthUser()))
                    }
                }
                let form = {
                    user: user.id,
                };
                if (dirId) {
                    form = {
                        user: user.id,
                        parent: dirId
                    };
                }
                await delay(files[index], form, callback, index)
            }       
        }
    },
    
    deleteFile: (file) => async (dispatch) => {
        try {
            await fileApi.deleteFile(file._id);
            dispatch(Actions.setDeleteFileAction(file._id))
            dispatch(userActions.getMe(core.GetAuthUser()))
        } catch (error) {
            console.error(error);
        }  
    },
    downloadFile: (file) => async () => {
        try {
            const data = await fileApi.downloadFile(file._id)
            const downloadUrl = window.URL.createObjectURL(new Blob([data]))
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error(error);
        }
    },
    setShareLink: (file, callback) => async (dispatch) => {
        try {
            const data = await fileApi.setShareLink(file)
            dispatch(Actions.setShareLinkAction(data))
            callback(data)
        } catch (error) {
            console.error(error);
        }   
    },
    removeShareLink: (idFile) => async (dispatch) => {
        try {
            const data = await fileApi.removeShareLink(idFile)
            dispatch(Actions.removeShareLinkAction(data))
        } catch (error) {
            console.error(error);
        }
    },
    searchFiles: (search) => async (dispatch) => {
        try {
            const data = await fileApi.searchFiles(search);
            dispatch(Actions.setFiles(data))
            dispatch(Actions.hideLoader())
        } catch (error) {
            console.error(error);
        }
    }
}
export default Actions
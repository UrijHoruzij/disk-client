const initialState = {
    files: [],
    currentDir: null,
    dirStack: [],
    loader: false,
    filesUpload: [],
}

export default function fileReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'FILE:SET_FILES': return {...state, files: payload}
        case 'FILE:SET_CURRENT_DIR': return {...state, currentDir: payload}
        case 'FILE:ADD_FILE': return {...state, files: [...state.files, payload]}
        case 'FILE:PUSH_TO_STACK': return {...state, dirStack: [...state.dirStack, payload]}
        case 'FILE:DELETE_FILE': return {...state, files: [...state.files.filter(file => file._id !== payload)]}
        case 'FILE:SHOW_LOADER': return {...state, loader: true}
        case 'FILE:HIDE_LOADER': return {...state, loader: false}
        case 'FILE:ADD_UPLOAD_FILE':
            return {...state, filesUpload: [...state.filesUpload, payload]}
        case 'FILE:REMOVE_UPLOAD_FILE':
            return {...state, filesUpload: [...state.filesUpload.filter(file => file.id !== payload)]}
        case 'FILE:CHANGE_UPLOAD_FILE':
            return {
                ...state,
                filesUpload: [...state.filesUpload.map(file => file.id === payload.id
                    ? {...file, progress: payload.progress}
                    : {...file}
                )]
            }
        case 'FILE:SET_SHARE_LINK':
            return {
                ...state,
                files: [...state.files.map(file => file._id === payload._id
                    ? {...file, accessLink: payload.accessLink}
                    : {...file}
                )]
            }
        case 'FILE:REMOVE_SHARE_LINK':
            return {
                ...state,
                files: [...state.files.map(file => file._id === payload._id
                    ? {...file, accessLink: null}
                    : {...file}
                )]
            }
        default:
            return state
    }
}
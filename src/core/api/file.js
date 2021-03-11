import {DISK_URL} from "../../config";
import {core} from "../"

const fileApi = {
    getFiles: (dirId, sort) => {
        let url = `${DISK_URL}`
        if (dirId) {
            url = `${DISK_URL}/?parent=${dirId}`
        }
        if (sort) {
            url = `${DISK_URL}/?sort=${sort}`
        }
        if (dirId && sort) {
            url = `${DISK_URL}/?parent=${dirId}&sort=${sort}`
        }
        return core.http(url);
    },
    createDir: (dirId,name) => core.http(`${DISK_URL}`,"POST", {
        name,
        parent: dirId,
        type: 'dir'
    }),
    downloadFile: fileId => core.http(`${DISK_URL}/download?id=${fileId}`,"GET",{}, {responseType: 'blob'}),
    deleteFile: fileId => core.http(`${DISK_URL}/?id=${fileId}`,"DELETE"),
    setShareLink: file => core.http(`${DISK_URL}/setShareLink`,"POST", {id: file._id}),
    removeShareLink: idFile => core.http(`${DISK_URL}/removeShareLink/?id=${idFile}`, "DELETE"),
    searchFiles: search => core.http(`${DISK_URL}/search?search=${search}`)
};
export default fileApi

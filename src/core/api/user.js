import {AUTH_URL,DISK_URL} from "../../config";
import {core} from "../"

const userApi = {
    signIn: SSOToken => core.signIn(`${AUTH_URL}/signinSSO`,{SSOToken: SSOToken}),
    refresh: () => core.refresh(),
    logout: () => core.http(`${AUTH_URL}/logout`, "POST"),
    getMe: (idUser) => core.http(`${DISK_URL}/getMe`, "POST",{idUser: idUser})
}
export default userApi
import Core from "request-jwt"
import {AUTH_URL} from "../config";

let obj = new Core(`${AUTH_URL}/refresh`);
export default obj;
import { userApi } from "../../core/api";
import {core} from "../../core";

const Actions = {
  setUserData: (data) => ({
    type: "USER:SET_DATA",
    payload: data,
  }),
  setIsAuth: (bool) => ({
    type: "USER:SET_IS_AUTH",
    payload: bool,
  }),

  fetchUserLogin: () => async (dispatch) => {
    try {
      const data = await userApi.signIn(window.SSOToken);
      dispatch(Actions.setIsAuth(true));
      dispatch(Actions.getInfo(data))
      window.SSOToken = null;
      dispatch(Actions.getMe(core.GetAuthUser()))
      return data;
    } catch (error){
      console.error(error);
    }
  },

  refresh: () => async (dispatch)=>{
    try{
      const data = await userApi.refresh();
      dispatch(Actions.setIsAuth(true));
      dispatch(Actions.getInfo(data));
      dispatch(Actions.getMe(core.GetAuthUser()));
      return data;
    }catch (error){
      console.error(error);
    }
  },

  logout: () => async (dispatch) => {
    try {
      const data = await userApi.logout();
      core.SetAccessToken('');
      dispatch(Actions.setIsAuth(false))
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  getMe: (idUser) => async (dispatch) => {
    try{
      const data = await userApi.getMe(idUser);
      dispatch(Actions.setUserData(data))
      core.SetUser(data.id)
      return data;
    }catch (error){
      console.error(error);
    }
  },
  
  getInfo: (data) => async (dispatch) => {
    const info = {
      name: data.name,
      lastname: data.lastname
    }
    dispatch(Actions.setUserData(info))
  } 
};

export default Actions;
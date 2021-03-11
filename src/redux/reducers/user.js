const initialState = {
  asseccToken: window.asseccToken,
  isAuth: !!window.asseccToken,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER:SET_DATA":
      return {
        ...state,
        ...payload,
        isAuth: true,
        asseccToken: window.asseccToken,
      };
    case "USER:SET_IS_AUTH":
      return {
        ...state,
        isAuth: payload,
      };
    default:
      return state;
  }
};

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        lang: action.lang
      }
    default:
      return state;
  }
};

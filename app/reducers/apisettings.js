const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APISETTINGS':
      return {
        ...state,
        apiSettings: JSON.parse(JSON.stringify(action.apiSettings))
      }
    default:
      return state;
  }
};

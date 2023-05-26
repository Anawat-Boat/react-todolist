const init = [];

function reducer(state = init, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      const idx = state.findIndex((x) => x.id === action.payload.id);
      state[idx].isDone = true;
      return state;
    case "DELETE":
      return state.filter((x) => x.id !== action.payload.id);
    default:
      return state;
  }
}
export default reducer;

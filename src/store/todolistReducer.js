const init = {
  list: [],
  loading: false,
};

function todolistReducer(state = init, action) {
  switch (action.type) {
    case "ADD":
      const tempAdd = { ...state };
      tempAdd.list.push(action.payload);
      tempAdd.loading = false;
      return tempAdd;
    case "UPDATE":
      const tempUpdate = { ...state };
      const idx = tempUpdate.list.findIndex((x) => x.id === action.payload.id);
      tempUpdate.list[idx].isDone = true;
      tempUpdate.loading = false;
      return tempUpdate;
    case "DELETE":
      const tempDelete = { ...state };
      const idxDelete = tempDelete.list.findIndex(
        (x) => x.id === action.payload.id
      );
      tempDelete.list.splice(idxDelete, 1);
      tempDelete.loading = false;
      return tempDelete;
    case "LOADING":
      const tempLoad = { ...state };
      tempLoad.loading = true;
      return tempLoad;
    default:
      return state;
  }
}
export default todolistReducer;

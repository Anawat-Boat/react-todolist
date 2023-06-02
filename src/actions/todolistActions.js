function loading() {
  return {
    type: "LOADING",
  };
}

export function actionAsync(payload) {
  return (dispatch) => {
    dispatch(loading());
    setTimeout(() => {
      dispatch(payload);
    }, 5000);
  };
}

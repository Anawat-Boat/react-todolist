import { useReducer } from "react";

const initialState = {
  count: 0,
};
const reducerFuncertion = (state = initialState, { type, payload }) => {
  switch (type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function Home() {
  const [state, dispatch] = useReducer(reducerFuncertion, initialState);
  const incretement = () => {
    dispatch({ type: "INCREMENT" });
  };
  const decreatment = () => {
    dispatch({ type: "DECREMENT" });
  };
  return (
    <>
      <h1>Home Page</h1>
      <h2>UseReducer</h2>
      <h3>Count: {state.count}</h3>
      <button onClick={incretement}>Increment</button>
      <button onClick={decreatment}>Decrement</button>
    </>
  );
}

export default Home;

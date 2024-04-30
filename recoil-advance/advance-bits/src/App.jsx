import { Suspense } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { todosAtomFamily } from "./store/selectorFamily.js";
import PropTypes from "prop-types";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Todo id={1} />
        <Todo id={2} />
        <Todo id={2} />
      </Suspense>
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const [todo] = useRecoilState(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  );
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
};

export default App;

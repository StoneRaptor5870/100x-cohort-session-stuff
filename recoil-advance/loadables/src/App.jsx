import { RecoilRoot, useRecoilStateLoadable } from 'recoil';
import { todosAtomFamily } from './atom.js';
import PropTypes from "prop-types";
import './App.css'

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
   const [todo] = useRecoilStateLoadable(todosAtomFamily(id));
   if (todo.state === "loading") {
      return <div>loading</div>
   }
   
   return (
    <>
      {todo.contents.title}
      {todo.contents.description}
      <br />
    </>
  )
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
};

export default App
import { RecoilRoot, useRecoilState } from 'recoil'
import './App.css'
import { todosAtomFamily } from './store/atomFamily'
import PropTypes from 'prop-types';

function App() {

  return (
    <RecoilRoot>
      <Todo id={1}/>
      <Todo id={2}/>
      <Todo id={2}/>
    </RecoilRoot>
  )
}

function Todo({id}) {
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
  id: PropTypes.number.isRequired
};

export default App

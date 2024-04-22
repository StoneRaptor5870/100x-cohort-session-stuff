import { useState } from "react";
import PropTypes from 'prop-types';

function App() {
  const [ count, setCount ] = useState(0);

  return (
    <div>
      <CustomButton count={count} setCount={setCount}></CustomButton>
    </div>
  )
}

function CustomButton(props) {
  function onButtonClick() {
    props.setCount(props.count + 1);
  }
  return <button onClick={onButtonClick}>Counter {props.count}</button>;
}

CustomButton.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired
};

export default App;
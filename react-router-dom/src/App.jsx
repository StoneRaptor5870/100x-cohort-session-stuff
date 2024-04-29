import { useContext, useState } from "react";
import { CountContext } from "./context";
import PropTypes from "prop-types";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CountContext.Provider value={count}>
        <Count setCount={setCount} />
      </CountContext.Provider>
    </div>
  )
}

function Count({setCount}) {
  return (
    <div>
      <CountRenderer />
      <Buttons setCount={setCount} />
    </div>
  )
}

function CountRenderer() {
  const count = useContext(CountContext);

  return <div>
    {count}
  </div>
}

function Buttons({setCount}) {
  const count = useContext(CountContext);

  return <div>
    <button onClick={() => {setCount(count+1)}}>Increase</button>
    <button onClick={() => {setCount(count-1)}}>Decrease</button>
  </div>
}

Count.propTypes = {
  setCount: PropTypes.func.isRequired
};

Buttons.propTypes = {
  setCount: PropTypes.func.isRequired
};

export default App;
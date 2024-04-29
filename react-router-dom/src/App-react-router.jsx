import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const Dashboard = lazy(() => import("./components/Dashboard"));
const Landing = lazy(() => import("./components/Landing"));

function App() {

  return (
    <div>
      <BrowserRouter>
        <Appbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

function Appbar() {
  const navigate = useNavigate();

  return(
    <div style={{display: "flex", justifyContent: "space-around", margin: "30px"}}>
      <button onClick={() => navigate("/")}>Landing Page</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard Page</button>
    </div>
  );
}

export default App;

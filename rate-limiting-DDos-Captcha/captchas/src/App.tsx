import { Turnstile } from "@marsidev/react-turnstile";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [token, setToken] = useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "20px"
      }}
    >
      <input placeholder="OTP" style={{ width: "450px" }}></input>
      <input placeholder="New password" style={{ width: "450px" }}></input>

      <Turnstile
        onSuccess={(token) => {
          setToken(token);
        }}
        siteKey="0x4AAAAAAAXtEe2JIeAEUcjX" /* dummy siteKey */
      />

      <button
        onClick={() => {
          axios.post("http://localhost:3000/reset-password", {
            email: "abc@gmail.com",
            otp: "1234",
            token: token,
          });
        }}
        style={{ width: "150px", marginTop: "-20px" }}
      >
        Update password
      </button>
    </div>
  );
}

export default App;

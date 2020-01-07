import React, { useState } from "react";
import axios from "axios";
import decoder from "jwt-decode";

const Values = () => {
  const [values2, setValues] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const [tokenInfo, setTokenInfo] = useState({});

  React.useEffect(() => {
    axios
      .get("https://localhost:44349/values")
      .then(response => {
        setValues(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleEmail2(event) {
    setEmail2(event.target.value);
  }

  function handlePassword2(event) {
    setPassword2(event.target.value);
  }

  function register() {
    axios.post("https://localhost:44349/auth/register", { email, password });
  }

  function login() {
    axios
      .post("https://localhost:44349/auth/login", {
        email: email2,
        password: password2
      })
      .then(response => {
        setTokenInfo(decoder(response.data.token));
      });
  }

  console.log(tokenInfo);
  return (
    <div>
      {values2.map(value => (
        <p>{value.name}</p>
      ))}

      <div>
        <input onChange={handleEmail} value={email} />
        <input onChange={handlePassword} value={password} />
        <button onClick={register}>register</button>
      </div>
      <div>
        <input onChange={handleEmail2} value={email2} />
        <input onChange={handlePassword2} value={password2} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};
export default Values;

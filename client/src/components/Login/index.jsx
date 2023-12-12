import React, { useState } from "react";
import "./style.css";
import axios from "axios";
function Login({ setLogin, setUserId }) {
  const [userData, setUserData] = useState({
    email: "",
    pass: "",
  });

  function loginUser(e) {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/users?useremail=${userData.email}&password=${userData.pass}`
      )
      .then((res) => {
        if (res.data.length) {
          setLogin(true);
          setUserId(res.data[0].id);
        } else setLogin(false);
      });
  }
  return (
    <div className="login">
      <div className="login-content">
        <h3>Login</h3>
        <form action="" onSubmit={loginUser}>
          <input
            type="email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            placeholder="Your Email"
          />
          <input
            type="password"
            onChange={(e) => setUserData({ ...userData, pass: e.target.value })}
            placeholder="Your Password"
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;

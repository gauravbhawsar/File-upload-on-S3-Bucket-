import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);
  const userLogin = () => {
    window.open(`http://localhost:4000/auth/google/callback`, "_self");
  };
  const getUser = async () => {
    try {
      await axios
        .get("http://localhost:4000/auth/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          //   console.log(response);rs
          if (response.data.user !== undefined) {
            console.log(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={() => userLogin()}>LOGIN</button>
    </div>
  );
}

export default Login;

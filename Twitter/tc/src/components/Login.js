import React, { useState } from 'react';
import { USER_API_ENDPOINT } from '../utils/constant.js';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getUser } from '../redux/userSlice.js';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // ---- LOGIN ----
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/login`,
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log(response.data);

        if (response.data.success) {
          // ✅ store token & user in localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          dispatch(getUser(response.data.user));
          navigate("/");
          toast.success(response.data.message);
        }
      } catch (err) {
        console.log("Login error:", err);
        if (err.response?.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    } else {
      // ---- SIGNUP ----
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/register`,
          { name, email, username: userName, password },
          { headers: { "Content-Type": "application/json" } }
        );

        setIsLogin(true);
        toast.success(response.data.message);
      } catch (err) {
        console.log("Register error:", err);
        if (err.response?.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    }
  };

  function loginSignupHandler() {
    setIsLogin(!isLogin);
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='d-flex items-center justify-evenly w-[80%]'>
        <div>
          <img
            className="ml-6"
            width={250}
            src='https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png'
          />
        </div>
        <div>
          <div className='my-3'>
            <h3 className='font-bold text-6xl'>Happening Now.</h3>
          </div>
          <h3 className='mt-3 mb-2 text-2xl font-bold'>
            {!isLogin ? "Signup" : "Login"}
          </h3>
          <form className='flex flex-col w-[55%]' onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                  className='outline-blue-500 border-none border border-gray-800 px-3 py-1 rounded-full my-1'
                />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder='Username'
                  className='outline-blue-500 border-none border border-gray-800 px-3 py-1 rounded-full my-1'
                />
              </>
            )}

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='outline-blue-500 border-none border border-gray-800 px-3 py-1 rounded-full my-1'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='outline-blue-500 border-none border border-gray-800 px-3 py-1 rounded-full my-1'
            />

            <button className='bg-[#1D98F0] border-none py-2 my-4 rounded-full text-lg text-white'>
              {!isLogin ? "Signup" : "Login"}
            </button>

            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={loginSignupHandler}
                className='font-bold text-blue-600 cursor-pointer'
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

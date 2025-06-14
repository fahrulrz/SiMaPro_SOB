"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import "../../styles/style.css";

import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import myImageLoader from "@/lib/loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password); // login dari context
      console.log("Login success ", res);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  // useEffect(() => {
  //   if (user) router.push("/home");
  // }, [user]);

  return (
    <div className="w-screen h-screen flex justify-center bg-[#FBF9F1]">
      <div className="flex flex-row max-sm:flex-col bg-primary w-full h-full items-center">
        <div className="flex bg-[#FBF9F1] max-sm:bg-primary w-2/5 max-sm:flex-1 max-sm:w-full max-sm:px-0 h-full justify-center max-sm:justify-normal max-sm:mb-8 items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo SiMaPro"
            width={500}
            loader={myImageLoader}
            height={500}
            className="bg-white flex justify-center items-center text-black"
          />
        </div>
        <form
          // action="/home"
          // method="post"
          onSubmit={handleLogin}
          className="flex flex-1 h-1/2 max-sm:h-full max-sm:w-full max-sm:mt-10 flex-col gap-4 justify-center max-sm:justify-normal px-52 max-sm:px-10">
          <div className="flex flex-col h-1/4 gap-4 justify-center ">
            <div className="flex flex-auto">
              <label htmlFor="username" className="w-full relative block">
                <span className="absolute inset-y-0 left-4 flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: "1.5rem" }}
                    className="text-primary"
                  />
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ color: "var(--primary)" }}
                  className="w-full h-full border-none rounded-[5px] placeholder:text-[var(--hint)] placeholder:font-bold placeholder:tracking-wide ps-12 font-bold tracking-wide focus:ring-2 focus:outline-none focus:ring-[var(--border)]"
                />
              </label>
            </div>
            <div className="flex flex-auto">
              <label htmlFor="password" className="w-full relative block">
                <div className="relative w-full h-full">
                  <span className="absolute inset-y-0 left-4 flex items-center">
                    <FontAwesomeIcon
                      icon={faLock}
                      style={{ fontSize: "1.5rem" }}
                      className="text-primary"
                    />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-full border-none rounded-[5px] placeholder:text-[var(--hint)] placeholder:font-bold placeholder:tracking-wide ps-12 font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-[var(--border)] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center h-12 gap-5 ">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="bg-white h-full gap-3 max-sm:text-sm text-primary flex flex-1 justify-center items-center rounded-[20px] font-bold tracking-wide">
              <span className="max-sm:ms-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  viewBox="0 0 256 262">
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
              </span>
              Sign in with Google
            </button>
            <button
              type="submit"
              className="w-1/2 h-full bg-white text-primary flex flex-1 justify-center items-center rounded-[20px] font-bold tracking-wide">
              Login
            </button>
          </div>
          <div className="flex max-sm:flex-col w-full justify-between text-white">
            <div>
              Don&apos;t have an account?
              <a
                href="register"
                className="text-blue-500 hover:underline font-black ms-2">
                Sign up
              </a>
            </div>
            <div className="flex">
              <a href="reset-password" className="text-white hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Login.getLayout = function getLayout(page: React.ReactElement) {
//   return <div>{page}</div>
// }

// export default Login;

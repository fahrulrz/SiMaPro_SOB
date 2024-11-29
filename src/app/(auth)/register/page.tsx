"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import "../../styles/style.css";

import Image from "next/image";
import React, { useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
// import { register } from "@/api/auth";
// import { login } from "@/api/auth";

const Register = () => {
  // const { login: setUser } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const {register} = useAuth();

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      alert("Registration successful!");
      router.push("/home");
    } catch (error) {
      console.error("Error during registration:", error);
      alert(`Registration failed. ${error}`);
    }
  };

  return (
    <div className="w-screen h-screen  justify-center bg-[#FBF9F1]">
      <div className="flex flex-row max-sm:flex-col bg-primary w-full h-full items-center">
        <div className="flex bg-[#FBF9F1] max-sm:mt-0 max-sm:mb-0 w-2/5 max-sm:flex-1 max-sm:w-full max-sm:px-10 h-full max-sm:h-full justify-center max-sm:justify-normal items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo SiMaPro"
            width={500}
            height={500}
            className="bg-white flex justify-center items-center text-black"
          />
        </div>
        <div
          className="flex flex-1 sm:min-h-[80vh] max-sm:min-h-50vh max-sm:mt-10  max-sm:w-full flex-col gap-4 justify-center max-sm:justify-normal px-52 max-sm:px-10">
          <div className="flex flex-col h-44 gap-4 justify-center ">
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
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setName(e.target.value)}
                  style={{ color: "var(--primary)" }}
                  className="w-full h-full border-none rounded-[5px] placeholder:text-[var(--hint)] placeholder:font-bold placeholder:tracking-wide ps-12 font-bold tracking-wide focus:ring-2 focus:outline-none focus:ring-[var(--border)]"
                />
              </label>
            </div>
            <div className="flex flex-auto">
              <label htmlFor="email" className="w-full relative block">
                <span className="absolute inset-y-0 left-4 flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ fontSize: "1.5rem" }}
                    className="text-primary"
                  />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-primary h-full border-none rounded-[5px] placeholder:text-[var(--hint)] placeholder:font-bold placeholder:tracking-wide ps-12 font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
                />
              </label>
            </div>
            <div className="flex flex-auto">
              <label htmlFor="password" className="w-full relative block">
                <span className="absolute inset-y-0 left-4 flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ fontSize: "1.5rem" }}
                    className="text-primary"
                  />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full border-none rounded-[5px] placeholder:text-[var(--hint)] placeholder:font-bold placeholder:tracking-wide ps-12 font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center h-12 gap-5 ">
            <button
              onClick={handleRegister}
              className="w-1/2 h-full bg-white text-primary flex flex-1 justify-center items-center rounded-[20px] font-bold tracking-wide">
              Register
            </button>
          </div>
          <div className="flex w-full text-white">
            <div>
              Have an account?
              <a
                href="login"
                className="text-blue-500 hover:underline font-black ms-2">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

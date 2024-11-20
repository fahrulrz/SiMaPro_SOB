import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import "../../styles/style.css";

import Image from "next/image";

const Register = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-row bg-primary w-full h-full items-center">
        <div className="flex bg-[#FBF9F1] w-2/5 h-full justify-center items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo SiMaPro"
            width={500}
            height={500}
            className="bg-white flex justify-center items-center text-black"
          />
        </div>
        <form
          action="/home"
          method="post"
          className="flex flex-1 h-[80vh] flex-col gap-4 justify-center px-52">
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
                  id="username"
                  name="username"
                  placeholder="Username"
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
                  className="w-full h-full border-none rounded-[5px] placeholder:text-[var(--hint)] placeholder:font-bold placeholder:tracking-wide ps-12 font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center h-12 gap-5 ">
                {/* <button
                type="submit"
                className="bg-white h-full text-primary w-1/2 flex flex-1 justify-center items-center rounded-[20px] font-bold tracking-wide">
                <span>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.6em"
                    height="1.6em"
                    viewBox="0 0 256 262"
                    className="me-3">
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
                </button> */}
            <button
              type="submit"
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
        </form>
      </div>
    </div>
  );
};


export default Register;
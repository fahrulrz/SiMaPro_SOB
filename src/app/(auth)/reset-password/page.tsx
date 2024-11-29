import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "../../styles/style.css";

import Image from "next/image";

export default function ResetPassword() {
  return (
    <div className="w-screen h-screen flex justify-center bg-white">
      <div className="flex flex-row max-sm:flex-col bg-primary w-full h-full items-center">
        <div className="flex bg-[#FBF9F1] max-sm:mt-0 max-sm:mb-0 w-2/5 max-sm:flex-1 max-sm:w-full max-sm:px-10 h-full max-sm:h-full justify-center max-sm:justify-normal items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo SiMaPro"
            width={500}
            height={500}
            className="bg-white flex justify-center items-center text-black max-sm:mb-0 max-sm:mt-auto"
          />
        </div>
        <form
          action="/home"
          method="post"
          className="flex flex-1 sm:min-h-[80vh] max-sm:min-h-[70vh] max-sm:mt-10  max-sm:w-full  flex-col gap-4 justify-center max-sm:justify-normal px-52 max-sm:px-10">
          <div className="text-2xl max-sm:text-lg flex justify-center items-center text-center text-white mb-10 max-sm:mb-1">
            Enter the email associated with your account and we&apos;Il send an
            email with instructions to reset your password.
          </div>
          <div className="flex flex-col h-14 gap-4 justify-center ">
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
          </div>
          <div className="flex justify-center items-center h-12 gap-5 ">
            <button
              type="submit"
              className="w-1/2 h-full bg-white text-primary flex flex-1 justify-center items-center rounded-[20px] font-bold tracking-wide">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

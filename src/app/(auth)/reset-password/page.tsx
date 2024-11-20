import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "../../styles/style.css";

import Image from "next/image";

export default function ResetPassword() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-row bg-primary w-3/4 h-1/2 items-center">
        <div className="flex flex-1 w-1/2 h-full bg-primary justify-center items-center ps-20">
          <Image
            src="/assets/logo.png"
            alt="Logo SiMaPro"
            width={370}
            height={370}
            className="bg-white flex justify-center items-center text-black"
          />
        </div>
        <form
          action="#"
          method="post"
          className="flex flex-1 h-1/2 flex-col gap-4 justify-center ps-40 pe-40">
          <div className="flex h-1/2 gap-4">
            <div className="flex flex-auto">
              <label
                htmlFor="username"
                className="w-full relative flex justify-center items-center">
                <span className="absolute -inset-y-1/4 left-4 flex items-center">
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
                  style={{ color: "var(--primary)" }}
                  className="w-full h-1/2 border-none rounded-[5px] placeholder:text-[var(--hint)] placeholder:font-bold placeholder:tracking-wide p-5 ps-12 font-bold tracking-wide focus:ring-2 focus:ring-[var(--border)] focus:outline-none"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center h-1/4 gap-5">
            <button
              type="submit"
              className="w-full h-full bg-white text-primary flex justify-center items-center rounded-[5px] font-bold tracking-wide">
              Send
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ fontSize: "1.2rem" }}
                className="ms-2"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

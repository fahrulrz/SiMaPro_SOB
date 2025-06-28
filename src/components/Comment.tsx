"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface CommentProps {
  id: number;
  isi_komen: string;
  userId: number;
  userComment: number;
  role: string;
}

const Comment: React.FC<CommentProps> = ({
  id,
  isi_komen,
  userId,
  userComment,
  role,
}) => {
  const [isOtherSetting, setIsOtherSetting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  console.log(id);
  const handleOtherSetting = () => {
    setIsOtherSetting(!isOtherSetting);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar elemen menuRef
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOtherSetting(false);
      }
    };

    if (isOtherSetting) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOtherSetting]);

  return (
    <>
      <div className="relative">
        <div className="flex items-center gap-4 py-2">
          <div>
            <span className="sm:hidden">
              <FontAwesomeIcon icon={faUser} size="xl" />
            </span>
            <span className="max-sm:hidden">
              <FontAwesomeIcon icon={faUser} size="2xl" />
            </span>
          </div>
          <div>{isi_komen}</div>
          <div
            ref={menuRef}
            onClick={handleOtherSetting}
            className="flex flex-col ml-auto border-b-2 hover:text-primary cursor-pointer"
          >
            {role == "admin" && userComment === userId ? (
              <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
            ) : null}
          </div>
        </div>

        {isOtherSetting && (
          <div className="bg-violet-600 flex absolute z-20 top-4 right-2">
            <div className="flex flex-col bg-yellow-500 w-full justify-end">
              <Link
                className="bg-primary hidden p-1 px-2 justify-center items-center text-white hover:bg-white hover:text-black"
                href={`/home`}
              >
                Edit
              </Link>
              <Link
                className="p-1 px-2 flex justify-center items-center bg-primary text-white hover:bg-white hover:text-black"
                href={`/mahasiswa`}
              >
                Delete
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;

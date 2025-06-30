"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

interface CommentProps {
  id: number;
  isi_komen: string;
  userId: number;
  userComment: number;
  role: string;
  onDelete: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  id,
  isi_komen,
  userId,
  userComment,
  role,
  onDelete,
}) => {
  const [isOtherSetting, setIsOtherSetting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOtherSetting = () => {
    setIsOtherSetting(!isOtherSetting);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        onDelete(id);
      })
      .catch((error) => {
        console.log(error);
      });
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
            {role == "admin" || userComment === userId ? (
              <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
            ) : null}
          </div>
        </div>

        {isOtherSetting && (
          <div className="bg-violet-600 flex absolute z-20 cursor-pointer top-4 right-2">
            <div className="flex flex-col bg-yellow-500 w-full justify-end">
              <div
                className="p-1 px-2 flex justify-center items-center bg-primary text-white hover:bg-white hover:text-black"
                onClick={() => handleDelete(id)}
              >
                Delete
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;

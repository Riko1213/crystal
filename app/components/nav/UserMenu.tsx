"use client";

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="
        p-2
        border-[1px]
        border-slate-400
        flex
        flex-row
        items-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-700
        "
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="absolute
            rounded-md
            shadow-md
            w-[170px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            flex
            flex-col
            cursor-pointer
            "
          >
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Захиалгууд</MenuItem>
                </Link>
                {currentUser.role=="ADMIN"?(
                  <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Админы хэсэг</MenuItem>
                </Link>
                ):(
                  <Link href="/cart">
                  <MenuItem onClick={toggleOpen}>Сагс</MenuItem>
                </Link>
                )}
                {currentUser.role=="DELIVER"?(
                  <Link href="/deliver">
                  <MenuItem onClick={toggleOpen}>Хүргэгчийн хэсэг</MenuItem>
                </Link>
                ):(
                  <Link href="/">
                  <MenuItem onClick={toggleOpen}>Нүүр</MenuItem>
                </Link>
                )}
                {currentUser.role=="OPERATOR"?(
                  <Link href="/operator">
                  <MenuItem onClick={toggleOpen}>Операторын хэсэг</MenuItem>
                </Link>
                ):(
                  <Link href="/">
                  <MenuItem onClick={toggleOpen}>Нүүр</MenuItem>
                </Link>
                )}
                
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Гарах
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Нэвтрэх</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Бүртгүүлэх</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;

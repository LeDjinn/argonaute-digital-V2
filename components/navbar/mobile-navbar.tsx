"use client";
import { IoIosMenu } from "react-icons/io";
import { Logo } from "@/components/logo";
import LanguageChanger from "../custom components/language-switcher";

export const MobileNavbar = ({ open, setOpen }: any) => {
  return (
    <div className="flex justify-between items-center w-full px-5 py-4">
      <Logo />
      <div className="flex items-center gap-3">
        <LanguageChanger />
        <IoIosMenu
          className="text-text-primary h-6 w-6 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>
    </div>
  );
};

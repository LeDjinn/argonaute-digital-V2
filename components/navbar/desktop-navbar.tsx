"use client";
import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";
import LanguageChanger from "../custom components/language-switcher";

type Props = {
  navItems: {
    link: string;
    title: string;
  }[];
  locale: string;
};

export const DesktopNavbar = ({ navItems, locale }: Props) => {
  return (
    <div className="flex items-center justify-between px-12 py-5 max-w-[1280px] mx-auto">
      <div className="flex items-center gap-10">
        <Logo />
        <div className="flex items-center gap-9">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="navlink-hover text-sm text-text-secondary"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className="btn-primary text-sm font-semibold px-[18px] py-[9px] rounded-lg"
          style={{ background: "#f2f2f1", color: "#0a0a0b" }}
        >
          {locale === "fr" ? "Réserver un appel" : "Book a call"}
        </Link>
        <LanguageChanger />
      </div>
    </div>
  );
};

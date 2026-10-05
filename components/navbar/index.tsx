"use client";
import { useState } from "react";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { IoIosClose } from "react-icons/io";
import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";

const navItemsEN = [
  { title: "Services", link: "/#offers" },
  { title: "Case Studies", link: "/case-studies" },
  { title: "Process", link: "/#process" },
  { title: "Blog", link: "/blog" },
  { title: "RSS", link: "/feed.xml" },
  { title: "Contact", link: "/contact" },
];

const navItemsFR = [
  { title: "Services", link: "/#offers" },
  { title: "Études de cas", link: "/case-studies" },
  { title: "Processus", link: "/#process" },
  { title: "Blog", link: "/blog" },
  { title: "RSS", link: "/feed.xml" },
  { title: "Contact", link: "/contact" },
];

export function NavBar({ locale }: { locale: string }) {
  const navItems = (locale === "fr" ? navItemsFR : navItemsEN).map(item => ({...item, link:item.link === "/feed.xml" ? item.link : `/${locale === "fr" ? "fr" : "en"}${item.link}`}));
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[9999] w-full backdrop-blur-[12px] border-b"
        style={{
          background: "rgba(10,10,11,0.75)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div className="hidden lg:block w-full">
          <DesktopNavbar navItems={navItems} locale={locale} />
        </div>
        <div className="flex h-full w-full items-center lg:hidden">
          <MobileNavbar
            navItems={navItems}
            locale={locale}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </nav>

      {/* Full screen mobile menu overlay outside of the sticky nav containing block */}
      {open && (
        <div
          className="fixed inset-0 z-[10000] flex flex-col bg-base lg:hidden"
          style={{ background: "#0a0a0b" }}
        >
          <div
            className="flex items-center justify-between w-full px-5 py-4 border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <Logo />
            <IoIosClose
              className="h-8 w-8 text-text-primary cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-6 px-8 pt-8">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                onClick={() => setOpen(false)}
                className="text-2xl text-text-primary navlink-hover font-semibold"
              >
                {navItem.title}
              </Link>
            ))}
          </div>
          <div className="px-8 pt-10">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary inline-block text-center text-[15px] font-semibold px-6 py-[14px] rounded-[9px] w-full"
              style={{ background: "#f2f2f1", color: "#0a0a0b" }}
            >
              {locale === "fr" ? "Réserver un appel" : "Book a call"}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

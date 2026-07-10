import { Link } from "next-view-transitions";
import React from "react";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-[10px] relative z-20 select-none"
    >
      {/* Robot Head Icon */}
      <img
        src="/logos/tete_rebot.svg"
        alt="Argonaute Icon"
        className="h-[26px] w-auto object-contain"
        style={{ display: "block" }}
      />
      {/* Wordmark Text Logo */}
      <img
        src="/logos/argonaute text.svg"
        alt="Argonaute Digital"
        className="h-[16px] w-auto object-contain"
        style={{ display: "block" }}
      />
    </Link>
  );
};

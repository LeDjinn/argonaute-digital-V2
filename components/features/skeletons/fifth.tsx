"use client";
import React from "react";
import { cn } from "@/lib/utils";


export const SkeletonFive = () => {
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-start justify-center">
      <div className="flex absolute inset-0 flex-col group-hover:-translate-y-80 transition duration-200 items-center justify-center">
        <Container>
          <div className="h-10 w-10 rounded-full bg-neutral-500 flex items-center justify-center text-white">
          <CartIcon />
          </div>
        </Container>
        <p className="mt-4 text-sm text-neutral-400 font-bold">E-commerce Store</p>
        <div className="flex items-center gap-2 text-xs mt-4">
          <p>Items Sold</p>
          <div className="h-1 w-1 rounded-full bg-neutral-400" />
          <p>12,345</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="336"
          height="126"
          viewBox="0 0 336 126"
          fill="none"
        >
          <path
            d="M0 1C9.88235 1 9.88235 64.1698 19.7647 64.1698C29.6471 64.1698 29.6471 108.623 39.5294 108.623C49.4118 108.623 49.4118 125 59.2941 125C69.1765 125 69.1765 50.1321 79.0588 50.1321C88.9412 50.1321 88.9412 94.5849 98.8235 94.5849C108.706 94.5849 108.706 73.5283 118.588 73.5283C128.471 73.5283 128.471 85.2264 138.353 85.2264C148.235 85.2264 148.235 61.8302 158.118 61.8302C168 61.8302 168 57.1509 177.882 57.1509C187.765 57.1509 187.765 52.4717 197.647 52.4717C207.529 52.4717 207.529 92.2453 217.412 92.2453C227.294 92.2453 227.294 96.9245 237.176 96.9245C247.059 96.9245 247.059 113.302 256.941 113.302C266.824 113.302 266.824 101.604 276.706 101.604C286.588 101.604 286.588 38.434 296.471 38.434C306.353 38.434 306.353 103.943 316.235 103.943C326.118 103.943 326.118 103.943 336 103.943"
            stroke="#F8F8F8"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="flex absolute inset-0 flex-col translate-y-80 group-hover:translate-y-0 transition duration-200 items-center justify-center">
        <Container>
          <div className="h-10 w-10 rounded-full bg-neutral-500 flex items-center justify-center text-white">
          <BoxIcon />
          </div>
        </Container>
        <p className="mt-4 text-sm text-neutral-400 font-bold">Product Inventory</p>
        <div className="flex items-center gap-2 text-xs mt-4">
          <p>Items in Stock</p>
          <div className="h-1 w-1 rounded-full bg-neutral-400" />
          <p>8,765</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="336"
          height="126"
          viewBox="0 0 336 126"
          fill="none"
        >
          <path
            d="M0 1C9.88235 1 9.88235 64.1698 19.7647 64.1698C29.6471 64.1698 29.6471 108.623 39.5294 108.623C49.4118 108.623 49.4118 125 59.2941 125C69.1765 125 69.1765 50.1321 79.0588 50.1321C88.9412 50.1321 88.9412 94.5849 98.8235 94.5849C108.706 94.5849 108.706 73.5283 118.588 73.5283C128.471 73.5283 128.471 85.2264 138.353 85.2264C148.235 85.2264 148.235 61.8302 158.118 61.8302C168 61.8302 168 57.1509 177.882 57.1509C187.765 57.1509 187.765 52.4717 197.647 52.4717C207.529 52.4717 207.529 92.2453 217.412 92.2453C227.294 92.2453 227.294 96.9245 237.176 96.9245C247.059 96.9245 247.059 113.302 256.941 113.302C266.824 113.302 266.824 101.604 276.706 101.604C286.588 101.604 286.588 38.434 296.471 38.434C306.353 38.434 306.353 103.943 316.235 103.943C326.118 103.943 326.118 103.943 336 103.943"
            stroke="#F8F8F8"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-20 w-20 rounded-lg flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};
const CartIcon = () => (
  <svg
    className="h-10 w-10 text-white bg-blue-500 rounded-full p-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3 3h2l3.6 7.59L5.25 14.04A1.99 1.99 0 005 15.5 2 2 0 007 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.24-5.97a.998.998 0 00-.91-1.5H6.21l-.94-2H1V3h2zm16 15a2 2 0 100 4 2 2 0 000-4zm-10 2a2 2 0 104 0 2 2 0 00-4 0z" />
  </svg>
);

const BoxIcon = () => (
  <svg
    className="h-10 w-10 text-white bg-green-500 rounded-full p-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21 8V6a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H7a1 1 0 00-1 1v2H4a1 1 0 00-1 1v2l9 5.29L21 8zm-2 5.28L12 16.86l-7-3.58V18a1 1 0 001 1h14a1 1 0 001-1v-5.72z" />
  </svg>
);
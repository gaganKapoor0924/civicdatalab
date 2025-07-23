"use client";

import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-[#1f5f8d] p-4 md:pt-9 md:pb-9 md:w-full">
      <div className="w-full md:mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <Image src="/logo.png" alt="" width={240} height={42} />
          </div>
          <div className="xl:hidden" onClick={() => setShow(!show)}>
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 7L4 7"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20 12L4 12"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20 17L4 17"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <ul className="hidden xl:flex xl:items-center xl:gap-8">
            <li className="text-white uppercase font-bold">All Data</li>
            <li className="text-white uppercase font-bold">Sectors</li>
            <li className="text-white uppercase font-bold">Use Cases</li>
            <li className="text-white uppercase font-bold">Publishers</li>
            <li className="text-white uppercase font-bold">About Us</li>
            <li>
              <button className="bg-[#84dccf] px-4 py-2 font-bold rounded-[4px]">
                LOGIN / SIGN UP
              </button>
            </li>
          </ul>
        </div>
        {show && (
          <div
            className={`min-h-screen bg-white fixed z-50 top-0 left-0 w-[300px] shadow-md transition-transform duration-300 transform ease-in-out p-6 xl:hidden ${
              show ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <ul className="flex flex-col gap-4 h-full xl:hidden">
              <li className="uppercase font-bold">All Data</li>
              <li className="uppercase font-bold">Sectors</li>
              <li className="uppercase font-bold">Use Cases</li>
              <li className="uppercase font-bold">Publishers</li>
              <li className="uppercase font-bold">About Us</li>
              <li>
                <button className="bg-[#84dccf] px-4 py-2 font-bold rounded-[4px]">
                  LOGIN / SIGN UP
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

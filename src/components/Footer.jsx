import React from "react";
import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#1f5f8d] p-4 md:pt-9 md:pb-9 md:w-full">
      <div className="w-full md:mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="">
            <Image src="/logo.png" alt="" width={240} height={42} />
          </div>
          <div className="">
            <span className="text-[#fdb557] mb-2 block">Follow Us</span>
            <ul className="flex gap-4">
              <li className="bg-[#84dccf] w-7 h-7 rounded-full flex items-center justify-center">
                <FaTwitter />
              </li>
              <li className="bg-[#84dccf] w-7 h-7 rounded-full flex items-center justify-center">
                <FaLinkedin />
              </li>
              <li className="bg-[#84dccf] w-7 h-7 rounded-full flex items-center justify-center">
                <FaFacebookF />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { FaChevronRight } from "react-icons/fa";
const MidHeader = () => {
  return (
    <div className="bg-[#fdb557] px-4 py-2">
      <div className="w-full md:mx-auto flex items-center gap-2">
        Home{" "}
        <span className="text-gray-500">
          <FaChevronRight />
        </span>{" "}
        <strong>All Data</strong>
        <span className="text-gray-500">
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
};

export default MidHeader;

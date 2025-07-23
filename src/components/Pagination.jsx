import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center items-center mt-8 gap-4 bg-white shadow-md rounded-3xl">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2  text-black rounded disabled:opacity-50"
      >
        <GrFormPrevious />
      </button>
      <span className=" font-medium">Page {page}</span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2  text-black rounded"
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;

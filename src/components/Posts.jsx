import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { FaGlobe } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";

const Posts = ({ posts, formattedDate, grid, setGrid }) => {
  return (
    <ul
      className={
        grid ? `grid md: grid-cols-3 gap-4` : "flex flex-col gap-4 p-4"
      }
    >
      {posts.map((post) => (
        <li key={post.id} className="bg-white shadow-md p-8 rounded-3xl">
          <h2 className="text-[#1f5f8d] font-bold mb-4">{post.title}</h2>
          <p className="text-[14px]">{post.description}</p>
          <div
            className={`${
              grid
                ? "flex flex-wrap xl:flex-wrap items-center gap-4 mt-4 text-[14px]"
                : "flex flex-wrap xl:flex-nowrap items-center gap-4 mt-4 text-[14px]"
            }`}
          >
            <p className="flex items-center gap-2">
              <span className="text-[#b17f3d]">
                <FaRegCalendar />
              </span>
              Last Updated: <strong>{formattedDate(post.modified)}</strong>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#b17f3d]">
                <IoMdDownload />
              </span>
              Download: <strong>{post.download_count}</strong>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#b17f3d]">
                <FaGlobe />
              </span>
              Geography: <strong>{post?.metadata[1]?.value || "-"}</strong>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#b17f3d]">
                <FaChartSimple />
              </span>
              <strong>{post.has_charts ? "with Charts" : "No Charts"}</strong>
            </p>
          </div>
          <div>
            Sectors:
            <ul>
              {post.sectors.map((sector, index) => (
                <li key={index}>{sector}</li>
              ))}
            </ul>
          </div>
          <div
            className={
              grid ? "mt-4 flex md:flex-col" : `mt-4 flex justify-between`
            }
          >
            <div className="flex items-center gap-4">
              Tags:
              <ul
                className={`${
                  grid
                    ? "flex items-center md:flex-wrap flex-wrap gap-4"
                    : "flex items-center flex-wrap gap-4"
                }`}
              >
                {post.tags.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-[#84dccf] py-1 px-2 rounded-md font-bold text-[14px]"
                    >
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex items-center gap-4 mt-4">
              Formats:
              <ul className="flex gap-4">
                {post.formats.map((format, index) => {
                  return <li key={index}>{format}</li>;
                })}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;

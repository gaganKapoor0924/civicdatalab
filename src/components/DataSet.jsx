"use client";

import React, { useEffect, useRef, useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import Pagination from "./Pagination";
import Posts from "./Posts";

const DataSet = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({
    sectors: [],
    dataTypes: [],
    tags: [],
    geographies: [],
  });
  const [filterProducts, setFilterProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef();
  const [search, setSearch] = useState("");
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.datakeep.civicdays.in/api/search/dataset/?page=${page}`
      );
      const data = await res.json();
      setPosts(data.results);
      setLoading(false);
      if (data.total_pages) setTotalPages(data.total_pages);
    };
    fetchData();
  }, [page]);

  const toggleFilter = (category, value) => {
    setSelected((prev) => {
      const updated = [...prev[category]];
      const index = updated.indexOf(value);
      if (index > -1) updated.splice(index, 1);
      else updated.push(value);

      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  const resetFilters = () => {
    setSelected({ sectors: [], tags: [], dataTypes: [], geographies: [] });
  };

  const formattedDate = (dateVal) => {
    const isoString = dateVal;
    const date = new Date(isoString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const newDate = `${day} ${month}, ${year}`;
    return newDate;
  };

  const filterData = {
    sectors: [
      "Public Finance",
      "Law And Justice",
      "Climate Action",
      "Urban Development",
      "Gender",
      "Coastal",
      "Child Rights",
    ],
    dataTypes: ["CSV", "PDF", "XLSX", "JSON", "XLS", "ZIP"],
    tags: [
      "Budget",
      "Finance",
      "Law",
      "Justice",
      "Courts",
      "Disaster",
      "Public Health",
      "Maternal Health",
      "Reports",
      "Timeseries",
      "Gender",
      "Khoj",
      "GIS",
      "Climate",
      "Contracts",
    ],
    geographies: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Asia-Pacific",
      "Assam",
      "Bangkok",
      "Delhi",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "India",
      "Indonesia",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Philippines",
      "Sikkim",
      "Tamil Nadu",
    ],
  };

  const applyFilter = () => {
    let productFilter = [...posts];

    if (search) {
      productFilter = productFilter.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selected?.sectors?.length > 0) {
      productFilter = productFilter.filter((item) =>
        item.sectors?.some((sector) => selected.sectors.includes(sector))
      );
    }

    if (selected?.dataTypes?.length > 0) {
      productFilter = productFilter.filter((item) =>
        item.formats?.some((type) => selected.dataTypes.includes(type))
      );
    }

    if (selected?.tags?.length > 0) {
      productFilter = productFilter.filter((item) =>
        item.tags.some((tag) => selected?.tags?.includes(tag))
      );
    }

    if (selected.geographies.length > 0) {
      productFilter = productFilter.filter((item) => {
        const geo = item?.metadata?.find(
          (m) => m.metadata_item?.label === "Geography"
        )?.value;

        return geo && selected.geographies.includes(geo);
      });
    }

    setFilterProducts(productFilter);
  };

  useEffect(() => {
    applyFilter();
  }, [posts, selected, search]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    if (showFilters && isMobile) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showFilters, isMobile]);

  const handleFilters = () => {
    setShowFilters(true);
  };

  return (
    <div>
      <div className="p-4 flex  items-center gap-10">
        <div className="w-[70%]">
          <div className="border border-gray-400 w-full p-2 rounded-md">
            <input
              type="text"
              value={search}
              className="w-full focus:outline-0"
              placeholder="Start typing to search for any Dataset"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-10">
          <button
            className={
              grid
                ? "text-4xl bg-[transparent] text-[#b17f3d]"
                : `text-4xl bg-[transparent] cursor-pointer`
            }
            onClick={() => setGrid(true)}
          >
            <CiGrid41 />
          </button>
          <button
            className={
              !grid
                ? "text-4xl bg-[transparent] text-[#b17f3d]"
                : `text-4xl bg-[transparent] cursor-pointer`
            }
            onClick={() => setGrid(false)}
          >
            <CiBoxList />
          </button>
        </div>
        <div>Latest Upload</div>
      </div>
      <div className="flex flex-col md:flex-row p-4 gap-4">
        <div className="md:w-[25%] bg-white shadow-md rounded-3xl p-4">
          <div className="flex justify-between">
            <h2 onClick={handleFilters} className="font-bold">
              Filters
            </h2>
            {selected?.sectors?.length > 0 ||
            selected?.dataTypes?.length > 0 ||
            selected?.tags?.length > 0 ? (
              <span onClick={resetFilters} className="font-bold">
                Reset
              </span>
            ) : (
              <span
                onClick={resetFilters}
                className="pointer-events-none font-bold"
              >
                Reset
              </span>
            )}
          </div>
          {isMobile && showFilters && (
            <div
              className="fixed z-10 left-0 top-0 bg-white md:w-[60%] p-4 md:relative"
              ref={filterRef}
            >
              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Sectors{" "}
                  <span className="font-bold">
                    ({filterData?.sectors?.length})
                  </span>
                </h3>
                {filterData?.sectors?.map((sector) => (
                  <label key={sector} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selected.sectors.includes(sector)}
                      onChange={() => toggleFilter("sectors", sector)}
                      className="mr-2"
                    />
                    {sector}
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Data Type{" "}
                  <span className="font-bold">
                    ({filterData.dataTypes.length})
                  </span>
                </h3>
                {filterData.dataTypes.map((type) => (
                  <label key={type} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selected.dataTypes.includes(type)}
                      onChange={() => toggleFilter("dataTypes", type)}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Tags{" "}
                  <span className="font-bold">({filterData.tags.length})</span>
                </h3>
                {filterData.tags.map((type) => (
                  <label key={type} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selected?.tags?.includes(type)}
                      onChange={() => toggleFilter("tags", type)}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Geographies{" "}
                  <span className="font-bold">({filterData.tags.length})</span>
                </h3>
                <div className="overflow-auto h-[180px]">
                  {filterData?.geographies?.map((type) => (
                    <label key={type} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={selected?.geographies?.includes(type)}
                        onChange={() => toggleFilter("geographies", type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          {!isMobile && (
            <div className=" bg-white md:w-[100%] p-4 md:relative">
              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Sectors{" "}
                  <span className="font-bold">
                    ({filterData.sectors.length})
                  </span>
                </h3>
                <div className="overflow-auto h-[180px]">
                  {filterData.sectors.map((sector) => (
                    <label key={sector} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={selected.sectors.includes(sector)}
                        onChange={() => toggleFilter("sectors", sector)}
                        className="mr-2"
                      />
                      {sector}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Data Type{" "}
                  <span className="font-bold">
                    ({filterData.dataTypes.length})
                  </span>
                </h3>
                <div className="overflow-auto h-[180px]">
                  {filterData.dataTypes.map((type) => (
                    <label key={type} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={selected.dataTypes.includes(type)}
                        onChange={() => toggleFilter("dataTypes", type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Tags{" "}
                  <span className="font-bold">({filterData.tags.length})</span>
                </h3>
                <div className="overflow-auto h-[180px]">
                  {filterData.tags.map((type) => (
                    <label key={type} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={selected?.tags?.includes(type)}
                        onChange={() => toggleFilter("tags", type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2 bg-[#e9eff4] px-2 py-1 rounded-md">
                  Geographies{" "}
                  <span className="font-bold">({filterData.tags.length})</span>
                </h3>
                <div className="overflow-auto h-[180px]">
                  {filterData.geographies.map((type) => (
                    <label key={type} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={selected?.geographies?.includes(type)}
                        onChange={() => toggleFilter("geographies", type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-[75%]">
          {loading ? (
            <div className="w-full h-[70vh] flex items-center justify-center">
              Loading...
            </div>
          ) : (
            <>
              <Posts
                posts={filterProducts}
                setPosts={setPosts}
                formattedDate={formattedDate}
                setGrid={setGrid}
                grid={grid}
              />
              <Pagination page={page} setPage={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSet;

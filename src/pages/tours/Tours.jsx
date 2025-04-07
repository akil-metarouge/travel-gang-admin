import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import PaginationClassic from "../../components/PaginationClassic";
import ToursTable from "../../partials/tours/ToursTable";
import { useNavigate } from "react-router-dom";

function Tours() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // List in display
  const [list, setList] = useState([]);
  // handle pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // tour cycles
  const [ongoing, setOngoing] = useState([]);
  const [ongoingCount, setOngoingCount] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [completedCount, setCompletedCount] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState("ongoing");

  const handleCreateTourBtnClick = () => {
    navigate("/tours/create");
  };

  const handleCycleSelection = (e) => {
    e.preventDefault();
    setSelectedCycle(
      e.target.textContent.toLowerCase().includes("upcoming")
        ? "upcoming"
        : e.target.textContent.toLowerCase().includes("complete")
        ? "completed"
        : "ongoing"
    );
    setCurrentPage(1);
  };

  // fetch tours
  useEffect(() => {
    // fetchTours();
    const apiURL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    fetch(`${apiURL}/api/v1/tours/?page=${currentPage}&perpage=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data?.response);
        setOngoing(data?.response?.tours?.ongoing);
        setOngoingCount(data?.response?.counts?.ongoing);
        setUpcoming(data?.response?.tours?.upcoming);
        setUpcomingCount(data?.response?.counts?.upcoming);
        setCompleted(data?.response?.tours?.completed);
        setCompletedCount(data?.response?.counts?.completed);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    setList(
      selectedCycle === "upcoming"
        ? upcoming
        : selectedCycle === "completed"
        ? completed
        : ongoing
    );
  }, [selectedCycle, ongoing, upcoming, completed]);

  console.log("selectedCycle: ", selectedCycle);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Tours
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add tour button */}
                <button
                  onClick={handleCreateTourBtnClick}
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
                >
                  <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add New Tour</span>
                </button>
              </div>
            </div>

            {/* More actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left side */}
              <div className="mb-4 sm:mb-0">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <button
                      onClick={handleCycleSelection}
                      className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 shadow-xs transition cursor-pointer ${
                        selectedCycle === "ongoing"
                          ? "border border-transparent  bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800"
                          : "border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600  bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Ongoing{" "}
                      <span className="ml-1 text-gray-400 dark:text-gray-500">
                        {ongoingCount}
                      </span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button
                      onClick={handleCycleSelection}
                      className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 shadow-xs transition cursor-pointer ${
                        selectedCycle === "upcoming"
                          ? "border border-transparent  bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800"
                          : "border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600  bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Upcoming{" "}
                      <span className="ml-1 text-gray-400 dark:text-gray-500">
                        {upcomingCount}
                      </span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button
                      onClick={handleCycleSelection}
                      className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 shadow-xs transition cursor-pointer ${
                        selectedCycle === "completed"
                          ? "border border-transparent  bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800"
                          : "border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600  bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Completed{" "}
                      <span className="ml-1 text-gray-400 dark:text-gray-500">
                        {completedCount}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Table */}
            <ToursTable list={list} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic
                firstIndex={
                  selectedCycle === "upcoming"
                    ? upcomingCount === 0
                      ? 0
                      : (currentPage - 1) * 10 + 1
                    : selectedCycle === "completed"
                    ? completedCount === 0
                      ? 0
                      : (currentPage - 1) * 10 + 1
                    : ongoingCount === 0
                    ? 0
                    : (currentPage - 1) * 10 + 1
                }
                lastIndex={
                  selectedCycle === "upcoming"
                    ? upcomingCount < currentPage * 10
                      ? upcomingCount
                      : currentPage * 10
                    : selectedCycle === "completed"
                    ? completedCount < currentPage * 10
                      ? completedCount
                      : currentPage * 10
                    : ongoingCount < currentPage * 10
                    ? ongoingCount
                    : currentPage * 10
                }
                total={
                  selectedCycle === "upcoming"
                    ? upcomingCount
                    : selectedCycle === "completed"
                    ? completedCount
                    : ongoingCount
                }
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Tours;

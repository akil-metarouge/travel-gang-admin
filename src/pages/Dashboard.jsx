import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import PaginationClassic from "../components/PaginationClassic";
import ToursTable from "../partials/tours/ToursTable";
import { useNavigate } from "react-router-dom";
import { useStatus } from "../utils/StatusContext";
import PageLoader from "../components/PageLoader";

function Dashboard() {
  const apiURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const { setStatus } = useStatus();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // List in display
  const [list, setList] = useState([]);
  // handle pagination
  const [currentPage, setCurrentPage] = useState(1);
  // tour cycles
  const [ongoing, setOngoing] = useState([]);
  const [ongoingCount, setOngoingCount] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState("ongoing");
  const [isLoading, setIsLoading] = useState(false);

  const handleCycleSelection = (e) => {
    e.preventDefault();
    setSelectedCycle(
      e.target.textContent.toLowerCase().includes("upcoming")
        ? "upcoming"
        : "ongoing"
    );
    setCurrentPage(1);
  };

  const fetchTours = () => {
    setIsLoading(true);
    fetch(`${apiURL}/api/v1/tours/?page=${currentPage}&perpage=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          // Sign out
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/signin");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data?.response);
        setOngoing(data?.response?.tours?.ongoing);
        setOngoingCount(data?.response?.counts?.ongoing);
        setUpcoming(data?.response?.tours?.upcoming);
        setUpcomingCount(data?.response?.counts?.upcoming);
      })
      .catch((error) => {
        console.error("Error:", error);
        setStatus({
          type: "error",
          message: error?.message || "Something went wrong",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCSVDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/assets/tour_csv_template.csv"; // public path
    link.download = "csv_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // fetch tours
  useEffect(() => {
    fetchTours();
  }, [currentPage]);

  useEffect(() => {
    setList(selectedCycle === "upcoming" ? upcoming : ongoing);
  }, [selectedCycle, ongoing, upcoming]);

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
                  Dashboard
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-wrap sm:justify-end gap-4">
                <button
                  onClick={handleCSVDownload}
                  className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-lg px-3 py-3 shadow-xs transition cursor-pointer bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800 hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Download CSV Template
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
                </ul>
              </div>
            </div>

            {/* Table */}
            <ToursTable
              list={list}
              setIsLoading={setIsLoading}
              fetchTours={fetchTours}
            />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic
                firstIndex={
                  selectedCycle === "upcoming"
                    ? upcomingCount === 0
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
                    : ongoingCount < currentPage * 10
                    ? ongoingCount
                    : currentPage * 10
                }
                total={
                  selectedCycle === "upcoming" ? upcomingCount : ongoingCount
                }
                page={currentPage}
                setPage={setCurrentPage}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-end">
                Call for Support: +61 435 785 822 | Email:
                jithesh@metarouge.com.au
              </p>
            </div>
          </div>
        </main>
        {isLoading && <PageLoader />}
      </div>
    </div>
  );
}

export default Dashboard;

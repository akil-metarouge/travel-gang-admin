import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import PaginationClassic from "../../components/PaginationClassic";
import GuidesTable from "../../partials/guides/GuidesTable";
import { useNavigate, useParams } from "react-router-dom";
import GuideDetailsTable from "../../partials/guides/GuideDetailsTable";
import DropdownEditMenu from "../../components/DropdownEditMenu";
import ModalBasic from "../../components/ModalBasic";

function GuidesDetails() {
  const apiURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [guideDetails, setGuideDetails] = useState(null);
  const [editGuideDetails, setEditGuideDetails] = useState(null);
  const [editGuideModalOpen, setEditGuideModalOpen] = useState(false);
  const [nationalities, setNationalities] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ongoing, setOngoing] = useState([]);
  const [ongoingCount, setOngoingCount] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [completedCount, setCompletedCount] = useState(null);
  const [cancelled, setCancelled] = useState([]);
  const [cancelledCount, setCancelledCount] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState("ongoing");

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

  const getGuideDetails = () => {
    fetch(`${apiURL}/api/v1/users/guide/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Guide details: ", data?.response);
        setGuideDetails(data?.response?.guide);
        setEditGuideDetails(data?.response?.guide);
        setOngoing(data?.response?.tours?.ongoing);
        setOngoingCount(data?.response?.tourCounts?.ongoing);
        setUpcoming(data?.response?.tours?.upcoming);
        setUpcomingCount(data?.response?.tourCounts?.upcoming);
        setCompleted(data?.response?.tours?.completed);
        setCompletedCount(data?.response?.tourCounts?.completed);
        setCancelled(data?.response?.tours?.cancelled);
        setCancelledCount(data?.response?.tourCounts?.cancelled);
      })
      .catch((error) => {
        console.error("Error fetching guide details:", error);
      });
  };

  const saveGuideDetails = () => {
    console.log("edit: ", editGuideDetails);
  };

  useEffect(() => {
    getGuideDetails();
  }, [id]);

  useEffect(() => {
    console.log("editGuideMoadalOpen: ", editGuideModalOpen);
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setNationalities(data.map((nation) => nation?.name?.common).sort());
      })
      .catch((error) => {
        console.error("Error fetching guide details:", error);
      });
  }, [editGuideModalOpen]);

  useEffect(() => {
    setList(
      selectedCycle === "upcoming"
        ? upcoming
        : selectedCycle === "completed"
        ? completed
        : ongoing
    );
  }, [selectedCycle, ongoing, upcoming, completed]);

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
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Title */}
              <div className="grid grid-cols-1 sm:grid-cols-5 w-full border-b border-gray-200 dark:border-gray-700/60 pb-4 mb-4 gap-4">
                <div className="flex items-center gap-2">
                  {/* back btn */}
                  <button
                    onClick={() => navigate("/guides")}
                    className="btn cursor-pointer"
                  >
                    <svg
                      className="inline-block w-6 h-6 text-gray-400 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 17l-5-5m0 0l5-5m-5 5h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-2xl md:text-3xl max-w-60 overflow-hidden text-ellipsis whitespace-nowrap text-gray-800 dark:text-gray-100 font-bold">
                      {guideDetails?.full_name}
                    </h1>
                    <h2 className="max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                      {guideDetails?.identity_code}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div>
                    <div className="text-gray-500">Gender</div>
                    <div className="capitalize text-gray-800 dark:text-gray-100 font-semibold">
                      {guideDetails?.gender}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div>
                    <div className="text-gray-500">Nationality</div>
                    <div className="capitalize text-gray-800 dark:text-gray-100 font-semibold">
                      {guideDetails?.nationality}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div>
                    <div className="text-gray-500">Phone Number</div>
                    <div className="capitalize max-w-30 overflow-hidden text-ellipsis whitespace-nowrap text-gray-800 dark:text-gray-100 font-semibold">
                      {guideDetails?.phone_number}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <DropdownEditMenu
                    align="right"
                    rotate={true}
                    className={`relative`}
                  >
                    <li>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditGuideModalOpen(true);
                        }}
                        className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3 w-full cursor-pointer"
                        href="#0"
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          console.log("remove clicked");
                        }}
                        className="font-medium text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex py-1 px-3 w-full cursor-pointer"
                        href="#0"
                      >
                        Remove
                      </button>
                    </li>
                  </DropdownEditMenu>
                </div>
              </div>
            </div>

            <ModalBasic
              id="guide-modal"
              modalOpen={editGuideModalOpen}
              setModalOpen={setEditGuideModalOpen}
              title="Edit Guide"
            >
              {/* Modal content */}
              <div className="px-5 py-4">
                <div className="space-y-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Guide name
                    </label>
                    <input
                      id="name"
                      className="form-input w-full px-2 py-2"
                      type="text"
                      value={editGuideDetails?.full_name ?? ""}
                      onChange={(e) => {
                        setEditGuideDetails({
                          ...editGuideDetails,
                          full_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="form-select capitalize w-full px-2 py-2 cursor-pointer"
                      value={editGuideDetails?.gender ?? ""}
                      onChange={(e) => {
                        setEditGuideDetails({
                          ...editGuideDetails,
                          gender: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      <option
                        className="dark:bg-gray-800 cursor-pointer"
                        value="male"
                      >
                        Male
                      </option>
                      <option
                        className="dark:bg-gray-800 cursor-pointer"
                        value="female"
                      >
                        Female
                      </option>
                      <option
                        className="dark:bg-gray-800 cursor-pointer"
                        value="other"
                      >
                        Other
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="phoneNumber"
                    >
                      Phone number
                    </label>
                    <input
                      id="phoneNumber"
                      className="form-input w-full px-2 py-2"
                      type="tel"
                      value={editGuideDetails?.phone_number ?? ""}
                      onChange={(e) => {
                        setEditGuideDetails({
                          ...editGuideDetails,
                          phone_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="nationality"
                    >
                      Nationality
                    </label>
                    <select
                      id="nationality"
                      className="form-select w-full px-2 py-2 cursor-pointer"
                      value={editGuideDetails?.nationality ?? ""}
                      onChange={(e) => {
                        setEditGuideDetails({
                          ...editGuideDetails,
                          nationality: e.target.value,
                        });
                      }}
                    >
                      <option
                        className="dark:bg-gray-800 cursor-pointer"
                        value=""
                        disabled
                        hidden
                      >
                        Select
                      </option>
                      {nationalities?.map((nation) => {
                        return (
                          <option
                            className="dark:bg-gray-800 cursor-pointer"
                            key={nation}
                            value={nation}
                          >
                            {nation}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="guide-id"
                    >
                      Guide ID
                    </label>
                    <input
                      id="guide-id"
                      className="form-input w-full px-2 py-2"
                      type="text"
                      value={editGuideDetails?.identity_code ?? ""}
                      onChange={(e) => {
                        setEditGuideDetails({
                          ...guideDetails,
                          identity_code: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-2 w-full h-12 gap-4 space-x-2">
                  <button
                    className="btn border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditGuideDetails(guideDetails);
                      setEditGuideModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveGuideDetails();
                    }}
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </ModalBasic>

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
            <GuideDetailsTable list={list} />

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

export default GuidesDetails;

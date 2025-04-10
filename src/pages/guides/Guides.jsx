import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import SearchForm from "../../partials/actions/SearchForm";
import PaginationClassic from "../../components/PaginationClassic";
import GuidesTable from "../../partials/guides/GuidesTable";
import ModalBasic from "../../components/ModalBasic";
import { set } from "date-fns";

function Guides() {
  const apiURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addGuideModalOpen, setAddGuideModalOpen] = useState(false);
  const [nationalities, setNationalities] = useState([]);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [guideDetails, setGuideDetails] = useState(null);

  const getGuidesList = async () => {
    try {
      const response = await fetch(
        `${apiURL}/api/v1/users/list?page=${page}&perpage=10&role=guide&search=${
          searchText || ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Guides list:", data?.response);
        setList(data.response?.date);
        setTotalItems(data.response?.meta?.total);
      } else {
        console.error("Error fetching guides:", data.message);
      }
    } catch (error) {
      console.error("Error fetching guides:", error);
      return [];
    }
  };

  const addNewGuide = () => {
    fetch(`${apiURL}/api/v1/users/add-guide`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(guideDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.response) {
          console.log("Guide created successfully:", data?.response);
          setGuideDetails(null);
          setAddGuideModalOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error creating guide:", error);
      });
  };

  useEffect(() => {
    getGuidesList();
  }, [page, searchText]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setNationalities(data.map((nation) => nation?.name?.common).sort());
      })
      .catch((error) => {
        console.error("Error fetching guide details:", error);
      });
  }, [addGuideModalOpen]);

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
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Guides
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                <SearchForm
                  placeholder="Search Guide"
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
                {/* Create invoice button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddGuideModalOpen(true);
                  }}
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
                  <span className="max-xs:sr-only">Add New Guide</span>
                </button>
                <ModalBasic
                  id="guide-modal"
                  modalOpen={addGuideModalOpen}
                  // setModalOpen={setAddGuideModalOpen}
                  title="Add Guide"
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
                          value={guideDetails?.full_name ?? ""}
                          onChange={(e) => {
                            setGuideDetails({
                              ...guideDetails,
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
                          value={guideDetails?.gender ?? ""}
                          onChange={(e) => {
                            setGuideDetails({
                              ...guideDetails,
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
                          value={guideDetails?.phone_number ?? ""}
                          onChange={(e) => {
                            setGuideDetails({
                              ...guideDetails,
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
                          value={guideDetails?.nationality ?? ""}
                          onChange={(e) => {
                            setGuideDetails({
                              ...guideDetails,
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
                          value={guideDetails?.identity_code ?? ""}
                          onChange={(e) => {
                            setGuideDetails({
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
                          setGuideDetails(null);
                          setAddGuideModalOpen(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addNewGuide();
                        }}
                        className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </ModalBasic>
              </div>
            </div>

            {/* Table */}
            <GuidesTable list={list} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic
                firstIndex={totalItems === 0 ? 0 : page * 10 - 9}
                lastIndex={totalItems < page * 10 ? totalItems : page * 10}
                total={totalItems}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Guides;

import React, { useState } from "react";
import ToursTableItem from "./ToursTableItem";
import ModalBasic from "../../components/ModalBasic";
import { useStatus } from "../../utils/StatusContext";
import { useNavigate } from "react-router-dom";

function ToursTable({ list, setIsLoading, fetchTours }) {
  const apiURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const { setStatus } = useStatus();
  const navigate = useNavigate();
  const [deleteTourModalOpen, setDeleteTourModalOpen] = useState(false);
  const [deleteTourItem, setDeleteTourItem] = useState(null);

  const handleDeleteTour = (tour) => {
    setDeleteTourModalOpen(true);
    setDeleteTourItem(tour);
  };

  const deleteTour = (id) => {
    setIsLoading(true);
    fetch(`${apiURL}/api/v1/tours/${id}`, {
      method: "DELETE",
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
        setStatus({
          type: "success",
          message: "Tour Deleted Successfully",
        });
        fetchTours();
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
        setDeleteTourModalOpen(false);
        setDeleteTourItem(null);
      });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl relative">
        <div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Table header */}
              <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-700/60">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Id</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Date</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Guide</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Participants</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              {list?.map((tour, idx) => {
                return (
                  <ToursTableItem
                    key={tour?.uid}
                    uid={tour?.uid}
                    id={tour?.code}
                    image={tour?.image_url}
                    name={tour.name}
                    date={tour?.updatedAt}
                    guide={tour?.tour_guides?.length}
                    participants={tour?.tour_participants?.length}
                    handleDeleteTour={handleDeleteTour}
                  />
                );
              })}
            </table>
          </div>
        </div>
      </div>
      {/* Delete Tour Confirmation Modal */}
      <ModalBasic
        id="delete-confirmation-modal"
        modalOpen={deleteTourModalOpen}
        setModalOpen={setDeleteTourModalOpen}
        title={"Delete Tour"}
      >
        <div className="px-5 py-4">
          <div>
            <div className="text-gray-800 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteTourItem?.tourName}</span>?
            </div>
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="grid grid-cols-2 w-full h-12 gap-4 space-x-2">
            <button
              className="btn border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTourModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTour(deleteTourItem?.id);
              }}
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </ModalBasic>
    </>
  );
}

export default ToursTable;

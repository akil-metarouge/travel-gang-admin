import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import CreateTourForm from "../../partials/tours/CreateTourForm";

function CreateTour() {
  const apiURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tourDetails, setTourDetails] = useState({});
  const navigate = useNavigate();

  const uploadImage = (file) => {
    // Upload image to your server
    // and return the uploaded image URL
    const formData = new FormData();
    formData.append("image", file);

    fetch(`${apiURL}/api/v1/common/media-upload`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.response) {
          console.log("Image uploaded successfully:", data?.response);
          return data?.response;
        } else {
          console.error("Error uploading image:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleCreate = () => {
    // Upload Image first
    // let newImageUrl = "";
    // if (tourDetails?.image_url) {
    //   const imageUrl = uploadImage(tourDetails?.image_url);
    //   newImageUrl = imageUrl?.response;
    // }

    // if (newImageUrl) {
    fetch(`${apiURL}/api/v1/tours`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tourDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.response) {
          console.log("Tour created successfully:", data?.response);
          navigate("/tours/" + data?.response?.uid);
        } else {
          console.error("Error creating tour:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error creating tour:", error);
      });
    // }
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="h-full px-4 sm:px-6 lg:px-8 my-8 w-full max-w-[96rem] mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-4">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 flex">
                {/* back btn */}
                <button
                  onClick={() => navigate(-1)}
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Create a new tour
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Create tour button */}
                <button
                  onClick={handleCreate}
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-30 cursor-pointer"
                >
                  <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Create</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <CreateTourForm
              tourDetails={tourDetails}
              setTourDetails={setTourDetails}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateTour;

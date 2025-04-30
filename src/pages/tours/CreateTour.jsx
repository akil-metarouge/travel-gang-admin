import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import CreateTourForm from "../../partials/tours/CreateTourForm";
import { useStatus } from "../../utils/StatusContext";
import PageLoader from "../../components/PageLoader";

function CreateTour() {
  const apiURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const { setStatus } = useStatus();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tourDetails, setTourDetails] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [newImageUrl, setNewImageUrl] = useState(null);
  const [newItineraryUrl, setNewItineraryUrl] = useState(null);

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${apiURL}/api/v1/common/spaces-upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401 || response.status === 403) {
        // Sign out
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
        return; // stop further execution
      }

      const data = await response.json();

      if (data?.fileUrl) {
        console.log("File uploaded successfully:", data.fileUrl);
        return data.fileUrl;
      } else {
        console.error("Error uploading image:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const createTourAPICall = async (details) => {
    try {
      const response = await fetch(`${apiURL}/api/v1/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(details),
      });
      if (response.status === 401 || response.status === 403) {
        // Sign out
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
        return; // stop further execution
      }
      const data = await response.json();
      if (data?.response) {
        console.log("Tour created successfully:", data?.response);
        setStatus({ type: "success", message: "New Tour Created" });
        navigate("/tours/" + data?.response?.uid);
      } else {
        console.error("Error creating tour:", data.message);
        setStatus({
          type: "error",
          message: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    // Upload Image and/or Itinerary
    if (tourDetails?.image_url || tourDetails?.itinerary) {
      if (tourDetails?.image_url && typeof tourDetails.image_url === "object") {
        try {
          const imageUrl = await uploadFile(tourDetails.image_url);
          console.log("Image URL:", imageUrl);
          if (imageUrl) {
            setNewImageUrl(imageUrl);
          }
        } catch (err) {
          console.error("Image upload failed:", err);
        }
      }

      if (tourDetails?.itinerary && typeof tourDetails.itinerary === "object") {
        try {
          const itineraryUrl = await uploadFile(tourDetails.itinerary);
          console.log("Itinerary URL:", itineraryUrl);
          if (itineraryUrl) {
            setNewItineraryUrl(itineraryUrl);
          }
        } catch (err) {
          console.error("Itinerary upload failed:", err);
        }
      }
    }
  };

  const handleUploadCSV = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${apiURL}/api/v1/bookings/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401 || response.status === 403) {
        // Sign out
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
        return; // stop further execution
      }

      const data = await response.json();

      if (data?.response) {
        console.log("CSV uploaded successfully:", data.response);
        setStatus({ type: "success", message: "CSV Uploaded Successfully" });
        navigate("/tours/" + data?.response?.uid);
      } else {
        console.error("Error uploading CSV:", data.message);
        setStatus({
          type: "error",
          message: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading && tourDetails?.code) {
      const shouldUploadImage = !!tourDetails?.image_url;
      const shouldUploadItinerary = !!tourDetails?.itinerary;

      const hasImageUrl = !!newImageUrl;
      const hasItineraryUrl = !!newItineraryUrl;

      // Wait until expected uploads are done
      if (
        (shouldUploadImage && !hasImageUrl) ||
        (shouldUploadItinerary && !hasItineraryUrl)
      ) {
        return;
      }

      // Build the final payload
      const updatedTourDetails = {
        ...tourDetails,
        ...(shouldUploadImage && { image_url: newImageUrl }),
        ...(shouldUploadItinerary && { itinerary: newItineraryUrl }),
      };

      createTourAPICall(updatedTourDetails);
    }
  }, [newImageUrl, newItineraryUrl, isLoading]);

  return (
    <div className="flex h-[100dvh]">
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
                  onClick={() => navigate("/tours")}
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
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const fileInput = document.createElement("input");
                      fileInput.type = "file";
                      fileInput.accept = ".csv";
                      fileInput.onchange = (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleUploadCSV(file);
                        }
                      };
                      fileInput.click();
                    }}
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-30 cursor-pointer"
                  >
                    Upload CSV
                  </button>
                </div>
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
        {isLoading && <PageLoader />}
      </div>
    </div>
  );
}

export default CreateTour;

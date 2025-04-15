import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import CreateTourForm from "../../partials/tours/CreateTourForm";
import { useStatus } from "../../utils/StatusContext";
import PageLoader from "../../components/PageLoader";

function ToursDetails() {
  const apiURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const { setStatus } = useStatus();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tourDetails, setTourDetails] = useState({});
  const [newImageUrl, setNewImageUrl] = useState(null);

  //guides states
  const [guides, setGuides] = useState([]);
  const [guidesList, setGuidesList] = useState([]);
  const [assignGuideModalOpen, setAssignGuideModalOpen] = useState(false);
  const [guideSearchText, setGuideSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] =
    useState(guideSearchText);
  const [guidesPage, setGuidesPage] = useState(1);
  const [guidesLoading, setGuidesLoading] = useState(false);
  const loadMoreRefForGuide = useRef(null);
  const [hasMoreGuides, setHasMoreGuides] = useState(true);

  //participants states
  const [participants, setParticipants] = useState([]);
  const [newParticipantDetails, setNewParticipantDetails] = useState([]);
  const [assignParticipantModalOpen, setAssignParticipantModalOpen] =
    useState(false);

  //newsletter states
  const [newsletters, setNewsletters] = useState([]);

  const getTourDetails = () => {
    fetch(`${apiURL}/api/v1/tours/${id}/admin`, {
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
        console.log("getTourDetails: ", data?.response);
        setTourDetails(data?.response);
      })
      .catch((error) => {
        console.error("Error fetching tour details:", error);
        setStatus({
          type: "error",
          message: error?.message || "Something went wrong",
        });
      });
  };

  const updateTourAPICall = async (details) => {
    console.log("updateTourAPICall: ", details);
    try {
      const response = await fetch(`${apiURL}/api/v1/tours/${id}`, {
        method: "PUT",
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
        console.log("Tour updated successfully:", data?.response);
        setStatus({ type: "success", message: "Tour Updated" });
        // navigate("/tours");
        getTourDetails();
      } else {
        console.error("Error updating tour:", data.message);
        setStatus({
          type: "error",
          message: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${apiURL}/api/v1/common/media-upload`, {
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
        console.log("Image uploaded successfully:", data.response);
        return data.response;
      } else {
        console.error("Error uploading image:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSave = async () => {
    // exclude image_url from tourDetails
    // const { image_url, itinerary, ...rest } = tourDetails;
    // const newTourDetails = { ...rest };
    // console.log("Save tour: ", newTourDetails);

    // Upload image if it exists
    if (tourDetails?.image) {
      const imageUrl = await uploadImage(tourDetails.image);
      console.log("Image URL: ", imageUrl);
      setNewImageUrl(imageUrl);
      setIsLoading(true);
    } else {
      setIsLoading(true);
    }
  };

  // guides functions
  const modifyAssignedGuides = (guideId) => {
    const updatedGuides = [];
    if (guideId) {
      updatedGuides.push({
        id: guideId,
        is_deleted: true,
      });
    } else {
      guidesList.forEach((guide) => {
        if (guide?.selected) {
          updatedGuides.push({
            id: guide?.uid,
            is_deleted: false,
          });
        } else {
          updatedGuides.push({
            id: guide?.uid,
            is_deleted: true,
          });
        }
      });
    }
    console.log("Updated guides:", updatedGuides);

    fetch(`${apiURL}/api/v1/tours/${tourDetails?.uid}/assign-guides`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        guide_ids: updatedGuides,
      }),
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
        if (data?.response) {
          console.log("Guides updated successfully:", data?.response);
          setStatus({ type: "success", message: "Guides Assigned" });
          setAssignGuideModalOpen(false);
          getTourDetails();
        }
      })
      .catch((error) => {
        console.error("Error updating guides:", error);
        setStatus({
          type: "error",
          message: error?.message || "Something went wrong",
        });
      });
  };

  const getGuidesList = async (page, searchText) => {
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

      if (response.status === 401 || response.status === 403) {
        // Sign out
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
        return; // stop further execution
      }

      const data = await response.json();
      const filteredGuideIds = guides?.map((guide) => guide?.guide?.uid);

      // const guidesForList = data?.response?.date?.filter((guide) => {
      //   return !filteredGuideIds?.includes(guide.uid);
      // });
      const guidesForList = data?.response?.date?.map((guide) => {
        if (filteredGuideIds?.includes(guide?.uid)) {
          return {
            ...guide,
            selected: true,
          };
        }
        return {
          ...guide,
          selected: false,
        };
      });

      return guidesForList || [];
    } catch (error) {
      console.error("Error fetching guides:", error);
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong",
      });
      return [];
    }
  };

  // participants functions
  const addNewParticipant = () => {
    console.log("New participant details: ", newParticipantDetails);

    const { primary_participant_id, is_primary } = newParticipantDetails;
    const newParticipant = {
      ...newParticipantDetails,
      primary_participant_id: !is_primary ? primary_participant_id : null,
    };

    fetch(`${apiURL}/api/v1/tours/${tourDetails?.uid}/participant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newParticipant),
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
        console.log("Participant added successfully:", data?.response);
        setStatus({ type: "success", message: "New Participant Added" });
        // setAssignParticipantModalOpen(false);
        // setNewParticipantDetails({});
        // getTourDetails();
      })
      .catch((error) => {
        console.error("Error adding participant:", error);
        setStatus({
          type: "error",
          message: error?.message || "Something went wrong",
        });
      });
  };

  useEffect(() => {
    getTourDetails();
  }, [id]);

  useEffect(() => {
    if (isLoading) {
      const { itinerary, ...rest } = tourDetails;
      const newTourDetails = { ...rest };
      console.log("Save tour: ", newTourDetails);
      console.log("New image URL: ", newImageUrl);
      if (newImageUrl) {
        const updatedTourDetails = {
          ...newTourDetails,
          image_url: newImageUrl,
        };
        updateTourAPICall(updatedTourDetails);
      } else {
        console.log("Image URL not found, updating without it.");
        updateTourAPICall(newTourDetails);
      }
    }
  }, [newImageUrl, isLoading]);

  // guides actions
  useEffect(() => {
    if (
      !loadMoreRefForGuide.current ||
      guidesLoading ||
      !hasMoreGuides ||
      !assignGuideModalOpen
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !guidesLoading && hasMoreGuides) {
          console.log("Load more triggered");
          setGuidesPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(loadMoreRefForGuide.current);

    return () => {
      if (loadMoreRefForGuide.current) {
        observer.unobserve(loadMoreRefForGuide.current);
      }
    };
  }, [guidesLoading, hasMoreGuides]);

  useEffect(() => {
    const loadMoreGuides = async () => {
      if (
        guidesPage <= 1 || // page 1 already fetched
        guidesLoading ||
        !hasMoreGuides ||
        !assignGuideModalOpen
      )
        return;

      setGuidesLoading(true);
      const newGuides = await getGuidesList(guidesPage, debouncedSearchText);

      setGuidesList((prev) => [...prev, ...newGuides]);

      if (newGuides.length < 10) {
        setHasMoreGuides(false);
      }

      setGuidesLoading(false);
    };

    loadMoreGuides();
  }, [guidesPage, assignGuideModalOpen, debouncedSearchText]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(guideSearchText);
    }, 300); // you can increase this if needed

    return () => {
      clearTimeout(handler); // cleanup on text change
    };
  }, [guideSearchText]);

  useEffect(() => {
    if (!assignGuideModalOpen) return;

    const fetchOnSearchChange = async () => {
      setGuidesList([]);
      setHasMoreGuides(true);
      setGuidesPage(1); // this triggers the pagination effect, too
      setGuidesLoading(true);

      const newGuides = await getGuidesList(1, debouncedSearchText);
      setGuidesList(newGuides);

      if (newGuides.length < 10) {
        setHasMoreGuides(false);
      }

      setGuidesLoading(false);
    };

    fetchOnSearchChange();
  }, [debouncedSearchText, assignGuideModalOpen]);

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
            <div className="sm:flex sm:justify-between sm:items-center mb-4">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 flex items-center">
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
                  {tourDetails?.name}
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Create tour button */}
                <button
                  onClick={handleSave}
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
                  <span className="max-xs:sr-only">Save</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <CreateTourForm
              tourDetails={tourDetails}
              setTourDetails={setTourDetails}
              guides={guides}
              setGuides={setGuides}
              modifyAssignedGuides={modifyAssignedGuides}
              assignGuideModalOpen={assignGuideModalOpen}
              setAssignGuideModalOpen={setAssignGuideModalOpen}
              guidesList={guidesList}
              setGuidesList={setGuidesList}
              loadMoreRefForGuide={loadMoreRefForGuide}
              guidesLoading={guidesLoading}
              guideSearchText={guideSearchText}
              setGuideSearchText={setGuideSearchText}
              participants={participants}
              setParticipants={setParticipants}
              newParticipantDetails={newParticipantDetails}
              setNewParticipantDetails={setNewParticipantDetails}
              addNewParticipant={addNewParticipant}
              assignParticipantModalOpen={assignParticipantModalOpen}
              setAssignParticipantModalOpen={setAssignParticipantModalOpen}
              newsletters={newsletters}
            />
          </div>
        </main>
        {isLoading && <PageLoader />}
      </div>
    </div>
  );
}

export default ToursDetails;

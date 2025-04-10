import React, { useEffect, useRef, useState } from "react";
import DatePickerWithRange from "../../components/Datepicker";
import ModalBasic from "../../components/ModalBasic";
import SearchForm from "../actions/SearchForm";
import DropdownEditMenu from "../../components/DropdownEditMenu";

function CreateTourForm({
  tourDetails,
  setTourDetails,
  guides,
  setGuides = () => {},
  modifyAssignedGuides,
  assignGuideModalOpen,
  setAssignGuideModalOpen,
  guidesList,
  setGuidesList,
  loadMoreRefForGuide,
  guidesLoading,
  guideSearchText,
  setGuideSearchText,
  participants,
  setParticipants = () => {},
  newParticipantDetails,
  setNewParticipantDetails,
  addNewParticipant,
  assignParticipantModalOpen,
  setAssignParticipantModalOpen,
}) {
  const [isCreateForm, setIsCreateForm] = useState(false);
  const [image, setImage] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [date, setDate] = useState(null);
  const [newsletters, setNewsletters] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);

  const [assignNewsletterModalOpen, setAssignNewsletterModalOpen] =
    useState(false);
  const [newNewsletter, setNewNewsletter] = useState({
    image: null,
    name: "",
    url: "",
  });

  const [participantMenuOpen, setParticipantMenuOpen] = useState(false);

  const handleNewsletterMenuBtnClick = () => {
    console.log("Newsletter Menu Button Clicked");
  };

  const handleAddNewGuideBtnClick = () => {
    console.log("Add New Guide Button Clicked");
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      setTourDetails((prev) => ({
        ...prev,
        start_date: newDate.from,
        end_date: newDate.to,
      }));
    }
  };

  useEffect(() => {
    const currentRoute = window.location.pathname.split("/").pop();
    if (currentRoute === "create") {
      setIsCreateForm(true);
    }
  }, []);

  useEffect(() => {
    setImage(tourDetails?.image_url);
    setItinerary(tourDetails?.itinerary);
    if (tourDetails?.start_date && tourDetails?.end_date) {
      const previousSetDate = {
        from: new Date(tourDetails?.start_date),
        to: new Date(tourDetails?.end_date),
      };
      setDate(previousSetDate);
    } else {
      setDate(null);
    }
    setGuides(tourDetails?.tour_guides);
    setParticipants(tourDetails?.participants);
    setNewsletters(tourDetails?.newsletters);
  }, [tourDetails]);

  useEffect(() => {
    // console.log("image: ", image);
    let objectUrl;

    if (image && typeof image !== "string" && image instanceof Blob) {
      objectUrl = URL.createObjectURL(image);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [image]);

  useEffect(() => {
    let objectUrl;

    if (itinerary && itinerary instanceof Blob) {
      objectUrl = URL.createObjectURL(itinerary);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [itinerary]);

  // console.log("guides: ", guides.map((g) => g.selected));
  // console.log("participants: ", participants);
  // console.log("searchText: ", guideSearchText);
  // console.log("bookingDetails: ", bookingDetails);
  // console.log("newNewsletter: ", newNewsletter?.image);
  // console.log("assignNewsletterModalOpen: ", assignNewsletterModalOpen);
  useEffect(() => {
    console.log("tourDetails: ", tourDetails);
  }, [tourDetails]);

  useEffect(() => {
    console.log("guidesList: ", guidesList);
  }, [guidesList]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <main className="grow">
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-[96rem] mx-auto">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="px-6 py-6">
              {/* Start */}
              {image ? (
                <div className="relative h-60 mb-8 flex items-center justify-center">
                  {image && (
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : image instanceof Blob
                          ? URL.createObjectURL(image)
                          : ""
                      }
                      alt="Preview-Image"
                      className="object-cover h-60 rounded-lg"
                    />
                  )}
                  <button
                    onClick={() => setImage(null)}
                    className="w-6 h-6 absolute [right:-10px] [top:-10px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="relative h-60 mb-8 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
                  <input
                    id="file-upload"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImage(file);
                      // setTourDetails((prev) => ({
                      //   ...prev,
                      //   image_url: file,
                      // }));
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="text-gray-500 text-sm pointer-events-none"
                  >
                    Add Image
                  </label>
                </div>
              )}

              {itinerary ? (
                <div className="relative h-60 mb-8 flex items-center justify-center">
                  {(() => {
                    const isFile =
                      typeof itinerary === "object" &&
                      itinerary instanceof Blob;
                    const type = isFile
                      ? itinerary.type
                      : itinerary?.split(".").pop()?.toLowerCase();
                    const isPdf = isFile
                      ? itinerary.type === "application/pdf"
                      : type === "pdf";

                    const source = isFile
                      ? URL.createObjectURL(itinerary)
                      : itinerary;

                    return isPdf ? (
                      <iframe
                        src={source}
                        title="PDF Preview"
                        className="w-full h-60 rounded-lg"
                      />
                    ) : (
                      <img
                        src={source}
                        alt="Itinerary-image"
                        className="object-cover h-60 rounded-lg"
                      />
                    );
                  })()}

                  <button
                    onClick={() => setItinerary(null)}
                    className="w-6 h-6 absolute [right:-10px] [top:-10px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="relative h-60 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
                  <input
                    id="file-upload"
                    type="file"
                    disabled
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:opacity-0 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    accept="image/png, image/jpeg, application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setItinerary(file);
                      // setTourDetails((prev) => ({
                      //   ...prev,
                      //   itinerary: file,
                      // }));
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    className="text-gray-500 text-sm pointer-events-none"
                  >
                    Upload Itinerary
                  </label>
                </div>
              )}
              {/* End */}
            </div>

            <div className="py-6">
              {/* Start */}
              <div className="h-[515px] bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold">Details</h2>
                <div className="pt-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="tour-id"
                    >
                      Tour ID
                    </label>
                    <input
                      id="tour-id"
                      className="form-input w-full"
                      type="text"
                      value={tourDetails?.code ?? ""}
                      onChange={(e) => {
                        setTourDetails({
                          ...tourDetails,
                          code: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {/* <div className="text-xs mt-1">Supporting text goes here!</div> */}
                </div>
                <div className="py-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="tour-name"
                    >
                      Tour Name
                    </label>
                    <input
                      id="tour-name"
                      className="form-input w-full"
                      type="text"
                      value={tourDetails?.name ?? ""}
                      onChange={(e) => {
                        setTourDetails({
                          ...tourDetails,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {/* <div className="text-xs mt-1">Supporting text goes here!</div> */}
                </div>
                <div className="py-2">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="tour-date-range"
                    >
                      Start - End Date
                    </label>
                    <DatePickerWithRange
                      className="w-full cursor-pointer"
                      date={date}
                      setDate={handleDateChange}
                    />
                  </div>
                </div>
                <div className="py-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="tour-guides"
                    >
                      Tour Guides
                    </label>
                    {guides?.length > 0 && (
                      <div
                        className={`h-24 mb-4 grid gap-2 overflow-y-auto scrollbar-thin ${
                          guides?.length > 2 ? "pr-4" : ""
                        }`}
                      >
                        {guides?.map((guide, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-2 h-14 text-sm items-center justify-between bg-gray-300 dark:bg-gray-700 p-4 rounded-lg"
                          >
                            <div>{guide?.guide?.full_name}</div>
                            <button
                              onClick={() => {
                                modifyAssignedGuides(guide?.guide?.uid);
                              }}
                              className="text-end text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(e);
                        setAssignGuideModalOpen(true);
                        // getGuidesList();
                      }}
                      disabled={isCreateForm}
                      className="btn w-full bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                      + Assign Guide
                    </button>
                    <ModalBasic
                      id="guide-modal"
                      modalOpen={assignGuideModalOpen}
                      setModalOpen={setAssignGuideModalOpen}
                      title="Assign Guides"
                    >
                      {/* Modal content */}
                      <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                          <div className="mb-4">
                            <SearchForm
                              placeholder="Search Guide"
                              searchText={guideSearchText}
                              setSearchText={setGuideSearchText}
                            />
                            <h2 className="my-4">Select Guide</h2>
                          </div>
                          {/* Options */}
                          <ul
                            className={`space-y-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4 max-h-80 overflow-y-auto scrollbar-thin ${
                              guidesList?.length > 5 ? "pr-4" : ""
                            }`}
                          >
                            {guidesList?.map((guide, idx) => (
                              <li key={idx}>
                                <button
                                  // on click add guide to selectedGuides
                                  onClick={() => {
                                    // update the selected state of the guide in guidesList
                                    const updatedGuidesList = guidesList.map(
                                      (g) => {
                                        if (g?.uid === guide?.uid) {
                                          return {
                                            ...g,
                                            selected: !g?.selected,
                                          };
                                        }
                                        return g;
                                      }
                                    );
                                    setGuidesList(updatedGuidesList);
                                  }}
                                  className={`w-full h-full text-left py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border${
                                    guide?.selected
                                      ? "-2 border-pink-400 dark:border-pink-500"
                                      : " border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600"
                                  } shadow-xs transition cursor-pointer`}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={`w-4 h-4 border-${
                                        guide?.selected
                                          ? "4 bg-white border-pink-500"
                                          : "2 border-gray-300 dark:border-gray-600"
                                      } rounded-full mr-3`}
                                    ></div>
                                    <div className="flex justify-between w-full">
                                      <div className="font-medium">
                                        {guide?.full_name}
                                      </div>
                                      <div className="text-gray-500">
                                        ID: {guide?.identity_code}
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              </li>
                            ))}
                            {guidesLoading && (
                              <div className="flex justify-center py-4">
                                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                              </div>
                            )}
                            <li ref={loadMoreRefForGuide} className="h-1" />
                          </ul>
                          <div>
                            <button
                              onClick={handleAddNewGuideBtnClick}
                              className="text-blue-500 cursor-pointer hover:font-medium"
                            >
                              + Add New Guide
                            </button>
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
                              setAssignGuideModalOpen(false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              modifyAssignedGuides(false);
                            }}
                            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </ModalBasic>
                    {/* End */}
                  </div>
                </div>
              </div>
              {/* End */}
            </div>

            <div className="py-6">
              {/* Start */}
              <div className="h-[515px] bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold">
                  Participants
                  {participants?.length ? "(" + participants.length + ")" : ""}
                </h2>
                {/* Participants list */}
                {participants?.length > 0 ? (
                  <div className="py-4">
                    <div className="pb-4 grid grid-cols-2 gap-4 justify-center items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(e);
                          setAssignParticipantModalOpen(true);
                        }}
                        className="btn bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
                      >
                        + Assign Participant
                      </button>
                      <button className="btn bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600">
                        Upload CSV
                      </button>
                    </div>
                    <div
                      className={`grid h-90 pb-20 overflow-y-auto scrollbar-thin`}
                    >
                      {participants?.map((participant, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-2 h-10 items-center justify-between"
                        >
                          <div>{participant?.full_name}</div>
                          <div className="flex items-center justify-between">
                            <div className="text-gray-500">
                              ID: {participant?.identity_code}
                            </div>
                            <DropdownEditMenu
                              align="left"
                              className={`relative ${
                                participants?.length >= 7 && "mr-5"
                              }`}
                            >
                              <li>
                                <button
                                  onClick={() => {
                                    console.log("edit clicked");
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
                                  className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3 w-full cursor-pointer"
                                  href="#0"
                                >
                                  Remove
                                </button>
                              </li>
                            </DropdownEditMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="mb-8">
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center">
                          {/* <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                          <img
                            src={userIcon}
                            alt="User"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div> */}
                          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mr-2 overflow-hidden"></div>
                        </div>
                      </div>
                      <h2 className="text-center font-bold">No Participants</h2>
                    </div>
                    <div className="py-4 grid gap-4 justify-center">
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(e);
                            setAssignParticipantModalOpen(true);
                          }}
                          disabled={isCreateForm}
                          className="btn w-60 bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                          + Assign Participant
                        </button>
                      </div>
                      <div>
                        <button
                          disabled={isCreateForm}
                          className="btn w-60 bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                          Upload CSV
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <ModalBasic
                id="participant-modal"
                modalOpen={assignParticipantModalOpen}
                setModalOpen={setAssignParticipantModalOpen}
                title="Add Participant"
              >
                {/* Modal content */}
                <div className="px-5 py-4">
                  <div className="space-y-3">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Participant name
                      </label>
                      <input
                        id="name"
                        className="form-input w-full px-2 py-2"
                        type="text"
                        value={newParticipantDetails?.full_name ?? ""}
                        onChange={(e) => {
                          setNewParticipantDetails((prev) => ({
                            ...prev,
                            full_name: e.target.value,
                          }));
                        }}
                      />
                      <div className="mt-4 flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox rounded-full checked:bg-green-600 checked:border-transparent w-6 h-6 cursor-pointer"
                          checked={!!newParticipantDetails?.is_primary}
                          onChange={() =>
                            setNewParticipantDetails((prev) => ({
                              ...prev,
                              is_primary: !prev.is_primary,
                            }))
                          }
                        />
                        <p className="text-sm font-semibold">
                          Primary Participant
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="select-primary-participant"
                      >
                        Select Primary
                      </label>
                      <select
                        id="select-primary-participant"
                        className="form-select w-full px-2 py-2 cursor-pointer disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                        disabled={participants?.length < 2}
                        value={
                          newParticipantDetails?.primary_participant_id ?? ""
                        }
                        onChange={(e) =>
                          setNewParticipantDetails((prev) => ({
                            ...prev,
                            primary_participant_id: e.target.value,
                          }))
                        }
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {participants?.map((participant, idx) => (
                          <option
                            className="dark:bg-gray-800 cursor-pointer"
                            key={idx}
                            value={participant?.uid}
                          >
                            {participant?.full_name}
                          </option>
                        ))}
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
                        value={newParticipantDetails?.phone_number ?? ""}
                        onChange={(e) => {
                          setNewParticipantDetails((prev) => ({
                            ...prev,
                            phone_number: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="participantId"
                      >
                        Participant ID
                      </label>
                      <input
                        id="participant-id"
                        className="form-input w-full px-2 py-2"
                        type="text"
                        value={newParticipantDetails?.identity_code ?? ""}
                        onChange={(e) => {
                          setNewParticipantDetails((prev) => ({
                            ...prev,
                            identity_code: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="bookingDetails"
                      >
                        Booking Details
                      </label>
                      <div className="relative h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600">
                        <label
                          htmlFor="bookingDetails"
                          className="text-blue-500 flex justify-center items-center gap-2 w-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="oklch(0.623 0.214 259.815)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 19V5M5 12l7-7 7 7" />
                          </svg>
                          Upload File
                        </label>
                        <input
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="application/pdf"
                          type="file"
                          id="bookingDetails"
                          onChange={(e) => {
                            setBookingDetails(e.target.files[0]);
                            setNewParticipantDetails((prev) => ({
                              ...prev,
                              booking_details: e.target.files[0],
                            }));
                          }}
                        />
                      </div>
                      {bookingDetails && (
                        <div className="mt-4 flex items-center gap-2 text-sm w-full overflow-hidden">
                          {bookingDetails?.name}
                        </div>
                      )}
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
                        setNewParticipantDetails({});
                        setBookingDetails(null);
                        setAssignParticipantModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addNewParticipant();
                      }}
                      className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </ModalBasic>
              {/* End */}
            </div>
          </div>
          <div>
            <div className="py-4">
              {/* Start */}
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between pb-4">
                  <h2 className="text-xl font-bold pb-2">Newsletter</h2>
                  {newsletters?.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(e);
                        setAssignNewsletterModalOpen(true);
                      }}
                      className="btn w-60 bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      + Add Newsletter
                    </button>
                  )}
                </div>
                {/* Newsletters list */}
                {newsletters?.length > 0 ? (
                  <div
                    className={`max-h-60 pb-6 overflow-y-auto scrollbar-thin ${
                      newsletters?.length > 2 ? "pr-4" : ""
                    }`}
                  >
                    <div>
                      {newsletters?.map((newsletter, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-2 items-center py-4 bg-gray-300 dark:bg-gray-700 rounded-lg p-2 my-2"
                        >
                          <div className="flex gap-4 items-center">
                            <div className="w-16 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                              <img
                                src={newsletter.image_url}
                                alt="User"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="font-medium">
                              {newsletter?.title}
                            </div>
                          </div>
                          <div className="flex items-center justify-end">
                            {/* <button
                              onClick={handleNewsletterMenuBtnClick}
                              className="btn text-gray-900 dark:text-gray-100 cursor-pointer"
                            >
                              <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="5" cy="12" r="1"></circle>
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                              </svg>
                            </button> */}
                            <DropdownEditMenu
                              align="left"
                              className={`relative`}
                            >
                              <li>
                                <button
                                  onClick={() => {
                                    console.log("edit clicked");
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
                                  className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3 w-full cursor-pointer"
                                  href="#0"
                                >
                                  Remove
                                </button>
                              </li>
                            </DropdownEditMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center py-4">
                      <div className="flex items-center">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mr-2 overflow-hidden"></div>
                      </div>
                    </div>
                    <h2 className="text-center font-bold">No Newsletter</h2>
                    <div className="py-4 grid gap-4 justify-center">
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(e);
                            setAssignNewsletterModalOpen(true);
                          }}
                          disabled={isCreateForm}
                          className="btn w-60 bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                          + Add Newsletter
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <ModalBasic
                id="participant-modal"
                modalOpen={assignNewsletterModalOpen}
                setModalOpen={setAssignNewsletterModalOpen}
                title="Add Newsletter"
              >
                {/* Modal content */}
                <div className="px-5 py-4">
                  <div className="space-y-3">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        className="form-input w-full px-2 py-2"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="url"
                      >
                        URL
                      </label>
                      <input
                        id="url"
                        className="form-input w-full px-2 py-2"
                        type="text"
                      />
                    </div>
                    {newNewsletter?.image ? (
                      <div className="mb-1 mt-5">
                        <div>
                          <img
                            src={URL.createObjectURL(newNewsletter.image)}
                            alt="Image"
                            className="object-cover w-full max-h-80 rounded-lg"
                          />
                        </div>
                        {/* <button
                          onClick={() =>
                            setNewNewsletter((prev) => ({
                              ...prev,
                              image: null,
                            }))
                          }
                          className="w-6 h-6 absolute [right:-10px] [top:-10px] bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 fill-current text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button> */}
                        <div className="relative h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600">
                          <label
                            htmlFor="newsletter-image"
                            className="text-blue-500 flex justify-center items-center gap-2 w-full"
                          >
                            Change Image
                          </label>
                          <input
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/png, image/jpeg"
                            type="file"
                            id="newsletter-image"
                            onChange={(e) => {
                              setNewNewsletter((prev) => ({
                                ...prev,
                                image: e.target.files[0],
                              }));
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-60 mb-1 mt-5 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
                        <input
                          id="file-upload"
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/png, image/jpeg"
                          onChange={(e) => {
                            setNewNewsletter((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }));
                          }}
                        />
                        <label
                          htmlFor="file-upload"
                          className="text-gray-500 text-sm pointer-events-none"
                        >
                          Add Image
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* Modal footer */}
                <div className="px-5 py-4">
                  <div className="grid grid-cols-2 w-full h-12 gap-4 space-x-2">
                    <button
                      className="btn border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAssignNewsletterModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer">
                      Add
                    </button>
                  </div>
                </div>
              </ModalBasic>
              {/* End */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateTourForm;

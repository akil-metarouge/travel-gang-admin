import React from "react";
import { useNavigate } from "react-router-dom";
import DropdownEditMenu from "../../components/DropdownEditMenu";

function ToursTableItem(props) {
  const navigate = useNavigate();

  const handleTourClick = (id) => {
    navigate(`/tours/${id}`);
  };

  const formatDateToLocal = (utcString) => {
    if (utcString) {
      const localDate = new Date(utcString);
      const day = String(localDate.getDate()).padStart(2, "0");
      const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
      const year = localDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  };

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-gray-800">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mr-2 sm:mr-3">
              <img
                className="ml-1"
                src={props?.image || null}
                width="20"
                height="20"
                alt={props?.name}
              />
            </div>
            <div
              onClick={() => handleTourClick(props?.uid)}
              className="font-medium text-sky-600 cursor-pointer hover:text-sky-700 hover:dark:text-sky-500"
            >
              {props?.name}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div>{props?.id}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-gray-700 dark:text-gray-300">
            {props?.date ? formatDateToLocal(props.date) : ""}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-green-600">
            {props?.guide}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-green-600">
            {props?.participants}
          </div>
        </td>
        <td className="flex justify-end align-center py-3 pr-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props?.handleDeleteTour({
                id: props?.uid,
                tourName: props?.name,
              });
            }}
            className="font-medium text-sm text-red-500 hover:text-red-600 flex p-2 w-10 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
            href="#0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ff0000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10 12V17"
                  stroke="#eb0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M14 12V17"
                  stroke="#eb0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M4 7H20"
                  stroke="#eb0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                  stroke="#eb0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#eb0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          {/* <DropdownEditMenu align="left" className={`relative`}>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props?.deleteTour(props?.uid);
                }}
                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3 w-full cursor-pointer"
                href="#0"
              >
                Delete
              </button>
            </li>
          </DropdownEditMenu> */}
        </td>
      </tr>
    </tbody>
  );
}

export default ToursTableItem;

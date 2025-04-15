import React from "react";
import { useNavigate } from "react-router-dom";

function ToursTableItem(props) {
  const navigate = useNavigate();

  const handleTourClick = (id) => {
    navigate(`/tours/${id}`);
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
            {props?.date.slice(0, 10)}
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
      </tr>
    </tbody>
  );
}

export default ToursTableItem;

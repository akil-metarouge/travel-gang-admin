import React from "react";
import DropdownEditMenu from "../../components/DropdownEditMenu";
import { useNavigate } from "react-router-dom";

function GuidesTableItem(props) {
  const navigate = useNavigate();

  const handleGuideClick = (id) => {
    navigate(`/guides/${id}`);
  };

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          {props.idx + 1}
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-gray-800">
            <div
              onClick={() => handleGuideClick(props.uid)}
              className="font-medium text-sky-600 cursor-pointer hover:text-sky-700 hover:dark:text-sky-500"
            >
              {props.name}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-gray-800 dark:text-gray-100">
            {props.id}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-gray-800 dark:text-gray-100">
            {props.ongoing}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center font-medium text-green-600">
            {props.upcoming}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center font-medium text-green-600">
            {props.completed}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-10 py-3 whitespace-nowrap flex justify-end items-center">
          <DropdownEditMenu align="left" className={`relative `}>
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
        </td>
      </tr>
    </tbody>
  );
}

export default GuidesTableItem;

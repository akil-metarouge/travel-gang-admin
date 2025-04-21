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
      </tr>
    </tbody>
  );
}

export default GuidesTableItem;

import React from "react";

function GuideDetailsTableItem(props) {
  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-gray-800">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mr-2 sm:mr-3">
              <img
                className="ml-1"
                src={props?.image}
                width="20"
                height="20"
                alt={props.name}
              />
            </div>
            <div className="text-left font-medium text-gray-800 dark:text-gray-100">
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
            {props.start_date.slice(0, 10)} - {props.end_date.slice(0, 10)}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center font-medium text-green-600">
            {props.tour_guides?.length > 0
              ? props.tour_guides.map((guide, idx) => (
                  <span key={idx}>
                    {guide?.full_name}
                    {idx !== props.tour_guides.length - 1 ? ", " : ""}
                  </span>
                ))
              : null}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center font-medium text-green-600">
            {props.total_participants}
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default GuideDetailsTableItem;

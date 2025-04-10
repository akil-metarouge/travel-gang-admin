import React from "react";
import ToursTableItem from "./ToursTableItem";

function ToursTable({ list }) {
  return (
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
            {list?.map((tour) => {
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
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ToursTable;

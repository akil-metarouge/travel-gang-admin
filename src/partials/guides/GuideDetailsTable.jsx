import React from "react";
import GuideDetailsTableItem from "./GuideDetailsTableItem";

function GuideDetailsTable({ list }) {
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
                  <div className="font-semibold">Guide</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Participants</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {list?.map((tour, idx) => {
              return (
                <GuideDetailsTableItem
                  key={idx}
                  idx={idx}
                  id={tour?.code}
                  image={tour?.image_url}
                  name={tour?.name}
                  start_date={tour?.start_date}
                  end_date={tour?.end_date}
                  tour_guides={tour?.tour_guides}
                  total_participants={tour?.total_participants}
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default GuideDetailsTable;

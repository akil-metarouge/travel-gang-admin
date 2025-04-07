import React, { useState, useEffect } from "react";
import ToursTableItem from "./ToursTableItem";

import Image01 from "../../images/icon-01.svg";
import Image02 from "../../images/icon-02.svg";
import Image03 from "../../images/icon-03.svg";

function ToursTable({ list }) {
  // const tours = [
  //   {
  //     id: "0",
  //     image: Image01,
  //     name: "Grand Tour To Australia",
  //     date: "22/01/2024",
  //     guide: "Patricia Semklo",
  //     participants: "1",
  //   },
  //   {
  //     id: "1",
  //     image: Image01,
  //     name: "Grand Tour To Australia",
  //     date: "22/01/2024",
  //     guide: "Dominik Lamakani",
  //     participants: "2",
  //   },
  //   {
  //     id: "2",
  //     image: Image02,
  //     name: "Grand Tour To Australia",
  //     date: "22/01/2024",
  //     guide: "Ivan Mesaros",
  //     participants: "2",
  //   },
  //   {
  //     id: "3",
  //     image: Image01,
  //     name: "Grand Tour To Australia",
  //     date: "22/01/2024",
  //     guide: "Maria Martinez",
  //     participants: "1",
  //   },
  //   {
  //     id: "4",
  //     image: Image03,
  //     name: "Grand Tour To Australia",
  //     date: "22/01/2024",
  //     guide: "Vicky Jung",
  //     participants: "1",
  //   },
  //   {
  //     id: "5",
  //     image: Image01,
  //     name: "Grand Tour To Australia",
  //     date: "21/01/2024",
  //     guide: "Tisho Yanchev",
  //     participants: "1",
  //   },
  //   {
  //     id: "6",
  //     image: Image03,
  //     name: "Grand Tour To Australia",
  //     date: "21/01/2024",
  //     guide: "James Cameron",
  //     participants: "1",
  //   },
  //   {
  //     id: "7",
  //     image: Image03,
  //     name: "Grand Tour To Australia",
  //     date: "21/01/2024",
  //     guide: "Haruki Masuno",
  //     participants: "2",
  //   },
  //   {
  //     id: "8",
  //     image: Image02,
  //     name: "Grand Tour To Australia",
  //     date: "21/01/2024",
  //     guide: "Joe Huang",
  //     participants: "2",
  //   },
  //   {
  //     id: "9",
  //     image: Image01,
  //     name: "Grand Tour To Australia",
  //     date: "21/01/2024",
  //     guide: "Carolyn McNeail",
  //     participants: "1",
  //   },
  // ];

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

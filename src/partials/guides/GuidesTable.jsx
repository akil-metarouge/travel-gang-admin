import React, { useState, useEffect } from "react";
import GuidesTableItem from "./GuidesTableItem";

function GuidesTable() {
  const guides = [
    {
      name: "asdf",
      id: "124123",
      ongoing: "Grand trip Australia",
      upcoming: 4,
      completed: 2,
    },
    {
      name: "qwer",
      id: "234234",
      ongoing: "Trip Australia",
      upcoming: 3,
      completed: 1,
    },
    {
      name: "zxcv",
      id: "345345",
      ongoing: "Trip Australia",
      upcoming: 2,
      completed: 1,
    },
    {
      name: "rtyu",
      id: "456456",
      ongoing: "Trip Australia",
      upcoming: 1,
      completed: 0,
    },
    {
      name: "ghjk",
      id: "567567",
      ongoing: "Trip Australia",
      upcoming: 0,
      completed: 0,
    },
  ];

  const [list, setList] = useState([]);

  const handleGuideMenuBtnClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    setList(guides);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl relative">
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300 divide-y divide-gray-100 dark:divide-gray-700/60">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                  #
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Ongoing</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Upcoming</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Completed</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {list.map((tour, idx) => {
              return (
                <GuidesTableItem
                  key={tour.id}
                  idx={idx}
                  id={tour.id}
                  name={tour.name}
                  ongoing={tour.ongoing}
                  upcoming={tour.upcoming}
                  completed={tour.completed}
                  handleGuideMenuBtnClick={handleGuideMenuBtnClick}
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default GuidesTable;

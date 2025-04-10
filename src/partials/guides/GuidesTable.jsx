import React, { useState, useEffect } from "react";
import GuidesTableItem from "./GuidesTableItem";

function GuidesTable({ list }) {
  const handleGuideMenuBtnClick = () => {
    console.log("clicked");
  };

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
            {list?.map((guide, idx) => {
              return (
                <GuidesTableItem
                  key={idx}
                  idx={idx}
                  uid={guide?.uid}
                  id={guide?.identity_code}
                  name={guide?.full_name}
                  ongoing={guide?.ongoing}
                  upcoming={guide?.upcoming}
                  completed={guide?.completed}
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

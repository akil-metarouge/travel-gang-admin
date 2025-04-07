import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function SendNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sendNotification = () => {
    console.log("Sending notification");
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        variant="v2"
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Send Notifications
                </h1>
              </div>
            </div>

            {/* Form */}
            <div className="grid justify-center md:mt-20">
              <div className="px-5 py-5 w-100 bg-gray-200 dark:bg-gray-800 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      className="form-input w-full px-2 py-2"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-textarea w-full px-2 py-1"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="send-to"
                    >
                      Send to
                    </label>
                    <select
                      id="send-to"
                      className="form-select w-full px-2 py-2 cursor-pointer"
                    >
                      <option
                        className="dark:bg-gray-800 cursor-pointer"
                        value="ongoing-to"
                      >
                        Ongoing to
                      </option>
                      <option
                        className="dark:bg-gray-800 cursor-pointer"
                        value="completed-by"
                      >
                        Completed by
                      </option>
                    </select>
                  </div>
                </div>
                <div className="py-4">
                  <div className="grid grid-cols-2 w-full h-12">
                    <button
                      onClick={sendNotification}
                      className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SendNotifications;

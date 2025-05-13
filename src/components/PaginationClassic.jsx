function PaginationClassic({ firstIndex, lastIndex, total, page, setPage }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              disabled={firstIndex < 1}
              onClick={() => {
                setPage(page - 1);
              }}
              className={`btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 cursor-pointer ${
                firstIndex < 2
                  ? "text-gray-300 dark:text-gray-600"
                  : "hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
              }`}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              disabled={lastIndex === total}
              onClick={() => {
                setPage(page + 1);
              }}
              className={`btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 cursor-pointer ${
                lastIndex === total
                  ? "text-gray-300 dark:text-gray-600"
                  : "hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
              }`}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-gray-500 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {firstIndex}
        </span>{" "}
        to{" "}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {lastIndex}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {total}
        </span>{" "}
        results
      </div>
    </div>
  );
}

export default PaginationClassic;

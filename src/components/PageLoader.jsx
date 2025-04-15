import React from "react";
const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="w-36 h-36 border-8 border-gray-100 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default PageLoader;

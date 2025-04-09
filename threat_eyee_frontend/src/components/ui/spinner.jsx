// src/components/ui/spinner.jsx

import React from "react";

// Define the Spinner component
const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin border-t-4 border-b-4 border-green-500 border-solid w-8 h-8 rounded-full"></div>
    </div>
  );
};

// Default export the Spinner component
export default Spinner;

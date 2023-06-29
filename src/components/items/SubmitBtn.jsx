import React from "react";

const SubmitBtn = ({ title }) => {
  return (
    <div>
      <button
        type="submit"
        className="  w-full md:w-[75%] mx-auto h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
      >
        {title}
      </button>
    </div>
  );
};

export default SubmitBtn;

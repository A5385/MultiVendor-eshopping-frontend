import React from "react";

const Counter = ({ incrementCounter, decrementCounter, count, setCount }) => {
  const buttonStyle =
    "bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out";
  return (
    <div className="flex justify-between gap-2">
      <button className={buttonStyle} onClick={decrementCounter}>
        -
      </button>

      <input
        type="text"
        className="bg-gray-100 text-gray-800 text-center font-medium px-4 py-2 w-[100px]"
        value={count}
        onChange={(e) => {
          setCount(e.target.value);
        }}
      />

      <button className={buttonStyle} onClick={incrementCounter}>
        +
      </button>
    </div>
  );
};

export default Counter;

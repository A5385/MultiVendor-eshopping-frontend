import React from "react";
import { Link } from "react-router-dom";

const SearchData = ({ searchData }) => {
  return (
    <>
      {searchData && searchData.length !== 0 ? (
        <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 ">
          {searchData &&
            searchData.map((i, index) => {
              return (
                <Link to={`/product/${i._id}`}>
                  <div className="w-full flex items-start py-3  hover:scale-105 hover:bg-slate-200 duration-300">
                    <img
                      src={i.image_Url[0].url}
                      alt=""
                      className="w-[40px] h-[40] mr-[10px]"
                    />
                    <h1>{i.name}</h1>
                  </div>
                </Link>
              );
            })}
        </div>
      ) : null}
    </>
  );
};

export default SearchData;

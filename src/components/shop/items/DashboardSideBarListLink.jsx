import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DashboardSideBarListLink = ({ title, url, icon, active1, index }) => {
  return (
    <div className="w-full flex items-center p-4 ">
      <Tooltip title={title} placement="right" followCursor enterDelay={300}>
        <Link to={url} className="w-full flex items-center">
          <div
            className={`text-[30px] ${
              active1 === index ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            {icon}
          </div>
          <h5
            className={`pl-2 text-[18px] font-[400] md:block hidden ${
              active1 === index ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            {title}
          </h5>
        </Link>
      </Tooltip>
    </div>
  );
};

export default DashboardSideBarListLink;

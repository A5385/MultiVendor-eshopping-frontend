import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DashboardHeaderIconsLink = ({ icon, url, title }) => {
  return (
    <Tooltip title={title} followCursor>
      <Link to={url} className="hidden md:block">
        <div className="mx-5 cursor-pointer text-[#555] text-[30px]">
          {icon}
        </div>
      </Link>
    </Tooltip>
  );
};

export default DashboardHeaderIconsLink;

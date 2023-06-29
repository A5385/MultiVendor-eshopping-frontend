import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/Ebtkar 2022 V3.0-01.png";
import DashboardHeaderIconsLink from "../../../components/shop/items/DashboardHeaderIconsLink";
import { backend_url } from "../../../server";
import { DashboardHeaderLinksIcon } from "../../../static/data";
import { Tooltip } from "@mui/material";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white sticky top-0 left-0 z-30 flex items-center shadow-md justify-between px-4">
      <div className="w-[15%] ">
        <Link to="/">
          <img src={logo} alt="logo" className="" />
        </Link>
      </div>
      <div className="flex items-center ">
        <div className="flex items-center mr-4"></div>
        {DashboardHeaderLinksIcon.map((item, index) => (
          <DashboardHeaderIconsLink
            key={index}
            title={item.title}
            icon={item.icon}
            url={item.url}
          />
        ))}
        <Tooltip title="profile" followCursor>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${backend_url}${seller.avatar}`}
              alt="sellerImg"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default DashboardHeader;

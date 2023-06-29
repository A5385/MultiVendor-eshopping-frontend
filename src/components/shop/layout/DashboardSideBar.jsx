/* eslint-disable react/prop-types */
import DashboardSideBarListLink from "../../../components/shop/items/DashboardSideBarListLink";
import { dashboardSideBarLinks } from "../../../static/data";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      {dashboardSideBarLinks.map((links) => (
        <DashboardSideBarListLink
          key={links.id}
          title={links.title}
          url={links.url}
          icon={links.icon}
          index={links.id}
          active1={active}
        />
      ))}
    </div>
  );
};

export default DashboardSideBar;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { navItems } from "../../../static/data";
// import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className=" md:flex md:justify-between w-full">
      {navItems &&
        navItems.map((i, index) => (
          <div className="my-8 md:my-0 " key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-teal-400"
                  : "text-black md:text-white"
              }  font-[500]   cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;

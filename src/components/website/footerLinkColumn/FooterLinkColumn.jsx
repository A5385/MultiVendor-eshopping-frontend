import React from "react";
import { Link } from "react-router-dom";

const FooterLinkColumn = ({ title, links }) => {
  return (
    <ul className="text-center sm:text-start">
      <h1 className="mb-1 font-semibold">{title}</h1>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.link}
            className="text-gary-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinkColumn;

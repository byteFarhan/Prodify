import { Link, NavLink } from "react-router-dom";

const NavRoute = ({ routeName, routePath, lgHidden }) => {
  return (
    <NavLink
      to={`${routePath}`}
      className={({ isActive, isPending }) =>
        `nav-item ${isPending ? "" : isActive ? "bg-gray-200" : ""} ${
          lgHidden ? "lg:hidden" : ""
        }`
      }
    >
      {routeName}
    </NavLink>
  );
};

export default NavRoute;

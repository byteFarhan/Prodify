import { Link } from "react-router-dom";
import NavRoute from "./NavRoute/NavRoute";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";

const Navbar = ({ isScrolled }) => {
  const { user, userSignOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    userSignOut()
      .then(() => {
        swal("Logout successfull.", {
          button: false,
        });
      })
      .catch((error) => {
        swal(error.message, {
          button: false,
        });
      });
  };
  const NavRoutes = (
    <>
      {/* <NavRoute routeName={"Registation"} routePath={"/registation"} /> */}
      <NavRoute routeName={"Login"} routePath={"/login"} />
    </>
  );

  return (
    <>
      <nav
        className={`${
          isScrolled
            ? "sticky top-0 border-b shadow-sm z-[100] transition-all duration-300 backdrop-blur !bg-white/[.90]"
            : "sticky top-0 z-[100] transition-all duration-300 border-transparent border-b shadow-sm !bg-white/[.90]"
        }`}
      >
        <div className="!bg-transparent">
          <div
            className={`${
              isScrolled ? "py-4" : "py-5"
            } px-6 mx-auto lg:px-0 max-w-7xl transition-all duration-500`}
          >
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex items-center justify-between">
                <Link to={`/`}>
                  <h2 className="text-xl md:text-2xl lg:text-3xl">Prodify</h2>
                </Link>

                {/* <!-- Mobile menu button --> */}
                <div className="flex lg:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400 *:text-2xl font-medium *:text-black"
                    aria-label="toggle menu"
                  >
                    {isOpen ? <GrClose /> : <GiHamburgerMenu />}
                  </button>
                </div>
              </div>

              {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
              <div
                className={`${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "opacity-0 -translate-x-full"
                } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
              >
                <ul className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                  <NavRoute routeName={"Home"} routePath={"/"} />
                  {!user && NavRoutes}
                </ul>
                {user && (
                  <button onClick={handleLogout} className="btn btn-warning">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;

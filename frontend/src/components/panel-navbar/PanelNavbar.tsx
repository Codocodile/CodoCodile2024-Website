import { useState, useEffect } from "react";
import {
  Navbar as NavbarComponent,
  Typography,
  Button,
  IconButton,
  Collapse,
  // Avatar,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { urls } from "../../global/Variables.ts";
import header_logo from "/assets/Header_logo.png";

const PanelNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="profile">Profile</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="team">Team</Link>
      </Typography>
    </ul>
  );

  return (
    <NavbarComponent
      variant="gradient"
      color="transparent"
      className="top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 from-green-100 to-green-300"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-4">
          <div className="mr-4 py-1.5">
            <Link to={urls.landing}>
              <img
                src={header_logo}
                alt="header_logo"
                width={200}
                height={200}
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={() => {
              localStorage.removeItem("auth.access");
              localStorage.removeItem("auth.refresh");
              navigate(urls.signIn);
            }}
          >
            <span>Sign Out</span>
          </Button>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <Button
          variant="gradient"
          size="sm"
          fullWidth
          className="mb-2"
          onClick={() => {
            localStorage.removeItem("auth.access");
            localStorage.removeItem("auth.refresh");
            navigate(urls.signIn);
          }}
        >
          <span>Sign Out</span>
        </Button>
      </Collapse>
    </NavbarComponent>
  );
};

export default PanelNavbar;

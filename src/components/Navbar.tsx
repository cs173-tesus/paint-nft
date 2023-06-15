import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

import AccountContext from "../context/account-context";

const THEMES = ["light", "dark", "cupcake", "cyberpunk"];

export default function Header() {
  const accountContext = useContext(AccountContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [theme, setTheme] = React.useState("cupcake");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('data-theme')!;
    setTheme(savedTheme);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem('data-theme', theme)
  }, [theme]);

  const handleThemeChange = (e: any) => {
    const val = e.target.getAttribute("data-set-theme");
    setTheme(val);
  };

  return (
    <header className="bg-base-100 py-2 sticky top-0 z-50">
      <div className="container">
        <div className="navbar px-0">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-circle btn-primary lg:hidden mr-1"
              >
                <i className="bi bi-list text-2xl"></i>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-1 w-52 menu menu-compact p-2 bg-base-200 shadow rounded-box"
              >
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/canvas">Canvas</Link>
                </li>
                <li>
                  <Link to="/marketplace">Marketplace</Link>
                </li>
              </ul>
            </div>
            <>

            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button"> Account </label>
              </div> 
              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                  {/* <li><a>Sidebar Item 1</a></li>
                  <li><a>Sidebar Item 2</a></li> */}
                    <div className="card w-70 bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">Account</h2>
                        <p>Account: {accountContext.address}</p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="divider"></div> 
                    </div>
                    <div className="card w-70 bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">Balance</h2>
                        <p>Balance: {accountContext.balance} mutez</p>
                      </div>
                    </div>
                  <button
                  className="btn btn-primary absolute inset-x-4 bottom-6"
                  onClick={() => accountContext.disconnect()}
                  >
                    Disconnect
                  </button>
                </ul>
              </div>
            </div>

          </>
          <div className=" static pr-40">
            <p className="btn btn-ghost normal-case text-3xl" >PaintNFT</p>
          </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 font-medium text-base ">
              <li className="hover:font-semibold">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="hover:font-semibold">
                <Link to="/canvas">Canvas</Link>
              </li>
              <li className="hover:font-semibold">
                <Link to="/marketplace">Marketplace</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end dropdown-hover">
              <label tabIndex={0} className="btn">
                {THEMES.length} Themes
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-1 w-52 max-h-96 overflow-y-auto menu menu-compact p-2  bg-base-200 shadow rounded-box"
              >
                {THEMES.map((theme, i) => (
                  <li key={theme + i}>
                    <button
                      data-set-theme={theme}
                      onClick={handleThemeChange}
                      className="font-medium capitalize"
                    >
                      {i + 1 + ". " + theme}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

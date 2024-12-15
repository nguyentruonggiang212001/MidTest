import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header>
      <>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          {user?.email ? (
            <li>
              <span>Hello{user.email}</span>
              <Link to="/login">
                <button onClick={logout}>Logout</button>
              </Link>
            </li>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </ul>
      </>
    </header>
  );
};

export default Header;

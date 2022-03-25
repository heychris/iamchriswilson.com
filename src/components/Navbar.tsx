import React from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main-navigation">
    <div>
      <Link to="/" title="Home"><h1>Chris Wilson</h1></Link>
    </div>

    <div>
      <a
        href="https://github.com/heychris"
        target="_blank"
        rel="noopener noreferrer">
        <img className="github" src={github} alt="Github" />
      </a>
    </div>
  </nav>
);

export default Navbar;

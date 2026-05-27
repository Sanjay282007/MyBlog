import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./UI";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <h1 className="logo-text">
        <Link to="/">MyBlog</Link>
      </h1>
    </div>
    <ul className="navs">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Create</Link>
      </li>
      <li>
        <Link to="/update">Update</Link>
      </li>
      <li>
        <Link to="/delete">Delete</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
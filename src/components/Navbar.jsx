import React from "react";
import {Link} from "react-router-dom";
import heroimg from "../assets/react.svg"
import "./Navbar.css"

function Navbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <img src={heroimg} alt="Logo" />
                <h1>My Blogs</h1>
            </div>
            <ul className="navs">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
                <li>
                    <Link to="/update">Update</Link>
                </li>
                <li>
                    <Link to="/delete">Delete</Link>
                </li>
            </ul>

        </div>
    )
}
export default Navbar;
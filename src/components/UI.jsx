import React from "react";
import "./UI.css";

export const Container = ({ children }) => (
  <div className="ui-container">{children}</div>
);

export const Navbar = () => (
  <nav className="ui-navbar">
    <Container>
      <h2 className="ui-navbar-title">MyBlog</h2>
    </Container>
  </nav>
);

export const Card = ({ children }) => (
  <div className="ui-card">{children}</div>
);

export const Input = (props) => (
  <input {...props} className="ui-input" />
);

export const TextArea = (props) => (
  <textarea {...props} className="ui-textarea" />
);

export const Button = ({ children, variant = "primary", ...props }) => {
  const className = `ui-button ${variant === "danger" ? "ui-button-danger" : ""}`;
  return <button {...props} className={className}>{children}</button>;
};
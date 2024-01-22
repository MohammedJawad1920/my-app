"use client";
import { IconButton, Badge } from "@mui/material";
import {
  Close,
  Search,
  ShoppingCart,
  Menu,
  ArrowForward,
} from "@mui/icons-material";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <header className={"header "}>
      <div className="customContainer">
        <Link
          href="/"
          className="logo"
        >
          <img
            src="./logo.svg"
            width="162"
            height="50"
            alt="EduWeb logo"
          />
        </Link>

        <nav
          className={`navbar ${isNavOpen ? "active" : ""}`}
          data-navbar
        >
          <div className="wrapper">
            <Link
              href="/"
              className="logo"
            >
              <img
                src="./logo.svg"
                width="162"
                height="50"
                alt="EduWeb logo"
              />
            </Link>

            <IconButton
              className="nav-close-btn"
              aria-label="close menu"
              onClick={toggleNav}
            >
              <Close className="h-12 w-12" />
            </IconButton>
          </div>

          <ul className="navbar-list">
            <li className="navbar-item">
              <Link
                href="/"
                className="navbar-link"
              >
                Home
              </Link>
            </li>

            <li className="navbar-item">
              <Link
                href="about"
                className="navbar-link"
              >
                About
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                href="courses"
                className="navbar-link"
              >
                Courses
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                href="blog"
                className="navbar-link"
              >
                Blog
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                href="contact"
                className="navbar-link"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <IconButton
            className="header-action-btn"
            aria-label="toggle search"
            title="Search"
          >
            <Search className="h-12 w-12" />
          </IconButton>

          <IconButton
            className="header-action-btn"
            aria-label="open menu"
            onClick={toggleNav}
          >
            <Menu className="h-12 w-12" />
          </IconButton>
        </div>

        {isNavOpen && (
          <div
            className="overlay"
            onClick={toggleNav}
            data-overlay
          ></div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

"use client";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: "url('./footer-bg.png')" }}
    >
      <div className="footer-top section">
        <div className="container grid-list">
          <div className="footer-brand">
            <a
              href="#"
              className="logo"
            >
              <img
                src="./logo-light.svg"
                width="162"
                height="50"
                alt="EduWeb logo"
              />
            </a>
            <p className="footer-brand-text">
              Lorem ipsum dolor amet consecto adi pisicing elit sed eiusm tempor
              incidid unt labore dolore.
            </p>
            <div className="wrapper">
              <span className="span">Add:</span>
              <address className="address">70-80 Upper St Norwich NR2</address>
            </div>
            <div className="wrapper">
              <span className="span">Call:</span>
              <a
                href="tel:+011234567890"
                className="footer-link"
              >
                +01 123 4567 890
              </a>
            </div>
            <div className="wrapper">
              <span className="span">Email:</span>
              <a
                href="mailto:info@eduweb.com"
                className="footer-link"
              >
                info@eduweb.com
              </a>
            </div>
          </div>
          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Online Platform</p>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#"
                className="footer-link"
              >
                Courses
              </a>
            </li>

            <li>
              <a
                href="#"
                className="footer-link"
              >
                Instructor
              </a>
            </li>

            <li>
              <a
                href="#"
                className="footer-link"
              >
                Events
              </a>
            </li>

            <li>
              <a
                href="#"
                className="footer-link"
              >
                Instructor Profile
              </a>
            </li>

            <li>
              <a
                href="#"
                className="footer-link"
              >
                Purchase Guide
              </a>
            </li>
          </ul>
          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Links</p>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
              >
                News & Articles
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
              >
                FAQ's
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
              >
                Sign In/Registration
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
              >
                Coming Soon
              </a>
            </li>{" "}
          </ul>
          <div className="footer-list">
            <p className="footer-list-title">Contacts</p>
            <p className="footer-list-text">
              Enter your email address to register to our newsletter
              subscription
            </p>
            <form
              action=""
              className="newsletter-form"
            >
              <input
                type="email"
                name="email_address"
                placeholder="Your email"
                required
                className="input-field"
              />
              <button
                type="submit"
                className="btn has-before"
              >
                <span className="span">Subscribe</span>
                <ion-icon
                  name="arrow-forward-outline"
                  aria-hidden="true"
                ></ion-icon>
              </button>
            </form>
            <ul className="social-list">
              <li>
                <a
                  href="#"
                  className="social-link"
                >
                  <FacebookOutlined className="h-8 w-8" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="social-link"
                >
                  <LinkedIn className="h-8 w-8" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="social-link"
                >
                  <Instagram className="h-8 w-8" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="social-link"
                >
                  <Twitter className="h-8 w-8" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="social-link"
                >
                  <YouTube className="h-8 w-8" />
                </a>
              </li>
            </ul>{" "}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            Copyright 2022 All Rights Reserved by{" "}
            <a
              href="#"
              className="copyright-link"
            >
              codewithsadee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

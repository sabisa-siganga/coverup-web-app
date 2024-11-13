"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button/Button";
import "./Navbar.scss";
import Image from "next/image";
import BlueCircles from "../BlueCircles/BlueCircles";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  // manage the visibilty of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // toggle the menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav>
      <BlueCircles className="elipse1" />

      <div className="nav-links-container">
        <div className="logo">
          <Link href="/" passHref>
            <Image
              src="/assets/coverupLogo.png"
              alt="logo"
              width={132}
              height={35}
            />
          </Link>
        </div>

        {/* Menu icon for mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          <FiMenu />
        </div>

        <div className={`nav-links ${isOpen ? "show-menu" : ""} `}>
          <Link href="/" passHref>
            {" "}
            Home
          </Link>
          <Link href="#" passHref>
            {" "}
            Products
          </Link>
          <Link href="/about" passHref>
            {" "}
            About Us
          </Link>
          <Link href="/contact" passHref>
            {" "}
            Contact Us
          </Link>
          <div className="start-btn-container">
            <Link className="btn" href="#" passHref>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

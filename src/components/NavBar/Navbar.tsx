import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import "./Navbar.scss";
import Image from "next/image";
import BlueCircles from "../BlueCircles/BlueCircles";

const Navbar = () => {
  return (
    <nav>
      <BlueCircles className="elipse1" />

      <div className="nav-links-container">
        <Link href="/" passHref>
          <Image
            src="/assets/coverupLogo.png"
            alt="logo"
            width={132}
            height={35}
          />
        </Link>

        <div className="nav-links">
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
        </div>
        <div className="start-btn-container">
          <Link className="btn" href="/quotation" passHref>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

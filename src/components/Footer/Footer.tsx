import {
  FOOTER_ADDRESS_INFO,
  FOOTER_CONTACT_INFO,
  FOOTER_NAVIGATION,
  // FOOTER_RESOURCES,
} from "./constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="flexCenter pb-5 blue-background">
      <div className="padding-container flex pt-10 w-full flex-col gap-10 link-cont">
        <div className="flex flex-col items-start justify-center gap-10 md:flex-row nav-content">
          <div className="flex flex-col items-start gap-4 footer-paragraph">
            <Link href="/">
              <Image
                src="/assets/coverupLogo-white.png"
                alt="logo"
                width={132}
                height={35}
              />
            </Link>
            <p className="text-white ">
              <b>CoverUp Insurance</b> offers comprehensive insurance solutions
              to protect what matters most. Located in the heart of
              Johannesburg, we are dedicated to providing personalized service
              and peace of mind.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 text-white sm:justify-between md:flex-1 footer-group-link">
            <div className="flex flex-col gap-5 regular-14 flex-1 address-cont">
              <FooterColumn title={FOOTER_ADDRESS_INFO.title}>
                <ul className="regular-14 flex flex-col gap-4 text-white">
                  {FOOTER_ADDRESS_INFO.links.map((contact, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <contact.icon
                        className="h-5 w-5 text-red-50 address"
                        aria-hidden="true"
                      />
                      <div>
                        <div>
                          {contact.label}: {contact.value}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5 flex-1 contact-us">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                <ul className="regular-14 flex flex-col gap-4 text-white">
                  {FOOTER_CONTACT_INFO.links.map((contact, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <contact.icon
                        className="h-5 w-5 text-red-50 contact"
                        aria-hidden="true"
                      />
                      <div>
                        <div>
                          {contact.label}: {contact.value}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5 flex-1 quick-link-cont">
              <FooterColumn title={FOOTER_NAVIGATION.title}>
                <ul className="regular-14 flex flex-col gap-4 text-white">
                  {FOOTER_NAVIGATION.links.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>

            {/* <div className="flex flex-col gap-5 flex-1"> */}
            {/* <FooterColumn title={FOOTER_RESOURCES.title}>
                <ul className="regular-14 flex flex-col gap-4 text-white">
                  {FOOTER_RESOURCES.links.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn> */}
            {/* </div> */}
          </div>
        </div>

        <div className="border p-0 m-0" />
        <p className="regular-14 w-full text-center text-white footer-text">
          2024 CoverUp Insurance | All rights reserved
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-semibold whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;

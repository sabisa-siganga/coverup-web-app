import {
  MapPinIcon,
  EnvelopeIcon,
  // PhoneIcon,
  // CheckCircleIcon,
  // GlobeAltIcon,
} from "@heroicons/react/20/solid";

export const FOOTER_ADDRESS_INFO = {
  title: "Our Office",
  links: [
    {
      icon: MapPinIcon,
      label: "Address",
      value: "Thornhill Office Park 84, Bekker road, Midrand 1685",
    },
  ],
};

export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { icon: EnvelopeIcon, label: "Email", value: "info@coverupquotes.co.za" },
    // { label: "Customer Support", value: "+27 82 746 7928", icon: PhoneIcon },
    // { label: "Office Line", value: "+27 82 746 7928", icon: PhoneIcon },
  ],
};

export const FOOTER_NAVIGATION = {
  title: "Quick Links",
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    // { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Get a Quote", href: "/#" },
  ],
};

// export const FOOTER_RESOURCES = {
//   title: "Resources",
//   links: [
//     { label: "Claims", href: "/claims" },
//     { label: "Products", href: "/products" },
//     { label: "FAQ", href: "/faq" },
//     { label: "Policy Documents", href: "/policies" },
//     { label: "Privacy Policy", href: "/privacy-policy" },
//     { label: "Terms of Service", href: "/terms" },
//   ],
// };

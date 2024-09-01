import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  GlobeAltIcon,
} from "@heroicons/react/20/solid";

export const FOOTER_ADDRESS_INFO = {
  title: "Our Office",
  links: [
    {
      label: "Address",
      value: "123 Insurance Lane, Sandton, Johannesburg, 2196",
      icon: MapPinIcon,
    },
  ],
};

export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Email", value: "support@coverup.co.za", icon: EnvelopeIcon },
    { label: "Customer Support", value: "+27 84 750 7013", icon: PhoneIcon },
    { label: "Office Line", value: "+27 12 004 2004", icon: PhoneIcon },
  ],
};

export const FOOTER_NAVIGATION = {
  title: "Quick Links",
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Claims", href: "/claims" },
    { label: "Get a Quote", href: "/quote" },
  ],
};

export const FOOTER_RESOURCES = {
  title: "Resources",
  links: [
    { label: "FAQ", href: "/faq" },
    { label: "Policy Documents", href: "/policies" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
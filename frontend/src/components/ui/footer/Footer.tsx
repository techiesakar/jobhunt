"use client";
import React from "react";
import { footerLinks } from "./data";
import Link from "next/link";
import Branding from "@/components/Branding";
import SocialLinks from "@/components/SocialLinks";
import ScrollTop from "@/components/ScrollTop";
import { usePathname } from "next/navigation";

type footerPropsType = {
  title: string;
  links: {
    name: string;
  }[];
};

const FooterColumn = ({ title, links }: footerPropsType) => (
  <div className="flex flex-col gap-4">
    <h4 className="font-medium text-gray-600">{title}</h4>
    <ul className="flex flex-col gap-2">
      {links.map(({ name }) => (
        <Link className="text-sm hover:text-blue-600" key={name} href="/">
          {name}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className={`${
        pathname === "/login" && "hidden"
      } relative border-t border-gray-200`}
    >
      <div className="grid justify-center gap-8 py-16 mx-auto text-center huntContainer md:grid-cols-12 md:text-left">
        <div className="md:col-span-3 ">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
        </div>
        <div className="md:col-span-3 ">
          <FooterColumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />
        </div>
        <div className="md:col-span-3 ">
          <FooterColumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:col-span-3 md:justify-start md:items-center">
          <Branding />
          <SocialLinks />
        </div>
      </div>
      <ScrollTop />
    </footer>
  );
};

export default Footer;

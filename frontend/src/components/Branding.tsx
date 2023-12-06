import Image from "next/image";
import Link from "next/link";
import React from "react";

const Branding = () => {
  return (
    <div className="flex items-center gap-2 site-branding">
      <Link href={"/"} className="flex items-center justify-center gap-2">
        <Image src="/jobhuntlogo.png" height={120} width={120} alt="logo" />
      </Link>
    </div>
  );
};

export default Branding;

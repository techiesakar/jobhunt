import Link from "next/link";
import React from "react";
import {
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsTwitter,
    BsYoutube,
} from "react-icons/bs";
const SocialLinks = () => {
    return (
        <ul className="flex gap-6 ">
            <li>
                <Link className="text-gray-500 hover:text-gray-700 transition" href="/">
                    <BsFacebook />
                </Link>
            </li>
            <li>
                <Link className="text-gray-500 hover:text-gray-700 transition" href="/">
                    <BsTwitter />
                </Link>
            </li>
            <li>
                <Link className="text-gray-500 hover:text-gray-700 transition" href="/">
                    <BsInstagram />
                </Link>
            </li>
            <li>
                <Link className="text-gray-500 hover:text-gray-700 transition" href="/">
                    <BsLinkedin />
                </Link>
            </li>
            <li>
                <Link className="text-gray-500 hover:text-gray-700 transition" href="/">
                    <BsYoutube />
                </Link>
            </li>
        </ul>
    );
};

export default SocialLinks;
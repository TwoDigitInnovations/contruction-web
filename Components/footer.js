import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-custom-black border-b border-white text-white px-5">
      <div className="max-w-full  mx-auto w-full px-4 sm:px-6 md:px-10">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between py-6  ">
          {/* Logo */}
         <Image src="/Image/logo.png" width={100} height={100}/>

          {/* Newsletter Subscription */}
         <div className="flex flex-col items-center gap-4 mt-4 md:mt-0 md:flex-row md:gap-3">
  <p className="text-center text-nowrap">Subscribe to Our Newsletter:</p>
  <div className="flex items-center border-b border-gray-500">
    <input
      type="email"
      placeholder="Enter your email address"
      className="bg-transparent outline-none text-white placeholder-gray-400 px-2 py-1 w-64"
    />
    <FaArrowRight className="ml-2 cursor-pointer text-yellow-500" />
  </div>
</div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row md:justify-between my-5 gap-10">
          {/* About Us */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm max-w-md">
              We have the confidence to provide the best service for you, with
              the support of professional and certified HR, high-quality
              materials, and structured work techniques.
            </p>
            <div className="flex gap-4 mt-5">
              <FaTwitter className="cursor-pointer text-2xl text-white hover:text-yellow-500" />
              <FaFacebookF className="cursor-pointer text-2xl text-white hover:text-yellow-500" />
              <FaInstagram className="cursor-pointer text-2xl text-white hover:text-yellow-500" />
            </div>
          </div>

          {/* Office */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Office</h3>
            <p>18 Office Park Building 21th Floor Unit C.</p>
            <p>Jl. TB Simatupang Kav. 18, Jakarta Selatan, 12520</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p>Email: contact@jhontracktor.com</p>
            <p>Phone: (+62) 877-2469-724</p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Links</h3>
            <ul className="list-none space-y-2">
              <li>
                <Link href="/" className="hover:text-yellow-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-yellow-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-yellow-500">
                  Service
                </Link>
              </li>
              <li>
                <Link href="/project" className="hover:text-yellow-500">
                  Project
                </Link>
              </li>
               <li>
                <Link href="/terms" className="hover:text-yellow-500">
                  Terms & Conditions
                </Link>
              </li>
               <li>
                <Link href="/privacypolicy" className="hover:text-yellow-500">
                  PrivacyPolicy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center py-4 border-t border-gray-600 ">
          <p className="text-gray-500">Copyright © 2025 Construction. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

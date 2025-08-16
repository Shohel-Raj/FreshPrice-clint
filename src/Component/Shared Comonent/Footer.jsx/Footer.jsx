import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaGithubSquare,
} from "react-icons/fa";
import Container from "../Container/Container";
import MainLogo from "../MainLogo/MainLogo";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10">
      <Container>
        {/* Top Section */}
        <div className="flex justify-between gap-6 flex-col md:flex-row pb-6">
          {/* Logo + Tagline */}
          <div>
            <div className="flex items-center gap-2">
              <MainLogo />
              <p className="text-3xl font-bold flex md:hidden">Fresh Price</p>
            </div>
            <p className="text-sm italic mt-2 text-gray-600 dark:text-gray-400">
              Stay Updated. Shop Smarter.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-bold text-2xl mb-3 text-gray-800 dark:text-gray-200">
              Contact Us
            </h3>
            <p className="flex items-center gap-2 mb-1">
              <FaPhoneAlt className="text-yellow-500 dark:text-yellow-400" />{" "}
              +880 1963 687341
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500 dark:text-yellow-400" />{" "}
              shohel87.dev@gmail.com
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-2xl mb-3 text-gray-800 dark:text-gray-200">
              Legal
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="/terms"
                  className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-2xl mb-3 text-gray-800 dark:text-gray-200">
              Follow Us
            </h3>
            <div className="flex gap-5 text-xl">
              <a
                className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-transform duration-200 hover:scale-125"
                href="https://facebook.com/mohammedshohel.bd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-transform duration-200 hover:scale-125"
                href="https://www.linkedin.com/in/mohammedshohel87"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-transform duration-200 hover:scale-125"
                href="https://github.com/Shohel-Raj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithubSquare size={26} />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Divider */}
      <hr className="border-t border-gray-300 dark:border-gray-700" />

      {/* Bottom Section */}
      <Container>
        <div className="text-center text-sm py-4 text-gray-700 dark:text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Fresh Price</span>. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const LandingPageSection9 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-16">
      <div className="w-full p-8 rounded shadow-lg text-center">
        {/* Newsletter Subscription */}
        <div className="mb-16">
          <p className="text-xl text-white mb-6">
            Subscribe to our newsletter for the latest updates on new features
            and product releases.
          </p>
          <div className="flex justify-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg focus:outline-none"
            />
            <button className="text-lime-400 border border-lime-400 px-6 py-2 rounded-r-lg">
              Subscribe to Newsletter
            </button>
          </div>
          <p className="text-sm text-white">
            Stay up to date with our latest news and updates.
          </p>
        </div>

        {/* Company Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <h1 className="text-2xl font-semibold mb-4">Company</h1>
            <ul>
              <li className="mb-2">About Us</li>
              <li className="mb-2">Careers</li>
              <li className="mb-2">Press</li>
              <li className="mb-2">Blog</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms of Service</li>
              <li className="mb-2">Contact Us</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h1 className="text-2xl font-semibold mb-4">Quick Links</h1>
            <ul>
              <li className="mb-2">Home</li>
              <li className="mb-2">Features</li>
              <li className="mb-2">Pricing</li>
              <li className="mb-2">FAQs</li>
              <li className="mb-2">Support</li>
              <li className="mb-2">Testimonials</li>
              <li className="mb-2">Sign Up</li>
            </ul>
          </div>

          {/* Contact With Us */}
          <div>
            <h1 className="text-2xl font-semibold mb-4">Contact With Us</h1>
            <ul className="text-center">
              <li className="mb-2 flex justify-center items-center">
                <FaEnvelope className="mr-2" /> Email
              </li>
              <li className="mb-2 flex justify-center items-center">
                <FaPhone className="mr-2" /> Phone
              </li>
              <li className="mb-2 flex justify-center items-center">
                <FaMapMarkerAlt className="mr-2" /> Address
              </li>
              <li className="mb-2 flex justify-center items-center">
                <FaFacebook className="mr-2" /> Facebook
              </li>
              <li className="mb-2 flex justify-center items-center">
                <FaTwitter className="mr-2" /> Twitter
              </li>
              <li className="mb-2 flex justify-center items-center">
                <FaLinkedin className="mr-2" /> LinkedIn
              </li>
              <li className="mb-2 flex justify-center items-center">
                <FaInstagram className="mr-2" /> Instagram
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSection9;

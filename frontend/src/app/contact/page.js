"use client";

import React from "react";
import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FiExternalLink,
  FiMail,
  FiMessageSquare,
} from "react-icons/fi";

const socialMedia = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/pandey-gopal",
    icon: <FaLinkedin className="text-2xl" />,
    description:
      "Connect with me professionally and explore my development journey.",
    username: "pandey-gopal",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    iconBg: "bg-blue-600",
    hoverColor: "hover:border-blue-400 hover:shadow-blue-200",
  },
  {
    name: "GitHub",
    link: "https://github.com/pandeygopal",
    icon: <FaGithub className="text-2xl" />,
    description:
      "Explore my repositories, MERN stack, and Spring Boot projects.",
    username: "pandeygopal",
    color: "bg-slate-50 text-slate-800 border-slate-200",
    iconBg: "bg-slate-800",
    hoverColor: "hover:border-slate-400 hover:shadow-slate-200",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/vats_gopal_pandey",
    icon: <FaInstagram className="text-2xl" />,
    description:
      "Follow my coding journey, updates, and creative content.",
    username: "vats_gopal_pandey",
    color: "bg-pink-50 text-pink-600 border-pink-200",
    iconBg: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
    hoverColor: "hover:border-pink-400 hover:shadow-pink-200",
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/919311293172",
    icon: <FaWhatsapp className="text-2xl" />,
    description:
      "Let's connect for collaborations, projects, and opportunities!",
    username: "9311293172",
    color: "bg-green-50 text-green-600 border-green-200",
    iconBg: "bg-green-500",
    hoverColor: "hover:border-green-400 hover:shadow-green-200",
  },
];

const contactMethods = [
  {
    name: "Send Email",
    description:
      "Reach out via email for collaborations and opportunities",
    icon: <FiMail className="text-blue-600 text-2xl" />,
    action: "mailto:2gopalpandey@gmail.com",
    color: "bg-blue-50 border-blue-200",
    hoverColor: "hover:border-blue-400 hover:bg-blue-100",
  },
  {
    name: "Direct Message",
    description:
      "Message me directly on WhatsApp for quick responses",
    icon: <FiMessageSquare className="text-indigo-600 text-2xl" />,
    action: "https://wa.me/919311293172",
    color: "bg-indigo-50 border-indigo-200",
    hoverColor: "hover:border-indigo-400 hover:bg-indigo-100",
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f8] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Connect With Gopal
          </h1>

          <p className="text-lg text-gray-600 font-medium">
            MERN Stack Developer | Spring Boot Developer | Java Backend Developer
          </p>
        </div>

        {/* Social Profiles */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Social Profiles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            {socialMedia.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`border rounded-3xl p-8 transition-all duration-300 shadow-sm hover:shadow-2xl ${item.color} ${item.hoverColor}`}
              >
                <div className="flex justify-between items-start mb-8">

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${item.iconBg}`}
                  >
                    {item.icon}
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-full p-3 shadow-sm">
                    <FiExternalLink className="text-xl" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-4">
                  {item.name}
                </h3>

                <p className="text-base leading-7 mb-8 opacity-90">
                  {item.description}
                </p>

                <div className="inline-flex items-center px-5 py-2 rounded-full bg-white shadow-sm font-semibold">
                  @{item.username}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Direct Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target="_blank"
                rel="noopener noreferrer"
                className={`border rounded-3xl p-8 transition-all duration-300 shadow-sm hover:shadow-2xl ${method.color} ${method.hoverColor}`}
              >
                <div className="flex items-center gap-5 mb-5">

                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    {method.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {method.name}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] p-12 text-center text-white shadow-2xl">

          <h2 className="text-5xl font-bold mb-5">
            Explore My Portfolio
          </h2>

          <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-8">
            Check out my projects, skills, experience, and development journey.
          </p>

          <a
            href="https://gopalpandeyportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Visit Portfolio
            <FiExternalLink className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

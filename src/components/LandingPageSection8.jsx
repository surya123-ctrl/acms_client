import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
const LandingPageSection8 = () => {
  const contactDetails = [
    {
      icon: <FaEnvelope className="text-4xl text-lime-400 mb-4" />,
      title: "Email",
      description: "contact@example.com",
      text: "Feel free to contact us via email or phone during our business hours.",
    },
    {
      icon: <FaPhone className="text-4xl text-lime-400 mb-4" />,
      title: "Phone",
      description: "+1 234 567 890",
      text: "We look forward to hearing from you!",
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-lime-400 mb-4" />,
      title: "Office",
      description: "123 Main St, Anytown, USA",
      text: "Follow us on social media for updates and news.",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-900 p-16">
      <div className="w-full p-8 rounded shadow-lg text-center">
        <p className="text-xl text-white mb-8">
          Our team is here to assist you with any inquiries you may have.
        </p>
        <h1 className="text-6xl text-white mb-6">Contact Us</h1>
        <p className="text-xl text-white mb-8">
          Have questions or need support? Reach out to us!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactDetails.map((contact, index) => (
            <div
              key={index}
              className="contact-card p-6 shadow-md  text-white transition-transform transform"
            >
              <div className="flex flex-col items-center mb-8">
                {contact.icon}
                <h3 className="text-xl font-bold text-center mb-8">
                  {contact.title}
                </h3>
                <p className="text-lg text-center mb-8">{contact.text}</p>
                <p className="text-lg text-center">{contact.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPageSection8;

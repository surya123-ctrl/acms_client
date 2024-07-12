import React from "react";

const LandingPageSection7 = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO at Company A",
      testimonial: "This service has transformed the way we handle our cases!",
      avatar:
        "https://media.licdn.com/dms/image/D5603AQE0JSwIIgZyUA/profile-displayphoto-shrink_800_800/0/1713893051317?e=1726099200&v=beta&t=4ETZFmOw3CLir7jMzEJKgHcdWh7x8g3ZzlG6V-S_MHs",
    },
    {
      name: "Jane Smith",
      role: "Attorney at Firm B",
      testimonial: "I can't imagine going back to our old methods.",
      avatar: "https://via.placeholder.com/150",
    },
    {
      name: "Alice Johnson",
      role: "Partner at Law Office C",
      testimonial: "Incredibly efficient and easy to use.",
      avatar: "https://via.placeholder.com/150",
    },
    {
      name: "Bob Brown",
      role: "Legal Advisor at Corporation D",
      testimonial: "The best investment we've made for our practice.",
      avatar: "https://via.placeholder.com/150",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-900 p-16">
      <div className=" w-full p-8 rounded shadow-lg text-center">
        <h1 className="text-6xl text-white mb-6">Testimonials</h1>
        <p className="text-xl text-white mb-8 ">
          See what our clients have to say about their experience with Advocate
          case management system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card p-6 shadow-md  bg-zinc-400 text-white"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-left">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-left">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-lg text-left">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPageSection7;

import React, { useState } from "react";

const LandingPageSection6 = () => {
  const plans = [
    {
      id: "basic",
      title: "Basic Plan",
      price: ["$29.99/month", "$200/year"],
      featureText: [
        [
          "Add up to 10 clients",
          "Manage up to 5 cases",
          "Chat support available",
        ],
        [
          "Feature text goes here",
          "Feature text goes here",
          "Feature text goes here",
        ],
      ],
    },
    {
      id: "business",
      title: "Business Plan",
      price: ["$49.99/month", "$299/year"],
      featureText: [
        [
          "Add unlimited clients",
          "Manage unlimited cases",
          "Video call support available",
          "Accept online payments",
        ],
        [
          "Feature text goes here",
          "Feature text goes here",
          "Feature text goes here",
          "Feature text goes here",
        ],
      ],
    },
    {
      id: "enterprise",
      title: "Enterprise Plan",
      price: ["$79.99/month", "$499/year"],
      featureText: [
        [
          "All features from Plan 2",
          "Priority email support",
          "Access to advanced analytics",
          "Custom branding options",
          "Dedicated account manager",
        ],
        [
          "Feature text goes here",
          "Feature text goes here",
          "Feature text goes here",
          "Feature text goes here",
          "Feature text goes here",
        ],
      ],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const handlePlanChange = (period) => {
    setSelectedPlan(period);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 p-8">
      <div className="max-w-4xl w-full p-8 rounded shadow-lg text-center">
        <p className="text-lg text-white mb-2">
          Choose the perfect plan for you
        </p>
        <h1 className="text-6xl font-semibold text-white mb-6">Pricing Plan</h1>
        <p className="text-sm text-white mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-3 button-transition relative overflow-hidden border border-lime-400 ${
              selectedPlan === "monthly"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-lime-400"
            }`}
            onClick={() => handlePlanChange("monthly")}
          >
            <span className="relative z-10">Monthly</span>
          </button>
          <button
            className={`px-6 py-3 button-transition relative overflow-hidden border border-lime-400 ${
              selectedPlan === "yearly"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-lime-400"
            }`}
            onClick={() => handlePlanChange("yearly")}
          >
            <span className="relative z-10">Yearly</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[25rem] ">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col justify-between border border-white rounded-lg p-6 shadow-md h-full"
            >
              <div>
                <h3 className="text-xl text-white font-semibold mb-4">
                  {plan.title}
                </h3>
                <h1 className="text-3xl text-white font-bold mb-8">
                  {selectedPlan === "monthly" ? plan.price[0] : plan.price[1]}
                </h1>
                <ul className="text-white mb-8">
                  {selectedPlan === "monthly"
                    ? plan.featureText[0].map((feature, index) => (
                        <li key={index} className="mb-2 text-left">
                          ✔️{feature}
                        </li>
                      ))
                    : plan.featureText[1].map((feature, index) => (
                        <li key={index} className="mb-2 text-left">
                          ✔️{feature}
                        </li>
                      ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <button className="text-lime-400 border border-lime-400 px-4 py-2 rounded relative overflow-hidden button-transition">
                  <span className="relative z-10">Sign Up Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPageSection6;
